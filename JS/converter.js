const inputField = document.getElementById('input-temp');
const fromUnitField = document.getElementById('input-unit');
const toUnitField = document.getElementById('output-unit');
const outputField = document.getElementById('output-temp');
const form = document.getElementById('converter');

function convertTemp(value, fromUnit, toUnit) {
  if (isNaN(value)) return 0; // Evita que salga "NaN" si el campo está vacío
  if (fromUnit === 'c') {
    if (toUnit === 'f') {
      return value * 9 / 5 + 32;
    } else if (toUnit === 'k') {
      return value + 273.15;
    }
    return value;
  }
  if (fromUnit === 'f') {
    if (toUnit === 'c') {
      return (value - 32) * 5 / 9;
    } else if (toUnit === 'k') {
      return (value + 459.67) * 5 / 9;
    }
    return value;
  }
  if (fromUnit === 'k') {
    if (toUnit === 'c') {
      return value - 273.15;
    } else if (toUnit === 'f') {
      return value * 9 / 5 - 459.67;
    }
    return value;
  }
  throw new Error('Invalid unit');
}

// Escucha los cambios en el formulario y calcula en tiempo real
form.addEventListener('input', () => {
  const inputTemp = parseFloat(inputField.value);
  const fromUnit = fromUnitField.value;
  const toUnit = toUnitField.value;

  const outputTemp = convertTemp(inputTemp, fromUnit, toUnit);
  const finalResult = (Math.round(outputTemp * 100) / 100) + ' ' + toUnit.toUpperCase();
  
  // Ajuste para pintar el texto correctamente en pantalla
  if (outputField.tagName === 'INPUT') {
    outputField.value = finalResult;
  } else {
    outputField.innerText = finalResult;
  }
});


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('¡PWA Sólida! Service Worker registrado en la raíz:', registration.scope);
      })
      .catch(error => {
        console.log('Error al registrar el Service Worker:', error);
      });
  });
}

// =========================================================================
// TU NUEVA ANIMACIÓN DE FONDO (AÑADIDA ABAJO SIN ALTERAR TU CÓDIGO)
// =========================================================================

function actualizarAnimacionFondo() {
  const inputTemp = parseFloat(inputField.value);
  const fromUnit = fromUnitField.value;
  const body = document.body;

  // Si el campo está vacío, dejamos el fondo neutral/normal
  if (isNaN(inputTemp)) {
    body.className = 'normal';
    return;
  }

  // Convertimos temporalmente a Celsius para evaluar los rangos del clima de forma estándar
  let tempCelsius = inputTemp;
  if (fromUnit === 'f') {
    tempCelsius = (inputTemp - 32) * 5 / 9;
  } else if (fromUnit === 'k') {
    tempCelsius = inputTemp - 273.15;
  }

  // Limpiamos las clases anteriores del body
  body.className = '';

  // Aplicamos la clase correspondiente según la temperatura en Celsius
  if (tempCelsius <= 0) {
    body.classList.add('mucho-frio');
  } else if (tempCelsius > 0 && tempCelsius <= 15) {
    body.classList.add('frio');
  } else if (tempCelsius > 15 && tempCelsius <= 26) {
    body.classList.add('normal');
  } else if (tempCelsius > 26 && tempCelsius <= 35) {
    body.classList.add('calor');
  } else {
    body.classList.add('mucho-calor');
  }
}

// Reacciona en tiempo real junto con tu formulario para cambiar el fondo
form.addEventListener('input', actualizarAnimacionFondo);

// Ejecutamos una vez al cargar la página para que el fondo inicial coincida con el "20" por defecto
actualizarAnimacionFondo();