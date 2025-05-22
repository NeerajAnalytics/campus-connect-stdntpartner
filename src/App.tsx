
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/toaster";
import Index from "./pages/Index";
import InitialPage from "./pages/InitialPage";
import AuthPage from "./pages/AuthPage";
import JuniorLoginPage from "./pages/JuniorLoginPage";
import JuniorSignupPage from "./pages/JuniorSignupPage";
import JuniorHomePage from "./pages/JuniorHomePage";
import ConnectWithSenior from "./pages/ConnectWithSenior";
import JuniorProfilePage from "./pages/JuniorProfilePage";
import JuniorEditPage from "./pages/JuniorEditPage";
import JuniorReportPage from "./pages/JuniorReportPage";
import JuniorFAQPage from "./pages/JuniorFAQPage";
import JuniorTermsPage from "./pages/JuniorTermsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import VerificationCodePage from "./pages/VerificationCodePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SeniorLoginPage from "./pages/SeniorLoginPage";
import SeniorSignupPage from "./pages/SeniorSignupPage";
import SeniorForgotPasswordPage from "./pages/SeniorForgotPasswordPage";
import SeniorVerificationCodePage from "./pages/SeniorVerificationCodePage";
import SeniorResetPasswordPage from "./pages/SeniorResetPasswordPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// This is a placeholder component for routes that are not yet implemented
const UnderConstruction = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <h1 className="text-4xl font-bold text-[rgba(21,62,117,1)] mb-4">
      Under Construction
    </h1>
    <p className="text-xl text-[rgba(28,56,121,1)] mb-8">
      This page is currently being developed. Please check back later.
    </p>
    <a
      href="/"
      className="bg-[rgba(26,78,138,1)] text-white py-2 px-6 rounded-lg hover:bg-[rgba(21,62,117,1)] transition-colors"
    >
      Return to Home
    </a>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/initial" element={<InitialPage />} />
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Junior routes */}
          <Route path="/junior-login" element={<JuniorLoginPage />} />
          <Route path="/junior-signup" element={<JuniorSignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verification-code" element={<VerificationCodePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route 
            path="/junior-home" 
            element={
              <ProtectedRoute>
                <JuniorHomePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/connect-with-senior" 
            element={
              <ProtectedRoute>
                <ConnectWithSenior />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/junior-profile" 
            element={
              <ProtectedRoute>
                <JuniorProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/junior-edit" 
            element={
              <ProtectedRoute>
                <JuniorEditPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/junior-report" 
            element={
              <ProtectedRoute>
                <JuniorReportPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/junior-faq" element={<JuniorFAQPage />} />
          <Route path="/junior-terms" element={<JuniorTermsPage />} />
          
          {/* Senior routes */}
          <Route path="/senior-login" element={<SeniorLoginPage />} />
          <Route path="/senior-signup" element={<SeniorSignupPage />} />
          <Route path="/senior-forgot-password" element={<SeniorForgotPasswordPage />} />
          <Route path="/senior-verification-code" element={<SeniorVerificationCodePage />} />
          <Route path="/senior-reset-password" element={<SeniorResetPasswordPage />} />
          <Route path="/senior-home" element={<UnderConstruction />} />
          
          {/* Legacy routes */}
          <Route path="/login" element={<UnderConstruction />} />
          <Route path="/register" element={<UnderConstruction />} />
          <Route path="/connect" element={<AuthPage />} />
          <Route path="/accommodation" element={<UnderConstruction />} />
          <Route path="/profile" element={<JuniorProfilePage />} />
          <Route path="/faq" element={<UnderConstruction />} />
          <Route path="/terms" element={<UnderConstruction />} />
          
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <h1 className="text-4xl font-bold text-[rgba(21,62,117,1)] mb-4">
                  Page Not Found
                </h1>
                <p className="text-xl text-[rgba(28,56,121,1)] mb-8">
                  The page you are looking for doesn't exist or has been moved.
                </p>
                <a
                  href="/"
                  className="bg-[rgba(26,78,138,1)] text-white py-2 px-6 rounded-lg hover:bg-[rgba(21,62,117,1)] transition-colors"
                >
                  Return to Home
                </a>
              </div>
            }
          />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
