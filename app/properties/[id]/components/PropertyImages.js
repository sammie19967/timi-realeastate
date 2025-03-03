// app/property/[id]/components/PropertyImages.js
"use client"; // Required for interactivity (e.g., useState)
import { useState } from 'react';
import styles from './styles/PropertyImages.module.css';

export default function PropertyImages({ images }) {
  const [selectedImage, setSelectedImage] = useState(images[0]); // Default to the first image

  return (
    <div className={styles.container}>
      {/* Large Image Display */}
      <div className={styles.largeImageContainer}>
        <img
          src={selectedImage}
          alt="Selected Property"
          className={styles.largeImage}
        />
      </div>

      {/* Thumbnails */}
      <div className={styles.thumbnails}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Property Thumbnail ${index + 1}`}
            className={`${styles.thumbnail} ${
              selectedImage === image ? styles.selected : ''
            }`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
}