// Import all views
import { showLanding } from '../views/landing.js';
import { showLogin } from '../views/login.js';
import { showRegister } from '../views/register.js';
import { showDashboard } from '../views/dashboard';
import { showNotFound } from '../views/notFound.js';

// Define app routes and match them to view functions
const routes = {
  '': showLanding,
  '/': showLanding,
  '#/login': showLogin,
  '#/register': showRegister,
  '#/dashboard': showDashboard,
  '#/not-found': showNotFound
};


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
