const errorMessageMap = {
  "auth/invalid-credential": "Invalid email or password.",
  "auth/user-not-found": "No account was found for that email address.",
  "auth/wrong-password": "Invalid email or password.",
  "auth/email-already-in-use": "An account already exists with that email.",
  "auth/weak-password": "Password should be at least 6 characters long.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/popup-closed-by-user": "Google sign-in was cancelled before it finished.",
  "auth/network-request-failed":
    "Network error. Please check your connection and try again.",
  "auth/too-many-requests":
    "Too many attempts. Please wait a moment and try again.",
  "auth/missing-password": "Please enter your password.",
};

export const getAuthErrorMessage = (
  error,
  fallback = "Something went wrong. Please try again."
) => {
  if (!error) {
    return fallback;
  }

  return errorMessageMap[error.code] || error.message || fallback;
};
