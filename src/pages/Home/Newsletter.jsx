import React, { useState } from "react";
import Swal from "sweetalert2";

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
    <section className="max-w-md mx-auto my-16 p-8 rounded-xl shadow-lg"
      style={{
        background: "linear-gradient(135deg, #EF88AD 0%, #A53860 100%)",
        color: "white",
      }}
    >
      <h2 className="text-3xl font-extrabold mb-4 text-center drop-shadow-md">
        Join Our Newsletter
      </h2>
      <p className="text-sm sm:text-base mb-8 text-center drop-shadow-sm">
        Get the latest blog updates, exclusive tips, and community highlights directly in your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow px-4 py-3 rounded-lg bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-white transition"
          required
        />
        <button
          type="submit"
          className="bg-white text-[#A53860] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#f7c4d2] transition"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
