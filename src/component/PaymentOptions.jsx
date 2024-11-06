import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

// Replace 'your-publishable-key' with your Stripe publishable key
const stripePromise = loadStripe('I5DzTGNcavxOUj');

function PaymentOptions() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Payment Options</h2>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentOptions;
