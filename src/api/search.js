export default async function handler(req, res) {
  const keyword = req.query.q || "";
  const apiKey = process.env.VITE_NEWS_API_KEY;

  const url = `https://gnews.io/api/v4/search?apikey=${apiKey}&lang=en&max=5&q=${keyword}`;

  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json(data);
}
