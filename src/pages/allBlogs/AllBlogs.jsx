import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const AllBlogs = () => {
  const loadedBlogs = useLoaderData();
  const navigate = useNavigate();

  const handleDetails = (id) => {
    navigate(`/blogDetails/${id}`);
  };

  const handleWishlist = (blog) => {
    // For now, we just log. You can send it to backend or localStorage.
    console.log("Added to wishlist:", blog);
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center mb-8">All Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loadedBlogs.map((blog) => (
          <div
            key={blog._id}
            className="card card-compact bg-base-100 shadow-xl border"
          >
            <figure>
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{blog.title}</h2>
              <p className="text-sm text-gray-500 mb-2">
                Category: <span className="font-medium">{blog.category}</span>
              </p>
              <p>{blog.shortDescription}</p>
              <div className="card-actions justify-between mt-4">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleDetails(blog._id)}
                >
                  Details
                </button>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => handleWishlist(blog)}
                >
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
