import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

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
    // eslint-disable-next-line no-unused-vars
    const { _id, email, ...rest } = blog;
    const wishList = {
      userEmail: user?.email,
      blogId: _id,
      ...rest,
    };

    fetch(`http://localhost:3000/wishlist`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(wishList),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Added to wishlist!",
            icon: "success",
            timer: 1200,
            showConfirmButton: false,
          });
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-6 md:px-12">
      <h2 className="text-4xl font-extrabold text-center text-[#A53860] mb-12 tracking-tight">
        All Blogs
      </h2>

      <div className="flex flex-col sm:flex-row justify-center gap-5 max-w-3xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearch}
          className="input input-bordered w-full sm:w-72 rounded-lg border-gray-300 focus:border-[#A53860] focus:ring-2 focus:ring-[#A53860] transition"
        />
        <select
          value={category}
          onChange={handleCategoryChange}
          className="select select-bordered w-full sm:w-72 rounded-lg border-gray-300 focus:border-[#A53860] focus:ring-2 focus:ring-[#A53860] transition"
        >
          <option value="">All Categories</option>
          <option value="Travel">Travel</option>
          <option value="Finance">Finance</option>
          <option value="Entertainment">Entertainment</option>
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
              className="card card-compact bg-white shadow-lg border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <figure>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              </figure>
              <div className="card-body flex flex-col">
                <h2 className="card-title text-[#A53860] font-bold text-xl">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-500 mb-3">
                  Category:{" "}
                  <span className="font-semibold text-gray-700">
                    {blog.category}
                  </span>
                </p>
                <p className="text-gray-700 flex-grow">{blog.shortDescription}</p>
                <div className="card-actions justify-between mt-6">
                  <button
                    className="btn btn-primary btn-sm bg-[#A53860] hover:bg-[#8b2e52] border-none transition"
                    onClick={() => handleDetails(blog._id)}
                  >
                    Details
                  </button>
                  <button
                    className="btn btn-outline btn-sm border-[#A53860] text-[#A53860] hover:bg-[#A53860] hover:text-white transition"
                    onClick={() => handleWishlist(blog)}
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
