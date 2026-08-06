import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Box, Card, Chip, Link, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import OptimizedImage from "../../Components/Common/OptimizedImage";
import { getVetAuthors } from "../../API/api";
import { sanitizeImageUrl } from "../../lib/media";

const navBaseSx = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  color: "#fff",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  zIndex: 2,
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
};

const NavArrow = ({ boxRef, sx, children }) => {
  return (
    <Box ref={boxRef} sx={{ ...navBaseSx, ...sx }}>
      {children}
    </Box>
  );
};

const Vets = () => {
  const prevElRef = React.useRef(null);
  const nextElRef = React.useRef(null);
  const swiperRef = React.useRef(null);

  React.useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || !prevElRef.current || !nextElRef.current) return;

    swiper.params.navigation.prevEl = prevElRef.current;
    swiper.params.navigation.nextEl = nextElRef.current;
    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["home", "vet-authors", { page: 1, limit: 12 }],
    queryFn: () => getVetAuthors({ page: 1, limit: 12 }),
    staleTime: 300_000,
  });

  const vets = data?.items ?? [];
  const maxSlidesPerView = 3;
  const shouldLoop = vets.length > maxSlidesPerView;

  return (
    <Box
      className="myContainer"
      sx={{
        my: 10,
        textAlign: "center",
      }}
    >
      <Chip
        label="Trusted Pet Care Platform"
        color="success"
        variant="outlined"
        sx={{ fontWeight: 700 }}
      />

      <Typography variant="h4" sx={{ lineHeight: 1, fontWeight: "900", p: 2 }}>
        Meet Our Veterinary Authors
      </Typography>

      <Typography variant="body1" sx={{ px: 4, color: "primary.para" }}>
        Veterinarians are at the core of Great Pet Care. These caring
        professionals write articles, review content <br /> for medical
        accuracy, and provide trusted information and insight. Meet some of our
        pet health partners.
      </Typography>

      <Box sx={{ position: "relative" }}>
        {isLoading ? (
          <Typography sx={{ mt: 3, color: "primary.para" }}>
            Loading...
          </Typography>
        ) : isError ? (
          <Typography sx={{ mt: 3, color: "primary.para" }}>
            Could not load veterinary authors.
          </Typography>
        ) : null}

        <Box
          sx={{
            mt: 4,
            "& .swiper": {
              overflow: "hidden",
            },
            "& .swiper-pagination": { position: "static", marginTop: "16px" },
            "& .swiper-pagination-bullet": {
              backgroundColor: "#E0E0E0",
              width: "12px",
              height: "12px",
              opacity: 1,
              margin: "0 8px",
            },
            "& .swiper-pagination-bullet-active": { backgroundColor: "green" },
          }}
        >
          <NavArrow
            boxRef={prevElRef}
            sx={{ left: "10px", paddingLeft: "8px" }}
          >
            <ArrowBackIos />
          </NavArrow>

          <NavArrow boxRef={nextElRef} sx={{ right: "10px" }}>
            <ArrowForwardIos />
          </NavArrow>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            navigation={{
              prevEl: prevElRef.current,
              nextEl: nextElRef.current,
            }}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={shouldLoop}
            watchOverflow
            centeredSlides
            slidesPerGroup={1}
            grabCursor
            breakpoints={{
              0: { slidesPerView: 0.6, spaceBetween: 30 },
              600: { slidesPerView: 2, spaceBetween: 30 },
              900: { slidesPerView: 3, spaceBetween: 30 },
              1224: { slidesPerView: 4, spaceBetween: 40 },
            }}
          >
            {vets.map((item) => (
              <SwiperSlide key={item._id || item.id}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: 250,
                    // mx: "auto",
                    height: 150,
                    // margin: "40px 0px",
                  }}
                >
                  <Box
                    sx={{
                      width: "100px",
                      height: "130px",
                      borderRadius: ".6rem",
                      position: "absolute",
                      left: "-35px",
                      top: "10px",
                      zIndex: 100,
                      overflow: "hidden",
                    }}
                  >
                    <OptimizedImage
                      src={sanitizeImageUrl(item.picture)}
                      alt={item.name || "Veterinary author"}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </Box>
                  <Card
                    sx={{
                      position: "relative",
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      borderRadius: ".5rem",
                      boxShadow: "0px 0px 20px 1px rgba(82,82,82,0.2)",
                      padding: "30px 15px 0px 75px",
                    }}
                  >
                    <Stack spacing={0}>
                      <Typography
                        sx={{
                          textAlign: "left",
                          fontSize: 16,
                          fontWeight: 700,
                        }}
                        variant="h6"
                        component="div"
                      >
                        {item.name || "Veterinary Author"}
                      </Typography>

                      <Typography
                        sx={{
                          textAlign: "left",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                        variant="h6"
                        component="div"
                      >
                        {item.specialization || "Vet Partner"}
                      </Typography>

                      <Typography
                        sx={{
                          textAlign: "left",
                          fontSize: 11,
                          fontWeight: 500,
                        }}
                        variant="h6"
                        component="div"
                      >
                        {item.location || "Bangladesh"}
                      </Typography>

                      <Typography
                        sx={{
                          textAlign: "left",
                          fontSize: 11,
                          fontWeight: 500,
                        }}
                        variant="h6"
                        component="div"
                      >
                        {item.contact || ""}
                      </Typography>

                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 10,
                          right: 10,
                          fontSize: 11,
                          color: "primary.green",
                          textDecoration: "none",
                          cursor: "pointer",
                        }}
                      >
                        <Link
                          href={item.details || "/health_care_blog"}
                          underline="none"
                          color="inherit"
                          target={item.details ? "_blank" : undefined}
                          rel={item.details ? "noopener noreferrer" : undefined}
                        >
                          - Learn More
                        </Link>
                      </Box>
                    </Stack>
                  </Card>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </Box>
  );
};

export default Vets;
