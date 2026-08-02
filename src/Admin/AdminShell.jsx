import { Route, Routes } from "react-router";

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
import AdminHouseCallRequestDetails from "./pages/AdminHouseCallRequestDetails";
import AdminHouseCallRequests from "./pages/AdminHouseCallRequests";
import AdminInPersonConsultationDetails from "./pages/AdminInPersonConsultationDetails";
import AdminInPersonConsultations from "./pages/AdminInPersonConsultations";
import AdminOnlineConsultationDetails from "./pages/AdminOnlineConsultationDetails";
import AdminOnlineConsultations from "./pages/AdminOnlineConsultations";
import AdminOrderDetails from "./pages/AdminOrderDetails";
import AdminOrders from "./pages/AdminOrders";
import AdminReviewDetails from "./pages/AdminReviewDetails";
import AdminReviews from "./pages/AdminReviews";
import AdminRescueAlertDetails from "./pages/AdminRescueAlertDetails";
import AdminRescueAlerts from "./pages/AdminRescueAlerts";
import AdminSettings from "./pages/AdminSettings";
import AdminBlogPosts from "./pages/AdminBlogPosts";
import AdminPetInfoAnimals from "./pages/AdminPetInfoAnimals";
import AdminPetInfoBreeds from "./pages/AdminPetInfoBreeds";
import AdminStories from "./pages/AdminStories";
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
        <Route path="content/stories" element={<AdminStories />} />
        <Route path="content/blog-posts" element={<AdminBlogPosts />} />
        <Route path="content/pet-info/animals" element={<AdminPetInfoAnimals />} />
        <Route path="content/pet-info/breeds" element={<AdminPetInfoBreeds />} />
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
        <Route
          path="requests/consultations/in-person"
          element={<AdminInPersonConsultations />}
        />
        <Route
          path="requests/consultations/in-person/:id"
          element={<AdminInPersonConsultationDetails />}
        />
        <Route
          path="requests/consultations/house-calls"
          element={<AdminHouseCallRequests />}
        />
        <Route
          path="requests/consultations/house-calls/:id"
          element={<AdminHouseCallRequestDetails />}
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
        <Route path="requests/rescue-alerts" element={<AdminRescueAlerts />} />
        <Route
          path="requests/rescue-alerts/:id"
          element={<AdminRescueAlertDetails />}
        />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  </AdminAuthProvider>
);

export default AdminShell;
