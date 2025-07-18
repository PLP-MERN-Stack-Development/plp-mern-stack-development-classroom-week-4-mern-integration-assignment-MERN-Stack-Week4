import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">My Blog</Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/create" className="nav-link">Create Post</Link>
      </div>
    </nav>
  );
}