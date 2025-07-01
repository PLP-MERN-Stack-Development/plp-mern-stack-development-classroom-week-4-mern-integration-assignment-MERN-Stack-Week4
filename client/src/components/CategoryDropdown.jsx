import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const CategoryDropdown = ({ selected, onChange }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/categories')
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch categories', err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      
      <select
        id="category"
        name="category"
        value={selected}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        required
      >
        <option value="">Select a category</option>
        {loading ? (
          <option disabled>Loading...</option>
        ) : (
          categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default CategoryDropdown;
