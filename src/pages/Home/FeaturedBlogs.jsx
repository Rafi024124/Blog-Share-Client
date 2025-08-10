import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import FeaturedBlogCard from "./FeaturedBlogCard";
import { AuthContext } from "../../providers/AuthProvider";

const FeaturedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [sortAsc, setSortAsc] = useState(false); // false = desc, true = asc
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("https://blog-share-server.vercel.app/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
      });
  }, []);

  const sortedBlogs = React.useMemo(() => {
    return [...blogs]
      .sort((a, b) => {
        const aCount = a.longDescription?.split(/\s+/).length || 0;
        const bCount = b.longDescription?.split(/\s+/).length || 0;
        return sortAsc ? aCount - bCount : bCount - aCount;
      })
      .slice(0, 8);
  }, [blogs, sortAsc]);

  const handleDetails = (id) => {
    navigate(`/blogDetails/${id}`);
  };

  const handleWishlist = (blog) => {
    if (!user?.email) {
      Swal.fire("Oops!", "Please login to add to wishlist.", "info");
      return;
    }
    const { _id, ...rest } = blog;
    const wishList = {
      userEmail: user.email,
      blogId: _id,
      ...rest,
    };

    axios
      .post(`https://blog-share-server.vercel.app/wishlist`, wishList, {
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
    <section className="py-14 px-4  rounded-3xl max-w-7xl mx-auto">
      <div className="flex flex-col gap-3 justify-between items-center mb-8">
        <h2 className="text-4xl font-extrabold text-[#AA98A9] text-center]">
          Featured Blogs
        </h2>
        <button
          onClick={() => setSortAsc((prev) => !prev)}
          className="btn btn-outline rounded-lg text-[#7B6799]"
          style={{
            borderColor: "#7B6799",
            fontWeight: "600",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#7B6799";
            e.currentTarget.style.color = "white";
            e.currentTarget.style.borderColor = "#7B6799";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#7B6799";
            e.currentTarget.style.borderColor = "#7B6799";
          }}
        >
          Sort by Word Count: {sortAsc ? "Low → High" : "High → Low"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {sortedBlogs.map((blog) => (
          <FeaturedBlogCard
            key={blog._id}
            blog={blog}
            onDetailsClick={handleDetails}
            onWishlistClick={handleWishlist}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedBlogs;
