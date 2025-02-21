"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutForm = () => {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const validCoupons: Record<string, number> = {
    SAVE10: 10,
    ADMIN123: 100,
    WELCOME20: 20,
  };

  const handleApplyCoupon = () => {
    const upperCoupon = coupon.trim().toUpperCase();
    if (validCoupons[upperCoupon]) {
      setDiscount(validCoupons[upperCoupon]);
      setIsApplied(true);
    } else {
      setDiscount(0);
      setIsApplied(false);
    }
  };

  const subtotal = 100;
  const total = subtotal - discount;

  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total }),
    });

    const { sessionId } = await response.json();

    if (stripe && sessionId) {
      await stripe.redirectToCheckout({ sessionId });
    } else {
      console.error("Stripe redirect failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center text-black">
           Checkout Dashboard
        </h2>

        <div className="mb-4">
          <label className="block font-medium text-black">Coupon Code</label>
          <div className="flex mt-2">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="w-full border border-gray-700 text-black placeholder-gray-700 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
              placeholder="Enter coupon"
            />
            <button
              className={`px-4 py-2 rounded-r transition ${
                coupon
                  ? "bg-blue-600 text-white hover:bg-blue-900"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
              onClick={handleApplyCoupon}
              disabled={!coupon}
            >
              {isApplied ? "Applied" : "Apply"}
            </button>
          </div>
          {isApplied ? (
            <p className="text-green-600 mt-2">Discount Applied: ${discount}</p>
          ) : (
            <p className="text-red-600 mt-2">{coupon && "Invalid Coupon!"}</p>
          )}
        </div>

        <div className="border-t pt-4">
          <h3 className="text-xl font-semibold text-black">Order Summary</h3>
          <div className="flex justify-between mt-3 text-gray-900">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-900">
            <span>Discount:</span>
            <span className="text-green-600">- ${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold mt-2 text-lg text-black">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          className={`w-full mt-4 py-3 rounded text-white ${
            loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
          }`}
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutForm;
