import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/auth/LoginPage';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* Step 2 will add ProtectedRoute around the dashboard and admin routes. */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
