// app/properties/[id]/page.js
import PropertyImages from './components/PropertyImages';
import PropertyDetails from './components/PropertyDetails';
import Reviews from './components/Reviews';
import styles from './page.module.css';
import SimilarListings from './components/SimilarListings';

export default async function PropertyPage({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`);
    
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const property = await res.json();

    if (!property || property.error) {
      return <p>Property not found</p>;
    }

    return (
      <div className={styles.pageContainer}>
        <div className={styles.topSection}>
          <div className={styles.imageSection}>
            <PropertyImages images={property.images.map(img => img.url)} />
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
        <div className={styles.reviewsSection}>
          <Reviews reviews={property.reviews} />
        </div>
        <SimilarListings />
      </div>
    );
  } catch (error) {
    console.error('Fetch error:', error);
    return <p>Failed to load property data</p>;
  }
}
