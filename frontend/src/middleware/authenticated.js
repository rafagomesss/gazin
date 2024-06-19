export default function isAuthenticated(to, from, next) {
  const isAuthenticated = localStorage.getItem('auth_token');

  if (isAuthenticated) {
    if (to.path === '/login' || to.path === '/register') {
      next(from.path);
    } else {
      next();
    }
  } else {
    next();
  }
}