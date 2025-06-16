import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyWishList = () => {
  const { user } = useContext(AuthContext);
  const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();

  console.log(wishList);
  

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/wishlist?email=${user.email}`,{
        withCredentials: true
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
        axios.delete(`http://localhost:3000/wishlist/${id}`).then((res) => {
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
      <h2 className="text-3xl font-bold mb-6 text-center">🧡 My Wishlist</h2>
      {wishList.length === 0 ? (
        <p className="text-center text-gray-600">You have no blogs in your wishlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishList.map((blog) => (
            <div key={blog._id} className="border shadow-md rounded-xl p-4 flex flex-col h-full">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{blog.shortDescription}</p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Category:</span> {blog.category}
              </p>
              <p className="text-sm mt-1">
                ✍ <span className="italic">{blog.author}</span>
              </p>

              <div className="flex gap-2 mt-auto pt-4">
                <button
                  onClick={() => navigate(`/blogDetails/${blog.blogId}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
                >
                  Details
                </button>
                <button
                  onClick={() => handleRemove(blog._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full"
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
