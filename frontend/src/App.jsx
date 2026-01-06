import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AppProvider, useAppContext } from "./contexts/AppContext";
import Analytics from "./components/Analytics";
import KanbanBoard from "./components/KanbanBoard";
import AddJobModal from "./components/AddJobModal";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { Briefcase, Filter, Plus, LogOut } from "./utils/Icons";
import "./App.css";

const AppContent = () => {
  const {
    searchTerm,
    setSearchTerm,
    isAddModalOpen,
    setIsAddModalOpen,
    initialStatus,
    setInitialStatus,
  } = useAppContext();
  const { user, logout } = useAuth();

  const handleAddJob = (status) => {
    setInitialStatus(status);
    setIsAddModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-40 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Briefcase className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-bold text-slate-900">HuntBoard</h1>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="relative">
                <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-32 sm:w-48 md:w-64"
                />
              </div>
              <button
                onClick={() => {
                  setInitialStatus("Wishlist");
                  setIsAddModalOpen(true);
                }}
                className="bg-blue-600 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Add Job</span>
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-2 md:space-x-3 pl-2 md:pl-4 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-medium text-slate-900">
                    {user?.name}
                  </p>
                  <p className="text-xs text-slate-500">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="text-slate-600 hover:text-slate-900 transition-colors p-2 rounded-lg hover:bg-slate-100"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Analytics />
        <div className="overflow-x-auto">
          <KanbanBoard onAddJob={handleAddJob} />
        </div>
      </main>

      {/* Add Job Modal */}
      <AddJobModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        initialStatus={initialStatus}
      />
    </div>
  );
};

const Dashboard = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
