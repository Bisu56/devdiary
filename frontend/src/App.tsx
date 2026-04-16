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
    <header className="sticky top-0 left-0 right-0 z-50 h-16 bg-white border-b border-slate-200 shadow-sm">
      <div className="w-full px-6 h-full flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-slate-900 tracking-tight">
          Dev<span className="text-blue-600">Diary</span>
        </Link>
        
        <nav className="flex items-center gap-5">
          {isAuthenticated ? (
            <>
              <Link to="/create" className="text-sm font-medium text-slate-600 hover:text-slate-900">Write</Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="text-sm font-medium text-slate-600 hover:text-slate-900">Dashboard</Link>
              )}
              <button onClick={logout} className="text-sm font-medium text-slate-600 hover:text-slate-900">Logout</button>
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">Log in</Link>
              <Link to="/register" className="px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors text-sm">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8 mt-auto">
      <div className="w-full px-6 text-center text-sm text-slate-500">
        DevDiary — A modern blog platform
      </div>
    </footer>
  );
}

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-6 h-6 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-1 w-full" style={{ marginTop: '4rem' }}>
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