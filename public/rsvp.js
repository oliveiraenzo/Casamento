// --- LISTA DE CONVIDADOS ---
const guestList = [
    /* Ana */
    "Janira Bulhões",
    "Brazilina Bulhões",
    "João Bulhões",
    "Maria Eduarda Scagnolato",
    "Anne Caroline Bulhões",
    "Fernanda Ribeiro",
    "Letícia Barbosa",
    "Keth Oliveira",
    "Joice Fernandes",
    "Kemily Morelato",
    "Jessica Silva",
    "Jeniffer Soares",
    "Karoline Lima",
    "Ellen Oliveira",
    "Lincoln Oliveira",
    "Alexandre Alves",
    "Adiel Santos",
    "Guilherme Ferreira",
    "Cleyton Pereira",
    "Giulia Mirela Fernandes",
    "Daniel Sanches",
    "Flavio Lima",
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
    "Fabiana Olegario",
    "Lázaro Nery",
    "Stefany Naciso",
    "Matheus Santos",
    "Rute Ferreira",
    "Luiz Henrique",
    "Gilnália Carneiro",
    "Francisco Carneiro",
    "Lany Luz",
    "Mariana Paiva",
    "Josira Bulhões",
    "Poliana Bulhões",
    "Maria Bulhões",
    "Marcos Bulhões",
    "Daiana Bulhões",
    "Éverton Bulhões",
    "Juscelino Bulhões",
    "Leda Bulhões",
    "Livia Bulhões",
    "Carlos Bulhões",
    "Jucilene Bulhões",
    "Jailton Bulhões",
    "Yasca Bulhões",
    "Jean Bulhões",
    "Márcia Bulhões",
    "Rafaela Bulhões",
    "Nathalia Bulhões",
    "Thaís Bulhões",
    "Gabriel Bulhões",
    "Janete Bulhões",
    "Iran Bulhões",
    "Bianca Oliveira",
    "Eduardo Oliveira",
    "Amos Bulhões",
    "Maria Eduarda Fernandes",
    "Pedro Jorge Novaes",
    "Lucca Barboza",
    "Lorena Silva",
    "Laura Oliveira",
    "Oliver Ferreira",
    "Livia Pacheco",
    "Pérola Tokuda",
    "Davi Tokuda",
    "Lucca Tokuda",
    "Giovana Oliveira",
    "Bianca Bulhões",
    "Davi Carneiro",
    "Pietra Bulhões",
    "Luna Bulhões",
    //Eto
    "Marcia da Silva",
    "Everson Alves",
    "Enzo Brito",
    "Edna Rodrigues",
    "Marcos Conceição",
    "Maria de Jesus",
    "Sergio Gasperini",
    "Deise Naira",
    "Cristiano Angelo",
    "Ryan Rodrigues",
    "Emerson Rodrigues",
    "Roberta Pereira",
    "Vinicius Pereira",
    "Marizete Pereira",
    "Paulo Rex",
    "Carla Poliana",
    "Alexandro Ribeiro",
    "Camila Pazielly",
    "Geverson Souza",
    "Gabriel Lacerda",
    "Camila Mello",
    "Tatiane Lacerda",
    "Eliesio Borges",
    "Lara Karoline",
    "Thiago Borges",
    "Bernadete Pereira",
    "Aretuza Pereira",
    "Marcelo Estevan",
    "Marcelo Júnior",
    "William Pedro",
    "Douglas Pedro",
    "Camila Cândido",
    "Leonardo Pereira",
    "Andressa Oliveira",
    "Tereza Vieira",
    "José Arnaldo",
    "Marcos Pereira",
    "Tuany Pereira",
    "Jozeli Pereira",
    "Gilberto Oliveira",
    "Aline Oliveira",
    "Wesley Bozelli",
    "Vanessa Cristina",
    "Emily Nadir",
    "Mateus Oliveira",
    "Alexia Karine",
    "Richard Furlan",
    "Emerson Oliveira",
    "Claudia Oliveira",
    "Victor Hugo",
    "Vitória Oliveira",
    "Felipe Caio",
    "Victor Vinícius",
    "Cauê Tântalo",
    "Esposa Cauê",
    "Priscila Rosini",
    "Doug Sdorf",
    "Priscila Lourenço",
    "Gabriel Luiz",
    "Marco Aurélio",
    "Andréa Silva",
    "Vicente Feola",
    "Paula Feola",
    "Paulo Santana",
    "Thiago Murilo Toot",
    "Rogério Santos",
    "Nayara Brito",
    "Adilson",
    "Lucia",
    "Adilson Junior",
    "William Cabral",
    "Tainan Santos",
    "Jader Fernandes",
    "Marilaine Aparecida",
    "Gustavo Tozzo",
    "Ananda Tozzo",
    "Alexander Oliveira",
    "Thalita Lauzen",
    "Uriel Fraire",
    "Emmanuel Ponce",
    "Maria Júlia",
    "Arthur Felipe",
    "Maria Eduarda",
    "Anne Caroline",
    "Julia",
    "Luísa",
    "Heloísa",
    "Lucca",
    "Luan",
    "Vicenzo",
    "Isabela",
    "Helena Fernandes",
    "Kelvin",
    "Bernardo",
    "Pierre",
    "Allan Jhones",
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

