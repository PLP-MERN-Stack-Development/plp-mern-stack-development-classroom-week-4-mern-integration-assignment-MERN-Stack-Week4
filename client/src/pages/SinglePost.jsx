import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api';

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    API.get(`/posts/${id}`).then((res) => setPost(res.data));
  }, [id]);

  if (!post) return <p className="p-4">Loading post...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="text-gray-600 mt-1">
        Category: {post.category?.name} | Author: {post.author}
      </p>
      <div className="mt-4">{post.content}</div>
      {post.image && (
        <img src={`/uploads/${post.image}`} alt="Post" className="mt-4 max-w-full" />
      )}
    </div>
  );
}
