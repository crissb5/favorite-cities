import fetch from "node-fetch";

export default async function handler(req, res) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City name is required" });
  }

  // Replace with your geocoding API and key
  const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search`;

  try {
    const response = await fetch(geocodeUrl);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return res.status(404).json({ error: "No results found" });
    }

    const results = data.results.map((result) => ({
      id: result.annotations.geohash, // unique identifier for city page routing
      full_name: result.formatted,
      country: result.components.country,
      coordinates: result.geometry,
    }));

    res.status(200).json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data from geocoding API" });
  }
}
