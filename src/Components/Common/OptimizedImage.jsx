const OptimizedImage = ({
  src,
  alt,
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  style,
  ...rest
}) => {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      style={{
        display: "block",
        maxWidth: "100%",
        ...style,
      }}
      {...rest}
    />
  );
};

export default OptimizedImage;
