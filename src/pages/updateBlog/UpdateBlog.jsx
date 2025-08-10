import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";

const UpdateBlog = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState(null);
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    axios
      .get(`https://blog-share-server.vercel.app/blogs/${id}`)
      .then((res) => {
        setBlogData(res.data);
        setImageURL(res.data.image);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
      });
  }, [id]);

  const handleUpdateBlog = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData.entries());

    updatedData.author = user?.displayName || "Anonymous";
    updatedData.email = user?.email || "unknown";

    axios
      .put(`https://blog-share-server.vercel.app/blogs/${id}`, updatedData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Blog updated successfully!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          navigate(`/blogDetails/${id}`);
        }
      })
      .catch((err) => {
        console.error("Error updating blog:", err);
        Swal.fire({
          title: "Failed to update blog",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      });
  };

  if (!blogData)
    return <div className="text-center py-20 text-[#AA98A9]">Loading blog details...</div>;

  const labelClass = "flex items-center gap-2 text-[#AA98A9] font-semibold mb-1";

  return (
    <div className="hero min-h-screen bg-[#1C1C1C] px-4">
      <div className="hero-content flex-col w-full max-w-4xl">
        <div className="text-center w-full mb-8">
          <h1 className="text-5xl font-bold text-[#AA98A9]">Update Blog</h1>
          <p className="py-4 text-gray-300 max-w-xl mx-auto">
            Edit your blog and save changes.
          </p>
        </div>

        <div className="card bg-[#2A2540] rounded-xl w-full shadow-lg p-8">
          <form onSubmit={handleUpdateBlog} className="space-y-6">
            {/* Title + Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Title</label>
                <input
                  name="title"
                  type="text"
                  className="input input-bordered w-full bg-[#3B3655] text-white border-none focus:ring-2 focus:ring-[#AA98A9]"
                  defaultValue={blogData.title}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Image URL</label>
                <input
                  name="image"
                  type="url"
                  className="input input-bordered w-full bg-[#3B3655] text-white border-none focus:ring-2 focus:ring-[#AA98A9]"
                  defaultValue={blogData.image}
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
              <label className={labelClass}>Category</label>
              <select
                name="category"
                className="select select-bordered w-full bg-[#3B3655] text-white border-none focus:ring-2 focus:ring-[#AA98A9]"
                defaultValue={blogData.category}
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
              <label className={labelClass}>Short Description</label>
              <textarea
                name="shortDescription"
                className="textarea textarea-bordered w-full bg-[#3B3655] text-white border-none focus:ring-2 focus:ring-[#AA98A9]"
                placeholder="Write a short summary of your blog"
                style={{ height: "100px" }}
                defaultValue={blogData.shortDescription}
                required
              ></textarea>
            </div>

            {/* Long Description */}
            <div>
              <label className={labelClass}>Long Description</label>
              <textarea
                name="longDescription"
                className="textarea textarea-bordered w-full bg-[#3B3655] text-white border-none focus:ring-2 focus:ring-[#AA98A9]"
                placeholder="Write your full blog content here..."
                style={{ height: "180px" }}
                defaultValue={blogData.longDescription}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-[#5F4D7A] to-[#8B74A4] hover:from-[#8B74A4] hover:to-[#A58BBE] text-white font-bold text-lg transition-all duration-300"
            >
              Update Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
