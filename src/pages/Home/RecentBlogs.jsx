import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import FeaturedBlogCard from "./FeaturedBlogCard";

const RecentBlogs = ({ blogs }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // State to control how many blogs are visible
  const [visibleCount, setVisibleCount] = useState(8);

  const handleDetails = (id) => {
    navigate(`/blogDetails/${id}`);
  };

  const handleWishlist = (blog) => {
    if (!user) {
      Swal.fire("Please login to add to wishlist", "", "warning");
      return;
    }

    const { _id, ...rest } = blog;

    const wishList = {
      userEmail: user.email,
      blogId: _id,
      ...rest,
    };

    axios
      .post(`https://blog-share-server.vercel.app/wishlist`, wishList, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Added to wishlist!",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: "Already in wishlist",
            icon: "info",
            timer: 1000,
            showConfirmButton: false,
          });
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          Swal.fire("Oops!", "This blog is already in your wishlist.", "info");
        } else if (error.response && error.response.status === 403) {
          Swal.fire(
            "Forbidden!",
            "You are not allowed to perform this action.",
            "error"
          );
        } else {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      });
  };

  if (!blogs || blogs.length === 0) {
    return (
      <p className="text-center text-[#AA98A9] mt-10">No recent blogs found.</p>
    );
  }

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const visibleBlogs = blogs.slice(0, visibleCount);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 bg-[#1C1C1C] rounded-3xl">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-[#AA98A9]">
        Recent Blogs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {visibleBlogs.map((blog) => (
          <FeaturedBlogCard
            key={blog._id}
            blog={blog}
            onDetailsClick={handleDetails}
            onWishlistClick={handleWishlist}
          />
        ))}
      </div>

      {visibleCount < blogs.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSeeMore}
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
            See More
          </button>
        </div>
      )}
    </section>
  );
};

export default RecentBlogs;
