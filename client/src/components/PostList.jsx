import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await api.getPosts();
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="post-list">
      <h1>Blog Posts</h1>
      <Link to="/create" className="btn">Create New Post</Link>
      {posts.map(post => (
        <div key={post._id} className="post-card">
          <h2>{post.title}</h2>
          <p>{post.content.substring(0, 100)}...</p>
          <Link to={`/edit/${post._id}`} className="btn">Edit</Link>
        </div>
      ))}
    </div>
  );
}