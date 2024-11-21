export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4">
      <p>&copy; 2024 Favorite Cities App. All rights reserved.</p>
      <p>
        Built with ❤️ using{" "}
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white"
        >
          Next.js
        </a>{" "}
        &amp;{" "}
        <a
          href="https://getbootstrap.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white"
        >
          Bootstrap
        </a>
      </p>
    </footer>
  );
}
