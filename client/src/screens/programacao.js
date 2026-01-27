// Função de animação ao rolar (Reveal)
function revealOnScroll() {
    var reveals = document.querySelectorAll(".reveal");
    var windowHeight = window.innerHeight;
    var elementVisible = 50;

    for (var i = 0; i < reveals.length; i++) {
        var elementTop = reveals[i].getBoundingClientRect().top;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", revealOnScroll);
document.addEventListener('DOMContentLoaded', revealOnScroll);