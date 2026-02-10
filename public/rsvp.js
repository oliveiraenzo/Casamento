// --- LISTA DE CONVIDADOS ---
const guestList = [
    "João da Silva",
    "Maria Oliveira",
    "Carlos Eduardo",
    "Ana Clara Souza",
    "Pedro Henrique",
    "Enzo Brito",
    /* Ana */
    "Janira Bulhões",
    "Brazilina Bulhões",
    "Anne Caroline Bulhões",
    "Fernanda Ribeiro",
    "Caroline Rodrigues",
    "Leticia Barbosa",
    "Keth Oliveira",
    "Joice Fernandes",
    "Kemily Morelato",
    "Jessica Silva",
    "Jeniffer Soares",
    "Karoline Lima",
    "Ellen Oliveira",
    "João Bulhões",
    "Josira Bulhões",
    "Lincoln Oliveira",
    "Alexandre Alves",
    "Adiel Santos",
    "Guilherme Santos",
    "Cleyton Pereira",
    "Giulia Mirela Fernandes",
    "Daniel Sanches",
    "Flavio Limaa",
    "Alex Oliveira",
    "Thainara Volponi",
    "Kaique Silvestre",
    "Leonardo Bueno",
    "Letícia Macedo",
    "Vinicius Pacheco",
    "Andressa Genaro",
    "Jessica Mattos",
    "Kalina Tokuda",
    "Yuri Tokuda",
    "Luiz Henrique",
    "Rute Ferreira",
    "Fabiana Olegário",
    "Lázaro Nery",
    "Stefany Naciso",
    "Matheus*",
    "Bianca Oliveira",
    "Eduardo Oliveira",
    "Gilnália Carneiro",
    "Francisco Carneiro",
    "Maria Eduarda Fernandes",
    "Lucca Barboza",
    "Lorena Silva",
    "Laura Oliveira",
    "Oliver Ferreira",
    "Livia Pacheco",
    "Pérola Tokuda",
    "Davi Tokuda",
    "Lucca Tokuda",
    "Giovana Oliveira",
    "Davi Carneiro"
];

// Variável para controlar o tempo de espera (Debounce)
let typingTimer;
const doneTypingInterval = 1500; // Tempo em ms (1.5 segundos) para mostrar o erro

// --- FUNÇÕES UTILITÁRIAS ---
function normalizeString(str) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

// Inicializa o evento de escuta no input assim que a página carrega
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('guestName');
    
    // O evento 'input' dispara a cada letra digitada
    input.addEventListener('input', () => {
        checkGuestRealTime();
    });
});

// --- FUNÇÕES PRINCIPAIS ---

function checkGuestRealTime() {
    const input = document.getElementById('guestName');
    const feedback = document.getElementById('feedback-text');
    const stepInput = document.getElementById('step-input');
    const stepConfirm = document.getElementById('step-confirm');
    const welcomeMsg = document.getElementById('welcome-msg');

    const nameTyped = normalizeString(input.value);

    // 1. Limpa qualquer erro anterior ou timer pendente enquanto digita
    feedback.classList.add('hidden');
    clearTimeout(typingTimer);

    // Se estiver vazio, não faz nada
    if (nameTyped === "") return;

    // 2. Verifica se o nome existe na lista
    const found = guestList.find(name => normalizeString(name) === nameTyped);

    if (found) {
        // SUCCESSO IMEDIATO: Se achou, nem espera, já troca a tela!
        input.blur(); // Tira o foco do teclado (útil em celular)
        stepInput.classList.add('hidden');
        stepConfirm.classList.remove('hidden');
        welcomeMsg.textContent = `Olá, ${found}!`; 
    } else {
        // ERRO COM DELAY: Se não achou, espera o usuário parar de digitar
        typingTimer = setTimeout(() => {
            feedback.textContent = "Esse nome não está na nossa lista de convidados.";
            feedback.classList.remove('hidden');
        }, doneTypingInterval);
    }
}

function reply(isConfirmed) {
    const stepConfirm = document.getElementById('step-confirm');
    const stepFinal = document.getElementById('step-final');
    const finalMsg = document.getElementById('final-msg');
    
    // 1. PEGA O NOME DO CONVIDADO ANTES DE MUDAR A TELA
    const input = document.getElementById('guestName');
    const guestName = input.value; 

    // 2. CHAMA A FUNÇÃO PARA SALVAR NO EXCEL (SheetDB)
    sendToSheet(guestName, isConfirmed);

    // 3. ATUALIZA A TELA (Visual)
    stepConfirm.classList.add('hidden');
    stepFinal.classList.remove('hidden');

    if (isConfirmed) {
        finalMsg.textContent = "Obrigado pela confirmação!";
        finalMsg.style.color = "#1a1a1a";
    } else {
        finalMsg.textContent = "Que pena que não vai.";
        finalMsg.style.color = "#555";
    }
}

function goHome() {
    // 1. Pega os elementos
    const input = document.getElementById('guestName');
    const stepInput = document.getElementById('step-input');
    const stepConfirm = document.getElementById('step-confirm');
    const stepFinal = document.getElementById('step-final');
    const feedback = document.getElementById('feedback-text');

    // 2. Reseta os valores
    input.value = "";
    feedback.classList.add('hidden');

    // 3. Esconde as telas de sucesso/confirmação
    stepConfirm.classList.add('hidden');
    stepFinal.classList.add('hidden');

    // 4. Mostra a tela inicial
    stepInput.classList.remove('hidden');
    
    // 5. Opcional: foca no input para digitar
    setTimeout(() => input.focus(), 100);
}

function confirmAgain() {
    const input = document.getElementById('guestName');
    const feedback = document.getElementById('feedback-text');
    
    // Telas
    const stepInput = document.getElementById('step-input');
    const stepFinal = document.getElementById('step-final');

    // 1. Limpa o input
    input.value = "";
    
    // 2. Garante que erros estejam ocultos
    feedback.classList.add('hidden');

    // 3. Esconde a tela final e mostra a inicial
    stepFinal.classList.add('hidden');
    stepInput.classList.remove('hidden');

    // 4. Foca no input para digitar imediatamente
    setTimeout(() => {
        input.focus();
    }, 100);
}

function sendToSheet(name, status) {
    const data = {
        Nome: name,
        Confirmado: status ? "Sim" : "Não",
        Data: new Date().toLocaleString()
    };

    fetch('https://sheetdb.io/api/v1/no377sd6nx46g', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: data })
    })
    .then(response => console.log('Salvo na planilha!'));
}

