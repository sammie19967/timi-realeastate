"use client";
import Image from "next/image";
import "@/styles/hotdeals.css"

const HotDeals = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      image: "/mansion2.jpg",
      title: "Luxury Apartment",
      price: "$500,000",
    },
    {
      id: 2,
      image: "/mansion.jpg",
      title: "Modern Villa",
      price: "$1,200,000",
    },
    {
      id: 3,
      image: "/hotel.jpg",
      title: "Cozy Cottage",
      price: "$300,000",
    },
    {
      id: 4,
      image: "/mansion3.jpg",
      title: "Penthouse Suite",
      price: "$800,000",
    },
    {
      id: 5,
      image: "/hotel.jpg",
      title: "Beach House",
      price: "$950,000",
    },
    {
      id: 6,
      image: "/mansion.jpg",
      title: "Mountain Cabin",
      price: "$400,000",
    },
  ];

  return (
    <section className="hot-deals">
      {/* Title */}
      <h2 className="hot-deals-title">Hot Deals</h2>

      {/* Product List */}
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={200}
              className="product-image"
            />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HotDeals;