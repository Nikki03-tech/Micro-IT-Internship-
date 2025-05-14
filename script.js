
const questions = [
  { question: "Who is the creator of JavaScript?", choices: ["Brendan Eich", "James Gosling", "Bjarne Stroustrup", "Guido van Rossum"], answer: 0 },
  { question: "What does HTML stand for?", choices: ["HyperText Markup Language", "HighText Machine Language", "HyperTabular Markup Language", "None of the above"], answer: 0 },
  { question: "Which company developed the first computer mouse?", choices: ["Microsoft", "Apple", "Xerox", "IBM"], answer: 2 },
  { question: "What does CSS stand for?", choices: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "None of the above"], answer: 0 },
  { question: "Which of the following is a front-end JavaScript framework?", choices: ["Node.js", "Express", "React", "Django"], answer: 2 },
  { question: "Which company created the iPhone?", choices: ["Google", "Samsung", "Microsoft", "Apple"], answer: 3 },
  { question: "What is the first version of HTML?", choices: ["HTML 5", "HTML 4", "HTML 1.0", "HTML 3.2"], answer: 2 },
  { question: "What does the acronym SQL stand for?", choices: ["Structured Query Language", "Standard Question Language", "Sequential Query Language", "None of the above"], answer: 0 },
  { question: "Which programming language is known as the mother of all languages?", choices: ["C", "Java", "Python", "Assembly"], answer: 0 },
  { question: "Who invented the World Wide Web?", choices: ["Tim Berners-Lee", "Mark Zuckerberg", "Bill Gates", "Steve Jobs"], answer: 0 },
  { question: "Which programming language is known for its use in data science?", choices: ["C", "Python", "Java", "Swift"], answer: 1 },
  { question: "What year was the first iPhone released?", choices: ["2005", "2006", "2007", "2008"], answer: 2 },
  { question: "Which of the following is NOT an operating system?", choices: ["Windows", "Linux", "Android", "Chrome"], answer: 3 },
  { question: "Which protocol is used for secure communication over the internet?", choices: ["HTTP", "FTP", "HTTPS", "SMTP"], answer: 2 },
  { question: "Which one of these is a cloud computing service?", choices: ["AWS", "SQL", "MongoDB", "Linux"], answer: 0 }
];

const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFD433", "#33F1FF", "#D233FF", "#FF5733"];

let currentQuestion = 0;
let score = 0;
let timer = 45;
let attempted = 0;
let notAttempted = questions.length;
let timerInterval;
let incorrectAnswers = [];
let currentReviewPage = 0;
const reviewPageSize = 5;

function showContainer(idToShow) {
  document.getElementById('quiz-container').classList.add('hidden');
  document.getElementById('result-container').classList.add('hidden');
  document.getElementById('review-container').classList.add('hidden');
  document.getElementById(idToShow).classList.remove('hidden');
}

function startQuiz() {
  displayQuestion();
  startTimer();
  showContainer('quiz-container');
}

function displayQuestion() {
  if (currentQuestion >= questions.length) {
    showResult();
    return;
  }

  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  q.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.innerText = choice;
    button.onclick = () => checkAnswer(index);
    button.style.backgroundColor = colors[index % colors.length];
    choicesDiv.appendChild(button);
  });
}

function checkAnswer(index) {
  const q = questions[currentQuestion];

  if (index === q.answer) {
    score++;
  } else {
    incorrectAnswers.push({
      question: q.question,
      selectedAnswer: q.choices[index],
      correctAnswer: q.choices[q.answer]
    });
  }

  attempted++;
  notAttempted = questions.length - attempted;
  currentQuestion++;
  displayQuestion();
}

function startTimer() {
  document.getElementById("time-left").innerText = timer;
  timerInterval = setInterval(() => {
    timer--;
    document.getElementById("time-left").innerText = timer;
    if (timer <= 0) {
      clearInterval(timerInterval);
      showResult();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function showResult() {
  stopTimer();
  showContainer('result-container');
  document.getElementById("score").innerText = score;
  document.getElementById("attempted-count").innerText = attempted;
  document.getElementById("not-attempted-count").innerText = notAttempted;
}

function showReview() {
  showContainer('review-container');
  currentReviewPage = 0;
  renderReviewPage();
}

function renderReviewPage() {
  const reviewDiv = document.getElementById("incorrect-answers");
  reviewDiv.innerHTML = "";

  const start = currentReviewPage * reviewPageSize;
  const end = start + reviewPageSize;
  const pageAnswers = incorrectAnswers.slice(start, end);

  pageAnswers.forEach((ans, i) => {
    const reviewItem = document.createElement("div");
    reviewItem.classList.add("review-question");

    reviewItem.innerHTML = `
      <h3>${start + i + 1}. ${ans.question}</h3>
      <button style="background-color: #FF5733">Your Answer: ${ans.selectedAnswer}</button>
      <button style="background-color: #33FF57">Correct Answer: ${ans.correctAnswer}</button>
    `;

    reviewDiv.appendChild(reviewItem);
  });
}

function nextReviewPage() {
  const maxPage = Math.floor(incorrectAnswers.length / reviewPageSize);
  if ((currentReviewPage + 1) * reviewPageSize < incorrectAnswers.length) {
    currentReviewPage++;
    renderReviewPage();
  }
}

function prevReviewPage() {
  if (currentReviewPage > 0) {
    currentReviewPage--;
    renderReviewPage();
  }
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  timer = 45;
  attempted = 0;
  notAttempted = questions.length;
  incorrectAnswers = [];
  currentReviewPage = 0;
  showContainer('quiz-container');
  displayQuestion();
  startTimer();
}

// Start the quiz on load
window.onload = startQuiz;
