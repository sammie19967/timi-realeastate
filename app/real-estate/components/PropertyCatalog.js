"use client";
import Image from "next/image";
import Link from "next/link";
import "@/styles/propertycatalog.css";

const PropertyCatalog = () => {
  // Sample property data
  const properties = [
    {
      id: 1,
      image: "/mansion.jpg",
      title: "Luxury Apartment in Downtown",
      saleType: "Rent",
      location: "New York, NY",
      price: "$2,500/month",
    },
    {
      id: 2,
      image: "/mansion2.jpg",
      title: "Modern Villa with Pool",
      saleType: "Cash Sale",
      location: "Los Angeles, CA",
      price: "$1,200,000",
    },
    {
      id: 3,
      image: "/mansion3.jpg",
      title: "Cozy Cottage by the Lake",
      saleType: "Lease",
      location: "Seattle, WA",
      price: "$1,800/month",
    },
    {
      id: 4,
      image: "/lease4.jpg",
      title: "Penthouse Suite with Skyline View",
      saleType: "Rent",
      location: "Chicago, IL",
      price: "$4,000/month",
    },
    {
      id: 5,
      image: "/lease5.jpg",
      title: "Beachfront Villa",
      saleType: "Cash Sale",
      location: "Miami, FL",
      price: "$2,500,000",
    },
    {
      id: 6,
      image: "/lease6.jpg",
      title: "Mountain Cabin Retreat",
      saleType: "Lease",
      location: "Denver, CO",
      price: "$1,200/month",
    },
  ];

  return (
    <section className="property-catalog">
      <div className="property-catalog__header">
        <h2 className="property-catalog__title">Property Catalog</h2>
        <p className="property-catalog__subtitle">
          Explore our wide range of properties available for rent, lease, or
          cash sale.
        </p>
      </div>

      <div className="property-catalog__grid">
        {properties.map((property) => (
          <div key={property.id} className="property-card">
            <div className="property-card__image-container">
              <Image
                src={property.image}
                alt={property.title}
                width={400}
                height={300}
                className="property-card__image"
                placeholder="blur"
                blurDataURL="/placeholder.jpeg" // Add a placeholder image for blur effect
              />
              <div className="property-card__sale-type">
                {property.saleType}
              </div>
              <Link
                href={`/properties/${property.id}`} // Redirect to product view page
                className="property-card__view-button"
              >
                View Property
              </Link>
            </div>
            <div className="property-card__details">
              <h3 className="property-card__title">{property.title}</h3>
              <p className="property-card__location">{property.location}</p>
              <p className="property-card__price">{property.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertyCatalog;