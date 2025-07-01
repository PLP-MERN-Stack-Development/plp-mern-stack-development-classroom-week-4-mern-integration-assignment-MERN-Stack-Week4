import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', content: '', category: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setForm({
          title: data.title,
          content: data.content,
          category: data.category,
        });
      } catch (err) {
        setError('Failed to load post');
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        form,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      alert('Post updated!');
      navigate('/');
    } catch (err) {
      setError('Failed to update post');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4">Edit Post</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full border p-2 rounded" />
        <textarea name="content" value={form.content} onChange={handleChange} rows={5} className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default EditPost;

