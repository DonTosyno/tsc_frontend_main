import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { AnimatePresence } from "framer-motion";
import "./app.css";
import About from "./pages/About";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import ContactUs from "./pages/FAQ copy";
import LoginPage from "./pages/LoginPage"; 
import SignUp from "./pages/SignUpPage";
import ForgotPassword from "./pages/ForgotPassword";
import CreateAccountSuccess from "./pages/CreateAccountSuccess";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/Dashboard/pages/Dashboard";
import DashboardCustomers from './pages/Dashboard/pages/Customers';
import Profile from './pages/Dashboard/pages/Profile';
import ForgotPasswordSuccess from "./pages/ForgotPasswordSuccess";
import ForgotPasswordReset from "./pages/ForgotPasswordReset";
import ForgotPasswordResetSuccess from "./pages/ForgotPasswordResetSuccess"; 

// School Dashboard Pages
import DashboardSchool from "./pages/SchoolDashboard";
import DashboardHomeSchoolPage from "./pages/SchoolDashboard/pages/Dashboard";
import DashboardCustomersSchoolPage from './pages/SchoolDashboard/pages/Customers';
import ProfileSchoolPage from './pages/SchoolDashboard/pages/Profile';
import SupportSchool from "./pages/SchoolDashboard/pages/Support";

// Admin Dashboard Pages
import Admin from "./pages/Admin";
import AdminHome from "./pages/Admin/pages/Dashboard";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminPendingSchools from "./pages/Admin/pages/Customers"
import './index.css';
import Results from "./pages/Dashboard/pages/Results";
import Support from "./pages/Dashboard/pages/Support";
import PsychTest from "./pages/Dashboard/pages/PsychTests";
require("dotenv").config();

export default function App() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/success" element={<CreateAccountSuccess />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard props  />}>
          <Route path="home" element={<DashboardHome />} />
          <Route path="students" element={<DashboardCustomers />} />
          <Route path="profile" element={<Profile />} />
           <Route path="analytics" element={<PsychTest />} />
          <Route path="result" element={<Results />} />
          <Route path="support" element={<Support />} />
        </Route>
        <Route path="/school" element={<DashboardSchool props  />}>
          <Route path="home" element={<DashboardHomeSchoolPage />} />
          <Route path="students" element={<DashboardCustomersSchoolPage />} />
          <Route path="profile" element={<ProfileSchoolPage />} />
           {/* <Route path="analytics" element={<PsychTest />} />
          <Route path="result" element={<Results />} /> */}
          <Route path="support" element={<SupportSchool />} />
        </Route>
        <Route path="/admin" element={<Admin props  />}>
          <Route path="home" element={<AdminHome />} />
          <Route path="schools" element={<AdminPendingSchools />} />
          {/* <Route path="profile" element={<Profile />} />
           <Route path="analytics" element={<PsychTest />} />
          <Route path="result" element={<Results />} />
          <Route path="support" element={<Support />} /> */}
        </Route>
        <Route
          path="/forgot-password/success"
          element={<ForgotPasswordSuccess />}
        />
        <Route path="/reset-password" element={<ForgotPasswordReset />} />
        <Route
          path="/reset-password/success"
          element={<ForgotPasswordResetSuccess />}
        />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </AnimatePresence>
  );
}
