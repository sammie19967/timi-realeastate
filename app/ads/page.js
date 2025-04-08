"use client";

import { useState, useEffect } from "react";
import "@/styles/adForm.css";
import { categories, locations, brands } from "@/constants/data";

const AdForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    status: "new",
    location: "",
    subcounty: "",
    category: "",
    subcategory: "",
    brand: "",
    images: [], // URLs of uploaded images
    advertiser: { name: "", email: "", phone: "" },
    packageType: "free",
  });

  const [subcategories, setSubcategories] = useState([]);
  const [counties, setCounties] = useState([]);
  const [subcounties, setSubcounties] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Populate counties on component mount
  useEffect(() => {
    const allCounties = locations.flatMap((loc) => loc.counties);
    setCounties(allCounties);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split(".");
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: value,
      },
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find((cat) => cat.name === e.target.value);
    setFormData((prev) => ({
      ...prev,
      category: selectedCategory.name,
      subcategory: "", // Reset subcategory when category changes
    }));
    setSubcategories(selectedCategory.subcategories || []);
    setAvailableBrands(brands[selectedCategory.name] || []);
  };

  const handleCountyChange = (e) => {
    const selectedCounty = counties.find((county) => county.name === e.target.value);
    setFormData((prev) => ({
      ...prev,
      location: selectedCounty.name,
      subcounty: "", // Reset subcounty when county changes
    }));
    setSubcounties(selectedCounty.subcounties || []);
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("file", file); // Append each file to the FormData object
    });

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...data.urls], // Append uploaded file URLs
        }));
        alert("Files uploaded successfully!");
      } else {
        const error = await response.json();
        alert(`Error uploading files: ${error.error}`);
      }
    } catch (err) {
      console.error("Error uploading files:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/ads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Ad created successfully!");
        console.log(data);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="ad-form-container">
      <h2>Create New Listing</h2>
      <form onSubmit={handleSubmit} className="ad-form">
        {/* Basic Information */}
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-group">
            <label htmlFor="title">Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter listing title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your item in detail"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price (KSh)*</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Condition*</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location & Category */}
        <div className="form-section">
          <h3>Location & Category</h3>
          <div className="form-group">
            <label htmlFor="location">County*</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleCountyChange}
              required
            >
              <option>Select county</option>
              {counties.map((county) => (
                <option key={county.name} value={county.name}>
                  {county.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="subcounty">Subcounty*</label>
            <select
              id="subcounty"
              name="subcounty"
              value={formData.subcounty}
              onChange={handleChange}
              required
            >
              <option>Select subcounty</option>
              {subcounties.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category*</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                required
              >
                <option>Select category</option>
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="subcategory">Subcategory</label>
              <select
                id="subcategory"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
              >
                <option>Select subcategory</option>
                {subcategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="brand">Brand</label>
            <select
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            >
              <option>Select brand</option>
              {availableBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Images */}
        <div className="form-section">
          <h3>Images</h3>
          <div className="form-group">
            <label htmlFor="images">Upload Images*</label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleFileUpload}
              accept="image/*"
              className="file-input"
            />
            {uploading && <p>Uploading files...</p>}
            <div className="file-hint">Upload up to 10 images (max 5MB each)</div>
          </div>
        </div>

        {/* Advertiser Information */}
        <div className="form-section">
          <h3>Advertiser Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="advertiser.name">Your Name*</label>
              <input
                type="text"
                id="advertiser.name"
                name="advertiser.name"
                placeholder="Enter your name"
                value={formData.advertiser.name}
                onChange={handleNestedChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="advertiser.email">Email*</label>
              <input
                type="email"
                id="advertiser.email"
                name="advertiser.email"
                placeholder="Enter your email"
                value={formData.advertiser.email}
                onChange={handleNestedChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="advertiser.phone">Phone Number*</label>
            <input
              type="tel"
              id="advertiser.phone"
              name="advertiser.phone"
              placeholder="Enter your phone number"
              value={formData.advertiser.phone}
              onChange={handleNestedChange}
              required
            />
          </div>
        </div>

        {/* Package Type */}
        <div className="form-section">
          <h3>Package Type</h3>
          <div className="form-group">
            <label htmlFor="packageType">Select Package*</label>
            <select
              id="packageType"
              name="packageType"
              value={formData.packageType}
              onChange={handleChange}
            >
              <option value="free">Free Listing</option>
              <option value="premium">Premium Listing</option>
            </select>
            <div className="package-description">
              {formData.packageType === "free" ? (
                <p>Basic listing with standard visibility</p>
              ) : (
                <p>Featured listing with priority placement and more visibility</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" className="submit-button" disabled={uploading}>
            {uploading ? "Uploading..." : "Create Listing"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdForm;