const question = document.querySelector(".question");
const resultat = document.querySelector(".resultat");
const nombrepage = document.querySelector(".nombrepage");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

import questions from "./questions.js";

let currentIndex = 0;
let questionsCorrect = 0;

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  questionsCorrect = 0;
  loadQuestion();/* fonction jouerait probablement un rôle dans le chargement des questions pour un quiz ou un questionnaire*/ 
};

function nextQuestion(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    questionsCorrect++;
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}

function finish() {
  textFinish.innerHTML = `Votre Resultat est ${questionsCorrect} de ${questions.length}`;
  content.style.display = "none";
  contentFinish.style.display = "flex";
}

function loadQuestion() {
  nombrepage.innerHTML = `${currentIndex + 1}/${questions.length}`;
  const item = questions[currentIndex];
  resultat.innerHTML = "";
  question.innerHTML = item.question;

  item.resultat.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `;

    resultat.appendChild(div);/* ajouter un nœud à la fin de la liste des enfants d'un nœud parent spécifié*/
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

loadQuestion();
