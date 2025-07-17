// Show the landing page
export function showLanding() {
  container.innerHTML = `
    <section class="landing-content">
      <h2>Bienvenido a SkyCare</h2>
      <p>El clima importa. Tú también.</p>
      <div class="landing-buttons">
        <!-- Go to login page -->
        <button onclick="location.hash = '#/login'">Iniciar sesión</button>

        <!-- Go to register page -->
        <button onclick="location.hash = '#/register'">Registrarse</button>
      </div>
    </section>
  `;
}