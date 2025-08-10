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
    fetch(`https://blog-share-server.vercel.app/comments/${_id}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [_id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const commentData = {
      text: comment.trim(),
      blogId: _id,
      author: user.displayName,
      author_email: user.email,
      photo: user.photoURL,
      createdAt: new Date().toISOString(),
    };

    fetch(`https://blog-share-server.vercel.app/comments`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(commentData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: 'Comment added!',
            icon: 'success',
            timer: 1400,
            showConfirmButton: false,
            background: '#2A2540',
            color: '#AA98A9',
            iconColor: '#A53860',
          });

          const newComment = { _id: data.insertedId, ...commentData };
          setComments((prev) => [...prev, newComment]);
          setComment('');
        }
      });
  };

  return (
    <div className="min-h-screen bg-[#1C1C1C] px-2 py-12 max-w-7xl mx-auto rounded-3xl flex flex-col text-gray-200 font-sans">
      <button
        onClick={() => navigate('/allBlogs')}
        
                    style={{
                      background: "linear-gradient(90deg, #5F4D7A, #8B74A4)",
                      border: "none",
                      color: "white",
                      fontWeight: "700",
                      letterSpacing: "0.5px",
                      transition: "all 0.3s ease",
                      boxShadow: "0 3px 6px rgba(95, 77, 122, 0.3)",
                    }}
                    
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
       
       
        className="mb-2 self-start px-6 py-2 rounded-lg bg-[#bc88f1] hover:bg-[#8b2e52] font-semibold shadow-lg transition-colors duration-300"
      >
        ← Back
      </button>

     

      {/* Main container */}
      <div
        style={{
          background:
            'linear-gradient(135deg, rgba(203,195,227,0.99), rgba(170,152,169,0.85))', // soft purple gradient
          border: '1.5px solid rgba(170, 152, 169, 0.5)',
        }}
        className="flex flex-col md:flex-row gap-12 bg-gray-900 bg-opacity-70  p-10 shadow-2xl border border-gray-700"
      > 
      
        {/* Left: Image */}
        <div className="md:w-1/2 rounded-2xl overflow-hidden shadow-xl">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Right: Info */}
        <div className="md:w-1/2 flex flex-col justify-center space-y-8 px-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-[#4B4453] drop-shadow-lg">
            {title}
          </h1>

          <p className="text-lg bg-[#4B4453] bg-clip-text text-transparent font-semibold">
            📂 {category}
          </p>

          <p className="text-[#4B4453] text-lg leading-relaxed border-l-4 border-[#350843] pl-4 italic drop-shadow-sm">
            {shortDescription}
          </p>

          <p className="text-[#4B4453] whitespace-pre-line leading-relaxed tracking-wide text-lg">
            {longDescription}
          </p>

          <p className="mt-8 text-sm italic text-[#4B4453] flex items-center gap-2">
            ✍️ Written by{' '}
            <span className="font-semibold text-[#4B4453]">{author}</span> ({email})
          </p>
           {user?.email === email && (
        <button
          className="btn btn-sm rounded-lg shadow-md self-start mb-6"
          style={{
            background: 'linear-gradient(90deg, #3A8DFF, #1C6FFF)',
            border: 'none',
            color: 'white',
            fontWeight: '700',
            letterSpacing: '0.5px',
            transition: 'all 0.3s ease',
            boxShadow: '0 3px 6px rgba(95, 77, 122, 0.3)',
          }}
          onClick={() => navigate(`/updateBlog/${_id}`)}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(90deg, #1C6FFF, #3A8DFF)';
            e.currentTarget.style.boxShadow = '0 6px 15px rgba(58, 141, 255, 0.7)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(90deg, #3A8DFF, #1C6FFF)';
            e.currentTarget.style.boxShadow = '0 3px 6px rgba(28, 111, 255, 0.4)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Update
        </button>
      )}
        </div>
      </div>

      {/* Comment Section */}
      <section
        className="w-full  p-8 shadow-2xl border border-[#AA98A9]"
        style={{
          backgroundColor: '#2A2540',
        }}
      >
        <h3 className="text-4xl font-bold mb-8 text-[#AA98A9] tracking-wider border-b border-[#AA98A9] pb-3">
          🐨 Comments ({comments.length})
        </h3>

        {user?.email === email ? (
          <p className="mb-8 text-center text-[#AA98A9] font-semibold">
            You cannot comment on your own blog.
          </p>
        ) : (
          <form onSubmit={handleCommentSubmit} className="mb-10 flex flex-col space-y-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="resize-none rounded-xl bg-[#3B3655] border-none text-white p-5 shadow-inner
                         focus:outline-none focus:ring-4 focus:ring-[#AA98A9] focus:border-[#AA98A9] transition duration-300
                         placeholder-[#AA98A9] h-[60px]"
              placeholder="Write your comment here..."
              required
            />
            <button
              type="submit"
              disabled={!comment.trim()}
              className={`self-end rounded-xl px-8 py-3 font-semibold shadow-lg transition
                ${
                  comment.trim()
                    ? 'bg-gradient-to-r from-[#5F4D7A] to-[#8B74A4] hover:brightness-110'
                    : 'bg-gray-700 cursor-not-allowed opacity-60'
                } text-white`}
            >
              Submit Comment
            </button>
          </form>
        )}

        <ul className="space-y-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#AA98A9]/60 scrollbar-track-[#2A2540]">
          {comments.length ? (
            comments.map((c, idx) => (
              <li
                key={c._id || idx}
                className="flex space-x-5 bg-[#3B3655] rounded-2xl p-5 shadow-lg
                  border border-[#AA98A9] hover:shadow-[#AA98A9]/70 transition-shadow duration-300"
              >
                <img
                  src={c.photo || 'https://via.placeholder.com/48?text=User'}
                  alt={c.author}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#AA98A9]"
                  loading="lazy"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-[#AA98A9] text-lg tracking-wide">{c.author}</p>
                    <time
                      className="text-xs text-gray-400 font-mono"
                      title={new Date(c.createdAt).toLocaleString()}
                    >
                      {new Date(c.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                  <p className="mt-2 text-gray-300 leading-relaxed whitespace-pre-line">{c.text}</p>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-20 select-none">
              No comments yet. Be the first to comment!
            </p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default BlogDetails;
