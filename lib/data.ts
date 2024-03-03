const RENDER_ENDPOINT = "https://spc-openai-hackathon-backend.onrender.com/";

export async function getWeatherApi(location: string) {
	const endpoint = `${RENDER_ENDPOINT}/text_to_weather?location=${encodeURIComponent(location)}`;
	const response = await fetch(endpoint);
	return response.json();
}