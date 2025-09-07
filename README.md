# RBAC Permissions Project

> **Production-ready Role-Based Access Control (RBAC) mini-project showcasing Group Roles and Hierarchical Permissions**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Here-2ea44f?style=for-the-badge)](https://rbac-ideft.vercel.app)

## Overview

This mini-project demonstrates a **Role-Based Access Control (RBAC)** system with **Group Roles** and **Hierarchical Permissions** to manage user access. Built to showcase permission management skills, it features a React-based frontend and an Express.js backend.

**Architecture:**
- **Frontend**: React application ([https://rbac-ideft.vercel.app](https://rbac-ideft.vercel.app))
- **Backend**: Node.js + Express API server ([https://rbac-ideft.onrender.com](https://rbac-ideft.onrender.com))

**Key Features:**
- 🔐 Role-based authentication using JSON Web Tokens (JWT)
- 🔄 Group Roles and Hierarchical Permissions for flexible access control
- 🚀 Independent deployment for frontend and backend
- ⚡ Responsive UI with Material-UI components
- 🔔 Real-time notifications with React Toastify
- 📋 Demo users for immediate testing



## Technical Implementation

**Frontend** (`http://localhost:5173`)
```bash
cd web-rbac-permissions
yarn install
yarn dev
```

**Backend** (`http://localhost:8080`)
```bash
cd api-rbac-permissions
yarn install
yarn dev
```

**Technology Stack:**
- **Frontend**: React 18.2.0, Vite 5.2.0, Material-UI 5.15.18, React Hook Form 7.51.5
- **Backend**: Node.js 20.x, Express 4.18.2, Babel transpilation
- **Authentication**: JSON Web Tokens (jsonwebtoken 9.0.2)
- **Deployment**: Vercel (frontend), Render (backend)

## Authentication Flow
<div align="center">
<div>
  <img src="https://github.com/user-attachments/assets/c77ebade-790d-4214-a226-5a14917af30a" width="400" alt="Admin Dashboard" style="display:inline-block; margin:8px;">
  <img src="https://github.com/user-attachments/assets/b32b40e5-8ff6-4e23-8699-496201f4990c" width="400" alt="Moderator Dashboard" style="display:inline-block; margin:8px;">
  <img src="https://github.com/user-attachments/assets/99ecb8e4-9781-4ea4-8fcf-062464ec19e8" width="400" alt="Client Dashboard" style="display:inline-block; margin:8px;">

</div>

***Admin Login** → Role: Admin → Access: admin_tools + messages + support*  
***Moderator Login** → Role: Moderator → Access: messages + support → Denied: admin_tools*  
***Client Login** → Role: Client → Access: support only → Denied: messages + admin_tools*  
  
</div>

1. User logs in using demo credentials via the frontend
2. Backend validates credentials and issues a JWT
3. Frontend stores the JWT for authenticated requests
4. Permissions enforced based on roles and inherited permissions
5. Logout clears the JWT and session

**Demo Users:**

| Email                   | Password       | Role       | Permissions (including inherited)                              |
|-------------------------|----------------|------------|---------------------------------------------------------------|
| `admin-rbac@gmail.com`  | `admin@123`    | Admin      | create/read/update/delete: admin_tools, message, support       |
| `moderator-rbac@gmail.com` | `moderator@123` | Moderator | create/read/update/delete: message, support                   |
| `client-rbac@gmail.com` | `client@123`   | Client     | create/read/update/delete: support                           |

**Role Hierarchy:**
- **Client**: Permissions for support-related actions
- **Moderator**: Inherits Client permissions + message-related actions
- **Admin**: Inherits Client and Moderator permissions + admin tools

## Project Structure

```
project/
├── web-rbac-permissions/   # React frontend application
├── api-rbac-permissions/   # Express API server
└── README.md              # This file
```

## Development & Production Scripts

**Frontend Commands:**
```bash
yarn dev             # Vite dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # ESLint validation
```

**Backend Commands:**
```bash
yarn dev             # Development with Babel + Nodemon
npm run build        # Clean + Babel transpilation
npm run production   # Build + Production server
npm run lint         # ESLint validation
```

## Key Dependencies

**Frontend:**
- `@mui/material`, `@mui/icons-material`, `@mui/lab` - Material-UI components for UI
- `axios` - HTTP client for API communication
- `react-hook-form` - Form management
- `react-router-dom` - Client-side routing
- `react-toastify` - Notification system
- `@vitejs/plugin-react-swc`, `vite` - Fast build and refresh with Vite

**Backend:**
- `jsonwebtoken` - JWT-based authentication
- `cors` - Cross-Origin Resource Sharing configuration
- `cookie-parser` - Cookie handling middleware
- `http-status-codes` - HTTP status code utilities
- `babel` - ES6+ transpilation for Node.js compatibility

## Configuration Requirements

This project requires Node.js >= 20.x:

```bash
git clone <repository-url>
cd web-rbac-permissions
yarn install
cd ../api-rbac-permissions
yarn install
```

## Deployment

- **Frontend**: Deployed on Vercel with auto-deploy from Git
- **Backend**: Deployed on Render with auto-deploy from Git
- **Environment**: Production-ready with secure CORS and JWT authentication

## Business Value

**Problem Solved:** Demonstrates efficient permission management using Group Roles and Hierarchical Permissions, ideal for showcasing RBAC implementation skills.

**Technical Benefits:**
- Centralized role and permission management
- Scalable authentication and authorization system
- Clear demonstration of hierarchical permission inheritance
- Enhanced user experience with responsive UI and real-time feedback

**What I Learned:** Implementing hierarchical RBAC taught me efficient permission resolution and role inheritance, balancing security and usability.


---

**Note:** This mini-project showcases advanced RBAC implementation with Group Roles and Hierarchical Permissions, designed to demonstrate permission management skills for enterprise applications.
