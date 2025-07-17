// Show the landing page, landing view.
export function showLanding() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <section class="landing-content">
      <h1>SkyCare</h1>
      <h2>El clima importa. Tú también.</h2>
      <p>SkyCare te ayuda a entender el clima en tu ciudad y te da recomendaciones personalizadas para cuidarte mejor.</p>

      <ul class="features">
        <li>🌦 Datos meteorológicos en tiempo real</li>
        <li>🧴 Consejos de salud según el clima</li>
        <li>📍 Personalizado por ciudad</li>
      </ul>

      <div class="landing-buttons">
        <button onclick="location.hash = '#/login'">Iniciar sesión</button>
        <button onclick="location.hash = '#/register'">Registrarse</button>
      </div>
    </section>
  `;
}