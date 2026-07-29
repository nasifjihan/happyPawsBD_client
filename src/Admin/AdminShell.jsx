import { Route, Routes } from "react-router-dom";

import { AdminAuthProvider } from "./context/AdminAuthContext";
import AdminLayout from "./components/AdminLayout";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdoptableAnimalsAdmin from "./pages/AdoptableAnimalsAdmin";
import AdminVetProviders from "./pages/AdminVetProviders";
import AdminPrograms from "./pages/AdminPrograms";
import AdminAdoptionRequestDetails from "./pages/AdminAdoptionRequestDetails";
import AdminEnrollments from "./pages/AdminEnrollments";
import AdminLostFound from "./pages/AdminLostFound";
import AdminOnlineConsultationDetails from "./pages/AdminOnlineConsultationDetails";
import AdminOnlineConsultations from "./pages/AdminOnlineConsultations";
import AdminOrderDetails from "./pages/AdminOrderDetails";
import AdminOrders from "./pages/AdminOrders";
import AdminReviewDetails from "./pages/AdminReviewDetails";
import AdminReviews from "./pages/AdminReviews";
import AdminSettings from "./pages/AdminSettings";
import AdminVolunteerRequestDetails from "./pages/AdminVolunteerRequestDetails";
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
        <Route path="catalog/vets" element={<AdminVetProviders />} />
        <Route path="catalog/programs" element={<AdminPrograms />} />
        <Route path="adoption/animals" element={<AdoptableAnimalsAdmin />} />
        <Route path="requests/orders" element={<AdminOrders />} />
        <Route path="requests/orders/:id" element={<AdminOrderDetails />} />
        <Route
          path="requests/consultations/online"
          element={<AdminOnlineConsultations />}
        />
        <Route
          path="requests/consultations/online/:id"
          element={<AdminOnlineConsultationDetails />}
        />
        <Route path="requests/volunteers" element={<AdminVolunteerRequests />} />
        <Route
          path="requests/volunteers/:id"
          element={<AdminVolunteerRequestDetails />}
        />
        <Route path="requests/adoptions" element={<AdoptionRequestsAdmin />} />
        <Route
          path="requests/adoptions/:id"
          element={<AdminAdoptionRequestDetails />}
        />
        <Route path="requests/reviews" element={<AdminReviews />} />
        <Route path="requests/reviews/:id" element={<AdminReviewDetails />} />
        <Route path="requests/enrollments" element={<AdminEnrollments />} />
        <Route path="requests/lost-found" element={<AdminLostFound />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  </AdminAuthProvider>
);

export default AdminShell;
