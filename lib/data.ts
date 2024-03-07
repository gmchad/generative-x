const RENDER_ENDPOINT = "https://spc-openai-hackathon-backend.onrender.com/";

export async function getWeatherApi(location: string) {
  const endpoint = `${RENDER_ENDPOINT}/text_to_weather?location=${encodeURIComponent(location)}`;
  const response = await fetch(endpoint);
  return response.json();
}

export async function getStockApi(ticker: string) {
  const endpoint = `${RENDER_ENDPOINT}/text_to_finance_data?ticker=${encodeURIComponent(ticker)}`;
  const response = await fetch(endpoint);
  return response.json();
}

export async function getPoliticalApi(content: string) {
  const endpoint = `${RENDER_ENDPOINT}/text_to_politics?text=${encodeURIComponent(content)}`;
  const response = await fetch(endpoint);
  return response.json();
}

export async function getClothingApi(content: string) {
  const endpoint = `${RENDER_ENDPOINT}/get_clothing?url=${encodeURIComponent(content)}`;
  const response = await fetch(endpoint);
  return response.json();
}

export async function getReplyApi(content: string, adjectives: string) {
  const endpoint = `${RENDER_ENDPOINT}/question_replies?text=${encodeURIComponent(content)}&adjective=${encodeURIComponent(adjectives)}`;
  const response = await fetch(endpoint);
  return response.json();
}
