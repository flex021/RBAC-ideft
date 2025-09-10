# RBAC Permissions Project

> **Role-Based Access Control (RBAC) mini-project with Group Roles and Hierarchical Permissions**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Here-2ea44f?style=for-the-badge)](https://rbac-ideft.vercel.app)

## Overview

This mini-project demonstrates a **Role-Based Access Control (RBAC)** system with **Group Roles** and **Hierarchical Permissions** for flexible user access management. It features a React frontend and an Express.js backend.

**Architecture:**
- **Frontend**: React application ([https://rbac-ideft.vercel.app](https://rbac-ideft.vercel.app))
- **Backend**: Node.js + Express API server ([https://rbac-ideft.onrender.com](https://rbac-ideft.onrender.com))

**Key Features:**
- 🔐 Role-based authentication with JWT
- 🔄 Group Roles and Hierarchical Permissions
- 🚀 Independent deployment for frontend and backend
- ⚡ Responsive UI with Material-UI
- 🔔 Real-time notifications with React Toastify
- 📋 Demo users for immediate testing

## Demo Users

| Email                   | Password       | Role       |
|-------------------------|----------------|------------|
| `admin-rbac@gmail.com`  | `admin@123`    | Admin      |
| `moderator-rbac@gmail.com` | `moderator@123` | Moderator |
| `client-rbac@gmail.com` | `client@123`   | Client     |

## Technology Stack
- **Frontend**: React 18.x, Vite, Material-UI
- **Backend**: Node.js 20.x, Express, Babel
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Vercel (frontend), Render (backend)

## Setup

**Frontend** (`http://localhost:5173`)
```bash
cd react-web
yarn install
yarn dev
```

**Backend** (`http://localhost:8080`)
```bash
cd node-api
yarn install
yarn dev
```

## Documentation (README full)
👉 [Project Details](./README.full.md)
