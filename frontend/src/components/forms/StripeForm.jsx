import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Button } from "@/components/ui/button";

const StripeForm = ({ courseId, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch the client secret from your backend
      const response = await axios.post('/api/payment/stripe/register-class', { course_id: courseId });
      const { clientSecret } = response.data;

      // Confirm the card payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Student Name',
          },
        },
      });

      if (error) {
        console.log(error)
        setError(error);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Notify the backend to confirm registration
        await axios.post('/api/payment/stripe/confirm-registration', { paymentIntentId: paymentIntent.id });
        onPaymentSuccess();
      }
    } catch (err) {
      console.log(err)
      setError(err.response.data.errors.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className='mt-6 mb-1'/>
      {error && <div className="error text-red-500">{error}</div>}
      <Button type="submit" disabled={!stripe || loading} className="mx-auto block mt-6">
        {loading ? 'Processing...' : 'Pay'}
      </Button>
    </form>
  );
};

export default StripeForm;