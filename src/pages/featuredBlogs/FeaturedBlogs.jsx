import { useEffect, useState } from "react";

const FeaturedBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/blogs")
      .then((res) => res.json())
      .then((data) => {
        // Sort by word count of longDescription (descending)
        const sorted = data
          .sort((a, b) => {
            const aCount = a.longDescription?.split(/\s+/).length || 0;
            const bCount = b.longDescription?.split(/\s+/).length || 0;
            return bCount - aCount;
          })
          .slice(0, 10); // Top 10

        setBlogs(sorted);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">🌟 Featured Blogs (Top 10 by Word Count)</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Word Count</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr key={blog._id}>
                <td>{index + 1}</td>
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td>{blog.category}</td>
                <td>{blog.longDescription?.split(/\s+/).length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
