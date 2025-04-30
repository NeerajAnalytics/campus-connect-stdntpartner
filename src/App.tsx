
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InitialPage from "./pages/InitialPage";
import AuthPage from "./pages/AuthPage";
import JuniorLoginPage from "./pages/JuniorLoginPage";
import JuniorSignupPage from "./pages/JuniorSignupPage";
import JuniorHomePage from "./pages/JuniorHomePage";
import ConnectWithSenior from "./pages/ConnectWithSenior";
import JuniorProfilePage from "./pages/JuniorProfilePage";

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
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/initial" element={<InitialPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/junior-login" element={<JuniorLoginPage />} />
        <Route path="/junior-signup" element={<JuniorSignupPage />} />
        <Route path="/junior-home" element={<JuniorHomePage />} />
        <Route path="/connect-with-senior" element={<ConnectWithSenior />} />
        <Route path="/junior-profile" element={<JuniorProfilePage />} />
        <Route path="/login" element={<UnderConstruction />} />
        <Route path="/register" element={<UnderConstruction />} />
        <Route path="/connect" element={<AuthPage />} />
        <Route path="/accommodation" element={<UnderConstruction />} />
        <Route path="/profile" element={<JuniorProfilePage />} /> {/* Adding additional route for /profile */}
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
    </Router>
  );
}

export default App;
