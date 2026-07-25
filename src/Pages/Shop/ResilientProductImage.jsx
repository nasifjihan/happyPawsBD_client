import React, { useEffect, useState } from "react";
import { CardMedia } from "@mui/material";
import shopFallbackImage from "../../images/optimized/banner2.webp";

const ResilientProductImage = ({
  image,
  alt,
  fallbackImage = shopFallbackImage,
  ...props
}) => {
  const [currentImage, setCurrentImage] = useState(image || fallbackImage);

  useEffect(() => {
    setCurrentImage(image || fallbackImage);
  }, [fallbackImage, image]);

  return (
    <CardMedia
      component="img"
      image={currentImage}
      alt={alt}
      onError={() => {
        setCurrentImage((previousImage) =>
          previousImage === fallbackImage ? previousImage : fallbackImage
        );
      }}
      {...props}
    />
  );
};

export default ResilientProductImage;
