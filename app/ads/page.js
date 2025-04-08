"use client";
import { useEffect, useState } from 'react';
import "@/styles/adForm.css"; // Assuming you have a CSS file for styling
import axios from 'axios';

const AdForm = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    brand: '',
    condition: 'New',
    location: { county: '', subcounty: '' },
    seller: '',  // Assume we’ll populate this dynamically
    images: [],   // For storing the uploaded images
  });

  useEffect(() => {
    // Fetch categories from the database
    axios.get('/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    // Fetch subcategories and brands when a category is selected
    if (formData.category) {
      axios.get(`/api/category/${formData.category}`)
        .then(res => {
          setSubcategories(res.data.subcategories);  // Assuming this is the structure of the response
          setBrands(res.data.brands);
        })
        .catch(err => console.error(err));
    }
  }, [formData.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({ ...prevState, images: e.target.files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSubmit = new FormData();
    // Append form data fields to FormData
    Object.keys(formData).forEach((key) => {
      if (key !== 'images') {
        formDataToSubmit.append(key, formData[key]);
      }
    });
    // Append images
    for (let i = 0; i < formData.images.length; i++) {
      formDataToSubmit.append('images', formData.images[i]);
    }

    try {
      await axios.post('/api/ads', formDataToSubmit, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Ad created successfully');
    } catch (error) {
      console.error('Error creating ad:', error);
      alert('Error creating ad');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />

      <select name="category" value={formData.category} onChange={handleChange} required>
        <option value="">Select Category</option>
        {categories.map(category => (
          <option key={category._id} value={category._id}>{category.name}</option>
        ))}
      </select>

      <select name="subcategory" value={formData.subcategory} onChange={handleChange} required>
        <option value="">Select Subcategory</option>
        {subcategories.map((sub, idx) => (
          <option key={idx} value={sub}>{sub}</option>
        ))}
      </select>

      <select name="brand" value={formData.brand} onChange={handleChange}>
        <option value="">Select Brand</option>
        {brands.map(brand => (
          <option key={brand._id} value={brand._id}>{brand.name}</option>
        ))}
      </select>

      <select name="condition" value={formData.condition} onChange={handleChange}>
        <option value="New">New</option>
        <option value="Used">Used</option>
        <option value="Refurbished">Refurbished</option>
      </select>

      <input type="file" name="images" onChange={handleFileChange} multiple required />
      
      <input type="submit" value="Submit Ad" />
    </form>
  );
};

export default AdForm;
