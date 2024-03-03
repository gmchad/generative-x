/* This code has been lifted (with permission) from the open-source MIT licensed big-AGI project.
 * https://github.com/enricoros/big-AGI
 */
import {NextRequest} from 'next/server';
import {z} from 'zod';


function elevenlabsVoiceId(voiceId?: string): string {
    return voiceId?.trim() || '21m00Tcm4TlvDq8ikWAM';
}

function elevenlabsAccess(elevenKey: string | undefined, apiPath: string): { headers: HeadersInit, url: string } {
    // API key
    elevenKey = (elevenKey || process.env.ELEVENLABS_API_KEY || '').trim();
    if (!elevenKey)
        throw new Error('Missing ElevenLabs API key.');

    // API host
    const host = 'https://api.elevenlabs.io';

    return {
        headers: {
            'Content-Type': 'application/json',
            'xi-api-key': elevenKey,
        },
        url: host + apiPath,
    };
}

const speechInputSchema = z.object({
    elevenKey: z.string().optional(),
    text: z.string(),
    voiceId: z.string().optional(),
    nonEnglish: z.boolean(),
    streaming: z.boolean().optional(),
    streamOptimization: z.number().optional(),
});

export type SpeechInputSchema = z.infer<typeof speechInputSchema>;

export namespace ElevenlabsWire {
    export interface TTSRequest {
        text: string;
        model_id?: 'eleven_monolingual_v1' | string;
        voice_settings?: {
            stability: number;
            similarity_boost: number;
        };
    }
}

function createEmptyReadableStream<T = Uint8Array>(): ReadableStream<T> {
    return new ReadableStream({
        start: (controller) => controller.close(),
    });
}


async function elevenLabsHandler(req: NextRequest) {
    try {

        // construct the upstream request
        const {
            elevenKey, text, voiceId, nonEnglish,
            streaming, streamOptimization,
        } = speechInputSchema.parse(await req.json());
        const path = `/v1/text-to-speech/${elevenlabsVoiceId(voiceId)}` + (streaming ? `/stream?optimize_streaming_latency=${streamOptimization || 1}` : '');
        const {headers, url} = elevenlabsAccess(elevenKey, path);
        const body: ElevenlabsWire.TTSRequest = {
            text: text,
            ...(nonEnglish && {model_id: 'eleven_multilingual_v1'}),
        };

        // elevenlabs POST
        const upstreamResponse: Response = await fetch(url, {method: 'POST', headers, body: JSON.stringify(body)});

        // Throws an error if the response is not ok
        // Use in server-side code, and not tRPC code (which has utility functions in trpc.serverutils.ts)
        if (!upstreamResponse.ok) {
            const errorPayload: object | null = await upstreamResponse.json().catch(() => null);
            // noinspection ExceptionCaughtLocallyJS
            throw new Error(`${upstreamResponse.statusText} (${upstreamResponse.status})${errorPayload ? ' · ' + JSON.stringify(errorPayload) : ''}`);
        }

        // NOTE: this is disabled, as we pass-through what we get upstream for speed, as it is not worthy
        //       to wait for the entire audio to be downloaded before we send it to the client
        // if (!streaming) {
        //   const audioArrayBuffer = await upstreamResponse.arrayBuffer();
        //   return new NextResponse(audioArrayBuffer, { status: 200, headers: { 'Content-Type': 'audio/mpeg' } });
        // }

        // stream the data to the client
        const audioReadableStream = upstreamResponse.body || createEmptyReadableStream();
        return new Response(audioReadableStream, {status: 200, headers: {'Content-Type': 'audio/mpeg'}});

    } catch (error: any) {
        const fetchOrVendorError = (error?.message || error?.error || 'unknown error') + (error?.cause ? ' · ' + error.cause : '');
        console.log(`api/elevenlabs/speech: fetch issue: ${fetchOrVendorError}`);
        return new Response(`[Issue] elevenlabs: ${fetchOrVendorError}`, {status: 500});
    }
}

export const runtime = 'edge';
export {elevenLabsHandler as POST};