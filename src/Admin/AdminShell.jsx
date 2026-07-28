import { Route, Routes } from "react-router-dom";

import { AdminAuthProvider } from "./context/AdminAuthContext";
import AdminLayout from "./components/AdminLayout";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdoptableAnimalsAdmin from "./pages/AdoptableAnimalsAdmin";
import AdminEnrollments from "./pages/AdminEnrollments";
import AdminLostFound from "./pages/AdminLostFound";
import AdminOrders from "./pages/AdminOrders";
import AdminSettings from "./pages/AdminSettings";
import AdminVolunteerRequests from "./pages/AdminVolunteerRequests";
import AdoptionRequestsAdmin from "./pages/AdoptionRequestsAdmin";
import ShopItemsAdmin from "./pages/ShopItemsAdmin";

const AdminShell = () => (
  <AdminAuthProvider>
    <Routes>
      <Route
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="catalog/shop-items" element={<ShopItemsAdmin />} />
        <Route path="adoption/animals" element={<AdoptableAnimalsAdmin />} />
        <Route path="requests/orders" element={<AdminOrders />} />
        <Route path="requests/volunteers" element={<AdminVolunteerRequests />} />
        <Route path="requests/adoptions" element={<AdoptionRequestsAdmin />} />
        <Route path="requests/enrollments" element={<AdminEnrollments />} />
        <Route path="requests/lost-found" element={<AdminLostFound />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  </AdminAuthProvider>
);

export default AdminShell;

