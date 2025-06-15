import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

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

    // eslint-disable-next-line no-unused-vars
    const { _id, email, ...rest } = blog;

    const wishList = {
      userEmail: user.email,
      blogId: _id,
      ...rest,
    };

    fetch(`http://localhost:3000/wishlist`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(wishList),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
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
      .catch(() => {
        Swal.fire("Something went wrong", "", "error");
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
        style={{ color: "#A53860" }}
      >
        Recent Blogs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.slice(0, 6).map((blog) => (
          <div
            key={blog._id}
            className="card card-compact bg-white shadow-lg border border-transparent rounded-xl transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_#EF88AD]"
            style={{ cursor: "pointer" }}
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
                style={{ color: "#A53860" }}
              >
                {blog.title}
              </h3>
              <p
                className="text-sm font-medium mb-3"
                style={{ color: "#EF88AD" }}
              >
                Category: <span className="font-normal">{blog.category}</span>
              </p>
              <p className="text-gray-700 line-clamp-3">{blog.shortDescription}</p>
              <div className="card-actions justify-between mt-6">
                <button
                  className="btn btn-primary btn-sm"
                  style={{
                    backgroundColor: "#EF88AD",
                    borderColor: "#EF88AD",
                    color: "white",
                  }}
                  onClick={() => handleDetails(blog._id)}
                >
                  Details
                </button>
                <button
                  className="btn btn-outline btn-sm"
                  style={{
                    borderColor: "#A53860",
                    color: "#A53860",
                  }}
                  onClick={() => handleWishlist(blog)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#A53860";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#A53860";
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
