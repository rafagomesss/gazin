import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Cookies from 'js-cookie'
import './index.css'

axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.withCredentials = true


axios.interceptors.request.use(
  async (config) => {
    try {
      if (!Cookies.get('XSRF-TOKEN')) {
        await axios.get('/sanctum/csrf-cookie');
      }
      const token = Cookies.get('XSRF-TOKEN');
      if (token) {
        config.headers['X-XSRF-TOKEN'] = token;
      }
      const authToken = localStorage.getItem('auth_token');
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
    } catch (error) {
      console.error('Erro ao obter CSRF token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      alert('O backend está indisponível. Por favor, tente novamente mais tarde.');
    } else {
      const { status, data } = error.response;
      if (status === 422) {
        alert('Erro de validação: ' + JSON.stringify(data.errors));
      } else if (status === 500) {
        alert('Erro interno do servidor. Por favor, tente novamente mais tarde.');
      } else if (status === 401) {
        alert('Não autorizado. Por favor, faça login novamente.');
        router.push({ name: 'Login' });
      } else {
        alert('Erro: ' + data.message || 'Ocorreu um erro desconhecido.');
      }
    }
    return Promise.reject(error);
  }
);

// axios.interceptors.request.use(
//   async (config) => {
//     try {
//       if (!Cookies.get('XSRF-TOKEN')) {
//         await axios.get('/sanctum/csrf-cookie');
//       }
//       const token = Cookies.get('XSRF-TOKEN');
//       if (token) {
//         config.headers['X-XSRF-TOKEN'] = token;
//       }
//       const authToken = localStorage.getItem('auth_token');
//       if (authToken) {
//         config.headers['Authorization'] = `Bearer ${authToken}`;
//       }
//     } catch (error) {
//       console.error('Erro ao obter CSRF token:', error);
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (!error.response) {
//       alert('O backend está indisponível. Por favor, tente novamente mais tarde.');
//     }
//     return Promise.reject(error);
//   }
// );

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.config.globalProperties.$cookies = Cookies
app.use(router)
app.mount('#app')
