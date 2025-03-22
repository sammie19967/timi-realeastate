"use client";
import Link from "next/link";
import Image from "next/image";
import "./showroom.css"; // Import CSS styles

const categories = [
  { name: "For sale", link: "/showroom/cars", image: "/car1.jpg" },
  { name: "For Hire", link: "/electronics", image: "/car2.jpg" },
  { name: "Import", link: "/real-estate", image: "/car3.jpg" },
];

export default function Showroom() {
  return (
    <main className="showroom-container">
      <h1>Welcome to Our <span className="highlight">Showroom</span></h1>
      <p>Explore our top categories and find the best Car deals available.</p>

      <div className="showroom-grid">
        {categories.map((category) => (
          <Link key={category.name} href={category.link} className="showroom-card">
            <Image src={category.image} alt={category.name} width={300} height={200} />
            <h2>{category.name}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
