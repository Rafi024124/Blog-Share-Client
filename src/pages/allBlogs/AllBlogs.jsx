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
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  // Fetch blogs when search/category/sortBy/sortOrder changes
  useEffect(() => {
    const fetchBlogs = async () => {
      const url = new URL("http://localhost:3000/blogs");
      if (searchTerm) url.searchParams.append("search", searchTerm);
      if (category) url.searchParams.append("category", category);
      if (sortBy) url.searchParams.append("sortBy", sortBy);
      if (sortOrder) url.searchParams.append("sortOrder", sortOrder);

      const res = await fetch(url);
      const data = await res.json();
      setBlogs(data);
    };

    fetchBlogs();
  }, [searchTerm, category, sortBy, sortOrder]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleDetails = (id) => {
    navigate(`/blogDetails/${id}`);
  };

  const handleWishlist = (blog) => {
    const { _id, ...rest } = blog;
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
    <div
      className="min-h-screen py-14 px-6 md:px-12"
      style={{ backgroundColor: "#1C1C1C" }}
    >
      <h2
        className="text-4xl font-extrabold text-center mb-12 tracking-tight text-[#A78BFA]"
       
      >
        All Blogs
      </h2>

      {/* Filters & Sorting */}
      <div className="flex flex-col sm:flex-row justify-center gap-5 max-w-4xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearch}
          className="input input-bordered w-full sm:w-72 rounded-lg"
          style={{
            borderColor: "#AA98A9",
            color: "#AA98A9",
            backgroundColor: "#F7F6FB",
          }}
        />

        <select
          value={category}
          onChange={handleCategoryChange}
          className="select select-bordered w-full sm:w-56 rounded-lg"
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

        <select
          value={sortBy}
          onChange={handleSortByChange}
          className="select select-bordered w-full sm:w-56 rounded-lg"
          style={{
            borderColor: "#AA98A9",
            color: "#AA98A9",
            backgroundColor: "#F7F6FB",
          }}
        >
          <option value="" style={{ color: "#AA98A9" }}>
            Sort By
          </option>
          <option value="title" style={{ color: "#AA98A9" }}>
            Title
          </option>
          <option value="author" style={{ color: "#AA98A9" }}>
            Author
          </option>
          <option value="category" style={{ color: "#AA98A9" }}>
            Category
          </option>
          <option value="wordCount" style={{ color: "#AA98A9" }}>
            Word Count
          </option>
        </select>

        <select
          value={sortOrder}
          onChange={handleSortOrderChange}
          className="select select-bordered w-full sm:w-32 rounded-lg"
          style={{
            borderColor: "#AA98A9",
            color: "#AA98A9",
            backgroundColor: "#F7F6FB",
          }}
        >
          <option value="asc" style={{ color: "#AA98A9" }}>
            Ascending
          </option>
          <option value="desc" style={{ color: "#AA98A9" }}>
            Descending
          </option>
        </select>
      </div>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-400 text-lg mt-14">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-6xl mx-auto">
          {blogs.map((blog) => (
            <div
              key={blog._id}
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
                    maxWidth: "230px",
                    margin: "0 auto",
                  }}
                >
                  {blog.title}
                </h2>

                <p
                  className="flex-grow text-center text-sm max-w-[230px] truncate mt-2"
                  style={{
                    color: "#5E4B7B",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    margin: "0 auto",
                  }}
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
                    onClick={() => handleDetails(blog._id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(90deg, #8B74A4, #A58BBE)";
                      e.currentTarget.style.boxShadow = "0 6px 15px rgba(155, 129, 185, 0.6)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(90deg, #5F4D7A, #8B74A4)";
                      e.currentTarget.style.boxShadow = "0 3px 6px rgba(95, 77, 122, 0.3)";
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
                    onClick={() => handleWishlist(blog)}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
