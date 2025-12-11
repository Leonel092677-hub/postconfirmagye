const track = document.querySelector('.carousel-track');
const images = document.querySelectorAll('.carousel-track img');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let index = 0;

// Función para calcular cuántas imágenes caben en pantalla
function getVisibleImages() {
  const containerWidth = document.querySelector('.carousel').offsetWidth;
  const imageWidth = images[0].offsetWidth + 20; // ancho + gap dinámico
  return Math.max(1, Math.floor(containerWidth / imageWidth));
}

// Función para mover el carrusel
function moverCarrusel(nuevaIndex) {
  const visibleImages = getVisibleImages();
  const totalImages = images.length;

  if (nuevaIndex > totalImages - visibleImages) {
    index = 0; // vuelve al inicio
  } else if (nuevaIndex < 0) {
    index = totalImages - visibleImages; // último bloque
  } else {
    index = nuevaIndex;
  }

  const imageWidth = images[0].offsetWidth + 20; // recalcular dinámico
  track.style.transform = `translateX(-${index * imageWidth}px)`;
}

// Botones manuales
btnNext.addEventListener('click', () => moverCarrusel(index + 1));
btnPrev.addEventListener('click', () => moverCarrusel(index - 1));

// Avance automático cada 3 segundos
setInterval(() => {
  moverCarrusel(index + 1);
}, 3000);

// Recalcular cuando se cambia el tamaño de la ventana
window.addEventListener('resize', () => moverCarrusel(index));