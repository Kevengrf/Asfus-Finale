// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// Public Pages
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage/AdminLoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import PortalPage from './pages/PortalPage/PortalPage';

// Admin Pages
import AdminDashboardPage from './pages/AdminDashboardPage/AdminDashboardPage';
import ApprovalsManagement from './pages/admin/ApprovalsManagement';
import NewsManagement from './pages/admin/NewsManagement';
import ConveniosManagement from './pages/admin/ConveniosManagement';
import EventsManagement from './pages/admin/EventsManagement';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Rota Protegida para Associados */}
            <Route 
              path="/portal" 
              element={<ProtectedRoute><PortalPage /></ProtectedRoute>}
            />

            {/* Rotas Protegidas e Aninhadas para Administradores */}
            <Route 
              path="/admin/dashboard"
              element={<ProtectedRoute adminOnly={true}><AdminDashboardPage /></ProtectedRoute>}
            >
              <Route index element={<Navigate to="approvals" replace />} /> 
              <Route path="approvals" element={<ApprovalsManagement />} />
              <Route path="news" element={<NewsManagement />} />
              <Route path="convenios" element={<ConveniosManagement />} />
              <Route path="events" element={<EventsManagement />} />
            </Route>

            {/* Rota para Not Found */}
            <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;