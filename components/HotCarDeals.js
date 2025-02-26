"use client";
import Image from "next/image";
import "@/styles/hotcardeals.css";

const HotCarDeals = () => {
  // Sample car product data
  const cars = [
    {
      id: 1,
      image: "/car1.jpg",
      title: "2023 Tesla Model S",
      price: "$89,990",
    },
    {
      id: 2,
      image: "/car2.jpg",
      title: "2022 BMW X5",
      price: "$65,000",
    },
    {
      id: 3,
      image: "/car3.jpg",
      title: "2023 Toyota Camry",
      price: "$32,000",
    },
    {
      id: 4,
      image: "/car4.jpg",
      title: "2023 Ford Mustang",
      price: "$45,000",
    },
    {
      id: 5,
      image: "/car5.jpg",
      title: "2023 Audi Q7",
      price: "$75,000",
    },
    {
      id: 6,
      image: "/car6.jpg",
      title: "2023 Honda Civic",
      price: "$28,000",
    },
  ];

  return (
    <section className="hot-car-deals">
      {/* Title */}
      <h2 className="hot-car-title">Hot Car Deals</h2>

      {/* Car List */}
      <div className="car-list">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <div className="car-image-container">
              <Image
                src={car.image}
                alt={car.title}
                width={300}
                height={200}
                className="car-image"
              />
              <button className="view-button">View</button>
            </div>
            <h3 className="car-title">{car.title}</h3>
            <p className="car-price">{car.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HotCarDeals;