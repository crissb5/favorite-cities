import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN"; // Replace with your actual Mapbox API token

export default function CityPage() {
  const [cityData, setCityData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const mapContainer = useRef(null); // Ref for the map container
  const router = useRouter();
  const { id } = router.query; // Get city ID from URL parameter

  useEffect(() => {
    console.log("City ID from URL:", id); // Check what city is passed
    if (!id) return;

    const fetchCityData = async () => {
      try {
        console.log("Fetching data for:", id); // Ensure city name is correct
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            id
          )}`
        );
        const data = await response.json();
        console.log("API Response:", data); // Log the full API response

        if (data.results && data.results.length > 0) {
          const cityInfo = data.results[0];
          setCityData(cityInfo);

          // Fetch weather data
          const { latitude, longitude } = cityInfo;
          const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
          );
          const weatherData = await weatherResponse.json();
          setWeatherData(weatherData.current_weather);
        } else {
          console.error("No results found for this city.");
          setCityData(null);
        }
      } catch (error) {
        console.error("Error fetching city or weather data:", error);
        setCityData(null);
      }
    };

    fetchCityData();
  }, [id]);

  // Initialize Mapbox map once cityData is available
  useEffect(() => {
    if (cityData && mapContainer.current) {
      const { latitude, longitude } = cityData;

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [longitude, latitude],
        zoom: 10,
      });

      // Add a marker at the city location
      new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

      // Cleanup on component unmount
      return () => map.remove();
    }
  }, [cityData]);

  // Render loading or error state
  if (!cityData) {
    return (
      <p>
        City data could not be loaded. Please check the city name and try again.
      </p>
    );
  }

  if (!weatherData) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div>
      <h1>{cityData.name}</h1>
      <p>Country: {cityData.country}</p>
      <p>
        Coordinates: {cityData.latitude}, {cityData.longitude}
      </p>

      <h2>Weather Information</h2>
      <p>Temperature: {weatherData.temperature}°C</p>
      <p>Wind Speed: {weatherData.windspeed} km/h</p>
      <p>Weather: {weatherData.weathercode}</p>

      <h2>Map</h2>
      <div ref={mapContainer} style={{ width: "100%", height: "400px" }} />
    </div>
  );
}
