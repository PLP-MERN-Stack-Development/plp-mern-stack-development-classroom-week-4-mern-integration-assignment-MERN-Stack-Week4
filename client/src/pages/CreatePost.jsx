import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CategoryDropdown from '../components/CategoryDropdown';

const CreatePost = () => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("userInfo")); // <-- Consistent key here!
    if (!user || !user.token) {
      setError("You must be logged in to create a post");
      return;
    }

    try {
      console.log("Submitting post with token:", user.token);

      await axios.post(
        "http://localhost:5000/api/posts",
        {
          title: form.title,
          content: form.content,
          category: form.category,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Post created successfully!");
      // Optionally navigate to posts or home page
      // navigate('/posts');
    } catch (error) {
      console.error("Error submitting post:", error);
      setError("Failed to submit post");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a New Post</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Category</label>
          <CategoryDropdown
            selected={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows="6"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

