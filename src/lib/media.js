export const sanitizeImageUrl = (value) => {
  if (!value) {
    return "";
  }

  return String(value)
    .trim()
    .replace(/^["'`]+/, "")
    .replace(/["'`]+$/, "")
    .trim();
};
