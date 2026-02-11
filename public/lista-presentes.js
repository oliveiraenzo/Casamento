// 1. Configuração do Mercado Pago
const mp = new MercadoPago('APP_USR-b748d535-1176-41c3-a671-8de934fb6645', {
    locale: 'pt-BR'
});

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_URL = isLocal ? 'http://localhost:3000' : 'https://casamento-backend-2vwt.onrender.com';

document.addEventListener('DOMContentLoaded', function () {
    // Seleção de elementos principais
    const productCards = document.querySelectorAll('.product-card');
    const giftListContainer = document.querySelector('.gift-list');
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sortPrice');

    // --- 2. Funções de UI ---
    function showGiftToast(msg, title = 'Atualização') {
        const toast = document.getElementById('gift-toast');
        if (!toast) return;
        document.getElementById('gift-toast-msg').textContent = msg;
        document.getElementById('gift-toast-title').textContent = title;
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 3000);
    }

    // Navegação Logo
    const logo = document.getElementById('logoBtn');
    if (logo) logo.addEventListener('click', () => window.location.href = 'index.html');

    // --- 3. Seleção de Presentes (Delegada e Blindada) ---
    if (giftListContainer) {
        giftListContainer.addEventListener('click', function (e) {
            const btn = e.target.closest('.button');
            if (!btn || !btn.classList.contains('button')) return;

            e.preventDefault();
            const isChosen = btn.classList.contains('disabled-button');

            if (isChosen) {
                btn.classList.replace('disabled-button', 'secondary-button');
                btn.innerHTML = '<i class="fas fa-gift"></i> Escolher Presente';
                showGiftToast('Removido da seleção.', 'Atualizado');
            } else {
                btn.classList.replace('secondary-button', 'disabled-button');
                btn.innerHTML = '<i class="fas fa-check"></i> Escolhido!';
                showGiftToast('Adicionado à seleção!', 'Sucesso');
            }
        });
    }

    // --- 4. Filtros de Categoria ---
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const category = btn.textContent.trim();
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            let count = 0;
            productCards.forEach(card => {
                const catElement = card.querySelector('.category');
                if (!catElement) return;
                const catText = catElement.innerText.trim();
                
                if (category === 'Todos' || catText.toLowerCase() === category.toLowerCase()) {
                    card.style.display = '';
                    count++;
                } else {
                    card.style.display = 'none';
                }
            });
            const resultsInfo = document.querySelector('.results-info p');
            if (resultsInfo) resultsInfo.textContent = `${count} presentes encontrados`;
        });
    });

    // --- 5. Busca em Tempo Real ---
    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            const term = e.target.value.toLowerCase();
            let count = 0;
            productCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const match = title.includes(term);
                card.style.display = match ? '' : 'none';
                if (match) count++;
            });
            const resultsInfo = document.querySelector('.results-info p');
            if (resultsInfo) resultsInfo.textContent = `${count} presentes encontrados`;
        });
    }

    // --- 6. Ordenação por Preço ---
    if (sortSelect) {
        sortSelect.addEventListener('change', function (e) {
            const sortType = e.target.value;
            if (sortType === 'default') return;

            const cardsArray = Array.from(productCards);
            cardsArray.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.price').textContent.replace(/[^\d,]/g, '').replace(',', '.'));
                const priceB = parseFloat(b.querySelector('.price').textContent.replace(/[^\d,]/g, '').replace(',', '.'));
                return sortType === 'asc' ? priceA - priceB : priceB - priceA;
            });

            giftListContainer.innerHTML = '';
            cardsArray.forEach(card => giftListContainer.appendChild(card));
        });
    }

    // --- 7. Modais e Checkout ---
    const viewChosenBtn = document.getElementById('viewChosenGifts');
    const finishBtn = document.getElementById('finishGiftsBtn');
    const chosenModal = document.getElementById('chosenGiftsModal');
    const sideCheckout = document.getElementById('sideCheckout');

    if (viewChosenBtn) {
        viewChosenBtn.addEventListener('click', (e) => {
            e.preventDefault();
            populateModal('chosenGiftsList', false);
            if (chosenModal) chosenModal.style.display = 'flex';
        });
    }

    if (finishBtn) {
        finishBtn.addEventListener('click', (e) => {
            e.preventDefault();
            populateModal('sideCheckoutSummary', true);
            if (sideCheckout) sideCheckout.style.display = 'flex';
        });
    }

    // Fechar modais
    const closeChosen = document.getElementById('closeChosenGifts');
    const closeSide = document.getElementById('closeSideCheckout');
    if (closeChosen) closeChosen.onclick = () => chosenModal.style.display = 'none';
    if (closeSide) closeSide.onclick = () => sideCheckout.style.display = 'none';

    function populateModal(targetId, isCheckout) {
        const container = document.getElementById(targetId);
        if (!container) return;
        container.innerHTML = '';
        const chosen = document.querySelectorAll('.product-card .disabled-button');
        let total = 0;

        if (chosen.length === 0) {
            container.innerHTML = '<p style="text-align:center; color:#999;">Nenhum item selecionado.</p>';
            const totalEl = document.getElementById('sideCheckoutTotal');
            if (isCheckout && totalEl) totalEl.innerHTML = '';
            return;
        }

        chosen.forEach(btn => {
            const card = btn.closest('.product-card');
            const name = card.querySelector('h3').textContent;
            const priceTxt = card.querySelector('.price').textContent;
            const price = parseFloat(priceTxt.replace(/[^\d,]/g, '').replace(',', '.'));
            total += price;

            const row = document.createElement('div');
            row.className = isCheckout ? 'side-checkout-row' : 'chosen-product-row';
            row.innerHTML = `<span>${name}</span> <span style="font-weight:600;">${priceTxt}</span>`;
            container.appendChild(row);
        });

        const totalFormatted = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        if (isCheckout) {
            const totalEl = document.getElementById('sideCheckoutTotal');
            if (totalEl) totalEl.innerHTML = `Total: <span>${totalFormatted}</span>`;
        } else {
            const totalDiv = document.createElement('div');
            totalDiv.className = 'chosen-gifts-total';
            totalDiv.innerHTML = `Total: <span>${totalFormatted}</span>`;
            container.appendChild(totalDiv);
        }
    }

    // --- 8. Pagamento Mercado Pago ---
    const payBtn = document.getElementById('sideCheckoutPayBtn');
    if (payBtn) {
        payBtn.addEventListener('click', async () => {
            const chosenCards = document.querySelectorAll('.product-card .disabled-button');
            if (chosenCards.length === 0) {
                alert('Escolha pelo menos um presente.');
                return;
            }

            let description = "Presente para Ana & Everson: ";
            let totalPrice = 0;

            chosenCards.forEach(btn => {
                const card = btn.closest('.product-card');
                totalPrice += parseFloat(card.querySelector('.price').textContent.replace(/[^\d,]/g, '').replace(',', '.'));
                description += card.querySelector('h3').textContent + ", ";
            });

            try {
                payBtn.innerText = 'Processando...';
                payBtn.disabled = true;

                const response = await fetch(`${API_URL}/api/create_preference`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        description: description.slice(0, -2),
                        price: totalPrice,
                        quantity: 1
                    })
                });

                const preference = await response.json();
                if (preference.id) {
                    window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${preference.id}`;
                }
            } catch (error) {
                alert('Erro ao gerar pagamento.');
                payBtn.innerText = 'Confirmar e Pagar';
                payBtn.disabled = false;
            }
        });
    }

    window.onclick = (event) => {
        if (event.target == chosenModal) chosenModal.style.display = "none";
        if (event.target == sideCheckout) sideCheckout.style.display = "none";
    }
});