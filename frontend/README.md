# HuntBoard - Job Application Tracker

A modern, intuitive Kanban board application for tracking job applications throughout the entire hiring process. Organize your job search with ease using a visual workflow system.

![HuntBoard](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0+-blue?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1+-blue?logo=tailwindcss)

## ✨ Features

- **📊 Kanban Board** - Visual job application tracking with drag-and-drop functionality
- **🔐 Secure Authentication** - User registration and login with JWT tokens
- **📈 Application Analytics** - Track your progress across different application stages
- **🔍 Search & Filter** - Quickly find jobs by title, company, or location
- **💼 Job Details** - Store comprehensive information about each application
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **🎨 Modern UI** - Clean, professional interface with Tailwind CSS styling
- **⚡ Fast Performance** - Built with Vite for instant HMR and optimized builds

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Backend server running on `http://localhost:5000`

### Installation

1. **Clone the repository**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in your browser**
   ```
   http://localhost:5173
   ```

## 📦 Build for Production

```bash
npm run build
```

The optimized build output will be in the `dist/` folder.

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── auth/           # Login and signup components
│   │   ├── Card.jsx        # Job application card
│   │   ├── Column.jsx      # Kanban column
│   │   ├── KanbanBoard.jsx # Main board component
│   │   └── Analytics.jsx   # Statistics and progress tracking
│   ├── contexts/           # React Context for state management
│   │   ├── AuthContext.jsx # Authentication state
│   │   └── AppContext.jsx  # Application state
│   ├── utils/              # Utility functions and icons
│   └── data/               # Mock data and constants
├── public/                 # Static assets
└── index.html             # Entry point
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for secure authentication:

- **Registration** - Create a new account with email and password
- **Login** - Authenticate and receive a token
- **Token Persistence** - Tokens are stored in localStorage and survive page refreshes
- **Protected Routes** - Only authenticated users can access the Kanban board
- **Auto Logout** - Invalid or expired tokens trigger automatic logout

## 🎨 Styling

Built with **Tailwind CSS** for rapid UI development:

- Responsive grid system
- Pre-configured color palette
- Smooth transitions and animations
- Mobile-first design approach

## 📡 API Integration

The frontend communicates with a backend API for:

- User authentication (`/api/auth/login`, `/api/auth/register`)
- Job management (`/api/jobs`)
- User profile (`/api/auth/me`)

All API requests automatically include the JWT token in the Authorization header via Axios interceptors.

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **Vite** | Build tool and dev server |
| **React Router** | Client-side routing |
| **Axios** | HTTP client |
| **Tailwind CSS** | Styling |
| **React Context API** | State management |

## 📝 Key Components

### App.jsx
Main application component with navigation, search, and job modal functionality.

### KanbanBoard.jsx
Core board component managing job columns (Wishlist, Applied, Interview, Offer, Rejected).

### AuthContext.jsx
Handles user authentication state, token management, and API integration.

### AppContext.jsx
Manages job data, search, filtering, and column state.

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will automatically use the next available port.

### API Connection Issues
Ensure the backend server is running on `http://localhost:5000` and that CORS is properly configured.

### Token Expiration
The app will automatically redirect to login if your token expires. Simply log in again.

## 📧 Support

For issues or questions, please refer to the main project documentation or contact the development team.

## 📄 License

This project is part of the HuntBoard application suite.
