class Quiz {
  constructor(question, answer, choices) {
    this.question = question;
    this.answer = answer;
    this.choices = choices;
  }

  validateAnswer(answer) {
    return this.answer === answer;
  }
}

const quizList = [
  new Quiz("What is the capital city of the Philippines?", "Manila", [
    "Manila",
    "Davao",
    "Cebu",
    "Tarlac",
  ]),
  new Quiz("What is the national sport of the Philippines", "Sepak Takraw", [
    "Basketball",
    "Sepak Takraw",
    "Volleyball",
    "Badminton",
  ]),
  new Quiz("Who is the President of the Philippines?", "Marcos", [
    "Duterte",
    "Leni",
    "Marcos",
    "Ninoy",
  ]),
];

let questionIndex = 0;
let scoreTracker = 0;
let selectedAnswer = "";

document.addEventListener("DOMContentLoaded", () => {
  const questionContainer = document.getElementById("question-container");
  const resultContainer = document.getElementById("result-container");
  const questionText = document.getElementById("question");
  const optionsHolder = document.getElementById("options-holder");
  const nextQuestionBtn = document.getElementById("next-btn");
  const score = document.getElementById("score");
  const restartBtn = document.getElementById("restart-btn");
  const startBtn = document.getElementById("start-button");

  startBtn.addEventListener("click", (e) => {
    questionContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    startBtn.classList.add("hidden");
    startQuiz();
    console.log("Starting the quiz...");
  });

  restartBtn.addEventListener("click", (e) => {
    questionContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    startBtn.classList.add("hidden");
    startQuiz();
    console.log("Restarting the quiz...");
  });

  nextQuestionBtn.addEventListener("click", (e) => {
    const currentQuiz = quizList[questionIndex];
    var isCorrect = currentQuiz.validateAnswer(selectedAnswer);
    if(isCorrect)
        scoreTracker++;

    questionIndex++;
    showQuestion();
    console.log(`Score:${scoreTracker} | Next question the quiz...`);
  });

  function startQuiz() {
    questionIndex = 0;
    scoreTracker= 0;
    showQuestion();
  }

  function showQuestion() {
    if (questionIndex >= quizList.length) {
      console.log("The quiz has ended!");
      onQuizEnded();
      return;
    }

    optionsHolder.innerHTML = "";
    const quizData = quizList[questionIndex];
    questionText.textContent = quizData.question;
    quizData.choices.forEach((choice) => {
      const choiceItem = document.createElement("li");
      choiceItem.innerHTML = `
                ${choice}
            `;

      choiceItem.addEventListener("click", (e) => {
        updateChoiceStyle();

        choiceItem.classList.add("selected");
        selectedAnswer = choice;
        console.log(`Selected Answer: ${selectedAnswer}`);
      });

      optionsHolder.append(choiceItem);
    });
  }

  function onQuizEnded(){
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    startBtn.classList.add("hidden");

    score.textContent = scoreTracker;
  }

  function updateChoiceStyle() {
    optionsHolder.querySelectorAll("li").forEach((item) => {
      item.classList.remove("selected");
    });
  }
});
