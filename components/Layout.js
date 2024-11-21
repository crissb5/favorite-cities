import Navbar from "./Navbar.js";
import Footer from "./Footer.js";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "20px" }}>{children}</main>
      <Footer />
    </div>
  );
}
