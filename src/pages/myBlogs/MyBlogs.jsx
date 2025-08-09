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

  const handleDetails = (id) => {
    navigate(`/blogDetails/${id}`);
  };

  if (!blogs.length) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#1C1C1C" }}
      >
        <p className="text-gray-400 text-xl">You have no blogs yet.</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen p-8" style={{ backgroundColor: "#1C1C1C" }}>
      <h2 className="text-3xl font-bold mb-8 text-center text-[#AA98A9]">
        My Blogs
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {blogs.map((blog) => (
          <div
            key={blog._id}
             style={{
        background:
          "linear-gradient(135deg, rgba(203,195,227,0.99), rgba(170,152,169,0.85))",
        border: "1.5px solid rgba(170, 152, 169, 0.5)",
      }}
            className="card card-compact rounded-xl shadow-lg transition-transform hover:scale-[1.03]"
           
          >
            <figure>
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
            </figure>
            <div className="card-body">
              <h3
                className="card-title text-xl font-semibold truncate"
                title={blog.title}
              >
                {blog.title}
              </h3>
              <p className="line-clamp-3" style={{ color: "#4B3F69" }}>
                {blog.shortDescription}
              </p>

              <div className="card-actions justify-between mt-4">
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
                  className="btn btn-sm rounded-lg shadow-md"
                    style={{
                      background: "linear-gradient(90deg, #3A8DFF, #1C6FFF)",
                      border: "none",
                      color: "white",
                      fontWeight: "700",
                      letterSpacing: "0.5px",
                      transition: "all 0.3s ease",
                      boxShadow: "0 3px 6px rgba(95, 77, 122, 0.3)",
                    }}
                  onClick={() => handleUpdate(blog._id)}

                  onMouseEnter={(e) => {
  e.currentTarget.style.background = "linear-gradient(90deg, #1C6FFF, #3A8DFF)";
  e.currentTarget.style.boxShadow = "0 6px 15px rgba(58, 141, 255, 0.7)";
  e.currentTarget.style.transform = "translateY(-2px)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.background = "linear-gradient(90deg, #3A8DFF, #1C6FFF)";
  e.currentTarget.style.boxShadow = "0 3px 6px rgba(28, 111, 255, 0.4)";
  e.currentTarget.style.transform = "translateY(0)";
}}

                >
                  Update
                </button>
                <button
                  
                   className="btn btn-sm rounded-lg shadow-md"
                    style={{
                        background: "linear-gradient(90deg, #FF5F5F, #D10000)",
                      border: "none",
                      color: "white",
                      fontWeight: "700",
                      letterSpacing: "0.5px",
                      transition: "all 0.3s ease",
                      boxShadow: "0 3px 6px rgba(95, 77, 122, 0.3)",
                    }}
                  onClick={() => handleDelete(blog._id)}
                  onMouseEnter={(e) => {
  e.currentTarget.style.background = "linear-gradient(90deg, #D10000, #FF5F5F)";
  e.currentTarget.style.boxShadow = "0 6px 15px rgba(255, 95, 95, 0.7)";
  e.currentTarget.style.transform = "translateY(-2px)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.background = "linear-gradient(90deg, #FF5F5F, #D10000)";
  e.currentTarget.style.boxShadow = "0 3px 6px rgba(209, 0, 0, 0.4)";
  e.currentTarget.style.transform = "translateY(0)";
}}
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
