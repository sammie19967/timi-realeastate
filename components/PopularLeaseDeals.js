"use client";
import Image from "next/image";
import "@/styles/popularleasedeals.css"

const PopularLeaseDeals = () => {
  // Sample lease/rent product data
  const products = [
    {
      id: 1,
      image: "/lease1.jpg",
      title: "Downtown Apartment",
      price: "$2,500/month",
    },
    {
      id: 2,
      image: "/lease2.jpg",
      title: "Suburban House",
      price: "$1,800/month",
    },
    {
      id: 3,
      image: "/lease3.jpg",
      title: "Studio Loft",
      price: "$1,200/month",
    },
    {
      id: 4,
      image: "/lease4.jpg",
      title: "Luxury Condo",
      price: "$3,000/month",
    },
    {
      id: 5,
      image: "/lease5.jpg",
      title: "Beachfront Villa",
      price: "$4,500/month",
    },
    {
      id: 6,
      image: "/lease6.jpg",
      title: "Mountain Retreat",
      price: "$2,000/month",
    },
  ];

  return (
    <section className="popular-lease-deals">
      {/* Title */}
      <h2 className="popular-lease-title">Popular Lease/Rent Deals</h2>

      {/* Product List */}
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={200}
                className="product-image"
              />
              <button className="view-button">View</button>
            </div>
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularLeaseDeals;