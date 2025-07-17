import { apiKey } from './config.js';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getWeatherInfo(city) {
  if (!city) return null;
  
  try {
    const url = `${API_BASE_URL}/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;
    const response = await fetch(url);
    
    if (!response.ok) return null;
    
    const data = await response.json();
    
    return {
      temperatura: Math.round(data.main.temp),
      sensacionTermica: Math.round(data.main.feels_like || data.main.temp),
      pronostico: data.weather[0].description,
      humedad: data.main.humidity,
      viento: Math.round(data.wind.speed * 10) / 10,
      uv: 0 // sin resultado por ahora
    };
    
  } catch (error) {
    return null;
  }
}
// src/js/weatherService.js
// import { apiKey } from './config.js';

// const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
// const REQUEST_TIMEOUT = 8000; // 8 segundos

// // Función para hacer requests con timeout
// async function fetchWithTimeout(url) {
//   const controller = new AbortController();
//   const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  
//   try {
//     const response = await fetch(url, {
//       signal: controller.signal
//     });
//     clearTimeout(timeoutId);
//     return response;
//   } catch (error) {
//     clearTimeout(timeoutId);
//     if (error.name === 'AbortError') {
//       throw new Error('REQUEST_TIMEOUT');
//     }
//     throw error;
//   }
// }

// // Función principal corregida - SIN OneCall API
// export async function getWeatherInfo(city) {
//   if (!city || typeof city !== 'string') {
//     return null;
//   }
  
//   if (!apiKey) {
//     console.error('API key no configurada');
//     return null;
//   }
  
//   const cityEncoded = encodeURIComponent(city.trim());
  
//   try {
//     // 1. Obtener datos actuales de clima
//     const weatherUrl = `${API_BASE_URL}/weather?q=${cityEncoded}&appid=${apiKey}&units=metric&lang=es`;
//     const weatherRes = await fetchWithTimeout(weatherUrl);
    
//     if (!weatherRes.ok) {
//       if (weatherRes.status === 404) {
//         console.warn(`Ciudad "${city}" no encontrada`);
//         return null;
//       } else if (weatherRes.status === 401) {
//         console.error('API key inválida');
//         return null;
//       } else if (weatherRes.status === 429) {
//         console.warn('Límite de requests excedido, intenta más tarde');
//         return null;
//       }
//       console.error(`Error HTTP ${weatherRes.status}`);
//       return null;
//     }
    
//     const weatherData = await weatherRes.json();
    
//     // Validar que tenemos los datos necesarios
//     if (!weatherData.main || !weatherData.weather || !weatherData.wind) {
//       console.error('Respuesta de API incompleta');
//       return null;
//     }
    
//     const { main, weather, wind } = weatherData;
    
//     // 2. Obtener índice UV usando UV Index API (reemplaza OneCall)
//     let uvIndex = 0;
//     try {
//       const uvUrl = `${API_BASE_URL}/uvi?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${apiKey}`;
//       const uvRes = await fetchWithTimeout(uvUrl);
      
//       if (uvRes.ok) {
//         const uvData = await uvRes.json();
//         uvIndex = uvData.value || 0;
//       }
//     } catch (uvError) {
//       console.warn('No se pudo obtener índice UV:', uvError.message);
//       // Continuar sin UV, no es crítico
//     }
    
//     // 3. Retornar datos formateados
//     return {
//       temperatura: Math.round(main.temp),
//       pronostico: weather[0].description || weather[0].main,
//       humedad: main.humidity,
//       viento: Math.round(wind.speed * 10) / 10,
//       uv: Math.round(uvIndex * 10) / 10,
//       sensacionTermica: main.feels_like ? Math.round(main.feels_like) : Math.round(main.temp),
//       ciudad: weatherData.name,
//       pais: weatherData.sys.country
//     };
    
//   } catch (error) {
//     console.error(`Error al obtener clima para ${city}:`, error);
    
//     // Manejar errores específicos
//     if (error.message === 'REQUEST_TIMEOUT') {
//       console.warn('Request timeout - intenta nuevamente');
//     } else if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
//       console.warn('Sin conexión a internet');
//     }
    
//     return null;
//   }
// }

// // Función adicional: obtener pronóstico de 5 días
// export async function getWeatherForecast(city) {
//   if (!city || typeof city !== 'string') {
//     return null;
//   }
  
//   const cityEncoded = encodeURIComponent(city.trim());
  
//   try {
//     const forecastUrl = `${API_BASE_URL}/forecast?q=${cityEncoded}&appid=${apiKey}&units=metric&lang=es&cnt=5`;
//     const forecastRes = await fetchWithTimeout(forecastUrl);
    
//     if (!forecastRes.ok) {
//       return null;
//     }
    
//     const forecastData = await forecastRes.json();
    
//     return forecastData.list.map(item => ({
//       fecha: new Date(item.dt * 1000).toLocaleDateString(),
//       temperatura: Math.round(item.main.temp),
//       pronostico: item.weather[0].description,
//       humedad: item.main.humidity
//     }));
    
//   } catch (error) {
//     console.error('Error al obtener pronóstico:', error);
//     return null;
//   }
// }
