export const appEnv = {
  apiBaseUrl:
    import.meta.env.VITE_API_URL || "https://happypawsbd-server.onrender.com",
  stripePublishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "",
  firebase: {
    apiKey:
      import.meta.env.VITE_FIREBASE_API_KEY ||
      "AIzaSyCQwaS3_NsOYKqnNxOLbiGEh7r81nRKRfw",
    authDomain:
      import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
      "happypawsbd-6c3d6.firebaseapp.com",
    projectId:
      import.meta.env.VITE_FIREBASE_PROJECT_ID || "happypawsbd-6c3d6",
    storageBucket:
      import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
      "happypawsbd-6c3d6.appspot.com",
    messagingSenderId:
      import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1069879445379",
    appId:
      import.meta.env.VITE_FIREBASE_APP_ID ||
      "1:1069879445379:web:5190395e55790b278ad8b6",
  },
};
