// app/property/[id]/components/PropertyDetails.js
"use client"; 
import styles from './styles/PropertyDetails.module.css';
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaCopy, FaExclamationTriangle } from 'react-icons/fa';
import { useState } from 'react';

export default function PropertyDetails({ title, price, location, description, vendor, type }) {
  const [isCopied, setIsCopied] = useState(false);

  // Function to copy phone number to clipboard
  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(vendor.phone).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className={styles.container}>
      {/* Title */}
      <h1 className={styles.title}>{title}</h1>

      {/* Description */}
      <p className={styles.description}>{description}</p>

      {/* Price */}
      <div className={styles.detailItem}>
        <span className={styles.detailLabel}>Price:</span>
        <span className={styles.detailValue}>{price}</span>
      </div>

      {/* Property Type */}
      <div className={styles.detailItem}>
        <span className={styles.detailLabel}>Type:</span>
        <span className={styles.detailValue}>{type}</span>
      </div>

      {/* Location */}
      <div className={styles.detailItem}>
        <FaMapMarkerAlt className={styles.icon} />
        <span className={styles.detailValue}>{location}</span>
      </div>

      {/* Vendor Info */}
      <div className={styles.vendorInfo}>
        <h3>Contact Agent</h3>
        <div className={styles.vendorDetails}>
          <p>Name: {vendor.name}</p>
          <div className={styles.contactButtons}>
            <a href={`tel:${vendor.phone}`} className={styles.contactButton}>
              <FaPhone className={styles.buttonIcon} />
              Call
            </a>
            <a
              href={`https://wa.me/${vendor.phone.replace(/[^0-9]/g, '')}`}
              className={`${styles.contactButton} ${styles.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className={styles.buttonIcon} />
              WhatsApp
            </a>
            <a
              href={`mailto:${vendor.email}`}
              className={`${styles.contactButton} ${styles.email}`}
            >
              <FaEnvelope className={styles.buttonIcon} />
              Email
            </a>
            <button
              onClick={copyPhoneNumber}
              className={`${styles.contactButton} ${styles.copy}`}
            >
              <FaCopy className={styles.buttonIcon} />
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className={styles.buttons}>
        <button className={styles.scheduleButton}>
          <FaMapMarkerAlt className={styles.buttonIcon} />
          Schedule a Visit
        </button>
        <button className={styles.reportButton}>
          <FaExclamationTriangle className={styles.buttonIcon} />
          Report Abuse
        </button>
      </div>
    </div>
  );
}