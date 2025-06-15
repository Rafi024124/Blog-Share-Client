import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';

const BlogDetails = () => {
  const { user } = useContext(AuthContext);
  const blog = useLoaderData();
  const navigate = useNavigate();

  const {
    _id,
    title,
    image,
    category,
    shortDescription,
    longDescription,
    author,
    email,
  } = blog;

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/comments/${_id}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [_id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const commentData = {
      text: comment,
      blogId: _id,
      author: user.displayName,
      author_email: user.email,
      photo: user.photoURL,
    };

    fetch(`http://localhost:3000/comments`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(commentData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: 'Comment added successfully!',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });

          const newComment = {
            _id: data.insertedId,
            ...commentData,
          };

          setComments([...comments, newComment]);
          setComment('');
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-12 max-w-5xl mx-auto rounded-3xl flex flex-col items-center">
      <button
        onClick={() => navigate('/allBlogs')}
        className="self-start mb-8 px-5 py-2 rounded-lg shadow-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-300"
      >
        ← Back
      </button>

      {user?.email === email && (
        <button
          onClick={() => navigate(`/updateBlog/${_id}`)}
          className="mb-4 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow"
        >
          ✏️ Update Blog
        </button>
      )}

      <div className="w-full bg-white rounded-3xl p-10 border border-gray-200 shadow-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-72 md:h-96 object-cover rounded-2xl mb-8"
        />

        <h1 className="text-5xl font-extrabold text-center text-[#A53860] mb-8">
          {title}
        </h1>

        <div className="space-y-6 text-gray-800 text-lg">
          <p>
            <span className="font-semibold">📂 Category:</span> {category}
          </p>
          <p>
            <span className="font-semibold">📝 Short Description:</span> {shortDescription}
          </p>
          <p>
            <span className="font-semibold">📖 Full Blog:</span> {longDescription}
          </p>
          <p className="text-sm text-gray-600 italic">
            ✍️ Written by <span className="font-semibold text-[#A53860]">{author}</span> ({email})
          </p>
        </div>

        {/* Comment Section */}
        {user?.email === email ? (
          <p className="mt-12 text-center text-red-600 font-semibold">
            You cannot comment on your own blog.
          </p>
        ) : (
          <form onSubmit={handleCommentSubmit} className="mt-12 space-y-4">
            <label htmlFor="comment" className="block font-semibold text-2xl mb-2">
              💬 Leave a Comment
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="textarea textarea-bordered w-full h-28 rounded-lg border-gray-300 focus:border-[#A53860] focus:ring-2 focus:ring-[#A53860]"
              placeholder="Write your comment here..."
              required
            />
            <button
              type="submit"
              className="btn btn-success w-full bg-[#A53860] hover:bg-[#8b2e52] text-white rounded-lg py-3"
            >
              Submit Comment
            </button>
          </form>
        )}

        {comments.length > 0 && (
          <section className="mt-14">
            <h3 className="text-3xl font-bold mb-6 border-b pb-2">
              🐨 Comments ({comments.length})
            </h3>
            <ul className="space-y-6 max-h-96 overflow-y-auto pr-4">
              {comments.map((c, idx) => (
                <li key={c._id || idx} className="bg-gray-100 rounded-xl p-5 shadow-sm flex gap-4">
                  <img
                    src={c.photo || 'https://via.placeholder.com/48?text=User'}
                    alt="user"
                    className="rounded-full w-12 h-12 object-cover border-2 border-[#A53860]"
                  />
                  <div>
                    <p className="font-semibold text-[#A53860]">{c.author}</p>
                    <p className="text-gray-700">{c.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;