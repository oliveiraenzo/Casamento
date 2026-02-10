document.addEventListener('DOMContentLoaded', () => {

    // Hamburger menu logic moved to hamburger.js

    // --- 2. LÓGICA DO JOGO DOS NOIVOS (QUIZ) ---
    const quizQuestions = [
        {
            question: "Onde Everson e Ana se conheceram?",
            answers: [
                { text: "Na universidade", correct: true },
                { text: "No trabalho", correct: false },
                { text: "Em um bar", correct: false },
                { text: "Em uma viagem", correct: false }
            ],
            justificativa: "Everson e Ana se conheceram na universidade de X, Y ou Z."
        },
        {
            question: "Qual é a comida favorita do casal?",
            answers: [
                { text: "Churrasco", correct: false },
                { text: "Comida japonesa", correct: false },
                { text: "Pizza", correct: true },
                { text: "Massa", correct: false }
            ],
            justificativa: "A comida favorita do casal é pizza, principalmente aos sábados à noite."
        },
        {
            question: "Para onde foi a primeira viagem que fizeram juntos?",
            answers: [
                { text: "Praia", correct: true },
                { text: "Campo", correct: false },
                { text: "Outra cidade", correct: false },
                { text: "Outro país", correct: false }
            ],
            justificativa: "A primeira viagem juntos foi para a praia, onde criaram memórias inesquecíveis."
        },
        {
            question: "Quantos anos de namoro eles têm?",
            answers: [
                { text: "3 anos", correct: false },
                { text: "5 anos", correct: true },
                { text: "7 anos", correct: false },
                { text: "10 anos", correct: false }
            ],
            justificativa: "Eles estão juntos há 5 anos, celebrando cada momento."
        },
        {
            question: "Qual o nome do primeiro pet que tiveram (ou sonham em ter)?",
            answers: [
                { text: "Rex", correct: false },
                { text: "Bolinha", correct: false },
                { text: "Paçoca", correct: true },
                { text: "Zeus", correct: false }
            ],
            justificativa: "O primeiro pet do casal se chama Paçoca, um sonho antigo dos dois."
        }
    ];

    const questionTextEl = document.getElementById('question-text');
    const answerButtonsEl = document.getElementById('answer-buttons');
    const quizBodyEl = document.getElementById('quiz-body');
    const quizResultsEl = document.getElementById('quiz-results');
    const finalScoreEl = document.getElementById('final-score');
    const restartBtn = document.getElementById('restart-btn');
    const questionNumberEl = document.getElementById('question-number');
    const totalQuestionsEl = document.getElementById('total-questions');
    const scoreEl = document.getElementById('score');
    const progressBar = document.getElementById('progress-bar');
    
    let currentQuestionIndex = 0;
    let score = 0;

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        if(quizResultsEl) quizResultsEl.classList.add('hidden');
        if(quizBodyEl) quizBodyEl.classList.remove('hidden');
        if(totalQuestionsEl) totalQuestionsEl.innerText = quizQuestions.length;
        showNextQuestion();
    }

    function showNextQuestion() {
        resetState();
        const question = quizQuestions[currentQuestionIndex];
        if(questionTextEl) questionTextEl.innerText = question.question;
        if(questionNumberEl) questionNumberEl.innerText = currentQuestionIndex + 1;

        let justificativaEl = document.getElementById('quiz-justificativa');
        if (justificativaEl) justificativaEl.remove();

        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn-answer');
            if (answer.correct) button.dataset.correct = answer.correct;
            button.addEventListener('click', selectAnswer);
            if(answerButtonsEl) answerButtonsEl.appendChild(button);
        });
        updateProgress();
    }

    function resetState() {
        if(answerButtonsEl) {
            while (answerButtonsEl.firstChild) {
                answerButtonsEl.removeChild(answerButtonsEl.firstChild);
            }
        }
    }

    function selectAnswer(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === 'true';
        if (isCorrect) {
            score += 10;
            if(scoreEl) scoreEl.innerText = score;
        }
        Array.from(answerButtonsEl.children).forEach(button => {
            setStatusClass(button, button.dataset.correct === 'true');
            button.disabled = true;
        });

        let justificativaEl = document.getElementById('quiz-justificativa');
        if (!justificativaEl) {
            justificativaEl = document.createElement('div');
            justificativaEl.id = 'quiz-justificativa';
            justificativaEl.className = 'quiz-justification-style'; // Use uma classe CSS para estilizar
            answerButtonsEl.parentNode.appendChild(justificativaEl);
        }
        justificativaEl.innerText = quizQuestions[currentQuestionIndex].justificativa;

        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizQuestions.length) {
                showNextQuestion();
            } else {
                if(justificativaEl) justificativaEl.remove();
                showResults();
            }
        }, 1500);
    }

    function setStatusClass(element, correct) {
        element.classList.remove('correct', 'incorrect');
        element.classList.add(correct ? 'correct' : 'incorrect');
    }
    
    function showResults() {
        if(quizBodyEl) quizBodyEl.classList.add('hidden');
        if(quizResultsEl) quizResultsEl.classList.remove('hidden');
        if(finalScoreEl) finalScoreEl.innerText = score;
        const resultsTextEl = document.getElementById('results-text');
        if (resultsTextEl) {
            resultsTextEl.innerText = score >= 40 ? 'Conhece os noivos como ninguém!' : 'Precisa conhecer melhor os noivos!';
        }
    }

    function updateProgress() {
        if(progressBar) {
            const progressPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }
    }

    if(restartBtn) restartBtn.addEventListener('click', startQuiz);
    if(questionTextEl) startQuiz();


    // --- 3. LÓGICA DAS ABAS E PIX ---
    const tabs = document.querySelectorAll('.tab-link');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.getElementById(tab.dataset.tab);
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
            if(target) target.classList.add('active');
        });
    });

    const copyBtn = document.getElementById('copy-pix-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const pixKey = document.querySelector('.pix-key span').innerText;
            navigator.clipboard.writeText(pixKey).then(() => {
                copyBtn.innerText = 'Copiado!';
                setTimeout(() => { copyBtn.innerText = 'Copiar Chave'; }, 2000);
            });
        });
    }

    // --- 4. HEADER E SCROLL EFFECTS ---
    const headerEl = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (headerEl) {
            headerEl.classList.toggle('scrolled', window.scrollY > 30);
        }

        // Reveal Animation
        document.querySelectorAll('.reveal').forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            el.classList.toggle('visible', elementTop < window.innerHeight - 60);
        });
    });

    // --- 5. RSVP FORM ---
    const rsvpForm = document.querySelector('#rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(rsvpForm);
            const data = Object.fromEntries(formData.entries());
            data.guests = parseInt(data.guests || '1', 10);

            try {
                const response = await fetch('/api/rsvp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
                if (response.ok) {
                    alert('Confirmação enviada com sucesso!');
                    rsvpForm.reset();
                } else {
                    alert('Erro ao enviar. Tente novamente.');
                }
            } catch (error) {
                alert('Erro de conexão.');
            }
        });
    }

    // --- 6. OBSERVER PARA COLORIR FOTOS ---
    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('colorida');
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('img').forEach(img => imgObserver.observe(img));

    // Inicializa Countdown imediatamente
    updateCountdown();
});

// --- 7. CRONÔMETRO (FORA DO DOMCONTENTLOADED PARA ACESSO GLOBAL) ---
function updateCountdown() {
    const weddingDate = new Date("2026-05-01T15:00:00");
    const diff = weddingDate - new Date();
    const countdownEl = document.getElementById("countdown");

    if (diff < 0) {
        if(countdownEl) countdownEl.innerHTML = "<h2>O Grande Dia Chegou!</h2>";
        return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const totalDays = Math.floor(totalSeconds / 86400);
    const months = Math.floor(totalDays / 30);
    
    const updateEl = (id, val) => {
        const el = document.getElementById(id);
        if(el) el.innerText = val;
    };

    updateEl("c-months", months);
    updateEl("c-days", totalDays % 30);
    updateEl("c-hours", Math.floor((totalSeconds % 86400) / 3600));
    updateEl("c-minutes", Math.floor((totalSeconds % 3600) / 60));
    updateEl("c-seconds", totalSeconds % 60);
}

setInterval(updateCountdown, 1000);