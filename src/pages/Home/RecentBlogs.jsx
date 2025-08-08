import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const RecentBlogs = ({ blogs }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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
      .post(`http://localhost:3000/wishlist`, wishList, {
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
      <p className="text-center text-gray-500 mt-10">No recent blogs found.</p>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-10 py-10">
      <h2
        className="text-4xl font-extrabold mb-10 text-center"
        style={{ color: "#6B5876" }}
      >
        Recent Blogs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.slice(0, 6).map((blog) => (
          <div
            key={blog._id}
            className="card card-compact shadow-lg border border-transparent rounded-xl transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_0_15px_#B39DDB]"
            style={{
              cursor: "pointer",
              backgroundColor: "#E6E6FA", // Lavender background
              color: "#6B5876", // Darker text
            }}
          >
            <figure>
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-52 object-cover rounded-t-xl"
              />
            </figure>
            <div className="card-body">
              <h3
                className="card-title text-2xl font-semibold mb-2"
                style={{ color: "#6B5876" }}
              >
                {blog.title}
              </h3>
              <p
                className="text-sm font-medium mb-3"
                style={{ color: "#6B5876" }}
              >
                Category:{" "}
                <span className="font-normal" style={{ color: "#4B3F69" }}>
                  {blog.category}
                </span>
              </p>
              <p className="line-clamp-3" style={{ color: "#4B3F69" }}>
                {blog.shortDescription}
              </p>
              <div className="card-actions justify-between mt-6">
                <button
                  className="btn btn-sm"
                  style={{
                    backgroundColor: "#CF9FFF", // Light Violet button
                    borderColor: "#CF9FFF",
                    color: "#3B2E5B", // Dark purple text
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => handleDetails(blog._id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#B47DDD";
                    e.currentTarget.style.boxShadow = "0 0 8px #B47DDD";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#CF9FFF";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.color = "#3B2E5B";
                  }}
                >
                  Details
                </button>
                <button
  className="btn btn-sm"
  style={{
    backgroundColor: "transparent",   // transparent initially
    borderColor: "#CF9FFF",
    color: "#CF9FFF",                  // text color light violet initially
    fontWeight: "600",
    transition: "all 0.3s ease",
  }}
  onClick={() => handleWishlist(blog)}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = "#CF9FFF"; // fill on hover
    e.currentTarget.style.color = "#3B2E5B";           // dark purple text on hover
    e.currentTarget.style.boxShadow = "0 0 8px #B47DDD";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = "transparent"; // back to transparent
    e.currentTarget.style.color = "#CF9FFF";                // light violet text
    e.currentTarget.style.boxShadow = "none";
  }}
>
  Wishlist
</button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentBlogs;
