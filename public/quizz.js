// Banco de Perguntas (Baseado no seu texto)
const quizData = [
    {
        question: "Quem é mais provável de chorar na cerimônia?",
        options: [
            "Ana",
            "Everson",
            "Os dois (e ninguém vai admitir)",
            "Nenhum, controle emocional exemplar"
        ],
        correct: 2 // Índice 2 = "Os dois..." (0, 1, 2, 3)
    },
    {
        question: "Quem manda mais no relacionamento?",
        options: [
            "Ana",
            "Everson",
            "Eles decidem juntos (quase sempre)",
            "Depende totalmente do assunto"
        ],
        correct: 2
    },
    {
        question: "Quem demora mais para se arrumar?",
        options: [
            "Ana",
            "Everson",
            "Empate técnico",
            "Sempre no limite do horário"
        ],
        correct: 0 // Ana
    },
    {
        question: "Quem é mais trabalhador? (considerando que o casamento é no Dia do Trabalho 👀)",
        options: [
            "Ana",
            "Everson",
            "Os dois — dedicação é marca registrada do casal",
            "Trabalham bastante… mas sabem aproveitar a vida 😎"
        ],
        correct: 2
    },
    {
        question: "Quem é mais organizado?",
        options: [
            "Ana",
            "Everson",
            "Um organiza, o outro executa",
            "Organização é relativa"
        ],
        correct: 1 // Everson
    },
    {
        question: "Quem costuma escolher onde comer?",
        options: [
            "Ana",
            "Everson",
            "Sempre vira uma conversa longa",
            "Acabam escolhendo o de sempre"
        ],
        correct: 1 // Everson
    },
    {
        question: "Quem é mais romântico?",
        options: [
            "Ana",
            "Everson",
            "Cada um do seu jeito",
            "Demonstram mais nas atitudes"
        ],
        correct: 0 // Ana
    },
    {
        question: "Quem vai dançar mais na festa?",
        options: [
            "Ana",
            "Everson",
            "Os dois até o final",
            "Depois de algumas músicas estratégicas"
        ],
        correct: 2 // Os dois
    },
    {
        question: "Quem se apaixonou primeiro?",
        options: [
            "Ana",
            "Everson",
            "Foi quase ao mesmo tempo",
            "Quando perceberam, já era"
        ],
        correct: 1 // Everson
    },
    {
        question: "Quem costuma ter mais razão nas discussões?",
        options: [
            "Ana",
            "Everson",
            "Nunca saberemos",
            "O importante é manter a paz"
        ],
        correct: 2 // Nunca saberemos
    }
];

// Variáveis de Controle
let currentQuestion = 0;
let score = 0;

// Elementos do DOM
const questionEl = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackArea = document.getElementById("feedback-area");
const feedbackMsg = document.getElementById("feedback-msg");
const currentQEl = document.getElementById("current-q");
const totalQEl = document.getElementById("total-q");

const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const scoreCount = document.getElementById("score-count");
const finalMessage = document.getElementById("final-message");

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    totalQEl.textContent = quizData.length;
    loadQuestion();
});

function loadQuestion() {
    // Reseta estado visual
    feedbackArea.classList.add("hidden");
    optionsContainer.innerHTML = "";
    
    // Pega dados da pergunta atual
    const data = quizData[currentQuestion];
    
    // Atualiza textos
    questionEl.textContent = `${currentQuestion + 1}. ${data.question}`;
    currentQEl.textContent = currentQuestion + 1;

    // Gera botões
    data.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.classList.add("option-btn");
        btn.textContent = option;
        // Passa o índice da opção clicada
        btn.onclick = () => checkAnswer(index, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, selectedBtn) {
    const data = quizData[currentQuestion];
    const buttons = optionsContainer.querySelectorAll(".option-btn");

    // Desabilita todos os botões para impedir cliques múltiplos
    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === data.correct) {
        // Acertou
        selectedBtn.classList.add("correct");
        feedbackMsg.textContent = "✨ Acertou!";
        feedbackMsg.style.color = "#155724";
        score++;
    } else {
        // Errou
        selectedBtn.classList.add("wrong");
        feedbackMsg.textContent = "❌ Resposta errada!";
        feedbackMsg.style.color = "#ff0019";
        
        // Destaca a correta para o usuário aprender
        buttons[data.correct].classList.add("correct");
    }

    feedbackArea.classList.remove("hidden");
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
    
    scoreCount.textContent = score;

    // Mensagens personalizadas baseadas na pontuação
    if (score === 10) {
        finalMessage.textContent = "UAU! Você sabe tudo sobre nós! Padrinho/Madrinha disfarçado? 🏆";
    } else if (score >= 7) {
        finalMessage.textContent = "Muito bem! Você conhece a gente super bem! ❤️";
    } else if (score >= 4) {
        finalMessage.textContent = "Na média! Sabe o básico, mas dá pra melhorar no dia do casamento! 😉";
    } else {
        finalMessage.textContent = "Vixe... precisa conversar mais com a gente na festa! 😂";
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    resultBox.classList.add("hidden");
    quizBox.classList.remove("hidden");
    loadQuestion();
}