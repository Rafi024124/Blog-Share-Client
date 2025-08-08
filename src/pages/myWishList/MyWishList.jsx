import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyWishList = () => {
  const { user } = useContext(AuthContext);
  const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/wishlist?email=${user.email}`, {
          withCredentials: true,
        })
        .then((res) => {
          setWishList(res.data);
        });
    }
  }, [user?.email]);

  const handleRemove = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This blog will be removed from your wishlist.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/wishlist/${id}`, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setWishList(wishList.filter((item) => item._id !== id));
              Swal.fire('Removed!', 'The blog has been removed.', 'success');
            }
          });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: '#AA98A9' }}
      >
        🧡 My Wishlist
      </h2>
      {wishList.length === 0 ? (
        <p className="text-center" style={{ color: '#AA98A9' }}>
          You have no blogs in your wishlist yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishList.map((blog) => (
            <div
              key={blog._id}
              className="rounded-xl p-4 flex flex-col h-full shadow-md"
              style={{ backgroundColor: '#E6E6FA' }} // lighter Lavender background
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h3
                className="text-xl font-semibold mb-1"
                style={{ color: '#AA98A9' }}
              >
                {blog.title}
              </h3>
              <p className="text-sm mb-2" style={{ color: '#AA98A9' }}>
                {blog.shortDescription}
              </p>
              <p className="text-sm" style={{ color: '#AA98A9' }}>
                <span className="font-semibold">Category:</span> {blog.category}
              </p>
              <p className="text-sm italic mt-1" style={{ color: '#AA98A9' }}>
                ✍ {blog.author}
              </p>

              <div className="flex gap-2 mt-auto pt-4">
                <button
                  onClick={() => navigate(`/blogDetails/${blog.blogId}`)}
                  className="py-2 px-4 rounded w-full font-semibold transition-colors duration-300"
                  style={{
                    backgroundColor: '#CF9FFF',
                    color: '#3a0059',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#b37fff')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = '#CF9FFF')
                  }
                >
                  Details
                </button>
                <button
                  onClick={() => handleRemove(blog._id)}
                  className="py-2 px-4 rounded w-full font-semibold transition-colors duration-300"
                  style={{
                    backgroundColor: '#CF9FFF',
                    color: '#3a0059',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#b37fff')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = '#CF9FFF')
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWishList;
