const track = document.querySelector('.carousel-track');
const images = document.querySelectorAll('.carousel-track img');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let index = 0;
const visibleImages = 5;
const imageWidth = 350 + 20; // ancho + gap
const totalImages = images.length;

// Función para mover el carrusel
function moverCarrusel(nuevaIndex) {
  index = (nuevaIndex + totalImages) % totalImages;
  track.style.transform = `translateX(-${index * imageWidth}px)`;
}

// Botones manuales
btnNext.addEventListener('click', () => moverCarrusel(index + 1));
btnPrev.addEventListener('click', () => moverCarrusel(index - 1));

// Avance automático cada 3 segundos
setInterval(() => {
  moverCarrusel(index + 1);
}, 3000);