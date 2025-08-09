import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const MyBlogs = () => {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get("http://localhost:3000/myBlogs", { withCredentials: true })
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to fetch your blogs", "error");
      });
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/blogs/${id}`, { withCredentials: true })
          .then(() => {
            setBlogs((prev) => prev.filter((blog) => blog._id !== id));
            Swal.fire("Deleted!", "Your blog has been deleted.", "success");
          })
          .catch(() => {
            Swal.fire("Error", "Failed to delete blog", "error");
          });
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/updateBlog/${id}`);
  };

  if (!blogs.length) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#1C1C1C" }}>
        <p className="text-gray-400 text-xl">You have no blogs yet.</p>
      </div>
    );
  }

  return (
    <section
      className="min-h-screen p-8"
      style={{ backgroundColor: "#1C1C1C" }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-[#AA98A9]">
        My Blogs
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="card card-compact rounded-xl shadow-lg transition-transform hover:scale-[1.03]"
            style={{
              backgroundColor: "#CBC3E3",
              color: "#4B3F69",
              cursor: "default",
            }}
          >
            <figure>
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-xl font-semibold truncate" title={blog.title}>
                {blog.title}
              </h3>
              <p className="line-clamp-3" style={{ color: "#4B3F69" }}>
                {blog.shortDescription}
              </p>

              <div className="card-actions justify-between mt-4">
                <button
                  className="btn btn-sm bg-purple-400 text-white hover:bg-purple-500"
                  onClick={() => handleUpdate(blog._id)}
                >
                  Update
                </button>

                <button
                  className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyBlogs;
