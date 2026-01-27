// Função de animação ao rolar (Reveal)
function revealOnScroll() {
    var reveals = document.querySelectorAll(".reveal");
    var windowHeight = window.innerHeight;
    var elementVisible = 50; // Ajustei para 50 para aparecer mais cedo no celular

    for (var i = 0; i < reveals.length; i++) {
        var elementTop = reveals[i].getBoundingClientRect().top;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// Escuta o evento de scroll
window.addEventListener("scroll", revealOnScroll);

// Chama uma vez ao carregar para mostrar o topo
document.addEventListener('DOMContentLoaded', revealOnScroll);