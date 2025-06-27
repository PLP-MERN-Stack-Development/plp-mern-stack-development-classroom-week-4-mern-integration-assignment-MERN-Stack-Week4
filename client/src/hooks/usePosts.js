import { useEffect, useState } from 'react';
import { postService } from '../services/api';

export const usePosts = (category = null, page = 1, limit = 10) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await postService.getAllPosts(page, limit, category);
        setPosts(data);
      } catch (err) {
        setError(err.message || 'Error loading posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [category, page, limit]);

  return { posts, loading, error };
};
