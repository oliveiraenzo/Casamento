document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO COUNTDOWN ---
    const weddingDate = new Date("2026-10-10T18:00:00").getTime();
    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown-wrapper").innerHTML = `<h2 style="font-family: 'Great Vibes', cursive; font-size: 3.5em; color: var(--gold-color);">É hoje o grande dia!</h2>`;
            return;
        }

        const formatTime = (time) => (time < 10 ? `0${time}` : time);
        document.getElementById("dias").innerText = formatTime(Math.floor(distance / (1000 * 60 * 60 * 24)));
        document.getElementById("horas").innerText = formatTime(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        document.getElementById("minutos").innerText = formatTime(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        document.getElementById("segundos").innerText = formatTime(Math.floor((distance % (1000 * 60)) / 1000));
    }, 1000);

    // --- LÓGICA DO JOGO DOS NOIVOS (QUIZ) ---
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
        quizResultsEl.classList.add('hidden');
        quizBodyEl.classList.remove('hidden');
        totalQuestionsEl.innerText = quizQuestions.length;
        showNextQuestion();
    }

    function showNextQuestion() {
        resetState();
        const question = quizQuestions[currentQuestionIndex];
        questionTextEl.innerText = question.question;
        questionNumberEl.innerText = currentQuestionIndex + 1;
        // Remove justificativa anterior
        let justificativaEl = document.getElementById('quiz-justificativa');
        if (justificativaEl) justificativaEl.remove();
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn-answer');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsEl.appendChild(button);
        });
        updateProgress();
    }

    function resetState() {
        while (answerButtonsEl.firstChild) {
            answerButtonsEl.removeChild(answerButtonsEl.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === 'true';
        if (isCorrect) {
            score += 10;
            scoreEl.innerText = score;
        }
        Array.from(answerButtonsEl.children).forEach(button => {
            setStatusClass(button, button.dataset.correct === 'true');
            button.disabled = true;
        });
        // Exibe justificativa
        let justificativaEl = document.getElementById('quiz-justificativa');
        if (!justificativaEl) {
            justificativaEl = document.createElement('div');
            justificativaEl.id = 'quiz-justificativa';
            justificativaEl.style.marginTop = '24px';
            justificativaEl.style.fontSize = '1.08em';
            justificativaEl.style.color = '#d4af37';
            justificativaEl.style.textAlign = 'center';
            answerButtonsEl.parentNode.appendChild(justificativaEl);
        }
        justificativaEl.innerText = quizQuestions[currentQuestionIndex].justificativa;
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizQuestions.length) {
                showNextQuestion();
            } else {
                // Remove justificativa ao finalizar
                justificativaEl.remove();
                showResults();
            }
        }, 1500);
    }

    function setStatusClass(element, correct) {
        element.classList.remove('correct', 'incorrect');
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('incorrect');
        }
    }
    
    function showResults() {
        quizBodyEl.classList.add('hidden');
        quizResultsEl.classList.remove('hidden');
        finalScoreEl.innerText = score;
        // Exibe mensagem personalizada conforme o desempenho
        const resultsTextEl = document.getElementById('results-text');
        if (resultsTextEl) {
            if (score >= 40) {
                resultsTextEl.innerText = 'Conhece os noivos como ninguém!';
            } else {
                resultsTextEl.innerText = 'Precisa conhecer melhor os noivos!';
            }
        }
    }

    function updateProgress() {
        const progressPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    restartBtn.addEventListener('click', startQuiz);
    if(questionTextEl) startQuiz(); // Inicia o Quiz se os elementos existirem na página


    // --- LÓGICA DAS ABAS (LISTA DE PRESENTES) ---
    const tabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.getElementById(tab.dataset.tab);

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            tabContents.forEach(tc => tc.classList.remove('active'));
            target.classList.add('active');
        });
    });

    // --- LÓGICA DE COPIAR PIX ---
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

    // --- HEADER TRANSPARENTE AO ROLAR ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Gradiente animado no body
        const scroll = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? scroll / docHeight : 0;
        if(percent < 0.33) {
            document.body.classList.add('gradient-1');
            document.body.classList.remove('gradient-2','gradient-3');
        } else if(percent < 0.66) {
            document.body.classList.add('gradient-2');
            document.body.classList.remove('gradient-1','gradient-3');
        } else {
            document.body.classList.add('gradient-3');
            document.body.classList.remove('gradient-1','gradient-2');
        }
    });

    // --- REVEAL ANIMATION AO ROLAR ---
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if(elementTop < windowHeight - 60) {
                el.classList.add('visible');
            } else {
                el.classList.remove('visible');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // --- LÓGICA DO FORMULÁRIO DE RSVP ---
    const form = document.querySelector('#rsvp-form');
    if (form) {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Mapear campos do formulário para o esquema esperado pelo backend
        const formData = new FormData(form);
        const data = {
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          confirmation: formData.get('confirmation'),
          guests: parseInt(formData.get('guests') || '1', 10),
          restrictions: formData.get('restrictions'),
          message: formData.get('message')
        };

        try {
          const response = await fetch('/api/rsvp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            // popup simples — pode ser substituído por modal mais sofisticado
            alert('Confirmação de presença enviada com sucesso!');
            form.reset(); // Limpa o formulário após o envio
          } else {
            const body = await response.json().catch(()=>({}));
            alert('Erro ao enviar a confirmação. ' + (body.message || 'Tente novamente.'));
          }
        } catch (error) {
          console.error('Erro ao enviar o formulário:', error);
          alert('Erro ao enviar a confirmação. Tente novamente.');
        }
      });
    }
});