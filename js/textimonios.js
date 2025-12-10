// Ejemplo: animación simple al cargar testimonios
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".testimonio-card");
  cards.forEach((card, i) => {
    card.style.opacity = 0;
    card.style.transform = "translateY(30px)";
    setTimeout(() => {
      card.style.transition = "all 0.6s ease";
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }, i * 300); // efecto escalonado
  });
});