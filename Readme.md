# Predictive Maintenance Project

A MERN Stack based Predictive Maintenance System for monitoring industrial components and analyzing real-time machine data.

---

# Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS

## Backend
- Node.js
- Express.js

## Database
- MongoDB

---

# Project Structure

```bash
Predictive_Maintenance_Project/
│
├── client/        # Frontend
├── server/        # Backend
└── README.md
```

---

# Installation & Setup Guide

## Step 1: Clone the Repository

```bash
git clone <repository-link>
```

Move into the project folder:

```bash
cd Predictive_Maintenance_Project
```

---

# Client Setup (Frontend)

## Step 2: Move to Client Folder

```bash
cd client
```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Start Frontend

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

# Server Setup (Backend)

Open another terminal.

## Step 5: Move to Server Folder

```bash
cd server
```

## Step 6: Install Dependencies

```bash
npm install
```

---

# MongoDB Setup

## Step 7: Connect MongoDB

Make sure MongoDB is installed locally and running.

Create a `.env` file inside the `server` folder.

Example:

```env
MONGO_URI=mongodb://127.0.0.1:27017/predictive_maintenance
PORT=5000
```

---

# Start Backend Server

## Step 8: Run Server

```bash
npm start
```

Backend will run on:

```bash
http://localhost:5000
```

---

# Running the Full Project

## Frontend

Inside client folder:

```bash
npm run dev
```

## Backend

Inside server folder:

```bash
npm start
```

---

# Features

- User Authentication
- Dashboard UI
- Predictive Maintenance Monitoring
- Real-time Component Analysis
- Notification Alerts
- Mechanical/Electrical/Electronics/Pneumatic Monitoring
- MongoDB Data Storage

---