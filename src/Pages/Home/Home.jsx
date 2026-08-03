import React, { Suspense, lazy } from "react";
import Branding from "./Branding";
import { Box, CircularProgress } from "@mui/material";
import LazySection from "../../Components/Common/LazySection";

const VetCare = lazy(() => import("./VetCare"));
const Vets = lazy(() => import("./Vets"));
const Adoptable_Animals = lazy(() => import("./Adoptable_Animals"));
const Adopted = lazy(() => import("./Adopted"));

const SectionLoader = () => (
  <Box py={6} display="flex" sx={{ justifyContent: "center" }}>
    <CircularProgress color="success" />
  </Box>
);

const Home = () => {
  return (
    <div>
      <Branding />

      <LazySection fallback={<SectionLoader />} minHeight={420}>
        <Suspense fallback={<SectionLoader />}>
          <VetCare />
        </Suspense>
      </LazySection>

      <LazySection fallback={<SectionLoader />} minHeight={420}>
        <Suspense fallback={<SectionLoader />}>
          <Vets />
        </Suspense>
      </LazySection>

      <LazySection fallback={<SectionLoader />} minHeight={420}>
        <Suspense fallback={<SectionLoader />}>
          <Adopted />
        </Suspense>
      </LazySection>

      <LazySection fallback={<SectionLoader />} minHeight={420}>
        <Suspense fallback={<SectionLoader />}>
          <Adoptable_Animals />
        </Suspense>
      </LazySection>
    </div>
  );
};

export default Home;
