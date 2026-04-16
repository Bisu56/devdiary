import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';

const Home = lazy(() => import('./pages/Home'));
const CreatePost = lazy(() => import('./pages/CreatePost'));
const PostDetail = lazy(() => import('./pages/PostDetail'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#020817] border-b border-slate-800">
      <div className="max-w-4xl mx-auto h-full px-5 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold text-cyan-400">
          DevDiary
        </Link>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/create" className="text-sm text-slate-400 hover:text-white">Write</Link>
              <button onClick={logout} className="text-sm text-slate-400 hover:text-white">Logout</button>
              <div className="w-7 h-7 rounded-full bg-cyan-600 flex items-center justify-center text-white text-xs font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-slate-400 hover:text-white">Login</Link>
              <Link to="/register" className="text-sm bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1.5 rounded-md">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-800 py-6 mt-auto">
      <div className="max-w-4xl mx-auto px-5 text-center text-xs text-slate-600">
        DevDiary © 2024
      </div>
    </footer>
  );
}

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-5 h-5 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <div className="min-h-screen bg-[#020817] text-slate-200 flex flex-col">
            <Navbar />
            <main className="flex-1 pt-14">
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/create" element={<CreatePost />} />
                  <Route path="/post/:slug" element={<PostDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;