import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        {
          params: {
            name: query,
            language: "en",
            count: 5, // Optional: Limit the number of results
          },
        }
      );

      setResults(response.data.results); // Store the results
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching geocoding data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Search for a City</h1>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block mt-3">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <ul className="list-group mt-4">
        {results.map((city, index) => (
          <li key={index} className="list-group-item">
            <Link href={`/cities/${encodeURIComponent(city.name)}`}>
              {city.name}, {city.country}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
