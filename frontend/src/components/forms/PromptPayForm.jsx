import React, { useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from '../ui/input';
import { Label } from '@radix-ui/react-label';

const PromptPayForm = ({ courseId, onPaymentSuccess, type }) => {
    const stripe = useStripe();
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/api/payment/prompt-pay/register-class', { course_id: courseId, type });
            const { clientSecret } = response.data;

            const res = await stripe.confirmPromptPayPayment(clientSecret, {
                payment_method: {
                    type: 'promptpay',
                    billing_details: {
                        email: email
                    },
                },
            });

            if (res.paymentIntent.status === 'succeeded') {
                await axios.post('/api/payment/prompt-pay/confirm-registration', { paymentIntentId: res.paymentIntent.id, type });
                onPaymentSuccess();
            } else {
                alert("Payment Failed or Cancelled");
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.errors?.message || 'An error occurred during payment.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Label>Email</Label>
            <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Please enter your email" 
                disabled={loading} 
                required 
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <Button 
                type="submit" 
                className="block mx-auto mt-2 bg-green-500 hover:bg-green-600"
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Submit'}
            </Button>
        </form>
    );
};

export default PromptPayForm;