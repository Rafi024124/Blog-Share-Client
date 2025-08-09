import { useContext, useState } from "react";
import { FaHeading, FaImage, FaTags, FaAlignLeft, FaFileAlt } from "react-icons/fa";
import Swal from "sweetalert2";

import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";

const AddBlogs = () => {
  const { user } = useContext(AuthContext);
  const [imageURL, setImageURL] = useState("");

  const handleAddBlog = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const blogData = Object.fromEntries(formData.entries());

    blogData.author = user?.displayName || "Anonymous";
    blogData.email = user?.email || "unknown";

    axios
      .post(`http://localhost:3000/blogs`, blogData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Blog added successfully!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          e.target.reset();
          setImageURL("");
        }
      });
  };

  const labelClass = "flex items-center gap-2 text-[#AA98A9] font-semibold mb-1";

  return (
    <div className="hero min-h-screen bg-[#1C1C1C] px-4">
      <div className="hero-content flex-col w-full max-w-4xl">
        <div className="text-center w-full mb-8">
          <h1 className="text-5xl font-bold text-[#AA98A9]">Add New Blog</h1>
          <p className="py-4 text-gray-300 max-w-xl mx-auto">
            Share your thoughts with the world by publishing a blog.
          </p>
        </div>

        <div className="card bg-[#2A2540] rounded-xl w-full shadow-lg p-8">
          <form onSubmit={handleAddBlog} className="space-y-6">
            {/* Title + Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>
                  <FaHeading />
                  Title
                </label>
                <input
                  name="title"
                  type="text"
                  className="input input-bordered w-full bg-[#3B3655] text-white border-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Amazing Blog Title"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>
                  <FaImage />
                  Image URL
                </label>
                <input
                  name="image"
                  type="url"
                  className="input input-bordered w-full bg-[#3B3655] text-white border-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://example.com/image.jpg"
                  required
                  onChange={(e) => setImageURL(e.target.value)}
                />
                {imageURL && (
                  <img
                    src={imageURL}
                    alt="Preview"
                    loading="lazy"
                    className="mt-3 max-h-40 rounded-lg shadow-lg object-cover"
                    onError={() => setImageURL("")}
                  />
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className={labelClass}>
                <FaTags />
                Category
              </label>
              <select
                name="category"
                className="select select-bordered w-full bg-[#3B3655] text-white border-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Travel">Travel</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Health">Health</option>
                <option value="Food">Food</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </div>

            {/* Short Description */}
            <div>
              <label className={labelClass}>
                <FaAlignLeft />
                Short Description
              </label>
              <textarea
                name="shortDescription"
                className="textarea textarea-bordered w-full bg-[#3B3655] text-white border-none focus:ring-2 focus:ring-purple-500"
                placeholder="Write a short summary of your blog"
                required
                style={{ height: "100px" }}
              ></textarea>
            </div>

            {/* Long Description */}
            <div>
              <label className={labelClass}>
                <FaFileAlt />
                Long Description
              </label>
              <textarea
                name="longDescription"
                className="textarea textarea-bordered w-full bg-[#3B3655] text-white border-none focus:ring-2 focus:ring-purple-500"
                placeholder="Write your full blog content here..."
                required
                style={{ height: "180px" }}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-[#5F4D7A] to-[#8B74A4] hover:from-[#8B74A4] hover:to-[#A58BBE] text-white font-bold text-lg transition-all duration-300"
            >
              Post Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlogs;
