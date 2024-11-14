import fetch from "node-fetch";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "City ID is required" });
  }

  // Fetch city details by ID (you might fetch from cache or re-query the API)
  const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?geohash=${id}&key=YOUR_API_KEY`;

  try {
    const response = await fetch(geocodeUrl);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return res.status(404).json({ error: "City not found" });
    }

    const result = data.results[0];
    const cityData = {
      id: result.annotations.geohash,
      full_name: result.formatted,
      country: result.components.country,
      coordinates: result.geometry,
    };

    res.status(200).json(cityData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching city data" });
  }
}
