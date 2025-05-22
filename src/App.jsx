import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Start } from './pages/Start';
import { Home } from './pages/Home';
import { Scrumboard } from './pages/Scrumboard';
import { NotFound } from './pages/NotFound';
import { PrivateRoute } from './routes/PrivateRoute';

import { ErrorProvider } from './context/ErrorContext';
import { AuthProvider } from './context/AuthContext'; 

export function App() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/scrumboard/:id"
              element={
                <PrivateRoute>
                  <Scrumboard />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorProvider>
  );
}