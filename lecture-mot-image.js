// Récupère le niveau depuis l’URL (ex: lecture-mot-image.html?level=2)
const params = new URLSearchParams(window.location.search);
const niveau = parseInt(params.get("level")) || 1;

// 🔤 Définition des niveaux
const niveaux = {
  1: {
    mots: ["OS", "ANE", "SAC", "COL", "BAL", "VIS", "OR", "BOL", "AS", "BUS", "COR", "MUR"],
    images: {
      "OS": "Img/lecture-mots/niv2/os.png",
      "ANE": "Img/lecture-mots/niv2/ane.png",
      "SAC": "Img/lecture-mots/niv2/sac.png",
      "COL": "Img/lecture-mots/niv2/col.png",
      "BAL": "Img/lecture-mots/niv2/bal.png",
      "VIS": "Img/lecture-mots/niv2/vis.png",
      "OR": "Img/lecture-mots/niv2/or.png",
      "BOL": "Img/lecture-mots/niv2/bol.png",
      "AS": "Img/lecture-mots/niv2/as.png",
      "BUS": "Img/lecture-mots/niv2/bus.png",
      "COR": "Img/lecture-mots/niv2/cor.png",
      "MUR": "Img/lecture-mots/niv2/mur.png"
    }
  },
  2: {
    mots: ["TOMATE", "BANANE", "CARTABLE", "CABANE", "PIRATE", "SALADE", "LIMACE", "LIVRE", "PATATE", "PARAPLUIE", "CATAPULTE", "ROBOT", "USINE", "NUAGE", "VALISE", "LAVABO", "PORTE", "PLUME", "TORTUE", "CARAVANE", "CAROTTE", "LAMA"],
    images: {
      "TOMATE": "Img/lecture-mots/niv2/tomate.png",
      "BANANE": "Img/lecture-mots/niv2/banane.png",
      "CARTABLE": "Img/lecture-mots/niv2/cartable.png",
      "CABANE": "Img/lecture-mots/niv2/cabane.png",
      "PIRATE": "Img/lecture-mots/niv2/pirate.png",
      "SALADE": "Img/lecture-mots/niv2/salade.png",
      "LIMACE": "Img/lecture-mots/niv2/limace.png",
      "LIVRE": "Img/lecture-mots/niv2/livre.png",
      "PATATE": "Img/lecture-mots/niv2/patate.png",
      "PARAPLUIE": "Img/lecture-mots/niv2/parapluie.png",
      "CATAPULTE": "Img/lecture-mots/niv2/catapulte.png",
      "ROBOT": "Img/lecture-mots/niv2/robot.png",
      "USINE": "Img/lecture-mots/niv2/usine.png",
      "NUAGE": "Img/lecture-mots/niv2/nuage.png",
      "VALISE": "Img/lecture-mots/niv2/valise.png",
      "LAVABO": "Img/lecture-mots/niv2/lavabo.png",
      "PORTE": "Img/lecture-mots/niv2/porte.png",
      "PLUME": "Img/lecture-mots/niv2/plume.png",
      "TORTUE": "Img/lecture-mots/niv2/tortue.png",
      "CARAVANE": "Img/lecture-mots/niv2/caravane.png",
      "CAROTTE": "Img/lecture-mots/niv2/carotte.png",
      "LAMA": "Img/lecture-mots/niv2/lama.png"
    }
  }
};

// 🔧 Sélection du bon niveau
const mots = niveaux[niveau].mots;
const images = niveaux[niveau].images;
let motChoisi = "";

// 🎲 Listes d'images aléatoires pour le feedback
const imagesGagne = [
  "Img/lecture-mots/gagne/gagne1.jpg",
  "Img/lecture-mots/gagne/gagne2.jpg",
  "Img/lecture-mots/gagne/gagne3.jpg",
  "Img/lecture-mots/gagne/gagne4.jpg",
  "Img/lecture-mots/gagne/gagne5.jpg",
  "Img/lecture-mots/gagne/gagne6.jpg",
  "Img/lecture-mots/gagne/gagne7.jpg",
  "Img/lecture-mots/gagne/gagne8.jpg",
  "Img/lecture-mots/gagne/gagne9.jpg"
];

const imagesPerdu = [
  "Img/lecture-mots/perdu/perdu1.jpg",
  "Img/lecture-mots/perdu/perdu2.jpg",
  "Img/lecture-mots/perdu/perdu3.jpg",
  "Img/lecture-mots/perdu/perdu4.jpg"
];

// Mélange un tableau
function melanger(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Nouvelle question
function nouvelleQuestion() {
  motChoisi = mots[Math.floor(Math.random() * mots.length)];
  document.getElementById("mot-a-trouver").textContent = motChoisi;

  const mauvaises = mots.filter(m => m !== motChoisi);
  const options = melanger([motChoisi, ...melanger(mauvaises).slice(0, 3)]);

  const conteneur = document.getElementById("images-container");
  conteneur.innerHTML = "";

  options.forEach(option => {
    const img = document.createElement("img");
    img.src = images[option];
    img.alt = option;
    img.className = "image-option";
    img.onclick = () => verifier(option);
    conteneur.appendChild(img);
  });
}

// Vérifie la réponse
function verifier(choix) {
  const estCorrect = choix === motChoisi;
  afficherFeedbackImage(estCorrect);
}

// Affiche image de succès/échec aléatoire
function afficherFeedbackImage(reussi) {
  const overlay = document.getElementById("feedback-overlay");
  const img = document.getElementById("feedback-image");

  if (reussi) {
    img.src = imagesGagne[Math.floor(Math.random() * imagesGagne.length)];
  } else {
    img.src = imagesPerdu[Math.floor(Math.random() * imagesPerdu.length)];
  }

  overlay.classList.remove("hidden");

  setTimeout(() => {
    overlay.classList.add("hidden");
    img.src = "";
    nouvelleQuestion();
  }, 2000);
}

// Démarrage
document.addEventListener("DOMContentLoaded", nouvelleQuestion);
document.getElementById("suivant").addEventListener("click", nouvelleQuestion);
