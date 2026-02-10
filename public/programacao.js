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

/* --- Script para colorir fotos ao rolar a página --- */
document.addEventListener("DOMContentLoaded", function() {
    // Seleciona todas as imagens que devem ter o efeito
    // (Header, Imagens Full Width, Imagens do Dresscode, etc)
    const imagens = document.querySelectorAll('img');

    // Cria o observador
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Se a imagem entrou na tela (isIntersecting)
            if (entry.isIntersecting) {
                entry.target.classList.add('colorida'); // Adiciona a cor
            } else {
                // Opcional: Se quiser que ela volte a ficar P&B quando sair da tela, 
                // descomente a linha abaixo:
                // entry.target.classList.remove('colorida');
            }
        });
    }, { 
        threshold: 1 // A cor ativa quando 20% da imagem estiver visível
    });

    // Manda o observador vigiar cada imagem
    imagens.forEach(img => {
        observer.observe(img);
    });
});