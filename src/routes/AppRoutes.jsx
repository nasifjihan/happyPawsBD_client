import { lazy } from "react";
import { Outlet, Route, Routes } from "react-router-dom";

import ProtectedRoute from "../Components/Authentication/ProtectedRoute";
import AdminAppLayout from "./AdminAppLayout";
import PublicAppLayout from "./PublicAppLayout";

const Home = lazy(() => import("../Pages/Home/Home"));
const AdminShell = lazy(() => import("../Admin/AdminShell"));
const AdminLogin = lazy(() => import("../Admin/pages/AdminLogin"));
const AdminDashboard = lazy(() => import("../Admin/pages/AdminDashboard"));
const AdoptableAnimalsAdmin = lazy(() => import("../Admin/pages/AdoptableAnimalsAdmin"));
const AdminVetProviders = lazy(() => import("../Admin/pages/AdminVetProviders"));
const AdminPrograms = lazy(() => import("../Admin/pages/AdminPrograms"));
const AdminAdoptionRequestDetails = lazy(() => import("../Admin/pages/AdminAdoptionRequestDetails"));
const AdminEnrollments = lazy(() => import("../Admin/pages/AdminEnrollments"));
const AdminLostFound = lazy(() => import("../Admin/pages/AdminLostFound"));
const AdminHouseCallRequestDetails = lazy(() => import("../Admin/pages/AdminHouseCallRequestDetails"));
const AdminHouseCallRequests = lazy(() => import("../Admin/pages/AdminHouseCallRequests"));
const AdminInPersonConsultationDetails = lazy(() => import("../Admin/pages/AdminInPersonConsultationDetails"));
const AdminInPersonConsultations = lazy(() => import("../Admin/pages/AdminInPersonConsultations"));
const AdminOnlineConsultationDetails = lazy(() => import("../Admin/pages/AdminOnlineConsultationDetails"));
const AdminOnlineConsultations = lazy(() => import("../Admin/pages/AdminOnlineConsultations"));
const AdminOrderDetails = lazy(() => import("../Admin/pages/AdminOrderDetails"));
const AdminOrders = lazy(() => import("../Admin/pages/AdminOrders"));
const AdminReviewDetails = lazy(() => import("../Admin/pages/AdminReviewDetails"));
const AdminReviews = lazy(() => import("../Admin/pages/AdminReviews"));
const AdminRescueAlertDetails = lazy(() => import("../Admin/pages/AdminRescueAlertDetails"));
const AdminRescueAlerts = lazy(() => import("../Admin/pages/AdminRescueAlerts"));
const AdminSettings = lazy(() => import("../Admin/pages/AdminSettings"));
const AdminBlogPosts = lazy(() => import("../Admin/pages/AdminBlogPosts"));
const AdminPetInfoAnimals = lazy(() => import("../Admin/pages/AdminPetInfoAnimals"));
const AdminPetInfoBreeds = lazy(() => import("../Admin/pages/AdminPetInfoBreeds"));
const AdminStories = lazy(() => import("../Admin/pages/AdminStories"));
const AdminVolunteerRequestDetails = lazy(() => import("../Admin/pages/AdminVolunteerRequestDetails"));
const AdminVolunteerRequests = lazy(() => import("../Admin/pages/AdminVolunteerRequests"));
const AdoptionRequestsAdmin = lazy(() => import("../Admin/pages/AdoptionRequestsAdmin"));
const ShopItemsAdmin = lazy(() => import("../Admin/pages/ShopItemsAdmin"));

const Pet_Info = lazy(() => import("../Pages/Pets/Pet Info/Pet_Info"));
const PetCare = lazy(() => import("../Pages/Pets/Pet Care/PetCare"));
const PetBoardingAll = lazy(
  () => import("../Pages/Pets/Pet Care/PetBoardingAll"),
);
const PetBoardingDetails = lazy(
  () => import("../Pages/Pets/Pet Care/PetBoardingDetails"),
);
const PetGroomingAll = lazy(
  () => import("../Pages/Pets/Pet Care/PetGroomingAll"),
);
const PetGroomingDetails = lazy(
  () => import("../Pages/Pets/Pet Care/PetGroomingDetails"),
);
const Pet_Training = lazy(
  () => import("../Pages/Pets/Pet Training/Pet_Training"),
);
const TrainingDetail = lazy(
  () => import("../Pages/Pets/Pet Training/TrainingDetail"),
);
const Adoption = lazy(() => import("../Pages/Pets/Adoption/Adoption"));
const AdoptablePets = lazy(
  () => import("../Pages/Pets/Adoption/AdoptablePets"),
);
const AdoptablePetDetails = lazy(
  () => import("../Pages/Pets/Adoption/AdoptablePetDetails"),
);
const RescueAlert = lazy(
  () => import("../Pages/Pets/Rescue Alert/RescueAlert"),
);
const Lost_Found = lazy(() => import("../Pages/Pets/Lost & Found/Lost_Found"));
const LostPets = lazy(() => import("../Pages/Pets/Lost & Found/LostPets"));
const FoundPets = lazy(() => import("../Pages/Pets/Lost & Found/FoundPets"));
const LostForm = lazy(() => import("../Pages/Pets/Lost & Found/LostForm"));
const FoundForm = lazy(() => import("../Pages/Pets/Lost & Found/FoundForm"));

const Shop = lazy(() => import("../Pages/Shop/Shop"));
const Cart = lazy(() => import("../Pages/Shop/Cart/Cart"));

const Online_Consultation = lazy(
  () => import("../Pages/Veterinary/Online Consultation/Online_Consultation"),
);
const In_Person_Consultation = lazy(
  () =>
    import("../Pages/Veterinary/In Person Consultation/In_Person_Consultation"),
);
const VetFinder = lazy(
  () => import("../Pages/Veterinary/Vet Finder/VetFinder"),
);
const House_Calls = lazy(
  () => import("../Pages/Veterinary/House Calls/House_Calls"),
);
const Health_Care_Blog = lazy(
  () => import("../Pages/Veterinary/Health Care Blog/Health_Care_Blog"),
);
const BlogPostDetails = lazy(
  () => import("../Pages/Veterinary/Health Care Blog/BlogPostDetails"),
);
const Covid19_Info = lazy(
  () => import("../Pages/Veterinary/Covid19 Info/Covid19_Info"),
);

const Volunteer = lazy(
  () => import("../Pages/Get Involve/Volunteer/Volunteer"),
);
const Make_Donation = lazy(
  () => import("../Pages/Get Involve/Make Donation/Make_Donation"),
);
const Our_Success_Story = lazy(
  () => import("../Pages/Get Involve/Our Success Story/Our_Success_Story"),
);
const Share_Your_Story = lazy(
  () => import("../Pages/Get Involve/Share Your Story/Share_Your_Story"),
);
const Remembrance = lazy(
  () => import("../Pages/Get Involve/Remembrance/Remembrance"),
);
const Reviews = lazy(() => import("../Pages/Get Involve/Reviews/Reviews"));

const About_Us = lazy(() => import("../Pages/About Us/About_Us"));
const Contact_Us = lazy(() => import("../Pages/Contact Us/Contact_Us"));

const SignIn = lazy(() => import("../Components/Authentication/SignIn"));
const SignUp = lazy(() => import("../Components/Authentication/SignUp"));
const ResetPassword = lazy(
  () => import("../Components/Authentication/ResetPassword"),
);
const Profile = lazy(() => import("../Dashboard/Profile"));
const Account = lazy(() => import("../Dashboard/Account"));
const Dashboard = lazy(() => import("../Dashboard/Dashboard"));
const Orders = lazy(() => import("../Dashboard/Orders"));
const OrderDetails = lazy(() => import("../Dashboard/OrderDetails"));
const NotFound = lazy(() => import("../Pages/NotFound/NotFound"));

const ProtectedOutlet = () => (
  <ProtectedRoute>
    <Outlet />
  </ProtectedRoute>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminAppLayout />}>
        <Route path="login" element={<AdminLogin />} />
        <Route element={<AdminShell />}>
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
      </Route>

      <Route path="/" element={<PublicAppLayout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />

        <Route path="pet_info" element={<Pet_Info />} />
        <Route path="petcare" element={<PetCare />} />
        <Route path="petcare/boarding" element={<PetBoardingAll />} />
        <Route path="petcare/boarding/:id" element={<PetBoardingDetails />} />
        <Route path="petcare/grooming" element={<PetGroomingAll />} />
        <Route path="petcare/grooming/:id" element={<PetGroomingDetails />} />
        <Route path="pet_training" element={<Pet_Training />} />
        <Route path="training/:id" element={<TrainingDetail />} />
        <Route path="adoption" element={<Adoption />} />
        <Route path="adoption/adoptable_pets" element={<AdoptablePets />} />
        <Route
          path="adoption/adoptable_pets/:code"
          element={<AdoptablePetDetails />}
        />
        <Route path="rescue_alert" element={<RescueAlert />} />
        <Route path="lost_found" element={<Lost_Found />} />
        <Route path="lost_found/lost_pets" element={<LostPets />} />
        <Route path="lost_found/found_pets" element={<FoundPets />} />
        <Route path="lost_found/lost_form" element={<LostForm />} />
        <Route path="lost_found/found_form" element={<FoundForm />} />

        <Route path="shop" element={<Shop />} />
        <Route path="cart" element={<Cart />} />

        <Route path="online_consultation" element={<Online_Consultation />} />
        <Route
          path="in_person_consultation"
          element={<In_Person_Consultation />}
        />
        <Route path="vet_finder" element={<VetFinder />} />
        <Route path="house_calls" element={<House_Calls />} />
        <Route path="health_care_blog" element={<Health_Care_Blog />} />
        <Route
          path="health_care_blog/posts/:id"
          element={<BlogPostDetails />}
        />
        <Route path="covid19_info" element={<Covid19_Info />} />

        <Route path="volunteer" element={<Volunteer />} />
        <Route path="make_donation" element={<Make_Donation />} />
        <Route path="our_success_story" element={<Our_Success_Story />} />
        <Route path="share_your_story" element={<Share_Your_Story />} />
        <Route path="remembrance" element={<Remembrance />} />
        <Route path="reviews" element={<Reviews />} />

        <Route path="about_us" element={<About_Us />} />
        <Route path="contact_us" element={<Contact_Us />} />
        <Route path="sign_in" element={<SignIn />} />
        <Route path="sign_up" element={<SignUp />} />
        <Route path="password_reset" element={<ResetPassword />} />

        <Route element={<ProtectedOutlet />}>
          <Route path="profile" element={<Profile />} />
          <Route path="account" element={<Account />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:token" element={<OrderDetails />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
