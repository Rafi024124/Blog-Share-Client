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
   <section className="px-3">
     <section
      className="my-16 p-6 md:p-12 max-w-7xl mx-auto rounded-3xl"
      style={{
        background: "rgba(30, 30, 45, 0.85)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        color: "#e0d7f5",
      }}
    >
      <h2
        className="text-4xl font-extrabold mb-10 text-center tracking-wide"
        style={{ color: "#B084F5" }}
      >
        Tips & Insights
      </h2>

      <p
        className="text-lg max-w-4xl mx-auto mb-14 px-4 md:px-0 text-center leading-relaxed"
        style={{ color: "#d6c9ff", fontWeight: "500" }}
      >
        Unlock your blogging potential with expert writing tips, content ideas, and proven strategies
        to engage readers and grow your audience. Whether you’re a beginner or a seasoned blogger, 
        our insights help you craft compelling posts that spark conversation.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {tipsData.map(({ icon, title, description }, idx) => (
          <article
            key={idx}
            className="rounded-3xl p-8 flex flex-col items-center text-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-[0_0_15px_#9f7fff]"
            style={{
              background: "rgba(70, 60, 110, 0.75)",
              boxShadow:
                "0 0 12px 0 rgba(140, 100, 220, 0.35), inset 0 0 10px 0 rgba(120, 90, 210, 0.4)",
              border: "1.5px solid rgba(159, 127, 255, 0.6)",
            }}
          >
            <div
              className="text-6xl mb-6 select-none"
              aria-label={`${title} icon`}
              role="img"
              style={{
                color: "#b084f5",
                filter: "drop-shadow(0 0 8px #b084f5)",
              }}
            >
              {icon}
            </div>
            <h3
              className="text-2xl font-semibold mb-3"
              style={{ color: "#d6c9ff", letterSpacing: "0.04em" }}
            >
              {title}
            </h3>
            <p className="text-[#c6baff] text-base leading-relaxed">{description}</p>
          </article>
        ))}
      </div>
    </section>
   </section>
  );
};

export default TipsAndInsights;
