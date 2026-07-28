import "./App.css";
import { Suspense, lazy } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./Theme/Theme";
import { Route, Routes, useLocation } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { CartContextProvider } from "./context/CartContext";
import ProtectedRoute from "./Components/Authentication/ProtectedRoute";
import RouteLoader from "./Components/Common/RouteLoader";
import AppErrorBoundary from "./Components/Common/AppErrorBoundary";
import Header2 from "./Components/Header/Header2";
import Footer from "./Components/Footer/Footer";
import ScrollToTop from "./context/ScrollToTop";
const Home = lazy(() => import("./Pages/Home/Home"));
const AdminShell = lazy(() => import("./Admin/AdminShell"));
const AdminLogin = lazy(() => import("./Admin/pages/AdminLogin"));

// Pets -----------------------------
const Pet_Info = lazy(() => import("./Pages/Pets/Pet Info/Pet_Info"));
const PetCare = lazy(() => import("./Pages/Pets/Pet Care/PetCare"));
const PetBoardingAll = lazy(() =>
  import("./Pages/Pets/Pet Care/PetBoardingAll")
);
const PetBoardingDetails = lazy(() =>
  import("./Pages/Pets/Pet Care/PetBoardingDetails")
);
const PetGroomingAll = lazy(() =>
  import("./Pages/Pets/Pet Care/PetGroomingAll")
);
const PetGroomingDetails = lazy(() =>
  import("./Pages/Pets/Pet Care/PetGroomingDetails")
);
const Pet_Training = lazy(() =>
  import("./Pages/Pets/Pet Training/Pet_Training")
);
const TrainingDetail = lazy(() =>
  import("./Pages/Pets/Pet Training/TrainingDetail")
);
const Adoption = lazy(() => import("./Pages/Pets/Adoption/Adoption"));
const AdoptablePets = lazy(() =>
  import("./Pages/Pets/Adoption/AdoptablePets")
);
const AdoptablePetDetails = lazy(() =>
  import("./Pages/Pets/Adoption/AdoptablePetDetails")
);
const RescueAlert = lazy(() =>
  import("./Pages/Pets/Rescue Alert/RescueAlert")
);
const Lost_Found = lazy(() =>
  import("./Pages/Pets/Lost & Found/Lost_Found")
);
const LostPets = lazy(() => import("./Pages/Pets/Lost & Found/LostPets"));
const FoundPets = lazy(() => import("./Pages/Pets/Lost & Found/FoundPets"));
const LostForm = lazy(() => import("./Pages/Pets/Lost & Found/LostForm"));
const FoundForm = lazy(() => import("./Pages/Pets/Lost & Found/FoundForm"));

// Shop -----------------------------------
const Shop = lazy(() => import("./Pages/Shop/Shop"));
const Cart = lazy(() => import("./Pages/Shop/Cart/Cart"));

// Veterinary ----------------------------------
const Online_Consultation = lazy(() =>
  import("./Pages/Veterinary/Online Consultation/Online_Consultation")
);
const In_Person_Consultation = lazy(() =>
  import(
    "./Pages/Veterinary/In Person Consultation/In_Person_Consultation"
  )
);
const VetFinder = lazy(() =>
  import("./Pages/Veterinary/Vet Finder/VetFinder")
);
const House_Calls = lazy(() =>
  import("./Pages/Veterinary/House Calls/House_Calls")
);
const Health_Care_Blog = lazy(() =>
  import("./Pages/Veterinary/Health Care Blog/Health_Care_Blog")
);
const Covid19_Info = lazy(() =>
  import("./Pages/Veterinary/Covid19 Info/Covid19_Info")
);

// Get Involve --------------------------
const Volunteer = lazy(() =>
  import("./Pages/Get Involve/Volunteer/Volunteer")
);
const Make_Donation = lazy(() =>
  import("./Pages/Get Involve/Make Donation/Make_Donation")
);
const Our_Success_Story = lazy(() =>
  import("./Pages/Get Involve/Our Success Story/Our_Success_Story")
);
const Share_Your_Story = lazy(() =>
  import("./Pages/Get Involve/Share Your Story/Share_Your_Story")
);
const Remembrance = lazy(() =>
  import("./Pages/Get Involve/Remembrance/Remembrance")
);
const Reviews = lazy(() => import("./Pages/Get Involve/Reviews/Reviews"));

const About_Us = lazy(() => import("./Pages/About Us/About_Us"));
const Contact_Us = lazy(() => import("./Pages/Contact Us/Contact_Us"));

const SignIn = lazy(() => import("./Components/Authentication/SignIn"));
const SignUp = lazy(() => import("./Components/Authentication/SignUp"));
const ResetPassword = lazy(() =>
  import("./Components/Authentication/ResetPassword")
);
const Profile = lazy(() => import("./Dashboard/Profile"));
const Account = lazy(() => import("./Dashboard/Account"));
const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));

const withProtection = (Component) => (
  <ProtectedRoute>
    <Component />
  </ProtectedRoute>
);

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/home", component: Home },
  { path: "/pet_info", component: Pet_Info },
  { path: "/petcare", component: PetCare },
  { path: "/petcare/boarding", component: PetBoardingAll },
  { path: "/petcare/boarding/:id", component: PetBoardingDetails },
  { path: "/petcare/grooming", component: PetGroomingAll },
  { path: "/petcare/grooming/:id", component: PetGroomingDetails },
  { path: "/pet_training", component: Pet_Training },
  { path: "/training/:id", component: TrainingDetail },
  { path: "/adoption", component: Adoption },
  { path: "/adoption/adoptable_pets", component: AdoptablePets },
  { path: "/adoption/adoptable_pets/:code", component: AdoptablePetDetails },
  { path: "/rescue_alert", component: RescueAlert },
  { path: "/lost_found", component: Lost_Found },
  { path: "/lost_found/lost_pets", component: LostPets },
  { path: "/lost_found/found_pets", component: FoundPets },
  { path: "/lost_found/lost_form", component: LostForm },
  { path: "/lost_found/found_form", component: FoundForm },
  { path: "/shop", component: Shop },
  { path: "/cart", component: Cart },
  { path: "/online_consultation", component: Online_Consultation },
  { path: "/in_person_consultation", component: In_Person_Consultation },
  { path: "/vet_finder", component: VetFinder },
  { path: "/house_calls", component: House_Calls },
  { path: "/health_care_blog", component: Health_Care_Blog },
  { path: "/covid19_info", component: Covid19_Info },
  { path: "/volunteer", component: Volunteer },
  { path: "/make_donation", component: Make_Donation },
  { path: "/our_success_story", component: Our_Success_Story },
  { path: "/share_your_story", component: Share_Your_Story },
  { path: "/remembrance", component: Remembrance },
  { path: "/reviews", component: Reviews },
  { path: "/about_us", component: About_Us },
  { path: "/contact_us", component: Contact_Us },
  { path: "/sign_in", component: SignIn },
  { path: "/sign_up", component: SignUp },
  { path: "/password_reset", component: ResetPassword },
  { path: "/admin/login", component: AdminLogin },
  { path: "/admin/*", component: AdminShell },
];

const protectedRoutes = [
  { path: "/profile", component: Profile },
  { path: "/account", component: Account },
  { path: "/dashboard", component: Dashboard },
];

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <UserAuthContextProvider>
        <CartContextProvider>
          <Box
            component="a"
            href="#main-content"
            sx={{
              position: "absolute",
              top: -48,
              left: 16,
              zIndex: 2000,
              px: 2,
              py: 1,
              borderRadius: 1,
              backgroundColor: "success.main",
              color: "common.white",
              textDecoration: "none",
              fontWeight: 600,
              "&:focus": {
                top: 16,
              },
            }}
          >
            Skip to main content
          </Box>

          {isAdminRoute ? null : <Header2 />}

          {isAdminRoute ? null : <ScrollToTop />}

          <Box
            component="main"
            id="main-content"
            tabIndex={-1}
            sx={{ outline: "none" }}
          >
            <AppErrorBoundary>
              <Suspense fallback={<RouteLoader />}>
                <Routes>
                  {publicRoutes.map(({ path, component: Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                  ))}

                  {protectedRoutes.map(({ path, component: Component }) => (
                    <Route
                      key={path}
                      path={path}
                      element={withProtection(Component)}
                    />
                  ))}

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </AppErrorBoundary>
          </Box>

          {isAdminRoute ? null : <Footer />}
        </CartContextProvider>
      </UserAuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
