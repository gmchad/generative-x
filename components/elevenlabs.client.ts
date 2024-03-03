/* This code has been lifted (with permission) from the open-source MIT licensed big-AGI project.
 * https://github.com/enricoros/big-AGI
 */
import type {SpeechInputSchema} from "@/app/api/elevenlabs/speech/route";

export class AudioLivePlayer {
    private readonly audioContext: AudioContext;
    private readonly audioElement: HTMLAudioElement;
    private readonly mediaSource: MediaSource;
    private readonly bufferSizeLimit: number;
    private readonly onStart: (() => void) | null;
    private readonly onStop: (() => void) | null;
    private reader: ReadableStreamDefaultReader<Uint8Array> | null;

    constructor() {
        this.audioContext = new AudioContext();
        this.audioElement = new Audio();
        this.mediaSource = new MediaSource();
        this.bufferSizeLimit = 5; // in seconds
        this.onStart = null;
        this.onStop = null;
        this.reader = null;
    }

    async EXPERIMENTAL_playStream(edgeResponse: Response) {
        if (this.reader) {
            await this.stop();
        }

        if (!edgeResponse.body) {
            return;
        }
        const esgeReadableStream = edgeResponse.body;

        const sourceNode = this.audioContext.createMediaElementSource(this.audioElement);
        sourceNode.connect(this.audioContext.destination);

        const mimeType = 'audio/mpeg';
        this.mediaSource.addEventListener('sourceopen', async () => {
            const sourceBuffer: SourceBuffer = this.mediaSource.addSourceBuffer(mimeType);
            this.reader = esgeReadableStream.getReader();

            if (this.onStart) {
                this.onStart();
            }

            while (true) {
                const {done, value} = await this.reader.read();
                if (done) {
                    sourceBuffer.onupdateend = () => this.mediaSource.endOfStream();
                    break;
                }

                await new Promise((resolve) => {
                    if (!sourceBuffer.updating) {
                        resolve(null);
                    } else {
                        sourceBuffer.addEventListener('updateend', () => resolve(null), {once: true});
                    }
                });

                if (this.audioElement.buffered.length > 0) {
                    const currentTime = this.audioElement.currentTime;
                    const bufferedEnd = this.audioElement.buffered.end(this.audioElement.buffered.length - 1);
                    const remainingBuffer = bufferedEnd - currentTime;

                    if (remainingBuffer > this.bufferSizeLimit) {
                        // E: just made this a bit more resilient, but not much
                        try {
                            // Remove old data from the buffer
                            sourceBuffer.remove(0, currentTime - 1);
                            await new Promise((resolve) => {
                                sourceBuffer.addEventListener('updateend', () => resolve(null), {once: true});
                            });
                        } catch (e) {
                            console.warn('Error removing old data from the buffer:', e);
                        }
                    }
                }

                // Wait for the sourceBuffer to finish updating before appending new data
                await new Promise((resolve) => {
                    if (!sourceBuffer.updating) {
                        resolve(null);
                    } else {
                        sourceBuffer.addEventListener('updateend', () => resolve(null), {once: true});
                    }
                });

                // Append new data to the buffer
                sourceBuffer.appendBuffer(value);
            }

            if (this.onStop) {
                this.onStop();
            }
        });

        this.audioElement.src = URL.createObjectURL(this.mediaSource);
        this.audioElement.autoplay = true;
    }

    async stop() {
        if (this.reader) {
            await this.reader.cancel();
            this.reader = null;
            this.mediaSource.endOfStream();
            this.audioElement.pause();
        }
    }

    // setOnStart(callback) {
    //   this.onStart = callback;
    // }
    //
    // setOnStop(callback) {
    //   this.onStop = callback;
    // }
}


export async function EXPERIMENTAL_speakTextStream(text: string, voiceId?: string) {
    if (!(text?.trim())) return;

    try {
        const edgeResponse = await frontendFetchAPIElevenLabsSpeech(text, voiceId, false, true);

        // if (!liveAudioPlayer)
        const liveAudioPlayer = new AudioLivePlayer();
        // fire/forget
        void liveAudioPlayer.EXPERIMENTAL_playStream(edgeResponse);

    } catch (error) {
        // has happened once in months of testing, not sure what was the cause
        console.error('EXPERIMENTAL_speakTextStream:', error);
    }
}


async function frontendFetchAPIElevenLabsSpeech(text: string, voiceId: string | undefined, nonEnglish: boolean, streaming: boolean): Promise<Response> {
    // NOTE: hardcoded 1000 as a failsafe, since the API will take very long and consume lots of credits for longer texts
    const speechInput: SpeechInputSchema = {
        text: text.slice(0, 100),
        ...(voiceId && {voiceId}),
        nonEnglish,
        ...(streaming && {streaming: true, streamOptimization: 4}),
    };

    const response = await fetch('/api/elevenlabs/speech', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(speechInput),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || 'Unknown error');
    }

    return response;
}