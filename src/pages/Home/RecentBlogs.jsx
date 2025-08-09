import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import FeaturedBlogCard from "./FeaturedBlogCard";


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
      <p className="text-center text-[#A78BFAFF] mt-10">No recent blogs found.</p>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4  py-10 bg-[#1C1C1C] rounded-3xl">
      <h2
        className="text-4xl font-extrabold mb-10 text-center text-[#A78BFAFF]"
      >
        Recent Blogs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {blogs.slice(0, 6).map((blog) => (
          <FeaturedBlogCard
            key={blog._id}
            blog={blog}
            onDetailsClick={handleDetails}
            onWishlistClick={handleWishlist}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentBlogs;
