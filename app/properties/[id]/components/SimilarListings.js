// app/property/[id]/components/SimilarListings.js
import styles from './styles/SimilarListings.module.css';

export default function SimilarListings({ listings }) {
  return (
    <div className={styles.container}>
      <h2>Similar Listings</h2>
      <div className={styles.listings}>
        {listings.map((listing, index) => (
          <div key={index} className={styles.listing}>
            <img src={listing.image} alt={listing.title} className={styles.image} />
            <p className={styles.title}>{listing.title}</p>
            <p className={styles.price}>{listing.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}