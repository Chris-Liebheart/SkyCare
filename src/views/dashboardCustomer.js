import { getWeatherInfo } from '../js/weatherService.js';

export function showDashboardCustomer() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <section class="dashboard">
      <h2>Dashboard del Cliente</h2>
      <p>Consulta el clima y recibe recomendaciones personalizadas</p>

      <div class="weather-section">
        <h3>Consultar Clima</h3>
        <div class="search-container">
          <input 
            id="cityInput" 
            placeholder="Ej. Barranquilla" 
            maxlength="50"
          />
          <button id="searchWeatherBtn">Buscar</button>
        </div>
        <div id="weatherResult"></div>
      </div>

      <div class="recommendations-section">
        <h3>Recomendaciones</h3>
        <div id="recommendationsContainer">
          <p>Las recomendaciones aparecerán aquí después de consultar el clima.</p>
        </div>
      </div>

      <div class="navigation">
        <a href="#/dashboard">← Volver al Dashboard</a> |
        <a href="#/login">Cerrar Sesión</a>
      </div>
    </section>
  `;

  initializeDashboard();
}

function initializeDashboard() {
  const cityInput = document.getElementById('cityInput');
  const searchBtn = document.getElementById('searchWeatherBtn');

  async function buscarClima() {
    const city = cityInput.value.trim();
    if (!city) return;

    const weather = await getWeatherInfo(city);

    if (weather) {
      renderWeather(weather, city);
      generateRecommendations(weather);
    } else {
      document.getElementById('weatherResult').innerHTML = '<p>Ciudad no encontrada.</p>';
    }
  }

  searchBtn.addEventListener('click', buscarClima);
  cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') buscarClima();
  });
}

function renderWeather(data, city) {
  const weatherDiv = document.getElementById('weatherResult');

  weatherDiv.innerHTML = `
    <div class="weather-card">
      <h4>Clima en ${city}</h4>
      <div class="weather-main">
        <span class="temp">${data.temperatura}°C</span>
        <span class="feels">Sensación: ${data.sensacionTermica}°C</span>
      </div>
      <p><strong>Condición:</strong> ${data.pronostico}</p>
      <p><strong>Humedad:</strong> ${data.humedad}%</p>
      <p><strong>Viento:</strong> ${data.viento} m/s</p>
      <p><strong>Índice UV:</strong> ${data.uv}</p>
      <small>Actualizado: ${new Date().toLocaleTimeString()}</small>
    </div>
  `;
}

function generateRecommendations(weatherData) {
  const container = document.getElementById('recommendationsContainer');
  const recommendations = [];

  if (weatherData.uv > 6) {
    recommendations.push('☀️ Índice UV Alto - Usa protector solar, sombrero y gafas de sol.');
  }

  if (weatherData.humedad > 80) {
    recommendations.push('💧 Humedad Alta - El aire está húmedo. Usa ropa transpirable.');
  }

  container.innerHTML = recommendations.length > 0 
    ? recommendations.map(rec => `<div class="rec-item">${rec}</div>`).join('')
    : '<p>No hay recomendaciones especiales.</p>';
}






















// import { getWeatherInfo } from '../js/weatherService.js';

// // Cache simple para evitar requests repetidas
// const weatherCache = new Map();

// export function showDashboardCustomer() {
//   const app = document.getElementById('app');
//   app.innerHTML = `
//     <section class="dashboard">
//       <h2>Dashboard del Cliente</h2>
//       <p>Consulta el clima y recibe recomendaciones personalizadas</p>
      
//       <div class="weather-section">
//         <h3>Consultar Clima</h3>
//         <div class="search-container">
//           <input 
//             id="cityInput" 
//             placeholder="Ej. Barranquilla" 
//             maxlength="50"
//           />
//           <button id="searchWeatherBtn">
//             <span id="btnText">Buscar</span>
//             <span id="btnLoading" style="display: none;">Buscando...</span>
//           </button>
//         </div>
//         <div id="weatherResult"></div>
//         <div id="errorMessage" style="color: red; display: none; margin-top: 10px;"></div>
//       </div>
      
//       <div class="recommendations-section">
//         <h3>Recomendaciones</h3>
//         <div id="recommendationsContainer">
//           <p>Las recomendaciones aparecerán aquí después de consultar el clima.</p>
//         </div>
//       </div>
      
//       <div class="navigation">
//         <a href="#/dashboard">← Volver al Dashboard</a> |
//         <a href="#/login">Cerrar Sesión</a>
//       </div>
//     </section>
//   `;

//   initializeDashboard();
// }

// function initializeDashboard() {
//   const cityInput = document.getElementById('cityInput');
//   const searchBtn = document.getElementById('searchWeatherBtn');
//   const weatherDiv = document.getElementById('weatherResult');
//   const errorDiv = document.getElementById('errorMessage');

//   // Función principal de búsqueda
//   async function buscarClima() {
//     const city = cityInput.value.trim();
//     if (!validateCity(city)) {
//       showError('Por favor ingresa una ciudad válida (mínimo 2 caracteres)');
//       return;
//     }

//     // Verificar cache (válido por 5 minutos)
//     const cacheKey = city.toLowerCase();
//     const cached = weatherCache.get(cacheKey);
//     if (cached && (Date.now() - cached.timestamp < 300000)) {
//       renderWeather(cached.data, city);
//       generateRecommendations(cached.data);
//       return;
//     }

//     try {
//       showLoading(true);
//       hideError();

//       const weather = await getWeatherInfo(city);

//       if (weather) {
//         // Guardar en cache
//         weatherCache.set(cacheKey, {
//           data: weather,
//           timestamp: Date.now()
//         });

//         renderWeather(weather, city);
//         generateRecommendations(weather);
//       } else {
//         showError('No se pudo obtener el clima. Verifica el nombre de la ciudad.');
//       }
//     } catch (error) {
//       console.error('Error en búsqueda:', error);
//       showError('Error al consultar el clima. Intenta nuevamente.');
//     } finally {
//       showLoading(false);
//     }
//   }

//   // Event listeners
//   searchBtn.addEventListener('click', buscarClima);
//   cityInput.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       buscarClima();
//     }
//   });

//   // Limpiar error cuando el usuario empiece a escribir
//   cityInput.addEventListener('input', () => {
//     hideError();
//   });
// }

// function validateCity(city) {
//   if (!city || city.length < 2) return false;

//   // Validar que contenga solo letras, espacios y caracteres acentuados
//   const cityRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s\-'\.]+$/;
//   return cityRegex.test(city);
// }

// function renderWeather(data, city) {
//   const weatherDiv = document.getElementById('weatherResult');

//   if (!data) {
//     weatherDiv.innerHTML = '<p>No hay datos disponibles.</p>';
//     return;
//   }

//   weatherDiv.innerHTML = `
//     <div class="weather-card">
//       <h4>Clima en ${escapeHtml(city)}</h4>
//       <div class="weather-info">
//         <div class="main-temp">
//           <span class="temp">${data.temperatura}°C</span>
//           <span class="feels-like">Sensación: ${data.sensacionTermica}°C</span>
//         </div>
//         <div class="weather-details">
//           <p><strong>Condición:</strong> ${escapeHtml(data.pronostico)}</p>
//           <p><strong>Humedad:</strong> ${data.humedad}%</p>
//           <p><strong>Viento:</strong> ${data.viento} m/s</p>
//           <p><strong>Índice UV:</strong> ${data.uv}</p>
//         </div>
//       </div>
//       <div class="weather-footer">
//         <small>Actualizado: ${new Date().toLocaleTimeString()}</small>
//       </div>
//     </div>
//   `;
// }

// function generateRecommendations(weatherData) {
//   const container = document.getElementById('recommendationsContainer');
//   const recommendations = [];

//   // Recomendaciones basadas en temperatura
//   if (weatherData.temperatura > 28) {
//     recommendations.push({
//       icon: '🌡️',
//       title: 'Temperatura Alta',
//       description: 'Usa ropa ligera y fresca. Mantente hidratado.',
//       type: 'temperature'
//     });
//   } else if (weatherData.temperatura < 18) {
//     recommendations.push({
//       icon: '🧥',
//       title: 'Temperatura Baja',
//       description: 'Lleva una chaqueta o suéter para mantenerte abrigado.',
//       type: 'temperature'
//     });
//   }

//   // Recomendaciones basadas en UV
//   if (weatherData.uv > 6) {
//     recommendations.push({
//       icon: '☀️',
//       title: 'Índice UV Alto',
//       description: 'Usa protector solar, sombrero y gafas de sol.',
//       type: 'uv'
//     });
//   }

//   // Recomendaciones basadas en humedad
//   if (weatherData.humedad > 80) {
//     recommendations.push({
//       icon: '💧',
//       title: 'Humedad Alta',
//       description: 'El aire está húmedo. Usa ropa transpirable.',
//       type: 'humidity'
//     });
//   }

//   // Recomendaciones basadas en viento
//   if (weatherData.viento > 8) {
//     recommendations.push({
//       icon: '🌬️',
//       title: 'Viento Fuerte',
//       description: 'Cuidado con objetos sueltos. Considera un cortavientos.',
//       type: 'wind'
//     });
//   }

//   // Recomendaciones basadas en condiciones específicas
//   const condition = weatherData.pronostico.toLowerCase();
//   if (condition.includes('lluvia') || condition.includes('rain')) {
//     recommendations.push({
//       icon: '🌧️',
//       title: 'Lluvia',
//       description: 'Lleva paraguas o impermeable. Conduce con precaución.',
//       type: 'rain'
//     });
//   }

//   if (condition.includes('nublado') || condition.includes('cloud')) {
//     recommendations.push({
//       icon: '☁️',
//       title: 'Cielo Nublado',
//       description: 'Buen día para actividades al aire libre sin sol intenso.',
//       type: 'cloudy'
//     });
//   }

//   if (condition.includes('despejado') || condition.includes('clear')) {
//     recommendations.push({
//       icon: '🌞',
//       title: 'Cielo Despejado',
//       description: 'Perfecto para actividades al aire libre. No olvides la protección solar.',
//       type: 'clear'
//     });
//   }

//   // Renderizar recomendaciones
//   if (recommendations.length === 0) {
//     container.innerHTML = '<p>No hay recomendaciones especiales para este clima.</p>';
//     return;
//   }

//   container.innerHTML = recommendations.map(rec => `
//     <div class="recommendation-card ${rec.type}">
//       <div class="rec-icon">${rec.icon}</div>
//       <div class="rec-content">
//         <h5>${rec.title}</h5>
//         <p>${rec.description}</p>
//       </div>
//     </div>
//   `).join('');
// }

// // Utilidades
// function showLoading(show) {
//   const btnText = document.getElementById('btnText');
//   const btnLoading = document.getElementById('btnLoading');
//   const searchBtn = document.getElementById('searchWeatherBtn');

//   if (show) {
//     btnText.style.display = 'none';
//     btnLoading.style.display = 'inline';
//     searchBtn.disabled = true;
//   } else {
//     btnText.style.display = 'inline';
//     btnLoading.style.display = 'none';
//     searchBtn.disabled = false;
//   }
// }

// function showError(message) {
//   const errorDiv = document.getElementById('errorMessage');
//   errorDiv.textContent = message;
//   errorDiv.style.display = 'block';

//   // Auto-hide después de 4 segundos
//   setTimeout(() => hideError(), 4000);
// }

// function hideError() {
//   const errorDiv = document.getElementById('errorMessage');
//   errorDiv.style.display = 'none';
// }

// function escapeHtml(text) {
//   if (!text) return '';
//   const div = document.createElement('div');
//   div.textContent = text;
//   return div.innerHTML;
// }