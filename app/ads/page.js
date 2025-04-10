"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Upload, Loader2 } from 'lucide-react';

const AdForm = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [locations, setLocations] = useState([]);
  const [subcounties, setSubcounties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    subcategory: 'Other',
    brand: '',
    condition: 'New',
    location: { 
      country: 'Kenya',
      county: '', 
      subcounty: '' 
    },
    seller: '6507e62b9a0beafeee8a7237',
    images: [],
  });

  // Fetch all categories and locations on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesRes, locationsRes] = await Promise.all([
          axios.get('/api/categories'),
          axios.get('/api/locations')
        ]);
        
        setCategories(categoriesRes.data);
        setLocations(locationsRes.data);
        
        console.log("Categories loaded:", categoriesRes.data);
      } catch (err) {
        console.error('Error fetching initial data:', err);
      }
    };
    fetchInitialData();
  }, []);

  // Fetch subcategories and brands when category changes
  useEffect(() => {
    const fetchSubcategoriesAndBrands = async () => {
      if (formData.category) {
        try {
          const categoryRes = await axios.get(`/api/categories?id=${formData.category}`);
          setSubcategories(categoryRes.data.subcategories || []);
          
          const brandsRes = await axios.get(`/api/brands?category=${formData.category}`);
          setBrands(brandsRes.data || []);
          
          console.log("Brands loaded:", brandsRes.data);
          
          setFormData(prev => ({
            ...prev,
            subcategory: 'Other',
            brand: ''
          }));
        } catch (err) {
          console.error('Error fetching subcategories/brands:', err);
          setSubcategories([]);
          setBrands([]);
        }
      } else {
        setSubcategories([]);
        setBrands([]);
      }
    };
    fetchSubcategoriesAndBrands();
  }, [formData.category]);

  // Update subcounties when county changes
  useEffect(() => {
    if (formData.location.county && locations.length > 0) {
      const selectedCounty = locations[0]?.counties.find(
        county => county.name === formData.location.county
      );
      
      if (selectedCounty) {
        setSubcounties(selectedCounty.subcounties || []);
      } else {
        setSubcounties([]);
      }
      
      setFormData(prev => ({
        ...prev,
        location: { ...prev.location, subcounty: '' }
      }));
    } else {
      setSubcounties([]);
    }
  }, [formData.location.county, locations]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      location: { ...prev.location, [name]: value }
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      alert('Maximum 10 images allowed');
      return;
    }
    
    setFormData(prev => ({ ...prev, images: files }));
    
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData(prev => ({ ...prev, images: newImages }));
    
    const newPreviews = [...previewImages];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formDataToSubmit = new FormData();
      
      const selectedCategory = categories.find(cat => cat._id === formData.category);
      const selectedBrand = brands.find(br => br._id === formData.brand);
      
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'images' && key !== 'location' && value) {
          formDataToSubmit.append(key, value);
        }
      });
      
      if (selectedCategory) {
        formDataToSubmit.append('categoryName', selectedCategory.name);
      }
      
      if (selectedBrand) {
        formDataToSubmit.append('brandName', selectedBrand.name);
      }
      
      formDataToSubmit.append('country', formData.location.country);
      formDataToSubmit.append('county', formData.location.county);
      formDataToSubmit.append('subcounty', formData.location.subcounty || '');
      
      formData.images.forEach(file => {
        formDataToSubmit.append('images', file);
      });
  
      console.log("Form data keys:", Array.from(formDataToSubmit.keys()));
  
      await axios.post('/api/ads', formDataToSubmit, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      alert('Ad created successfully!');
      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        subcategory: 'Other',
        brand: '',
        condition: 'New',
        location: { 
          country: 'Kenya',
          county: '', 
          subcounty: '' 
        },
        seller: '6507e62b9a0beafeee8a7237',
        images: [],
      });
      setPreviewImages([]);
    } catch (error) {
      console.error('Error creating ad:', error);
      alert(`Failed to create ad: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ad-form-container">
      <div className="ad-form-header">
        <h1>Create New Listing</h1>
        <p>Fill out the form below to list your item for sale</p>
      </div>

      <form onSubmit={handleSubmit} className="ad-form">
        {/* Basic Information Section */}
        <div className="form-section">
          <h2>Basic Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title">Title*</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Samsung Galaxy S21 Ultra"
                required
                maxLength={100}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price (KSh)*</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                min="0"
                step="100"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="condition">Condition*</label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                required
              >
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Refurbished">Refurbished</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">Description*</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide detailed description of your item"
                rows={5}
                required
                maxLength={1000}
              />
            </div>
          </div>
        </div>

        {/* Category & Brand Section */}
        <div className="form-section">
          <h2>Category & Brand</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="category">Category*</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {categories && categories.length > 0 ? (
                  categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>Loading categories...</option>
                )}
              </select>
              {categories.length === 0 && <div className="helper-text">Loading categories...</div>}
            </div>

            <div className="form-group">
              <label htmlFor="subcategory">Subcategory</label>
              <select
                id="subcategory"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                disabled={!formData.category || subcategories.length === 0}
              >
                <option value="Other">Other</option>
                {subcategories.map((sub, idx) => (
                  <option key={idx} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="brand">Brand</label>
              <select
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                disabled={!formData.category || brands.length === 0}
              >
                <option value="">{brands.length ? "Select brand" : "No brands"}</option>
                {brands && brands.length > 0 ? (
                  brands.map(brand => (
                    <option key={brand._id} value={brand._id}>
                      {brand.name}
                    </option>
                  ))
                ) : (
                  formData.category && <option value="" disabled>Loading brands...</option>
                )}
              </select>
              {formData.category && brands.length === 0 && <div className="helper-text">Loading brands...</div>}
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div className="form-section">
          <h2>Images</h2>
          <div className="form-group">
            <label htmlFor="images">Upload Photos (Max 10)*</label>
            <div className="file-upload-container">
              <label htmlFor="images" className="file-upload-label">
                <Upload size={24} />
                <span>Click to upload or drag and drop</span>
                <span className="file-upload-hint">JPG, PNG (Max 5MB each)</span>
              </label>
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleFileChange}
                multiple
                accept="image/*"
                className="file-upload-input"
                required
              />
            </div>

            {previewImages.length > 0 && (
              <div className="image-previews">
                {previewImages.map((preview, index) => (
                  <div key={index} className="image-preview">
                    <img src={preview} alt={`Preview ${index + 1}`} />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => removeImage(index)}
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Location Section */}
        <div className="form-section">
          <h2>Location</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="county">County*</label>
              <select
                id="county"
                name="county"
                value={formData.location.county}
                onChange={handleLocationChange}
                required
              >
                <option value="">Select county</option>
                {locations.length > 0 && locations[0]?.counties.map((county, idx) => (
                  <option key={idx} value={county.name}>{county.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="subcounty">Subcounty</label>
              <select
                id="subcounty"
                name="subcounty"
                value={formData.location.subcounty}
                onChange={handleLocationChange}
                disabled={!formData.location.county || subcounties.length === 0}
              >
                <option value="">{subcounties.length ? "Select subcounty" : "No subcounties"}</option>
                {subcounties.map((subcounty, idx) => (
                  <option key={idx} value={subcounty}>{subcounty}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Submit Section */}
        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isLoading || !formData.images.length}
          >
            {isLoading ? (
              <>
                <Loader2 className="spinner" size={18} />
                Processing...
              </>
            ) : (
              'Publish Listing'
            )}
          </button>
          <p className="form-note">
            By submitting, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </form>

      <style jsx>{`
        .ad-form-container {
          font-family: 'Poppins', sans-serif;
          max-width: 800px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: var(--color-background);
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          color: var(--color-text);
        }

        .ad-form-header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .ad-form-header h1 {
          font-size: 2rem;
          font-weight: 600;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }

        .ad-form-header p {
          color: var(--color-text-light);
          font-size: 1rem;
        }

        .ad-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .form-section {
          background-color: var(--color-background);
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .form-section h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-primary);
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        label {
          font-weight: 500;
          color: var(--color-text);
          font-size: 0.875rem;
        }

        input, select, textarea {
          padding: 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-family: inherit;
          font-size: 0.875rem;
          background-color: var(--color-background);
          color: var(--color-text);
          transition: border-color 0.2s;
        }

        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 2px rgba(30, 58, 138, 0.1);
        }

        textarea {
          resize: vertical;
          min-height: 100px;
        }

        select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%231e3a8a' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 16px;
        }

        .helper-text {
          font-size: 0.75rem;
          color: var(--color-text-light);
          margin-top: 0.25rem;
        }

        /* File Upload Styles */
        .file-upload-container {
          border: 2px dashed #e5e7eb;
          border-radius: 8px;
          padding: 2rem;
          text-align: center;
          transition: all 0.2s;
          background-color: var(--color-background);
        }

        .file-upload-container:hover {
          border-color: var(--color-primary);
        }

        .file-upload-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          color: var(--color-text-light);
        }

        .file-upload-label svg {
          color: var(--color-primary);
        }

        .file-upload-hint {
          font-size: 0.75rem;
          color: var(--color-text-light);
        }

        .file-upload-input {
          display: none;
        }

        /* Image Previews */
        .image-previews {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .image-preview {
          position: relative;
          height: 100px;
          border-radius: 6px;
          overflow: hidden;
        }

        .image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .remove-image-btn {
          position: absolute;
          top: 0.25rem;
          right: 0.25rem;
          width: 1.5rem;
          height: 1.5rem;
          background-color: var(--color-secondary);
          color: white;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 0.875rem;
          padding: 0;
          line-height: 1;
        }

        /* Form Actions */
        .form-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .submit-btn {
          background-color: var(--color-primary);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.75rem 1.5rem;
          font-weight: 500;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .submit-btn:hover:not(:disabled) {
          background-color: #1c3d8b;
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .form-note {
          font-size: 0.75rem;
          color: var(--color-text-light);
          text-align: center;
          max-width: 400px;
        }
      `}</style>
    </div>
  );
};

export default AdForm;