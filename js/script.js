const track = document.querySelector('.carousel-track');
const images = document.querySelectorAll('.carousel-track img');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let index = 0;
const imageWidth = 350 + 20; // ancho + gap
const totalImages = images.length;

// Función para calcular cuántas imágenes mostrar según el ancho
function getVisibleImages() {
  if (window.innerWidth >= 1200) return 9; // PC
  if (window.innerWidth >= 768) return 5;  // Tablet
  return 9;                                // Móvil
}

// Función para mover el carrusel
function moverCarrusel(nuevaIndex) {
  const visibleImages = getVisibleImages();

  if (nuevaIndex > totalImages - visibleImages) {
    index = 0; // vuelve al inicio
  } else if (nuevaIndex < 0) {
    index = totalImages - visibleImages; // último bloque
  } else {
    index = nuevaIndex;
  }

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
