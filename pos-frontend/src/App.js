import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import EditProduct from './components/EditProduct';
import DeleteProduct from './components/DeleteProduct';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import PaymentPage from './pages/PaymentPage';
import PostItemForm from './pages/PostItemForm';
import Cart from './pages/Cart';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthProvider } from './AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import PasscodeVerification from './pages/PasscodeVerification';

function App() {
  return (
   
    
    <Router>
      <AuthProvider>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/products/delete/:id" element={<DeleteProduct />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-passcode" element={<PasscodeVerification />} />
          <Route path="/post-item" element={<PostItemForm />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
