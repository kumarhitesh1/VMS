# Volunteer Management System

A full-stack MERN-based Volunteer Management System designed to streamline volunteer registration, event management, and administrative operations through a secure role-based platform. The system enables administrators to manage volunteers and events while allowing volunteers to register, access events, and maintain their profiles.

---

## Features

### Admin Features

* Secure Admin Authentication
* Dashboard with Analytics
* View Total Volunteers
* View Total Events
* Track Upcoming Events
* Track Completed Events
* Create Events
* View All Events
* Delete Events
* View All Volunteers
* View Volunteer Details
* Delete Volunteers
* Role-Based Access Control
* Visual Statistics using Charts

### Volunteer Features

* Volunteer Registration
* Secure Login
* View Available Events
* Access Personal Profile
* Update Profile Information
* Secure Logout

---

## Screenshots

### Login Page

![Login](./screenshots/ssL.png)

### Registration Page

![Register](./screenshots/ssR.png)

### Admin Dashboard

![Admin Dashboard](./screenshots/ss1.png)

### Event Management

![Event Management](./screenshots/ss2.png)

### Volunteer Management

![Volunteer Management](./screenshots/ss3.png)

### Volunteer Details

![Volunteer Details](./screenshots/ss4.png)

### Profile

![Profile](./screenshots/ss5.png)

---

## Tech Stack

### Frontend

| Technology        | Purpose                         |
| ----------------- | ------------------------------- |
| React.js          | User Interface                  |
| React Router DOM  | Client-Side Routing             |
| Tailwind CSS      | Styling                         |
| Axios             | API Communication               |
| Recharts          | Dashboard Analytics             |
| React Icons       | UI Icons                        |
| React Context API | Authentication State Management |
| Vite              | Frontend Build Tool             |

### Backend

| Technology | Purpose                         |
| ---------- | ------------------------------- |
| Node.js    | Runtime Environment             |
| Express.js | REST API Development            |
| JWT        | Authentication & Authorization  |
| Bcrypt.js  | Password Hashing                |
| CORS       | Cross-Origin Resource Sharing   |
| Dotenv     | Environment Variable Management |

### Database

| Technology | Purpose         |
| ---------- | --------------- |
| MongoDB    | NoSQL Database  |
| Mongoose   | ODM for MongoDB |

---

## Installation

### Clone Repository

```bash
git clone https://github.com/kumarhitesh1/VMS.git
cd VMS
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
DB_NAME=your_database_name
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

Run the backend server:

```bash
npm run dev
```

### Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend application:

```bash
npm run dev
```

---

## Architecture

```text
Frontend (React + Vite)
        │
        ▼
REST API (Express.js)
        │
        ▼
MongoDB Database
```

---

## Project Structure

```text
Volunteer-Management-System
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── index.js
│   └── package.json
│
├── screenshots
│
├── README.md
└── .gitignore
```

---

## Authentication & Authorization

The system uses JWT-based authentication and role-based authorization.

### Admin

* Access Dashboard
* Manage Volunteers
* View Volunteer Details
* Manage Events
* Access Analytics

### Volunteer

* View Events
* Access Profile
* Update Personal Information

---

## Dashboard Analytics

The Admin Dashboard provides:

* Total Volunteers
* Total Events
* Upcoming Events
* Completed Events
* Bar Chart Visualization
* Pie Chart Visualization

---

## Database Models

### User Model

Stores:

* Name
* Email
* Password
* Phone Number
* Age
* Gender
* Address
* Skills
* Availability
* Emergency Contact Details
* User Role

### Event Model

Stores:

* Event Title
* Description
* Date
* Location
* Category
* Required Volunteers
* Assigned Volunteers
* Event Status

---

## API Modules

### Authentication API

* Register User
* Login User
* Get Profile
* Update Profile

### Volunteer API

* Get Volunteers
* Get Volunteer By ID
* Update Volunteer
* Delete Volunteer

### Event API

* Create Event
* Get Events
* Get Event By ID
* Update Event
* Delete Event

### Dashboard API

* Get Dashboard Statistics

---

## Key Highlights

* Full Stack MERN Application
* JWT Authentication
* Role-Based Authorization
* Dashboard Analytics
* Volunteer Management
* Event Management
* Responsive User Interface
* RESTful API Architecture
* MongoDB Integration
* Secure Password Storage using Bcrypt

---

## Future Enhancements

* Event Registration & Participation Tracking
* Volunteer Attendance Tracking
* Event Assignment System
* Email Notifications
* Search & Filter Functionality
* Event Editing Interface
* Export Reports
* Enhanced Dashboard Insights

---

## Conclusion

The Volunteer Management System provides a centralized solution for managing volunteers and events. Through secure authentication, role-based access control, analytics dashboards, and organized volunteer management, the platform improves operational efficiency and simplifies event coordination for organizations.

---