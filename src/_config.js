// Check if we are in production or development mode
const isProduction = import.meta.env.MODE === 'production';
 
// Use the appropriate URLs based on the environment
export const baseUrl = isProduction
  ? import.meta.env.VITE_BASE_URL_PROD // Production URL
  : import.meta.env.VITE_BASE_URL_DEV;  // Development URL

export const imageUrl = isProduction
  ? import.meta.env.VITE_IMAGE_PROD // Production Image URL
  : import.meta.env.VITE_IMAGE_DEV;  // Development Image URL

  export const notificationToken = import.meta.env.VITE_NOTIFICATION_TOKEN;

// console.log('Base URL:', baseUrl);
// console.log('Image URL:', imageUrl);
