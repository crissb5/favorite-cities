import { useState } from "react";
import { useRouter } from "next/router";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      // Fetch coordinates from Open-Meteo Geocoding API
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          searchTerm
        )}`
      );
      const data = await response.json();

      // Set the results, or an empty array if there are no matches
      setResults(data.results || []);
    } catch (error) {
      console.error("Error fetching city data:", error);
      setResults([]);
    }
  };

  const handleCityClick = (cityName) => {
    router.push(`/city/${encodeURIComponent(cityName)}`);
  };

  return (
    <div>
      <h1>Search for a City</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>

      {results.length > 0 ? (
        <ul>
          {results.map((city) => (
            <li key={city.id}>
              <a
                onClick={() => handleCityClick(city.id)}
                style={{ cursor: "pointer" }}
              >
                {city.name} - {city.country}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
