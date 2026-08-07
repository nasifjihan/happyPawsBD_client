import { AdminAuthProvider } from "./context/AdminAuthContext";
import AdminLayout from "./components/AdminLayout";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

const AdminShell = () => (
  <AdminAuthProvider>
    <AdminProtectedRoute>
      <AdminLayout />
    </AdminProtectedRoute>
  </AdminAuthProvider>
);

export default AdminShell;
