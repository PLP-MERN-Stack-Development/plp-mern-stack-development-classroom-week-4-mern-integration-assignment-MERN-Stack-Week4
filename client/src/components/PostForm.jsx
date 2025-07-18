import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '' });

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const data = await api.getPost(id);
          setPost(data);
        } catch (err) {
          console.error('Failed to fetch post:', err);
        }
      };
      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.updatePost(id, post);
      } else {
        await api.createPost(post);
      }
      navigate('/');
    } catch (err) {
      console.error('Failed to save post:', err);
    }
  };

  return (
    <div className="post-form">
      <h1>{id ? 'Edit Post' : 'Create Post'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          placeholder="Title"
          required
        />
        <textarea
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          placeholder="Content"
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}