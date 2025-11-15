import axios from 'axios';

// Create an Axios instance with default configurations, con headers para tokens y manejo de errores

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// =========================================================
//  Interceptor para agregar token automáticamente
// =========================================================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// =========================================================
//  Interceptor de respuestas con manejo de errores
// =========================================================
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Si el token expiró (401)
    if (error.response?.status === 401) {
      console.warn("⚠️ Token expirado o inválido");

      //  Opcional: si tenés refresh token, acá pedirías otro
      // const refresh = localStorage.getItem('refresh');
      // ... refresh logic ...

      // Si no hay refresh: deslogueamos
      localStorage.clear();
      window.location.href = '/login';
    }

    // Manejo de errores genéricos
    console.error("API ERROR:", error.response || error.message);

    return Promise.reject(
      error.response?.data?.message || "Error de conexión con el servidor"
    );
  }
);


export default api;