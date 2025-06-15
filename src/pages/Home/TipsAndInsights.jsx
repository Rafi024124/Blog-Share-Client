import React from "react";

const tipsData = [
  {
    icon: "📝",
    title: "Captivating Titles",
    description: "How to write captivating blog titles that draw clicks.",
  },
  {
    icon: "💬",
    title: "Engaging Comments",
    description: "Techniques for encouraging meaningful reader comments.",
  },
  {
    icon: "📣",
    title: "Social Promotion",
    description: "Best practices for promoting your posts on social media.",
  },
  {
    icon: "🤝",
    title: "Collaborations",
    description: "Tips for collaborating with other bloggers and growing community.",
  },
  {
    icon: "📅",
    title: "Consistency",
    description: "Staying consistent with your publishing schedule.",
  },
];

const TipsAndInsights = () => {
  return (
    <section className="my-16 px-4 md:px-10 max-w-6xl mx-auto">
      <h2
        className="text-4xl font-extrabold mb-12 text-center"
        style={{ color: "#A53860" }}
      >
        Tips & Insights
      </h2>
      <p className="text-gray-700 text-lg leading-relaxed text-center max-w-4xl mx-auto mb-12">
        Unlock your blogging potential with expert writing tips, content ideas, and proven strategies
        to engage readers and grow your audience. Whether you’re a beginner or a seasoned blogger, 
        our insights help you craft compelling posts that spark conversation.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {tipsData.map(({ icon, title, description }, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
            style={{ borderTop: "4px solid #EF88AD" }}
          >
            <div
              className="text-5xl mb-4"
              aria-label={`${title} icon`}
              role="img"
              style={{ color: "#A53860" }}
            >
              {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#A53860]">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TipsAndInsights;
