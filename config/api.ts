// API Configuration
export const API_CONFIG = {
  BASE_URL: __DEV__ ? 'http://127.0.0.1:8000' : 'https://your-production-url.com',
  ENDPOINTS: {
    NEWS: '/api/news/',
    CATEGORIES: '/api/categories/',
    CONTENT: '/api/content/',
    COMPLAINTS: '/api/complains/',
    NOTIFICATIONS: '/api/notifications/',
  },
  TIMEOUT: 10000, // 10 seconds
};

export default API_CONFIG;
