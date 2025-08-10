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
        className="my-16 p-6 md:p-12 max-w-7xl mx-auto rounded-3xl shadow-xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(203,195,227,0.99), rgba(170,152,169,0.85))",
          border: "1.5px solid rgba(170, 152, 169, 0.5)",
          color: "#4B4453",
        }}
      >
        <h2
          className="text-4xl font-extrabold mb-10 text-center tracking-wide"
          style={{
            color: "#5F4D7A",
            letterSpacing: "0.07em",
            textShadow: "0 0 5px #8B74A4",
          }}
        >
          Tips & Insights
        </h2>

        <p
          className="text-lg max-w-4xl mx-auto mb-14 px-4 md:px-0 text-center leading-relaxed"
          style={{
            color: "#5E4B7B",
            fontWeight: "600",
            letterSpacing: "0.02em",
          }}
        >
          Unlock your blogging potential with expert writing tips, content ideas,
          and proven strategies to engage readers and grow your audience.
          Whether you’re a beginner or a seasoned blogger, our insights help you
          craft compelling posts that spark conversation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tipsData.map(({ icon, title, description }, idx) => (
            <article
              key={idx}
              className="rounded-3xl p-8 flex flex-col items-center text-center cursor-pointer transition-transform transform"
              style={{
                background: "rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(6px)",
                border: "1.5px solid rgba(170, 152, 169, 0.4)",
                boxShadow:
                  "0 4px 12px rgba(123, 103, 153, 0.3), inset 0 0 8px rgba(187, 175, 205, 0.25)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 15px rgba(155, 129, 185, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(123, 103, 153, 0.3), inset 0 0 8px rgba(187, 175, 205, 0.25)";
              }}
            >
              <div
                className="text-6xl mb-6 select-none"
                aria-label={`${title} icon`}
                role="img"
                style={{
                  color: "#7B6799",
                  filter: "drop-shadow(0 0 8px rgba(123, 103, 153, 0.7))",
                }}
              >
                {icon}
              </div>
              <h3
                className="text-2xl font-semibold mb-3"
                style={{ color: "#4B4453", letterSpacing: "0.04em" }}
              >
                {title}
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#5E4B7B" }}
              >
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
};

export default TipsAndInsights;
