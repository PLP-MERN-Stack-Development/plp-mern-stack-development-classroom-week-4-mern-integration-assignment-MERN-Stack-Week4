import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Delete post handler
  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setPosts(posts.filter(post => post._id !== postId)); // remove from UI
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">All Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post._id} className="p-4 bg-white shadow rounded">
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="text-gray-700">{post.content.slice(0, 100)}...</p>
              <p className="text-sm text-gray-500">Category: {post.category}</p>

              {user && post.author && user._id === post.author._id &&(
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                  {/* Example Edit button */}
                  <button
                    onClick={() => {/* navigate to edit page */}}
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;

