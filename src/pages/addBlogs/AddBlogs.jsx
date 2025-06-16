import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";

const AddBlogs = () => {
  // const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [imageURL, setImageURL] = useState("");

  const handleAddBlog = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const blogData = Object.fromEntries(formData.entries());

    blogData.author = user?.displayName || "Anonymous";
    blogData.email = user?.email || "unknown";

    axios.post(`http://localhost:3000/blogs`,blogData,{
       withCredentials: true
    })
      
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Blog added successfully!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          // navigate("/myBlogs");
        }
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col w-full">
        <div className="text-center w-full">
          <h1 className="text-5xl font-bold">Add New Blog</h1>
          <p className="py-6">Share your thoughts with the world by publishing a blog.</p>
        </div>

        <div className="card bg-base-100 w-full shadow-2xl">
          <div className="card-body w-full">
            <form onSubmit={handleAddBlog} className="space-y-4">
              {/* Title + Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Title</label>
                  <input
                    name="title"
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Amazing Blog Title"
                    required
                  />
                </div>
                <div>
                  <label className="label">Image URL</label>
                  <input
                    name="image"
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="https://example.com/image.jpg"
                    required
                    onChange={(e) => setImageURL(e.target.value)}
                  />
                  {imageURL && (
                    <img
                      src={imageURL}
                      alt="Preview"
                      loading="lazy"
                      className="mt-2 max-h-48 rounded shadow"
                      onError={() => setImageURL("")}
                    />
                  )}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="label">Category</label>
                <select name="category" className="select select-bordered w-full" required>
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
                <label className="label">Short Description</label>
                <textarea
                  name="shortDescription"
                  className="textarea textarea-bordered w-full h-24"
                  placeholder="Write a short summary of your blog"
                  required
                ></textarea>
              </div>

              {/* Long Description */}
              <div>
                <label className="label">Long Description</label>
                <textarea
                  name="longDescription"
                  className="textarea textarea-bordered w-full h-48"
                  placeholder="Write your full blog content here..."
                  required
                ></textarea>
              </div>

              <button className="btn btn-neutral mt-4 w-full">Post Blog</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlogs;
