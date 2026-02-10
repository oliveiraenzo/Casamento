document.addEventListener('DOMContentLoaded', () => {
    const menuTrigger = document.getElementById('menu-trigger');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuClose = document.getElementById('menu-close');
    const menuLinks = document.querySelectorAll('.menu-links a');

    if (menuTrigger && menuOverlay) {
        // Abrir / Fechar ao clicar no ícone
        menuTrigger.addEventListener('click', () => {
            menuOverlay.classList.toggle('active');
            menuTrigger.classList.toggle('open');
        });

        // Fechar no "X"
        if (menuClose) {
            menuClose.addEventListener('click', () => {
                menuOverlay.classList.remove('active');
                menuTrigger.classList.remove('open');
            });
        }

        // Fechar ao clicar em qualquer link (âncoras)
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuOverlay.classList.remove('active');
                menuTrigger.classList.remove('open');
            });
        });
    }
});
