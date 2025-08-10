import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyWishList = () => {
  const { user } = useContext(AuthContext);
  const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://blog-share-server.vercel.app/wishlist?email=${user.email}`, {
          withCredentials: true,
        })
        .then((res) => {
          setWishList(res.data);
        });
    }
  }, [user?.email]);

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This blog will be removed from your wishlist.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://blog-share-server.vercel.app/wishlist/${id}`, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setWishList(wishList.filter((item) => item._id !== id));
              Swal.fire("Removed!", "The blog has been removed.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h2
        className="text-3xl font-bold mb-8 text-center"
        style={{ color: "#AA98A9" }}
      >
        🧡 My Wishlist
      </h2>

      {wishList.length === 0 ? (
        <p className="text-center" style={{ color: "#AA98A9" }}>
          You have no blogs in your wishlist yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishList.map((blog) => (
            <div
              key={blog._id}
              className="card card-compact rounded-2xl overflow-hidden relative flex flex-col border backdrop-blur-sm shadow-xs hover:shadow-md transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, rgba(203,195,227,0.99), rgba(170,152,169,0.85))",
                border: "1.5px solid rgba(170, 152, 169, 0.5)",
                color: "#4B4453",
              }}
            >
              <figure className="relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
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
                  className="card-title font-bold text-lg text-center"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "block",
                    maxWidth: "290px",
                    margin: "0 auto",
                  }}
                  title={blog.title}
                >
                  {blog.title}
                </h2>

                <p
                  className="flex-grow text-center text-sm max-w-[290px] truncate mt-2"
                  style={{
                    color: "#5E4B7B",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    margin: "0 auto",
                  }}
                  title={blog.shortDescription}
                >
                  {blog.shortDescription}
                </p>

                <p
                  className="text-center text-xs italic mt-1"
                  style={{ color: "#7B6799" }}
                  title={`Author: ${blog.author}`}
                >
                  ✍ {blog.author}
                </p>

                <div className="card-actions justify-between mt-6 gap-4">
                  <button
                    className="btn btn-sm rounded-lg shadow-md flex-grow"
                    style={{
                      background: "linear-gradient(90deg, #5F4D7A, #8B74A4)",
                      border: "none",
                      color: "white",
                      fontWeight: "700",
                      letterSpacing: "0.5px",
                      transition: "all 0.3s ease",
                      boxShadow: "0 3px 6px rgba(95, 77, 122, 0.3)",
                    }}
                    onClick={() => navigate(`/blogDetails/${blog.blogId}`)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(90deg, #8B74A4, #A58BBE)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 15px rgba(155, 129, 185, 0.6)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(90deg, #5F4D7A, #8B74A4)";
                      e.currentTarget.style.boxShadow =
                        "0 3px 6px rgba(95, 77, 122, 0.3)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    Details
                  </button>

                  <button
                    className="btn btn-sm btn-outline rounded-lg flex-grow"
                    style={{
                      border: "2px solid #7B6799",
                      color: "#5F4D7A",
                      background: "rgba(123, 103, 153, 0.08)",
                      fontWeight: "900",
                      transition: "all 0.3s ease",
                    }}
                    onClick={() => handleRemove(blog._id)}
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
                    Remove
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

export default MyWishList;
