# MERN Blog Application 📝

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React, and Node.js). It supports user authentication, CRUD functionality for blog posts, category filtering, and future enhancements like image uploads and comments.

---

## 🚀 Features

- User Registration & Login (JWT-based auth)
- Create, Read, Update, Delete (CRUD) blog posts
- Categorize blog posts
- View full post details
- Protected routes based on authentication
- Responsive UI with modern design
- MongoDB database integration

---

## 🗂 Project Structure

mern-blog/
├── client/ # React front-end
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Route-level components
│ │ ├── context/ # Auth context provider
│ │ ├── hooks/ # Custom React hooks (future expansion)
│ │ ├── services/ # API abstraction (optional)
│ │ └── App.jsx # App router
├── server/ # Express.js back-end
│ ├── controllers/ # Route handlers
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── middleware/ # Auth middleware
│ └── server.js # Server entry point


---

## 🧰 Tech Stack

- **Frontend**: React, Axios, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **State Management**: React Context (Auth)
- **Dev Tools**: Vite, Nodemon, Postman

---

## 📸 Screenshots
### Dashboard 
 ![Dashbord Screenshot](./client/public/Screenshot%201.png)

### Login Page 
![Login Screenshot](./client/public/Screenshot%202.png)

### Create New Post 
![Create Post](./client/public/Screenshot%203.png)

### Post Detail 
![Post Detail](./client/public/Screenshot%204.png)



Example:

- ✅ Registration and Login Pages  
- ✅ Dashboard showing list of posts  
- ✅ Create / Edit / Delete functionality  
- ✅ View single blog post  

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/mern-blog.git
cd mern-blog
```

### 2. Install dependencies 

# Backend
cd server
pnpm install

# Frontend
cd ../client
pnpm install

## Configure environment variables 

Create .env in /server:

MONGODB_URI=mongodb://localhost:27017/mernblog
JWT_SECRET=your_jwt_secret
NODE_ENV=development

## Start the development servers 

# Backend (in /server)
pnpm run dev

# Frontend (in /client)
pnpm run dev

## 🛠 API Endpoints

Method	Endpoint	Description
GET	/api/posts	Get all posts
GET	/api/posts/:id	Get single post by ID
POST	/api/posts	Create post (auth only)
PUT	/api/posts/:id	Update post (auth only)
DELETE	/api/posts/:id	Delete post (auth only)
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Log in a user
GET	/api/categories	Get post categories

## Author 

Andiswa Cyria Molangathi 

## 📌 To Do / Future Features

🖼 Image Upload for posts

💬 Comments on posts

🧪 Unit & integration tests

🌐 Deployment to Render or Vercel

