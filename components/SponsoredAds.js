"use client";
import Image from "next/image";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import "@/styles/hotdeals.css";

const SponsoredAds = () => {
  const router = useRouter();
  const adsListRef = useRef(null);

  const ads = [
    {
      id: 1,
      image: "/mansion2.jpg",
      title: "Luxury Apartment",
      price: "$500,000",
      location: "Nairobi, Kilimani"
    },
    {
      id: 2,
      image: "/mansion.jpg",
      title: "Modern Villa",
      price: "$1,200,000",
      location: "Mombasa, Nyali"
    },
    {
      id: 3,
      image: "/hotel.jpg",
      title: "Cozy Cottage",
      price: "$300,000",
      location: "Naivasha"
    },
    {
      id: 4,
      image: "/mansion3.jpg",
      title: "Penthouse Suite",
      price: "$800,000",
      location: "Nairobi, Westlands"
    },
    {
      id: 5,
      image: "/hotel.jpg",
      title: "Beach House",
      price: "$950,000",
      location: "Diani"
    },
    {
      id: 6,
      image: "/mansion.jpg",
      title: "Mountain Cabin",
      price: "$400,000",
      location: "Nanyuki"
    },
  ];

  const scrollLeft = () => {
    if (adsListRef.current) {
      adsListRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (adsListRef.current) {
      adsListRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClick = (slug) => {
    router.push(`/products/${slug}`);
  };

  return (
    <section className="sponsored-ads">
      <div className="ads-header">
        <h2 className="ads-title">Sponsored Ads</h2>
        <div className="ads-navigation">
          <button className="nav-chevron left" onClick={scrollLeft}>
            &lsaquo;
          </button>
          <button className="nav-chevron right" onClick={scrollRight}>
            &rsaquo;
          </button>
        </div>
      </div>

      <div className="ads-list" ref={adsListRef}>
        {ads.map((ad) => (
          <div 
            key={ad.id} 
            className="ad-card"
            onClick={() => handleCardClick(ad.slug)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleCardClick(ad.slug)}
          >
            <div className="ad-image-container">
              <Image
                src={ad.image}
                alt={ad.title}
                width={280}
                height={180}
                className="ad-image"
                placeholder="blur"
                blurDataURL="/placeholder.jpg"
              />
              <span className="sponsored-badge">Sponsored</span>
            </div>
            <div className="ad-details">
              <h3 className="ad-title">{ad.title}</h3>
              <p className="ad-price">{ad.price}</p>
              <p className="ad-location">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {ad.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SponsoredAds;