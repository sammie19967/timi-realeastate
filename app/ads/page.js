"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Upload, Loader2 } from 'lucide-react';

const AdForm = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    brand: '',
    condition: 'New',
    location: { county: '', subcounty: '' },
    seller: '',
    images: [],
  });

  // Fetch all categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/api/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories and brands when category changes
  useEffect(() => {
    const fetchSubcategoriesAndBrands = async () => {
      if (formData.category) {
        try {
          const res = await axios.get(`/api/categories?id=${formData.category}`);
          setSubcategories(res.data.subcategories || []);
          setBrands(res.data.brands || []);
          
          // Reset dependent fields when category changes
          setFormData(prev => ({
            ...prev,
            subcategory: '',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      alert('Maximum 10 images allowed');
      return;
    }
    
    setFormData(prev => ({ ...prev, images: files }));
    
    // Create image previews
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData(prev => ({ ...prev, images: newImages }));
    
    const newPreviews = [...previewImages];
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formDataToSubmit = new FormData();
      
      // Append all form data except images
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'images' && value) {
          if (key === 'location') {
            formDataToSubmit.append('county', value.county);
            formDataToSubmit.append('subcounty', value.subcounty || '');
          } else {
            formDataToSubmit.append(key, value);
          }
        }
      });
      
      // Append images
      formData.images.forEach(file => {
        formDataToSubmit.append('images', file);
      });

      await axios.post('/api/ads', formDataToSubmit, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      alert('Ad created successfully!');
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        subcategory: '',
        brand: '',
        condition: 'New',
        location: { county: '', subcounty: '' },
        seller: '',
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
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
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
                disabled={!formData.category || subcategories.length === 0}
              >
                <option value="">{subcategories.length ? "Select subcategory" : "No subcategories"}</option>
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
                {brands.map(brand => (
                  <option key={brand._id} value={brand._id}>{brand.name}</option>
                ))}
              </select>
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
              <input
                type="text"
                id="county"
                name="county"
                value={formData.location.county}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  location: { ...prev.location, county: e.target.value }
                }))}
                placeholder="Enter county"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subcounty">Subcounty</label>
              <input
                type="text"
                id="subcounty"
                name="subcounty"
                value={formData.location.subcounty}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  location: { ...prev.location, subcounty: e.target.value }
                }))}
                placeholder="Enter subcounty"
              />
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
    </div>
  );
};

export default AdForm;