# HuntBoard 🎯

A full-stack job application tracking and management system built with React, Node.js, and MongoDB. Organize your job search with an intuitive Kanban board interface, track applications, and manage your career pipeline efficiently.

## 🌟 Features

- **Kanban Board Interface**: Visualize your job applications with a drag-and-drop Kanban board
- **Job Application Tracking**: Keep track of all your job applications in one place
- **Authentication**: Secure user registration and login with JWT authentication
- **Analytics Dashboard**: Get insights into your job search progress
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant synchronization across all views
- **Cloud Deployment**: Backend hosted on Render for reliable production access

## 🏗️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **ESLint** - Code quality and linting

### Backend
- **Node.js with Express** - Server framework
- **MongoDB & Mongoose** - Database and ORM
- **JWT (jsonwebtoken)** - Authentication & authorization
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

## 📁 Project Structure

```
HuntBoard/
├── frontend/                          # React frontend application
│   ├── src/
│   │   ├── components/               # Reusable React components
│   │   │   ├── AddJobModal.jsx       # Modal for adding new jobs
│   │   │   ├── Analytics.jsx         # Analytics dashboard
│   │   │   ├── Card.jsx              # Job card component
│   │   │   ├── Column.jsx            # Kanban column
│   │   │   ├── KanbanBoard.jsx       # Main Kanban board
│   │   │   ├── ProtectedRoute.jsx    # Route protection HOC
│   │   │   └── auth/                 # Authentication components
│   │   │       ├── Login.jsx
│   │   │       └── Signup.jsx
│   │   ├── contexts/                 # React context providers
│   │   │   ├── AppContext.js         # Application data context
│   │   │   ├── AppProvider.jsx       # App context provider
│   │   │   └── AuthContext.jsx       # Auth context provider
│   │   ├── data/                     # Mock data
│   │   │   └── mockData.js
│   │   ├── utils/                    # Utility functions
│   │   │   └── Icons.jsx
│   │   ├── App.jsx                   # Root component
│   │   ├── main.jsx                  # Entry point
│   │   ├── App.css                   # App styles
│   │   └── index.css                 # Global styles
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── index.html
│
└── backend/                          # Express backend application
    ├── src/
    │   ├── controllers/              # Request handlers
    │   │   └── authController.js
    │   ├── middleware/               # Express middleware
    │   │   └── auth.js               # JWT verification
    │   ├── models/                   # Database models
    │   │   └── User.js
    │   ├── routes/                   # API routes
    │   │   ├── authRoutes.js
    │   │   └── applicationRoutes.js
    │   ├── Application.js            # Main app configuration
    │   └── index.js                  # Server entry point
    ├── package.json
    └── .env                          # Environment variables
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Login with email and password
- `GET /api/auth/me` - Get current user info (Protected)

### Applications
- `GET /api/applications` - Get all job applications (Protected)
- `POST /api/applications` - Create a new job application (Protected)
- `PUT /api/applications/:id` - Update a job application (Protected)
- `DELETE /api/applications/:id` - Delete a job application (Protected)

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. Users register or login to receive a JWT token
2. The token is stored in localStorage
3. All protected endpoints require the token in the Authorization header
4. The token is automatically included in all API requests via Axios interceptor

## 🎨 Features in Detail

### Kanban Board
- Visualize applications in different status columns (Wishlist, Applied, Interview, Offered, Rejected)
- Drag-and-drop applications between columns
- Quick status updates
- Filter and search functionality

### Analytics Dashboard
- Track total applications submitted
- View success rate and conversion metrics
- Analyze application trends over time
- Identify high-performing job sources

### Job Application Card
- Company name and position
- Application date
- Current status
- Salary information
- Location
- Custom notes and descriptions

## 🔄 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the dist folder to your hosting provider
```

### Backend (Render)
The backend is currently deployed on [Render](https://huntboard.onrender.com).

Configuration for Render:
- Environment: Node.js
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables: Set MongoDB URI, JWT Secret, and Node Env

## 🛠️ Development

### Running Both Services

Terminal 1 - Frontend:
```bash
cd frontend
npm run dev
```

Terminal 2 - Backend:
```bash
cd backend
npm run dev
```

### Building for Production

Frontend:
```bash
cd frontend
npm run build
```

Backend:
```bash
cd backend
npm run start
```

## 📝 Code Quality

Run ESLint to check code quality:
```bash
cd frontend
npm run lint
```

## 🐛 Troubleshooting

### CORS Issues
Ensure CORS is properly configured in the backend Express app to allow requests from your frontend URL.

### Connection Errors
- Verify MongoDB connection string in `.env`
- Check that all environment variables are properly set
- Ensure both frontend and backend servers are running

### Authentication Issues
- Clear browser localStorage and try again
- Check JWT token expiration
- Verify JWT secret matches between login and verification

## 🤝 Contributing

Feel free to submit issues and pull requests to improve HuntBoard.

## 📄 License

ISC License

## 📞 Support

For questions or issues, please open an issue in the repository.

---

**HuntBoard** - Organize Your Job Search, Track Your Success 🚀
