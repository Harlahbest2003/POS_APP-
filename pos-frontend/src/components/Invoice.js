import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get('/api/invoices')
      .then(res => setInvoices(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Invoices</h2>
      <div className="invoice-list">
        {invoices.map(invoice => (
          <div key={invoice._id} className="invoice">
            <h3>Invoice #{invoice.invoiceNumber}</h3>
            <p>Total Amount: ${invoice.totalAmount}</p>
            <p>Status: {invoice.status}</p>
            <button>Download Invoice</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Invoice;
