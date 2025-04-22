// Check if we are in production or development mode
const isProduction = process.env.NODE_ENV === 'production';  // Use process.env for Jest compatibility

// Use the appropriate URLs based on the environment
export const baseUrl = isProduction 
  ? process.env.VITE_BASE_URL_PROD  // Production URL
  : process.env.VITE_BASE_URL_DEV;  // Development URL

export const imageUrl = isProduction 
  ? process.env.VITE_IMAGE_PROD  // Production Image URL
  : process.env.VITE_IMAGE_DEV;  // Development Image URL

export const notificationToken = process.env.VITE_NOTIFICATION_TOKEN;

// Optional: console.log for debugging
// console.log('Base URL:', baseUrl);
// console.log('Image URL:', imageUrl);
