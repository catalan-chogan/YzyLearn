let questions = [];
let index = 0;
let bonnesReponses = 0;
let timer;
let tempsRestant = 60;

function demarrer(niveau) {
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("jeu").classList.remove("hidden");
  genererQuestions(niveau);
  afficherQuestion();
  timer = setInterval(updateChrono, 1000);
}

function genererQuestions(niveau) {
  let tables = [];
  switch (niveau) {
    case 1:
      tables = [10];
      break;
    case 2:
      tables = [2];
      break;
    case 3:
      tables = [5];
      break;
    case 4:
      tables = [3];
      break;
    case 5:
      tables = [4];
      break;
    case 6:
      tables = [0, 1, 2, 3, 4, 5];
      break;
    case 7:
      tables = [6];
      break;
    case 8:
      tables = [7];
      break;
    case 9:
      tables = [8];
      break;
    case 10:
      tables = [9];
      break;
    case 11:
      tables = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      break;
  }

  for (let i = 0; i < 100; i++) {
    let a = tables[Math.floor(Math.random() * tables.length)];
    let b = Math.floor(Math.random() * 11);
    questions.push({ a, b });
  }
}

function afficherQuestion() {
  if (index < questions.length) {
    const q = questions[index];
    document.getElementById("question").textContent = `${q.a} x ${q.b} = ?`;
    document.getElementById("reponse").value = "";
    document.getElementById("reponse").focus();
  }
}

function verifier() {
  const reponseInput = document.getElementById("reponse");
  const userRep = parseInt(reponseInput.value);
  const q = questions[index];
  const bonneRep = q.a * q.b;
  const historique = document.getElementById("historique");

  if (userRep === bonneRep) {
    bonnesReponses++;
    historique.innerHTML = `<div class="historique-correct">${q.a} x ${q.b} = ${userRep}</div>` + historique.innerHTML;
  } else {
    historique.innerHTML = `<div class="historique-faux">${q.a} x ${q.b} = ${userRep} (${bonneRep})</div>` + historique.innerHTML;
  }

  index++;
  afficherQuestion();
}

function updateChrono() {
  tempsRestant--;
  document.getElementById("chrono").textContent = `Temps restant : ${tempsRestant}s`;

  if (tempsRestant <= 0) {
    clearInterval(timer);
    finDuJeu();
  }
}

function finDuJeu() {
  document.getElementById("jeu").classList.add("hidden");
  document.getElementById("fin").classList.remove("hidden");
  document.getElementById("score").textContent = `Tu as trouvé ${bonnesReponses} bonne(s) réponse(s) sur ${index} questions.`;
  document.getElementById("historique-fin").innerHTML = document.getElementById("historique").innerHTML;
}