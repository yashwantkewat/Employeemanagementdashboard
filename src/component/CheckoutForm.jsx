import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import 'bootstrap/dist/css/bootstrap.min.css';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      setIsProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setMessage(error.message);
      setIsProcessing(false);
    } else {
      // Simulate a successful payment
      setMessage('Payment successful! Thank you for your purchase.');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
      <h3 className="text-center mb-4">Enter Payment Details</h3>
      <div className="form-group">
        <CardElement options={{ hidePostalCode: true }} />
      </div>
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="btn btn-primary btn-block mt-3"
      >
        {isProcessing ? 'Processing...' : 'Pay'}
      </button>
      {message && <p className="mt-3 text-success text-center">{message}</p>}
    </form>
  );
}

export default CheckoutForm;
