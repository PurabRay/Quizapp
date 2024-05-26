const questions = [
    {
        question: "What is 2+2?",
        answers: [
            { text: "1", correct: false },
            { text: "2", correct: false },
            { text: "3", correct: false },
            { text: "4", correct: true }
        ]
    },
    {
        question: "Who defeated Gojo?",
        answers: [
            { text: "Sukuna", correct: true },
            { text: "Yuji Itadori", correct: false },
            { text: "Yuta Okkotsu", correct: false },
            { text: "Yuki Tsukumo", correct: false }
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false }
        ]
    }
];

const questionElement = document.getElementById('Question');
const choicesContainer = document.querySelector('.choices');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.innerText = score;
    nextButton.classList.add('hide');
    showQuestion();
}
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'choice-btn');
        button.addEventListener('click', selectAnswer);
        choicesContainer.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
    });
}

function resetState() {
    while (choicesContainer.firstChild) {
        choicesContainer.removeChild(choicesContainer.firstChild);
    }
    nextButton.classList.add('hide');
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';

    if (correct) {
        score++;
        scoreElement.innerText = score;
    }

    Array.from(choicesContainer.children).forEach(button => {
        button.disabled = true;
        setStatusClass(button, button.dataset.correct === 'true');
    });

    nextButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        window.location.href = "end.html?score=" + score;
    }
});
startQuiz();