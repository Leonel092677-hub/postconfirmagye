const track = document.querySelector('.carousel-track');
const images = document.querySelectorAll('.carousel-track img');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let index = 0;
let autoSlide; // referencia al intervalo automático

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

// Función para iniciar el auto-slide
function startAutoSlide() {
  autoSlide = setInterval(() => {
    moverCarrusel(index + 1);
  }, 3000);
}

// Función para detener el auto-slide
function stopAutoSlide() {
  clearInterval(autoSlide);
}

// Iniciar auto-slide al cargar
startAutoSlide();

// Recalcular cuando se cambia el tamaño de la ventana
window.addEventListener('resize', () => moverCarrusel(index));

// === Evento para ampliar imágenes al hacer click ===
images.forEach(img => {
  img.addEventListener('click', (e) => {
    const isZoomed = img.classList.toggle('zoomed');

    if (isZoomed) {
      stopAutoSlide(); // detener carrusel
      img.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });

      // Cerrar al hacer clic en cualquier parte del documento
      document.addEventListener('click', closeZoom, { once: true });
    }
    e.stopPropagation(); // evita que el click en la imagen cierre inmediatamente
  });
});

// Función para cerrar zoom y reactivar carrusel
function closeZoom() {
  const zoomedImg = document.querySelector('.carousel-track img.zoomed');
  if (zoomedImg) {
    zoomedImg.classList.remove('zoomed');
  }
  startAutoSlide(); // reactivar carrusel
}