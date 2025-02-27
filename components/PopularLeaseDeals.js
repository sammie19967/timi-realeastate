"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "@/styles/popularleasedeals.css";

const PopularLeaseDeals = () => {
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

  const [scrollPosition, setScrollPosition] = useState(0);
  const productListRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);

  const scrollLeft = () => {
    if (productListRef.current) {
      productListRef.current.scrollBy({
        left: -300, // Adjust scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (productListRef.current) {
      productListRef.current.scrollBy({
        left: 300, // Adjust scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  const startAutoScroll = () => {
    autoScrollIntervalRef.current = setInterval(() => {
      if (productListRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = productListRef.current;
        if (scrollLeft + clientWidth >= scrollWidth) {
          // If at the end, scroll back to the start
          productListRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Otherwise, scroll right
          scrollRight();
        }
      }
    }, 5000); // Adjust auto-scroll interval as needed
  };

  const stopAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  return (
    <section className="popular-lease-deals">
      {/* Title */}
      <h2 className="popular-lease-deals__title">Popular Lease/Rent Deals</h2>

      {/* Product List */}
      <div
        className="popular-lease-deals__product-list"
        ref={productListRef}
        onMouseEnter={stopAutoScroll}
        onMouseLeave={startAutoScroll}
      >
        {products.map((product) => (
          <div key={product.id} className="popular-lease-deals__product-card">
            <div className="popular-lease-deals__image-container">
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={200}
                className="popular-lease-deals__image"
                placeholder="blur"
                blurDataURL="/placeholder.jpg" // Add a placeholder image for blur effect
              />
              <button className="popular-lease-deals__view-button">View</button>
            </div>
            <h3 className="popular-lease-deals__title">{product.title}</h3>
            <p className="popular-lease-deals__price">{product.price}</p>
          </div>
        ))}
      </div>

      {/* Navigation Chevrons */}
      <button
        className="popular-lease-deals__chevron popular-lease-deals__chevron--left"
        onClick={scrollLeft}
      >
        &#10094;
      </button>
      <button
        className="popular-lease-deals__chevron popular-lease-deals__chevron--right"
        onClick={scrollRight}
      >
        &#10095;
      </button>
    </section>
  );
};

export default PopularLeaseDeals;