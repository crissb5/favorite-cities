import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CityPage() {
  const router = useRouter();
  const { city } = router.query; // Get the city name from the URL

  const [cityData, setCityData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch city data and weather data when the city name changes
  useEffect(() => {
    if (!city) return; // If no city is available in the URL, do nothing

    const fetchCityData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch geocoding data
        const geocodeResponse = await axios.get(
          "https://geocoding-api.open-meteo.com/v1/search",
          {
            params: {
              name: city,
              language: "en",
            },
          }
        );
        const cityData = geocodeResponse.data.results[0]; // Assuming the first result is the correct city
        setCityData(cityData);

        // Fetch weather data using the coordinates from geocoding
        const { latitude, longitude } = cityData;
        const weatherResponse = await axios.get(
          "https://api.open-meteo.com/v1/forecast",
          {
            params: {
              latitude,
              longitude,
              current_weather: true, // We only need the current weather
            },
          }
        );
        setWeatherData(weatherResponse.data.current_weather);
      } catch (error) {
        setError("Error fetching city or weather data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityData();
  }, [city]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!cityData || !weatherData) return <p>City or weather data not found.</p>;

  return (
    <div className="container mt-5">
      <h1>
        {cityData.name}, {cityData.country}
      </h1>
      <p>
        <strong>Coordinates:</strong> {cityData.latitude}, {cityData.longitude}
      </p>
      <p>
        <strong>Region:</strong> {cityData.region || "Not available"}
      </p>
      <p>
        <strong>Timezone:</strong> {cityData.timezone || "Not available"}
      </p>

      <div className="weather-card p-3 mt-4 border rounded bg-light">
        <h5>Current Weather</h5>
        <p>
          <strong>Temperature:</strong> {weatherData.temperature}°C
        </p>
        <p>
          <strong>Weather Conditions:</strong> {weatherData.weathercode}
        </p>
        <p>
          <strong>Humidity:</strong> {weatherData.humidity}%
        </p>
        <p>
          <strong>Wind Speed:</strong> {weatherData.windspeed} km/h
        </p>
      </div>
    </div>
  );
}
