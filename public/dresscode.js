// --- 1. FUNÇÃO DE ANIMAÇÃO DE SCROLL (REVEAL) ---
function revealOnScroll() {
    var reveals = document.querySelectorAll(".reveal");
    var windowHeight = window.innerHeight;
    var elementVisible = 100; // Distância do topo para ativar

    for (var i = 0; i < reveals.length; i++) {
        var elementTop = reveals[i].getBoundingClientRect().top;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// Ativa a função quando a pessoa rola a página
window.addEventListener("scroll", revealOnScroll);

// --- 2. CONFIGURAÇÃO INICIAL (QUANDO A PÁGINA CARREGA) ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Chama a animação uma vez para mostrar o que já está na tela
    revealOnScroll();

    // --- LÓGICA DAS CORES E TOAST ---
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const toast = document.getElementById('toast');

    // Função para mostrar a mensagem flutuante
    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        
        // Esconde depois de 3 segundos
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Adiciona o clique em cada bolinha de cor
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            // Pega o nome da cor do atributo HTML
            const colorName = swatch.getAttribute('data-name');
            
            // Efeito visual de clique rápido
            swatch.style.transform = "scale(0.9)";
            setTimeout(() => swatch.style.transform = "scale(1.1)", 150);

            // Mostra a mensagem
            showToast(`Cor selecionada: ${colorName}`);
        });
    });
});