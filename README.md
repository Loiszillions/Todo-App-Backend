# 📝 To-Do App Backend

## 📌 Overview
The **To-Do App Backend** is a Node.js and Express-based REST API that provides user authentication, task management, and user role management. It allows users to register and log in using **JWT authentication** and perform CRUD operations on their tasks. Additionally, an admin can manage users by viewing all registered users and deleting specific users.

## 🚀 Features
- **User Authentication**: Users can register and log in using **JWT authentication**.
- **Task Management**:
  - Create, read, update, and delete tasks.
  - Search for tasks based on their **status** (pending or completed).
- **User Role Management**:
  - An **admin** is manually created and can add other admins.
  - Admins have additional privileges such as managing users.
- **Admin Privileges**:
  - View all registered users.
  - Delete a specific user by ID.

## 🏗️ Tech Stack
- **Node.js** (Backend runtime environment)
- **Express.js** (Web framework for Node.js)
- **MongoDB & Mongoose** (Database and ODM for handling data)
- **JWT (JSON Web Token)** (Authentication)
- **bcrypt.js** (Password hashing for security)
- **dotenv** (Environment variable management)

## 🔑 Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/Loiszillions/Todo-App-Backend.git
   cd todo-app-backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file and configure the following environment variables:
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/todoapp
   JWT_SECRET=your_secret_key
   ```

4. Start the server:
   ```sh
   npm start
   ```

## 📜 API Endpoints

### **User Routes** (`/users`)
| Method | Endpoint         | Description |
|--------|-----------------|-------------|
| POST   | `/register`      | Register a new user |
| POST   | `/login`         | Log in an existing user (Returns JWT token) |

### **Task Routes** (`/tasks`)
| Method | Endpoint                  | Description |
|--------|---------------------------|-------------|
| GET    | `/`                        | Get all tasks for logged-in user |
| POST   | `/`                        | Create a new task |
| GET    | `/:id`                     | Get a specific task by ID |
| PUT    | `/:id`                     | Update a specific task |
| DELETE | `/:id`                     | Delete a task by ID |
| GET    | `/search?status=pending`   | Get all pending tasks |
| GET    | `/search?status=completed` | Get all completed tasks |

### **Admin Routes** (`/admin`)
| Method | Endpoint        | Description |
|--------|----------------|-------------|
| GET    | `/users`       | Get all registered users |
| DELETE | `/users/:id`   | Delete a specific user by ID |

## 🔐 Authentication
All **task-related and admin routes** are **protected** and require a valid **JWT token** in the request headers.

**Example:** Add the token in the request header:
```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```

## ⚡ Role Management
- The **first admin** must be manually created in the database.
- Admins can promote other users to **admin**.
- Admins can **view and delete users**.

## 🛠️ Tools & Libraries Used
- **bcrypt.js** → Hashes passwords for security.
- **jsonwebtoken (JWT)** → Secure user authentication.
- **Mongoose** → Connects and interacts with MongoDB.
- **Express.js** → Manages backend routes and middleware.

## 🏗️ Future Enhancements
- Implement task **due dates and reminders**.
- Allow **task categories and priority levels**.
- Add **pagination** for large datasets.
- Implement **email notifications** for task reminders.
