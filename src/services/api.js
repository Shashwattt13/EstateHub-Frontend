import axios from 'axios';

const API_URL = 'https://estatehub-backend-87mw.onrender.com/';

const api = axios.create({
  baseURL: API_URL,
  // do NOT set Content-Type here globally
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // If body is NOT FormData, let axios default to JSON automatically.
  // Do NOT force Content-Type for FormData.
  return config;
});

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Property APIs
export const propertyAPI = {
  getAll: (params) => api.get('/properties', { params }),
  getOne: (id) => api.get(`/properties/${id}`),
  create: (data) => api.post('/properties', data),      // FormData works now ✅
  update: (id, data) => api.put(`/properties/${id}`, data),
  delete: (id) => api.delete(`/properties/${id}`),
  toggleSave: (id) => api.post(`/properties/${id}/save`),
  getMy: () => api.get('/properties/my/listings'),
};

// Chat APIs
export const chatAPI = {
  getAll: () => api.get('/chats'),
  getOne: (id) => api.get(`/chats/${id}`),
  create: (data) => api.post('/chats', data),
  sendMessage: (id, text) => api.post(`/chats/${id}/messages`, { text }),
  markAsRead: (id) => api.put(`/chats/${id}/read`),
};

export default api;
