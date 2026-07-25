import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const LazySection = ({
  children,
  fallback = null,
  minHeight = 240,
  rootMargin = "200px 0px",
}) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = containerRef.current;

    if (!target || isVisible) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <Box ref={containerRef} sx={{ minHeight }}>
      {isVisible ? children : fallback}
    </Box>
  );
};

export default LazySection;
