  import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
  import ProtectedRoute from './components/ProtectedRoute';
  import { useAuth } from './context/AuthContext';
  import LandingPage from "./Components/Lanidng";
  import CustomerHomepage from "./Components/Customer";
  import TailorProfile from "./Components/Tailor";
  import CustomerProfile from "./Components/Profile";
  import OrderBookingPage from "./Components/OrderBookingPage";
  import OrderTrackingPage from "./Components/Track_Order";
  import FabricInventoryPage from './Components/FabricInventoryPage';
  import AdminDashboard from "./Components/Admin_dashbord";
  import CustomerSupportPage from "./Components/Customer_support";
  import UserFabricSelectionPage from "./Components/UserFabricSelectionPage";
  import Navbar from "./Components/Navbar";
  import LoginPage from "./Components/LoginPage";
  import SignupPage from './Components/SignUp';
  import AdminInventoryManagementPage from "./Components/AdminInventoryManagementPage";
  import TailorDashboard from './Components/TailorDahboard';

  function App() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
        
          <Route path="/customer" element={
            <ProtectedRoute allowedRoles={['customer', 'admin']}>
              <CustomerHomepage />
            </ProtectedRoute>
          } />
        
          <Route path="/tailor" element={
            <ProtectedRoute allowedRoles={['customer', 'admin']}>
              <TailorProfile />
            </ProtectedRoute>
          } />
        
          <Route path="/order" element={
            <ProtectedRoute allowedRoles={['customer', 'admin']}>
              <OrderBookingPage />
            </ProtectedRoute>
          } />
        
          <Route path="/track" element={
            <ProtectedRoute allowedRoles={['customer', 'admin']}>
              <OrderTrackingPage />
            </ProtectedRoute>
          } />
        
          <Route path="/fabric" element={
            <ProtectedRoute allowedRoles={['customer', 'admin']}>
              <UserFabricSelectionPage />
            </ProtectedRoute>
          } />
        
          <Route path="/support" element={
            <ProtectedRoute allowedRoles={['customer', 'admin']}>
              <CustomerSupportPage />
            </ProtectedRoute>
          } />
        
          <Route path="/profile" element={
            <ProtectedRoute allowedRoles={['customer', 'admin']}>
              <CustomerProfile />
            </ProtectedRoute>
          } />
        
          <Route path="/tailor-dashboard" element={
            <ProtectedRoute allowedRoles={['tailor', 'admin']}>
              <TailorDashboard />
            </ProtectedRoute>
          } />
        
          <Route path="/inventory-management" element={
            <ProtectedRoute allowedRoles={['tailor', 'admin']}>
              <FabricInventoryPage />
            </ProtectedRoute>
          } />
        
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        
          <Route path="/AdminInventoryManagementPage" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminInventoryManagementPage />
            </ProtectedRoute>
          } />
        
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    );
  }

  export default App;
