import React from "react";

const FeaturedBlogCard = ({ blog, onDetailsClick, onWishlistClick }) => {
  return (
    <div
      className="card card-compact rounded-2xl overflow-hidden relative flex flex-col border backdrop-blur-sm shadow-xs hover:shadow-xs transition-all duration-300"
      style={{
        background:
          "linear-gradient(135deg, rgba(203,195,227,0.99), rgba(170,152,169,0.85))",
        border: "1.5px solid rgba(170, 152, 169, 0.5)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 5px 10px rgba(207, 159, 255, 0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <figure className="relative">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <span
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-xs"
          style={{
            background: "rgba(123, 103, 153, 0.85)",
            backdropFilter: "blur(4px)",
          }}
        >
          {blog.category}
        </span>
      </figure>

      <div className="card-body flex flex-col px-5 py-4">
        <h2
          className="card-title font-bold text-lg text-center text-[#4B4453]"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "block",
            maxWidth: "290px",
            margin: "0 auto",
          }}
          title={blog.title}
        >
          {blog.title}
        </h2>

        <p
          className="flex-grow text-center text-sm max-w-[290px] truncate mt-2"
          style={{
            color: "#5E4B7B",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            margin: "0 auto",
          }}
          title={blog.shortDescription}
        >
          {blog.shortDescription}
        </p>

        <div className="card-actions justify-between mt-6">
          <button
            className="btn btn-sm rounded-lg shadow-md"
            style={{
              background: "linear-gradient(90deg, #5F4D7A, #8B74A4)",
              border: "none",
              color: "white",
              fontWeight: "700",
              letterSpacing: "0.5px",
              transition: "all 0.3s ease",
              boxShadow: "0 3px 6px rgba(95, 77, 122, 0.3)",
            }}
            onClick={() => onDetailsClick(blog._id)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(90deg, #8B74A4, #A58BBE)";
              e.currentTarget.style.boxShadow =
                "0 6px 15px rgba(155, 129, 185, 0.6)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(90deg, #5F4D7A, #8B74A4)";
              e.currentTarget.style.boxShadow =
                "0 3px 6px rgba(95, 77, 122, 0.3)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Details
          </button>

          <button
            className="btn btn-outline btn-sm rounded-lg"
            style={{
              border: "2px solid #7B6799",
              color: "#5F4D7A",
              background: "rgba(123, 103, 153, 0.08)",
              fontWeight: "900",
              transition: "all 0.3s ease",
            }}
            onClick={() => onWishlistClick(blog)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#7B6799";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.borderColor = "#7B6799";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(123, 103, 153, 0.08)";
              e.currentTarget.style.color = "#5F4D7A";
              e.currentTarget.style.borderColor = "#7B6799";
            }}
          >
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogCard;
