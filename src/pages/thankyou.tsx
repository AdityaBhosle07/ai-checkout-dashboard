"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ThankYouPage() {
  const [balloons, setBalloons] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalloons((prev) => [...prev, "🎈"]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-300 to-blue-400 overflow-hidden animate-fade-in">
      {/* Main Thank You Message */}
      <div className="text-center flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
          🎉 Payment Successful! 🎉
        </h1>
        <p className="text-lg text-white font-medium mb-6">
          Your order has been processed. Thank you for shopping with us!
        </p>

        {/* Back to Home Button - Styled like the blue button */}
        <Link href="/">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300">
            Back to Home
          </button>
        </Link>
      </div>

      {/* Balloons Animation */}
      <div className="absolute inset-0 flex justify-center items-end overflow-hidden">
        {balloons.map((balloon, index) => (
          <span
            key={index}
            className="absolute text-4xl animate-float"
            style={{ left: `${Math.random() * 100}%`, bottom: "0%" }}
          >
            {balloon}
          </span>
        ))}
      </div>

      {/* Confetti Effect */}
      <div className="confetti-container"></div>

      {/* Animations */}
      <style jsx>{`
        @keyframes floatUp {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(-100vh);
            opacity: 0;
          }
        }
        .animate-float {
          animation: floatUp 4s linear infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-in-out;
        }

        /* Confetti Animation */
        .confetti-container {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          animation: confetti-fall 5s linear infinite;
        }
        @keyframes confetti-fall {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  );
}
