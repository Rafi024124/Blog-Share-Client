import React from "react";

const features = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-[#E6E6FA]" // Lavender for icon stroke
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l9-5-9-5-9 5 9 5z" />
      </svg>
    ),
    title: "Curated Quality Content",
    desc: "Handpicked articles and posts to ensure you get the best insights.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-[#E6E6FA]" // Lavender
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6" />
      </svg>
    ),
    title: "Active Community Engagement",
    desc: "Connect, comment, and grow alongside passionate bloggers.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-[#E6E6FA]" // Lavender
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: "Easy Blog Sharing & Commenting",
    desc: "Seamlessly share your stories and engage with the community.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="px-3">
      <section
      className="my-20 px-6 md:px-12 max-w-7xl mx-auto rounded-3xl py-16 shadow-xl"
      style={{
        background: "linear-gradient(135deg, #CBC3E3 0%, #AA98A9 100%)",
        color: "#4B4453",
      }}
    >
      <h2
        className="text-4xl font-extrabold mb-12 text-center tracking-wide"
        style={{ color: "#5F4D7A", letterSpacing: "0.07em", textShadow: "0 0 5px #8B74A4" }}
      >
        Why Choose Us?
      </h2>
      <p
        className="text-lg leading-relaxed text-center max-w-3xl mx-auto mb-16"
        style={{ color: "#4B3F69", fontWeight: "600", letterSpacing: "0.02em" }}
      >
        Join a vibrant community where your voice matters. Our platform offers:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto">
        {features.map(({ icon, title, desc }, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-white/80 backdrop-blur-sm border border-purple-200"
            style={{
              color: "#5A2240",
              boxShadow:
                "0 4px 12px rgba(123, 103, 153, 0.3), inset 0 0 8px rgba(187, 175, 205, 0.25)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(123, 103, 153, 0.7), inset 0 0 12px rgba(187, 175, 205, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(123, 103, 153, 0.3), inset 0 0 8px rgba(187, 175, 205, 0.25)";
            }}
          >
            <div
              className="rounded-full p-4 mb-6 flex items-center justify-center shadow-md"
              style={{
                background:
                  "linear-gradient(135deg, #AA98A9 0%, #CF9FFF 100%)",
                boxShadow: "0 0 10px rgba(203,195,227,0.7)",
              }}
            >
              {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 tracking-wide">{title}</h3>
            <p className="text-center text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
    </section>
  );
};

export default WhyChooseUs;
