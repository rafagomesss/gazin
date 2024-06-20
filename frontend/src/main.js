import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Cookies from 'js-cookie'
import Toast , { POSITION } from "vue-toastification";
import { useToast } from "vue-toastification";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import './index.css'
import "vue-toastification/dist/index.css";

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

const toast = useToast()
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
    if (!error.response) {
      toast.error('O servidor está indisponível! Por favor, tente novamente mais tarde.',
        {
          position: POSITION.TOP_RIGHT
        }
      );
    } else {
      const { status, data } = error.response;
      if (status === 422) {
        toast.warning('Erro de validação: ' + JSON.stringify(data.message), { position: POSITION.BOTTOM_RIGHT });
      } else if (status === 500) {
        toast.error('Erro interno do servidor. Por favor, tente novamente mais tarde.', { position: POSITION.BOTTOM_RIGHT });
      } else if (status === 401) {
        toast.error('Não autorizado. Por favor, faça login novamente.', { position: POSITION.BOTTOM_RIGHT });
        localStorage.removeItem('auth_token');
        router.push({ name: 'Login' });
      } else {
        toast.error('Erro: ' + (data.error || data.message || 'Ocorreu um erro desconhecido.'), { position: POSITION.BOTTOM_RIGHT });
      }
    }
    return Promise.reject(error);
  }
);


const app = createApp(App)
app.config.globalProperties.$axios = axios
app.config.globalProperties.$cookies = Cookies
app.use(router)
app.use(VueSweetalert2)
app.use(Toast, {
  position: POSITION.TOP_LEFT,
  maxToasts: 20,
  newestOnTop: true,
  shareAppContext: true,
  filterBeforeCreate: (toast, toasts) => {
    if (toasts.filter(
      t => t.type === toast.type
    ).length !== 0) {
      return false;
    }
    return toast;
  }
})
app.mount('#app')
