import './App.css'
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import EventsPage from "./pages/EventsPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Admin from './pages/Admin';
import EventDetail from './pages/EventDetail';
import Checkout from './pages/OrderSummary'; 
import PurchaseStatusCard from './pages/PurchaseStatusCard';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/home" replace />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/purchase-status" element={<PurchaseStatusCard />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="/resetpassword/:token" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;