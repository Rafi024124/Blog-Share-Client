import React, { useState } from "react";
import Swal from "sweetalert2";

import letter from "../../assets/lottie/newsletter.json";
import Lottie from 'lottie-react';
const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Please enter a valid email",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Thank you for subscribing to our newsletter!",
      timer: 2000,
      showConfirmButton: false,
    });

    setEmail("");
  };

  return (
    <section className="px-3 my-16">
      <div
        className="max-w-7xl mx-auto p-8 md:p-12 rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(203,195,227,0.99), rgba(170,152,169,0.85))",
          border: "1.5px solid rgba(170, 152, 169, 0.5)",
          color: "#4B4453",
        }}
      >
        {/* Lottie Animation */}
        <div className="flex justify-center">
           <Lottie animationData={letter} loop={true} />
        </div>

        {/* Newsletter Form */}
        <div>
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4 text-center md:text-left tracking-wide"
            style={{
              color: "#5F4D7A",
              letterSpacing: "0.07em",
              textShadow: "0 0 5px #8B74A4",
            }}
          >
            Join Our Newsletter
          </h2>
          <p
            className="text-base md:text-lg mb-8 text-center md:text-left leading-relaxed"
            style={{
              color: "#5E4B7B",
              fontWeight: "500",
            }}
          >
            Get the latest blog updates, exclusive tips, and community highlights
            directly in your inbox.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#8B74A4] transition"
              style={{
                backgroundColor: "rgba(255,255,255,0.85)",
                color: "#4B4453",
                border: "1.5px solid rgba(170,152,169,0.4)",
              }}
              required
            />
            <button
              type="submit"
              className="font-semibold px-6 py-3 rounded-lg shadow-md transition"
              style={{
                backgroundColor: "#7B6799",
                color: "white",
                boxShadow:
                  "0 4px 12px rgba(123, 103, 153, 0.3), inset 0 0 8px rgba(187, 175, 205, 0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#5F4D7A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#7B6799";
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
