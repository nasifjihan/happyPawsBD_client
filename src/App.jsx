import "./App.css";
import { Suspense, lazy } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./Theme/Theme";
import { Route, Routes } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { CartContextProvider } from "./context/CartContext";
import ProtectedRoute from "./Components/Authentication/ProtectedRoute";
import RouteLoader from "./Components/Common/RouteLoader";
import AppErrorBoundary from "./Components/Common/AppErrorBoundary";

// import Header from "./Components/Header/Header";
import Header2 from "./Components/Header/Header2";
import Footer from "./Components/Footer/Footer";
import ScrollToTop from "./context/ScrollToTop";
const Home = lazy(() => import("./Pages/Home/Home"));

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

const App = () => {
  return (
    <>
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

            {/* <Header /> */}
            <Header2 />

            <ScrollToTop />

            <Box
              component="main"
              id="main-content"
              tabIndex={-1}
              sx={{ outline: "none" }}
            >
              <AppErrorBoundary>
                <Suspense fallback={<RouteLoader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />

                  {/* Pets --------------------------------  */}
                  <Route path="/pet_info" element={<Pet_Info />} />
                  <Route path="/petcare" element={<PetCare />} />
                  <Route
                    path="/petcare/boarding"
                    element={<PetBoardingAll />}
                  />
                  <Route
                    path="/petcare/boarding/:id"
                    element={withProtection(PetBoardingDetails)}
                  />
                  <Route
                    path="/petcare/grooming"
                    element={<PetGroomingAll />}
                  />
                  <Route
                    path="/petcare/grooming/:id"
                    element={withProtection(PetGroomingDetails)}
                  />
                  <Route path="/pet_training" element={<Pet_Training />} />
                  <Route
                    path="/training/:id"
                    element={withProtection(TrainingDetail)}
                  />
                  <Route path="/adoption" element={<Adoption />} />
                  <Route
                    path="/adoption/adoptable_pets"
                    element={<AdoptablePets />}
                  />
                  <Route
                    path="/adoption/adoptable_pets/:code"
                    element={withProtection(AdoptablePetDetails)}
                  />
                  <Route path="/rescue_alert" element={<RescueAlert />} />
                  <Route path="/lost_found" element={<Lost_Found />} />
                  <Route path="/lost_found/lost_pets" element={<LostPets />} />
                  <Route
                    path="/lost_found/found_pets"
                    element={<FoundPets />}
                  />
                  <Route
                    path="/lost_found/lost_form"
                    element={withProtection(LostForm)}
                  />
                  <Route
                    path="/lost_found/found_form"
                    element={withProtection(FoundForm)}
                  />

                  {/* Shop ---------------------------------------  */}
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/cart" element={<Cart />} />

                  {/* Veterinary --------------------------------------  */}
                  <Route
                    path="/online_consultation"
                    element={<Online_Consultation />}
                  />
                  <Route
                    path="/in_person_consultation"
                    element={<In_Person_Consultation />}
                  />
                  <Route path="/vet_finder" element={<VetFinder />} />
                  <Route path="/house_calls" element={<House_Calls />} />
                  <Route
                    path="/health_care_blog"
                    element={<Health_Care_Blog />}
                  />
                  <Route path="/covid19_info" element={<Covid19_Info />} />

                  {/* Get Involve -----------------  */}
                  <Route path="/volunteer" element={<Volunteer />} />
                  <Route path="/make_donation" element={<Make_Donation />} />
                  <Route
                    path="/our_success_story"
                    element={<Our_Success_Story />}
                  />
                  <Route
                    path="/share_your_story"
                    element={<Share_Your_Story />}
                  />
                  <Route path="/remembrance" element={<Remembrance />} />
                  <Route path="/reviews" element={<Reviews />} />

                  {/* Single Route -----------------  */}
                  <Route path="/about_us" element={<About_Us />} />
                  <Route path="/contact_us" element={<Contact_Us />} />

                  {/* User Route -----------------  */}
                  <Route path="/sign_in" element={<SignIn />} />
                  <Route path="/sign_up" element={<SignUp />} />
                  <Route
                    path="/password_reset"
                    element={<ResetPassword />}
                  />
                  <Route path="/profile" element={withProtection(Profile)} />
                  <Route path="/account" element={withProtection(Account)} />
                  <Route
                    path="/dashboard"
                    element={withProtection(Dashboard)}
                  />

                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </AppErrorBoundary>
            </Box>

            <Footer />
          </CartContextProvider>
        </UserAuthContextProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
