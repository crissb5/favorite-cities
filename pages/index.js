import Link from "next/link";
import Footer from "../components/Footer"; // Import the Footer component

export default function HomePage() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header Section */}
      <header className="bg-primary text-white text-center py-5">
        <h1 className="display-4">Welcome to Favorite Cities</h1>
        <p className="lead">
          Discover, save, and explore your favorite cities worldwide!
        </p>
      </header>

      {/* Search Section */}
      <section className="text-center my-5">
        <h2>Start Your Journey</h2>
        <p>Enter a city name to explore its details, weather, and more!</p>
        <Link href="/search">Search for Cities</Link>
      </section>

      {/* Favorites Section */}
      <section className="bg-light text-center py-5">
        <h2>Your Favorite Cities</h2>
        <p>Keep track of cities you love and want to visit again!</p>
        <Link href="/favorites"></Link>
        View Favorites
      </section>
    </div>
  );
}
