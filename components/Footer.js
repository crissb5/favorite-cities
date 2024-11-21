export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <p>&copy; 2024 Favorite Cities App. All rights reserved.</p>
      <div>
        <a href="/about" className="text-white mx-3">
          About Us
        </a>
        <a href="/contact" className="text-white mx-3">
          Contact
        </a>
      </div>
    </footer>
  );
}
