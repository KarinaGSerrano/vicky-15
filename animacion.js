// H1
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.text-anim');

  // Ejecuta la animación inmediatamente cuando se carga la página
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('animate__fadeInUp');
      el.classList.remove('invisible');
    }, index * 75); // Controla el retraso entre los elementos para la cascada
  });
});

// FECHA
document.addEventListener('DOMContentLoaded', function () {
  // Seleccionamos los elementos con las clases escalera-1 y escalera-2
  const escaleras = document.querySelectorAll('.escalera-1, .escalera-2');

  // Creamos el IntersectionObserver
  const obs = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        // Si el elemento está en el viewport, agregamos la clase 'show'
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          // Si el elemento ya no está en el viewport, removemos la clase 'show'
          entry.target.classList.remove('show');
        }
      });
    },
    {
      threshold: 0.5, // 50% del elemento debe ser visible para activar la animación
    }
  );

  // Observamos cada uno de los elementos
  escaleras.forEach((escalera) => {
    obs.observe(escalera);
  });
});

function scrollAndAnimate(event, sectionId) {
  event.preventDefault();

  const section = document.getElementById(sectionId);
  const link = event.currentTarget;

  // Desplaza suavemente a la sección
  section.scrollIntoView({ behavior: 'smooth' });

  // Agrega la clase animate__slideInDown solo cuando se hace clic
  link.classList.add('animate__slideInDown');

  // Remueve la clase animate__slideInDown después de la duración de la animación (1s)
  setTimeout(() => {
    link.classList.remove('animate__slideInDown');
  }, 1000); // Duración en milisegundos
}

// BUTTON SHAKE

// Declarar shakeInterval en el ámbito global (o al menos compartido)

let shakeInterval;

const shakeButton = document.getElementById('shakeButton');

// Inicializar el intervalo
shakeInterval = setInterval(() => {
  // Agregar la animación personalizada
  shakeButton.classList.add('custom-shake');

  // Remover la animación después de 1 segundo (duración de la animación personalizada)
  setTimeout(() => {
    shakeButton.classList.remove('custom-shake');
  }, 1000); // Ajusta el tiempo si cambias la duración en CSS
}, 4000); // 8000 ms = 8 segundos

// Función para detener el shake
const stopShake = () => {
  clearInterval(shakeInterval); // Detener el intervalo
  shakeInterval = null; // Limpia la referencia
  shakeButton.classList.remove('custom-shake'); // Asegura que se quite la clase
};

// Usa pointerdown para escritorio y móvil
shakeButton.addEventListener('pointerdown', stopShake);

// COPIADO PORTAPAPELES

function copiarAlPortapapeles() {
  const input = document.getElementById('aliasInput');
  navigator.clipboard
    .writeText(input.value) // Copia al portapapeles
    .then(() => {
      alert('¡Alias/CVU copiado al portapapeles!');
    })
    .catch((err) => {
      console.error('Error al copiar:', err);
      alert('Hubo un problema al copiar el texto.');
    });
}

// NOTIFICACION COPIADO EN PORTAPAPELES

function copiarAlPortapapeles() {
  const input = document.getElementById('aliasInput');
  navigator.clipboard
    .writeText(input.value)
    .then(() => {
      mostrarNotificacion();
    })
    .catch((err) => {
      console.error('Error al copiar:', err);
    });
}

function mostrarNotificacion() {
  const notification = document.getElementById('notification');
  notification.classList.remove('hidden'); // Muestra la notificación
  setTimeout(() => {
    notification.classList.add('hidden'); // Oculta la notificación después de 3 segundos
  }, 3000);
}

// CONFIRMACION POR WHATSAPP

document.getElementById('sendBtn').addEventListener('click', function (event) {
  event.preventDefault(); // Evita que el enlace se ejecute inmediatamente

  const nameInput = document.getElementById('nameInput');
  const nameError = document.getElementById('nameError');
  const name = nameInput.value.trim();

  // Verifica si el nombre está vacío
  if (name === '') {
    nameError.classList.remove('opacity-0', 'invisible'); // Muestra el mensaje de error
    nameError.classList.add('opacity-100', 'visible'); // Hace visible el mensaje
    nameInput.classList.add('border-red-500'); // Opcional: agrega un borde rojo al input
    return;
  } else {
    nameError.classList.remove('opacity-100', 'visible'); // Oculta el mensaje de error
    nameError.classList.add('opacity-0', 'invisible'); // Lo hace invisible nuevamente
    nameInput.classList.remove('border-red-500'); // Elimina el borde rojo si lo había
  }

  // Número de teléfono de destino (en formato internacional, sin +)
  const phoneNumber = '5491158011253';

  // Mensaje predefinido que incluye el nombre del usuario
  const message = `¡Hola vicky! soy ${name}. Te confirmo que voy a asistir a tu fiesta.`;

  // Codificar el mensaje para la URL
  const encodedMessage = encodeURIComponent(message);

  // Construir la URL de WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  console.log(whatsappUrl);

  window.open(whatsappUrl, '_blank');
});

// Detecta cuando el usuario empieza a escribir y oculta el mensaje de error
document.getElementById('nameInput').addEventListener('input', function () {
  const nameError = document.getElementById('nameError');
  const nameInput = document.getElementById('nameInput');

  if (nameInput.value.trim() !== '') {
    nameError.classList.remove('opacity-100', 'visible'); // Oculta el mensaje de error
    nameError.classList.add('opacity-0', 'invisible'); // Lo hace invisible nuevamente
    nameInput.classList.remove('border-red-500'); // Elimina el borde rojo si lo había
  }
});

// SCROLL NAV

function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// LOTTIE

const animacion = lottie.loadAnimation({
  container: document.getElementById('lottieContainer'), // Contenedor donde se renderizará la animación
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'assets/lottie/animation2.json',
});

// Iniciar o reiniciar la animación al hacer clic en el botón
document.getElementById('animButton').addEventListener('click', () => {
  console.log('Botón clickeado');
  animacion.goToAndStop(0, true); // Reinicia la animación al inicio
  animacion.play(); // Inicia la animación
});

// Redimensionar la animación si es necesario (cuando la ventana cambia de tamaño)
window.addEventListener('resize', () => {
  animacion.resize(); // Ajusta el tamaño de la animación al contenedor
});
