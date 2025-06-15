import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const UpdateBlog = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState(null);
  const [imageURL, setImageURL] = useState("");

  // Load blog details
  useEffect(() => {
    fetch(`http://localhost:3000/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlogData(data);
        setImageURL(data.image);
      });
  }, [id]);

  const handleUpdateBlog = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData.entries());

    updatedData.author = user?.displayName || "Anonymous";
    updatedData.email = user?.email || "unknown";

    fetch(`http://localhost:3000/blogs/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Blog updated successfully!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          navigate(`/blogDetails/${id}`);
        }
      });
  };

  if (!blogData) return <div className="text-center py-20">Loading blog details...</div>;

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col w-full">
        <div className="text-center w-full">
          <h1 className="text-5xl font-bold">Update Blog</h1>
          <p className="py-6">Edit your blog and save changes.</p>
        </div>

        <div className="card bg-base-100 w-full shadow-2xl">
          <div className="card-body w-full">
            <form onSubmit={handleUpdateBlog} className="space-y-4">
              {/* Title + Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Title</label>
                  <input
                    name="title"
                    type="text"
                    className="input input-bordered w-full"
                    defaultValue={blogData.title}
                    required
                  />
                </div>
                <div>
                  <label className="label">Image URL</label>
                  <input
                    name="image"
                    type="text"
                    className="input input-bordered w-full"
                    defaultValue={blogData.image}
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
                <select
                  name="category"
                  className="select select-bordered w-full"
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
                <label className="label">Short Description</label>
                <textarea
                  name="shortDescription"
                  className="textarea textarea-bordered w-full h-24"
                  defaultValue={blogData.shortDescription}
                  required
                ></textarea>
              </div>

              {/* Long Description */}
              <div>
                <label className="label">Long Description</label>
                <textarea
                  name="longDescription"
                  className="textarea textarea-bordered w-full h-48"
                  defaultValue={blogData.longDescription}
                  required
                ></textarea>
              </div>

              <button className="btn btn-success mt-4 w-full">Update Blog</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
