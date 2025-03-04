// app/properties/[id]/page.js
import PropertyImages from './components/PropertyImages';
import PropertyDetails from './components/PropertyDetails';
import Reviews from './components/Reviews';
import styles from './page.module.css';
import SimilarListings from './components/SimilarListings';

export default async function PropertyPage({ params }) {
  const { id } = await params;

  // Example property data
  const property = {
    id: id,
    title: "3-Bedroom Apartment in Downtown",
    price: "$500,000",
    location: "123 Main St, New York, NY",
    description: "Spacious apartment with modern amenities, perfect for families or professionals.",
    vendor: {
      name: "John Doe",
      phone: "+1 (123) 456-7890",
      email: "john.doe@example.com",
    },
    type: "Cash Sale",
    images: [
      "/lease1.jpg",
      "/lease2.jpg",
      "/lease3.jpg",
      "/lease4.jpg",
    ],
    reviews: [
      { text: "Great property! Loved the modern design.", author: "John Doe", rating: 4 },
      { text: "Perfect location and spacious rooms.", author: "Jane Smith", rating: 5 },
    ],
  };

  return (
    <div className={styles.pageContainer}>
      {/* Top Section: Images + Details */}
      <div className={styles.topSection}>
        <div className={styles.imageSection}>
          <PropertyImages images={property.images} />
        </div>
        <div className={styles.detailsSection}>
          <PropertyDetails
            title={property.title}
            price={property.price}
            location={property.location}
            description={property.description}
            vendor={property.vendor}
            type={property.type}
          />
        </div>
      </div>

      {/* Bottom Section: Reviews */}
      <div className={styles.reviewsSection}>
        <Reviews reviews={property.reviews} />
      </div>
      <SimilarListings />
    </div>
  );
}