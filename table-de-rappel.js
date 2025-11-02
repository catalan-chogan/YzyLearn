const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const menu = document.getElementById("menu");
const jeu = document.getElementById("jeu");
const fin = document.getElementById("fin");
const chrono = document.getElementById("chrono");
const motATrouver = document.getElementById("mot-a-trouver");
const imagesContainer = document.getElementById("images-container");
const resultat = document.getElementById("resultat");
const historique = document.getElementById("historique");
const feedbackOverlay = document.getElementById("feedback-overlay");
const feedbackImg = document.getElementById("feedback-img");
const boutonsNiveaux = document.getElementById("boutons-niveaux");

let score = 0;
let tempsRestant = 60;
let timer;
let bonneReponse = null;
let maxNombre = 9;
let niveauSelectionne = 1;

// Génération des boutons de niveaux
for (let i = 1; i <= 10; i++) {
  const bouton = document.createElement("button");
  bouton.textContent = `Niveau ${i}`;
  bouton.style.fontSize = "48px";
  bouton.addEventListener("click", () => selectionnerNiveau(i));
  boutonsNiveaux.appendChild(bouton);
}

function selectionnerNiveau(niveau) {
  niveauSelectionne = niveau;
  maxNombre = niveau * 10 - 1;
  if (maxNombre > 99) maxNombre = 99;
  document.querySelectorAll("#boutons-niveaux button").forEach(btn => {
    btn.style.backgroundColor = "#2986CC";
  });
  document.querySelector(`#boutons-niveaux button:nth-child(${niveau})`).style.backgroundColor = "#145A9E";
}

// Retourne un entier aléatoire entre 0 et max
function randInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function demarrerJeu() {
  score = 0;
  tempsRestant = 60;
  historique.innerHTML = "";
  menu.classList.add("hidden");
  fin.classList.add("hidden");
  jeu.classList.remove("hidden");
  lancerChrono();
  nouvelleQuestion();
}

function lancerChrono() {
  chrono.textContent = tempsRestant;
  timer = setInterval(() => {
    tempsRestant--;
    chrono.textContent = tempsRestant;
    if (tempsRestant <= 0) {
      clearInterval(timer);
      finDuJeu();
    }
  }, 1000);
}

function nouvelleQuestion() {
  imagesContainer.innerHTML = "";
  let nombre = randInt(maxNombre);
  bonneReponse = nombre;
  motATrouver.textContent = nombre.toString().padStart(2, "0");

  let options = new Set([nombre]);
  while (options.size < 8) {
    options.add(randInt(maxNombre));
  }

  Array.from(options)
    .sort(() => Math.random() - 0.5)
    .forEach(num => {
      const img = document.createElement("img");
      img.src = `Img/table-de-rappel/${num.toString().padStart(2,"0")}.jpg`;
      img.classList.add("image-option");
      img.addEventListener("click", () => verifierReponse(num));
      imagesContainer.appendChild(img);
    });
}

function verifierReponse(num) {
  if (num === bonneReponse) {
    score++;
    afficherFeedback("Img/table-de-rappel/feedback/bon.png");
    historique.innerHTML += `<div class="historique-correct">+1</div>`;
  } else {
    afficherFeedback("Img/table-de-rappel/feedback/faux.png");
    historique.innerHTML += `<div class="historique-faux">0</div>`;
  }
  setTimeout(nouvelleQuestion, 500);
}

function afficherFeedback(src) {
  feedbackImg.src = src;
  feedbackOverlay.classList.remove("hidden");
  setTimeout(() => {
    feedbackOverlay.classList.add("hidden");
  }, 400);
}

function finDuJeu() {
  jeu.classList.add("hidden");
  fin.classList.remove("hidden");
  resultat.textContent = `Bravo ! Tu as trouvé ${score} bonnes réponses 🎯 (Niveau ${niveauSelectionne})`;
}

selectionnerNiveau(1);
startBtn.addEventListener("click", demarrerJeu);
restartBtn.addEventListener("click", demarrerJeu);
