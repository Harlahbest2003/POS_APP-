import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/products', formData);
            console.log('Product saved:', response.data);
        } catch (err) {
            console.error('Error saving product:', err.response ? err.response.data : err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Image URL</label>
                <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProductForm;
