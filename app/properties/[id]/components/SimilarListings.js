// app/properties/[id]/components/PropertyImages.js
"use client";
import { useState } from 'react';
import styles from './styles/PropertyImages.module.css';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function PropertyImages({ images }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <div className={styles.container}>
      {/* Large Image Display */}
      <div className={styles.largeImageContainer} onClick={() => setIsLightboxOpen(true)}>
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

      {/* Lightbox */}
      <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        slides={images.map((image) => ({ src: image }))}
      />
    </div>
  );
}