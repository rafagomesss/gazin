import './assets/main.css'
import './index.css'
import 'vue-toastification/dist/index.css'
import 'sweetalert2/dist/sweetalert2.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Cookies from 'js-cookie'
import Toast, { POSITION, useToast } from 'vue-toastification';
import VueSweetalert2 from 'vue-sweetalert2';

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

let isFetchingCSRFToken = false;

axios.interceptors.request.use(
  async (config) => {
    try {
      const csrfToken = Cookies.get('XSRF-TOKEN');
      if (!csrfToken && !isFetchingCSRFToken) {
        isFetchingCSRFToken = true;
        await axios.get('/sanctum/csrf-cookie');
        isFetchingCSRFToken = false;
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
    const toast = useToast();
    if (!error.response) {
      toast.error('O servidor está indisponível! Por favor, tente novamente mais tarde.');
    } else {
      const { status, data } = error.response;

      switch (status) {
        case 422: {
          const errorAuth = data.errors?.email || data.errors?.password;
          const messageError = errorAuth ? 'Dados inválidos!' : data.message || data.error || 'Erro desconhecido!';
          toast.warning('Erro de validação: ' + messageError);
          break;
        }
        case 500:
          toast.error('Erro interno do servidor. Por favor, tente novamente mais tarde.');
          break;
        case 401:
          toast.error('Não autorizado. Por favor, faça login novamente.');
          localStorage.removeItem('auth_token');
          router.push({ name: 'Login' });
          break;
        default:
          toast.error('Erro: ' + (data.error || data.message || 'Ocorreu um erro desconhecido.'));
      }
      return Promise.reject(error);
    }
  }
);


const app = createApp(App);

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$cookies = Cookies;

app.use(router);
app.use(VueSweetalert2);
app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,
  maxToasts: 20,
  newestOnTop: true,
  shareAppContext: true,
  filterBeforeCreate: (toast, toasts) => {
    if (toasts.filter(t => t.type === toast.type).length !== 0) {
      return false;
    }
    return toast;
  }
})

app.mount('#app');
