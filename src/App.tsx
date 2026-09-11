import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "./api/store";

import Navbar from "./components/landing_page/Navbar";
import Footer from "./components/landing_page/Footer";
import ScrollToTop from "./ScrollToTop";

import Home from "./components/pages/landing+page/Home";
import TermsPage from "./components/pages/landing+page/TermsAndConditions";
import PrivacyPolicyPage from "./components/pages/landing+page/PrivacyPolicy";
import FaqSection from "./components/pages/landing+page/Faq";
import { AdminLogin } from "./components/admin/AdminLogin";
import { AdminDashboardRoot } from "./components/admin/AdminDashboardRoot";

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin" replace />;
};

function App() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardRoot />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/*"
          element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/faq" element={<FaqSection />} />
                  <Route path="/privacy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
