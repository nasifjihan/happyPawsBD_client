import React, { useEffect, useState } from "react";
import { CardMedia } from "@mui/material";
import shopFallbackImage from "../../images/optimized/banner2.webp";
import { sanitizeImageUrl } from "../../lib/media";

const ResilientProductImage = ({
  image,
  alt,
  fallbackImage = shopFallbackImage,
  ...props
}) => {
  const sanitizedImage = sanitizeImageUrl(image);
  const [currentImage, setCurrentImage] = useState(sanitizedImage || fallbackImage);

  useEffect(() => {
    setCurrentImage(sanitizedImage || fallbackImage);
  }, [fallbackImage, sanitizedImage]);

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
