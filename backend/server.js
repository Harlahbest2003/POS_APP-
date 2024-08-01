require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const app = express();

app.use(cors()); 
app.use(express.json({extended:true}));


mongoose.connect(process.env.MONGO_URI, 
    { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use('/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
