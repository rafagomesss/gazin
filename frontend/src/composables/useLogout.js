import { useRouter } from 'vue-router';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function useLogout() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout');
      localStorage.removeItem('auth_token');
      Cookies.remove('XSRF-TOKEN');
      Cookies.remove('laravel_session');
      router.push({ name: 'Login' });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      alert('Erro ao fazer logout. Por favor, tente novamente.');
    }
  };

  return { logout };
}
