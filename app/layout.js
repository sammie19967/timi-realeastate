import Navbar from "../components/navbar";
import "./globals.css";
import Footer from "../components/Footer";

export const metadata = {
  title: "Timi Properties Limited",
  description: "Real Estate and Showroom Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
