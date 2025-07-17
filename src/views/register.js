import { registerUser } from "../js/auth";

export function showRegister(container) {
  // Render the registration form
  container.innerHTML = `
    <section class="register">
      <h2>Registro de Usuario</h2>
      <form id="register-form">
        <input type="text" id="name" placeholder="Nombre completo" required />
        <input type="text" id="identify" placeholder="Número de identidad" required />
        <input type="text" id="reg-phone" placeholder="Teléfono" required />
        <input type="text" id="address" placeholder="Dirección" required />
        <input type="text" id="city" placeholder="Ciudad" required />
        <input type="email" id="email" placeholder="Correo electrónico" required />
        <input type="password" id="password" placeholder="Contraseña" required />
        <button type="submit">Registrarse</button>
      </form>
    </section>
  `;

  const form = document.getElementById('register-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop reload

    const name = document.getElementById('name').value.trim();
    const identify = document.getElementById('identify').value.trim;
    const phone = document.getElementById('phone').value.trim;
    const address = document.getElementById('address').value.trim;
    const city = document.getElementById('city').value.trim;
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const newUser = { name, identify, phone, address, city, email, password, role: "user" };

    try {
      await registerUser(newUser); // Try register
      alert("Registro exitoso. Inicia sesión.");
      window.location.hash = '#/login';
    } catch (error) {
      alert(error.message || "Error al registrarse.");
      console.error(error);
    }
  });
}