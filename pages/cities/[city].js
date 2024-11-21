import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CityPage() {
  const router = useRouter();
  const { city } = router.query; // Get the city name from the URL

  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchCityData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://geocoding-api.open-meteo.com/v1/search",
          {
            params: {
              name: city,
              language: "en",
            },
          }
        );
        setCityData(response.data.results[0]); // Assuming the first result is the correct city
      } catch (error) {
        setError("Error fetching city data");
        console.error("Error fetching city data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityData();
  }, [city]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!cityData) return <p>City not found.</p>;

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
      {/* You can add more information like weather, population, etc. */}
    </div>
  );
}
