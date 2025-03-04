import styles from './styles/SimilarListings.module.css';
export default function SimilarListings({ listings = [] }) {  // Default to an empty array
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Similar Listings</h2>
      <div className={styles.listingsGrid}>
        {listings.length > 0 ? (
          listings.map((listing, index) => (
            <div key={index} className={styles.listingCard}>
              <img
                src={listing.image}
                alt={listing.title}
                className={styles.listingImage}
              />
              <div className={styles.listingDetails}>
                <h3 className={styles.listingTitle}>{listing.title}</h3>
                <p className={styles.listingPrice}>{listing.price}</p>
                <Link href={`/properties/${listing.id}`} className={styles.viewDetailsButton}>
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noListings}>No similar listings available.</p>
        )}
git       </div>
    </div>
  );
}
