// src/components/Contact.js
import React from 'react';

const Contact = () => {
  return (
    <div className="container">
      <h1 className="mt-4">Contact Us</h1>
      <p className="lead">We'd love to hear from you. Get in touch with us!</p>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" placeholder="Your Name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Your Email" />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea className="form-control" id="message" rows="3" placeholder="Your Message"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
