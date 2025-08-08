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
    <section className="my-20 px-6 md:px-12 max-w-5xl mx-auto rounded-xl shadow-lg py-12"
      style={{ backgroundColor: "#E6E6FA" }} // Lavender background
    >
      <h2
        className="text-4xl font-extrabold mb-10 text-center"
        style={{ color: "#CF9FFF" }} // Light Violet for heading
      >
        Why Choose Us?
      </h2>
      <p
        className="text-lg leading-relaxed text-center max-w-3xl mx-auto mb-12"
        style={{ color: "#5A2240" }} // darker text for contrast (you can choose #5A2240 or a purple shade)
      >
        Join a vibrant community where your voice matters. Our platform offers:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-4xl mx-auto">
        {features.map(({ icon, title, desc }, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            style={{ backgroundColor: "#CBC3E3" }} // Light Purple cards background
          >
            <div
              className="rounded-full p-4 mb-6 flex items-center justify-center"
              style={{ backgroundColor: "#CF9FFF" }} // Light Violet circle behind icon
            >
              {icon}
            </div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "#5A2240" }} // text color dark purple for title
            >
              {title}
            </h3>
            <p className="text-center" style={{ color: "#5A2240" }}>
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
