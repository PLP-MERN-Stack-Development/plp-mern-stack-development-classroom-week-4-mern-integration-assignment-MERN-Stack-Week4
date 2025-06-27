import { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: '',
    author: '',
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/categories').then((res) => setCategories(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post('/posts', form)
      .then(() => navigate('/'))
      .catch(console.error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await postService.createPost(form);
      navigate('/');
    } catch (error) {
      alert('Failed to create post:' + error.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className={`w-full border p-2 ${!form.title && 'border-red-500'}`}
        />
        {!form.title && <p className="text-red-500 text-sm">Title is required</p>}
        
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Content"
          required
          className="w-full border p-2"
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          required
          className="w-full border p-2"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full border p-2"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option value={cat._id} key={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
