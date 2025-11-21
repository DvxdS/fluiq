import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Home } from '@/pages/Home';
import { Auth } from '@/pages/Auth';
import { Dashboard } from '@/pages/Dashboard';
import { Pitch } from '@/pages/Pitch';
import { Captions } from '@/pages/Captions';
import { Calendar } from '@/pages/Calendar';
import { Deals } from '@/pages/Deals';
import { Templates } from '@/pages/Templates';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/pitch" element={<ProtectedRoute><Pitch /></ProtectedRoute>} />
        <Route path="/captions" element={<ProtectedRoute><Captions /></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
        <Route path="/deals" element={<ProtectedRoute><Deals /></ProtectedRoute>} />
        <Route path="/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
