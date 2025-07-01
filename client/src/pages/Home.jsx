import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const user = JSON.parse(localStorage.getItem('userInfo'));

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/posts')
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching posts');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Latest Posts</h1>
      <div className="space-y-4">
        {posts.length === 0 && (
          <div className="text-gray-500">No posts found.</div>
        )}
        {posts.map(post => (
          <div key={post._id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-700">{post.title}</h2>
            <p className="text-sm text-gray-600 mb-2">
              Category: {post.category?.name || 'Uncategorized'}
            </p>
            <p className="text-gray-700">{post.content.slice(0, 100)}...</p>
            <Link
              to={`/posts/${post._id}`}
              className="inline-block mt-3 text-blue-600 hover:underline"
            >
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

