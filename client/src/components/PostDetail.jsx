import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to fetch post.");
      }
    };

    fetchPost();
  }, [id]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
  <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
    <h1 className="text-3xl font-bold mb-4 text-gray-800">{post.title}</h1>

    <div className="text-sm text-gray-500 mb-2">
      <span className="mr-4">Category: <strong>{post.category}</strong></span>
      <span>By: <strong>{post.author?.name || 'Unknown'}</strong></span><br />
      <span>{new Date(post.createdAt).toLocaleString()}</span>
    </div>

    <hr className="my-4" />

    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
      {post.content}
    </div>
  </div>
  );
};

export default PostDetails;

