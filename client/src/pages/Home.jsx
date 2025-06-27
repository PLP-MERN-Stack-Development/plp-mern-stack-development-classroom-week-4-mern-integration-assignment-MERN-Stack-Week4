import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';

export default function Home() {
  const { posts, loading, error } = usePosts();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Posts</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post._id} className="border p-4 rounded bg-white shadow">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p>{post.content.substring(0, 100)}...</p>
              <Link to={`/posts/${post._id}`} className="text-blue-600 hover:underline">
                Read More
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No posts available.</p>
      )}
    </div>
  );
}
