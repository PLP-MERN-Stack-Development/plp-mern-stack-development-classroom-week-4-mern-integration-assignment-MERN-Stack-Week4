import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="p-4 bg-black text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        <Link to="/">MERN Blog</Link>
      </h1>
      <Link to="/create" className="text-pink-300 hover:underline">
        Create Post
      </Link>
    </nav>
  );
}
