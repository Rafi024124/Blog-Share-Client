import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const AllBlogs = () => {
  const { user } = useContext(AuthContext);
  const loadedBlogs = useLoaderData();
  const [blogs, setBlogs] = useState(loadedBlogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchTerm && !category) {
      setBlogs(loadedBlogs);
      return;
    }
    const url = new URL("http://localhost:3000/blogs");
    if (searchTerm) url.searchParams.append("search", searchTerm);
    if (category) url.searchParams.append("category", category);

    fetch(url)
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, [searchTerm, category, loadedBlogs]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDetails = (id) => {
    navigate(`/blogDetails/${id}`);
  };

  const handleWishlist = (blog) => {
    const { _id,  ...rest } = blog;
    const wishList = {
      userEmail: user?.email,
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
            timer: 1200,
            showConfirmButton: false,
          });
          console.log(res.data);
          
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

  return (
    <div className="min-h-screen py-14 px-6 md:px-12" style={{ backgroundColor: "#fff" }}>
      <h2
        className="text-4xl font-extrabold text-center mb-12 tracking-tight"
        style={{ color: "#AA98A9" }}
      >
        All Blogs
      </h2>

      <div className="flex flex-col sm:flex-row justify-center gap-5 max-w-3xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearch}
          className="input input-bordered w-full sm:w-72 rounded-lg"
          style={{
            borderColor: "#AA98A9",
            color: "#AA98A9",
            backgroundColor: "#F7F6FB", // very light lavender tint for inputs
          }}
        />
        <select
          value={category}
          onChange={handleCategoryChange}
          className="select select-bordered w-full sm:w-72 rounded-lg"
          style={{
            borderColor: "#AA98A9",
            color: "#AA98A9",
            backgroundColor: "#F7F6FB",
          }}
        >
          <option value="" style={{ color: "#AA98A9" }}>
            All Categories
          </option>
          <option value="Travel" style={{ color: "#AA98A9" }}>
            Travel
          </option>
          <option value="Finance" style={{ color: "#AA98A9" }}>
            Finance
          </option>
          <option value="Entertainment" style={{ color: "#AA98A9" }}>
            Entertainment
          </option>
        </select>
      </div>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-400 text-lg mt-14">
          No blogs found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="card card-compact rounded-xl shadow-md p-0 flex flex-col"
              style={{
                backgroundColor: "#CBC3E3", // Light Purple card bg
                border: "1.5px solid #AA98A9",
                color: "#AA98A9",
                transition: "box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(207, 159, 255, 0.6)"; // Light Violet glow on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <figure>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              </figure>
              <div className="card-body flex flex-col flex-grow">
                <h2
                  className="card-title font-bold text-xl"
                  style={{ color: "#AA98A9" }}
                >
                  {blog.title}
                </h2>
                <p className="text-sm mb-3" style={{ color: "#AA98A9" }}>
                  Category:{" "}
                  <span style={{ fontWeight: "600", color: "#7B6799" }}>
                    {blog.category}
                  </span>
                </p>
                <p className="flex-grow" style={{ color: "#7B6799" }}>
                  {blog.shortDescription}
                </p>
                <div className="card-actions justify-between mt-6">
                 

<button
  className="btn btn-primary btn-sm"
  style={{
    backgroundColor: "#7B6799", // Deep Purple bg
    border: "none",
    color: "white",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
  }}
  onClick={() => handleDetails(blog._id)}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = "#9C86B1"; // lighter purple on hover
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = "#7B6799";
  }}
>
  Details
</button>
<button
  className="btn btn-outline btn-sm"
  style={{
    borderColor: "#7B6799",
    color: "#7B6799",
    fontWeight: "600",
    transition: "all 0.3s ease",
  }}
  onClick={() => handleWishlist(blog)}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = "#7B6799";
    e.currentTarget.style.color = "white";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.color = "#7B6799";
  }}
>
  Wishlist
</button>



                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
