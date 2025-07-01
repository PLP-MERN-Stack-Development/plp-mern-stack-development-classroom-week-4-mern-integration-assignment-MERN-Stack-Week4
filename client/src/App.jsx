import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostDetail from './components/PostDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import PostList from './components/PostList';
import EditPost from './pages/EditPost';

import './index.css'; // Import Tailwind CSS




// Main App component
function App() {
  return (
    <Router>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/edit/:id" element={<EditPost />} />

        </Routes>
      </main>
    </Router>
  );
}

export default App;

