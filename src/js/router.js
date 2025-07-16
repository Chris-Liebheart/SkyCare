import { showLanding } from '../views/landing.js';
import { showLogin } from '../views/login.js';
import { showRegister } from '../views/register.js';
import { showDashboard } from '../views/dashboard.js';
import { showNotFound} from '../views/404.js';

export function router () {
    const router = {
    '': showLanding,
    '#/': showLanding,
    '#/login': showLogin,
    '#/register': showRegister,
    '#/dashboard': showDashboard,
};

const path = location.hash || '#/';
  const currentUser = localStorage.getItem('currentUser');

  // If user is logged in, redirect from landing to dashboard
  if (currentUser && (path === '#/' || path === '')) {
    location.hash = '#/dashboard';
    return;
  }

  // Protect dashboard route, redirect to login if not logged in
  if (path === '#/dashboard' && !currentUser) {
    location.hash = '#/login';
    return;
  }

  const app = document.getElementById('app');
  app.innerHTML = '';

  // Render the view corresponding to the route or 404 if none matches
  const render = routes[path] || showNotFound;
  render(app);

  actualizarHeader(path);
}

// Function to load the correct view based on URL hash
function router() {
  const hash = window.location.hash;
  const baseRoute = hash.split('?')[0]; // Remove query params

  // If route exists, show it
  if (routes[baseRoute]) {
    routes[baseRoute]();
  } else {
    // If route doesn't exist, show 404 page
    window.location.hash = '#/not-found';
  }
}

// Run router on page load and when URL hash changes
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
