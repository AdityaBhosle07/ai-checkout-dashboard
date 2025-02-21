"use client";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PaymentPage() {
  const handlePayment = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;

    const response = await fetch("/api/checkout_session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 20 }), // Replace with actual amount
    });

    const session = await response.json();

    if (session.url) {
      window.location.href = session.url; // Redirect to Stripe Checkout
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
     <button
  className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-6 py-3 rounded-lg shadow-lg"
  onClick={handlePayment}
>
  Pay Securely
</button>
    </div>
  );
}
