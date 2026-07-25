import React, { Suspense, lazy } from "react";
import Branding from "./Branding";
import { Box, CircularProgress } from "@mui/material";
import LazySection from "../../Components/Common/LazySection";

const Vat_Care = lazy(() => import("./Vat_Care"));
const Vats = lazy(() => import("./Vats"));
const Adoptable_Animals = lazy(() => import("./Adoptable_Animals"));
const Adopted = lazy(() => import("./Adopted"));

const SectionLoader = () => (
  <Box py={6} display="flex" justifyContent="center">
    <CircularProgress color="success" />
  </Box>
);

const Home = () => {
  return (
    <div>
      <Branding />
      <LazySection fallback={<SectionLoader />} minHeight={420}>
        <Suspense fallback={<SectionLoader />}>
          <Vat_Care />
        </Suspense>
      </LazySection>
      <LazySection fallback={<SectionLoader />} minHeight={420}>
        <Suspense fallback={<SectionLoader />}>
          <Vats />
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
