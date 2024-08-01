const cloudinary = require('../config/cloudinary');
const Product = require('../models/Product');

// Create a new product
const createProduct = async (req, res) => {
  const { name, price, description } = req.body;
  let imageUrl = '';

  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload_stream({ folder: 'products' }, (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ message: 'Error uploading image', error });
        }
        imageUrl = result.secure_url;
      });
      req.file.stream.pipe(result);
    } catch (uploadError) {
      console.error('Error uploading image to Cloudinary:', uploadError);
      return res.status(500).json({ message: 'Error uploading image', error: uploadError });
    }
  }

  if (!name || !price) {
    return res.status(400).json({ message: 'Name and Price are required fields.' });
  }

  try {
    const newProduct = new Product({ name, price, description, image: imageUrl });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product', error });
  }
};

// Update an existing product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  let imageUrl = '';

  const existingProduct = await Product.findById(id);
  if (!existingProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }

  if (req.file) {
    if (existingProduct.image) {
      const publicId = existingProduct.image.split('/').pop().split('.')[0];
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        return res.status(500).json({ message: 'Error deleting old image', error });
      }
    }

    try {
      const result = await cloudinary.uploader.upload_stream({ folder: 'products' }, (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ message: 'Error uploading new image', error });
        }
        imageUrl = result.secure_url;
      });
      req.file.stream.pipe(result);
    } catch (uploadError) {
      console.error('Error uploading new image to Cloudinary:', uploadError);
      return res.status(500).json({ message: 'Error uploading new image', error: uploadError });
    }
  } else {
    imageUrl = existingProduct.image;
  }

  if (!name || !price) {
    return res.status(400).json({ message: 'Name and Price are required fields.' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, description, image: imageUrl }, { new: true, runValidators: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product', error });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.image) {
      const publicId = product.image.split('/').pop().split('.')[0];
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        return res.status(500).json({ message: 'Error deleting image', error });
      }
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Get a single product by ID
const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

module.exports = { createProduct, updateProduct, deleteProduct, getProducts, getProduct };
