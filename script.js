const questions = [
  {
      question: "Who is the creator of JavaScript?",
      choices: ["Brendan Eich", "James Gosling", "Bjarne Stroustrup", "Guido van Rossum"],
      answer: 0
  },
  {
      question: "What does HTML stand for?",
      choices: ["HyperText Markup Language", "HighText Machine Language", "HyperTabular Markup Language", "None of the above"],
      answer: 0
  },
  {
      question: "Which company developed the first computer mouse?",
      choices: ["Microsoft", "Apple", "Xerox", "IBM"],
      answer: 2
  },
  {
      question: "What does CSS stand for?",
      choices: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "None of the above"],
      answer: 0
  },
  {
      question: "Which of the following is a front-end JavaScript framework?",
      choices: ["Node.js", "Express", "React", "Django"],
      answer: 2
  },
  {
      question: "Which company created the iPhone?",
      choices: ["Google", "Samsung", "Microsoft", "Apple"],
      answer: 3
  },
  {
      question: "What is the first version of HTML?",
      choices: ["HTML 5", "HTML 4", "HTML 1.0", "HTML 3.2"],
      answer: 2
  },
  {
      question: "What does the acronym SQL stand for?",
      choices: ["Structured Query Language", "Standard Question Language", "Sequential Query Language", "None of the above"],
      answer: 0
  },
  {
      question: "Which programming language is known as the mother of all languages?",
      choices: ["C", "Java", "Python", "Assembly"],
      answer: 0
  },
  {
      question: "Who invented the World Wide Web?",
      choices: ["Tim Berners-Lee", "Mark Zuckerberg", "Bill Gates", "Steve Jobs"],
      answer: 0
  },
  {
      question: "Which programming language is known for its use in data science?",
      choices: ["C", "Python", "Java", "Swift"],
      answer: 1
  },
  {
      question: "What year was the first iPhone released?",
      choices: ["2005", "2006", "2007", "2008"],
      answer: 2
  },
  {
      question: "Which of the following is NOT an operating system?",
      choices: ["Windows", "Linux", "Android", "Chrome"],
      answer: 3
  },
  {
      question: "Which protocol is used for secure communication over the internet?",
      choices: ["HTTP", "FTP", "HTTPS", "SMTP"],
      answer: 2
  },
  {
      question: "Which one of these is a cloud computing service?",
      choices: ["AWS", "SQL", "MongoDB", "Linux"],
      answer: 0
  }
];

let currentQuestion = 0;
let score = 0;
let timer = 45;
let timerInterval;

function startQuiz() {
  displayQuestion();
  startTimer();
}

function displayQuestion() {
  if (currentQuestion >= questions.length) {
      showResult();
      return;
  }
  const question = questions[currentQuestion];
  document.getElementById("question").innerText = question.question;
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  question.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.innerText = choice;
      button.onclick = () => checkAnswer(index);
      choicesDiv.appendChild(button);
  });
}

function checkAnswer(choiceIndex) {
  const question = questions[currentQuestion];
  if (choiceIndex === question.answer) {
      score++;
  }
  currentQuestion++;
  nextQuestion();
}

function nextQuestion() {
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

function showResult() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("score").innerText = score;
}

function restartQuiz() {
  score = 0;
  currentQuestion = 0;
  timer = 45;
  document.getElementById("quiz").classList.remove("hidden");
  document.getElementById("result").classList.add("hidden");
  startQuiz();
}

startQuiz();
