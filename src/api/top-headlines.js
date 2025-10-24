export default async function handler(req, res) {
  const category = req.query.category || "general";
  const apiKey = process.env.VITE_NEWS_API_KEY;

  const url = `https://gnews.io/api/v4/top-headlines?apikey=${apiKey}&lang=en&max=5&category=${category}`;

  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json(data);
}
