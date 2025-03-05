import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import "./globals.css";

export const metadata = {
  title: "Timi Properties Limited",
  description: "Real Estate and Showroom Services",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {/* Navbar (Contains Sign In/Sign Up) */}
          <Navbar />

          {/* Main Content */}
          <main>{children}</main>

          {/* Footer */}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
