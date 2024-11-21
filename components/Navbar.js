import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "20px", borderBottom: "1px solid #ccc" }}>
      <Link href="/" passHref style={{ margin: "0 10px" }}>
        Home
      </Link>
      <Link href="/search" passHref style={{ margin: "0 10px" }}>
        Search
      </Link>
      <Link href="/cities/[city]" passHref style={{ margin: "0 10px" }}>
        City
      </Link>
      <Link href="/favorites" passHref style={{ margin: "0 10px" }}>
        Favorites
      </Link>
    </nav>
  );
}
