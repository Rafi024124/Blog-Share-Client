import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';

const BlogDetails = () => {
  const {user} = useContext(AuthContext)  
  const blog = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  const previousPage = location.state?.from;

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
        photo: user.photoURL


     }
    
     fetch(`http://localhost:3000/comments`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(commentData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire({
                title: "Comment added successfully!",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });

    const newComment = { 
      _id: data.insertedId, 
      ...commentData
    };

    setComments([...comments, newComment]);  
    setComment('');
            }
          });
  };

  return (
    <div className="max-w-7xl mx-auto rounded-3xl mt-2 px-4 py-10 min-h-screen flex flex-col items-center">
      <button
        onClick={() => navigate(previousPage)}
        className="mb-6 self-start px-4 py-2 rounded shadow text-white bg-green-600 hover:bg-green-700 transition-colors duration-300"
      >
        ← Back
      </button>

      <div className="w-full max-w-4xl rounded-3xl p-8 border shadow-2xl transition-all duration-300 hover:shadow-green-300">
        <div className="flex flex-col gap-6 items-center">
          <img
            src={image}
            alt={title}
            className="w-full h-72 object-cover rounded-2xl shadow-lg border-4 border-white"
          />
          <h2 className="text-4xl font-bold text-center">{title}</h2>

          <div className="space-y-3 text-lg w-full">
            <p>
              <span className="font-semibold">📂 Category:</span>{' '}
              <span className="inline-block px-3 py-1 rounded-full shadow-sm bg-green-100 text-green-800">
                {category}
              </span>
            </p>

            <p>
              <span className="font-semibold">📝 Short Description:</span> {shortDescription}
            </p>

            <p>
              <span className="font-semibold">📖 Full Blog:</span> {longDescription}
            </p>

            <p className="text-sm mt-4">
              ✍️ Written by: <span className="font-medium">{author}</span> ({email})
            </p>
          </div>

          {/* Comment Box */}
         {
          user?.email == email ?(
              <p>Cannot comment on own blog</p>
          )
         : (
           <form onSubmit={handleCommentSubmit} className="w-full mt-8 space-y-4">
            <label className="block font-semibold text-lg">💬 Leave a Comment</label>
            <textarea
              
              onChange={(e)=>setComment(e.target.value)}
              className="textarea textarea-bordered w-full h-24"
              placeholder="Write your comment here..."
              required
            />
            <button
              type="submit"
             
              className="btn btn-success w-full"
            >
              Submit Comment
            </button>
          </form>
        
      )}
        

          {/* Display Comments */}
          {comments.length > 0 && (
            <div className="w-full mt-6">
              <h3 className="text-xl font-bold mb-2">🗨 Comments</h3>
              <ul className="space-y-2">
                {comments.map((c, index) => (
                  <li
                    key={index}
                    className="p-3 bg-gray-100 rounded shadow text-gray-700"
                  >
                    <div className='flex gap-2 justify-start items-center'>
                        <div className='flex flex-col justify-center items-center'>
                          <img src={c.photo} alt="" className='rounded-full w-12'/>
                          <p className='text-xs'>{c.author}</p>
                        </div>
                        <div>
                            {c.text}
                        </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
