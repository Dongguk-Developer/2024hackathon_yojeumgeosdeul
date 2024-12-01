const questions = [
    "1. 창업하려는 분야는 무엇인가요?",
    "2. 점포를 이용할 계획인가요, 아니면 온라인으로 창업할 계획인가요?",
    "3. 창업을 하실 때 어떤 지원이 필요하신가요? (멘토링, 홍보 등)"
];
let currentQuestionIndex = 0;
let answers = [];

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("question-container").innerText = questions[currentQuestionIndex];
});

function nextQuestion() {
    const answer = document.getElementById("answer-input").value;
    if (!answer) {
        alert("답변을 입력해주세요.");
        return;
    }
    answers.push(answer);
    document.getElementById("answer-input").value = "";

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        document.getElementById("question-container").innerText = questions[currentQuestionIndex];
    } else {
        completeSurvey();
    }
}

function completeSurvey() {
    sessionStorage.setItem('answers', JSON.stringify(answers));
    window.location.href = 'recommandation.html';
}