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
    mots: ["Tomate", "Banane", "Cartable", "Cabane", "Pirate", "Salade", "Limace", "Livre", "Patate", "Parapluie", "Catapulte", "Robot", "Usine", "Nuage", "Valise", "Lavabo", "Porte", "Plume", "Tortue", "Caravane", "Carotte", "Lama"],
    images: {
      "Tomate": "Img/lecture-mots/niv2/tomate.png",
      "Banane": "Img/lecture-mots/niv2/banane.png",
      "Cartable": "Img/lecture-mots/niv2/cartable.png",
      "Cabane": "Img/lecture-mots/niv2/cabane.png",
      "Pirate": "Img/lecture-mots/niv2/pirate.png",
      "Salade": "Img/lecture-mots/niv2/salade.png",
      "Limace": "Img/lecture-mots/niv2/limace.png",
      "Livre": "Img/lecture-mots/niv2/livre.png",
      "Patate": "Img/lecture-mots/niv2/patate.png",
      "Parapluie": "Img/lecture-mots/niv2/parapluie.png",
      "Catapulte": "Img/lecture-mots/niv2/catapulte.png",
      "Robot": "Img/lecture-mots/niv2/robot.png",
      "Usine": "Img/lecture-mots/niv2/usine.png",
      "Nuage": "Img/lecture-mots/niv2/nuage.png",
      "Valise": "Img/lecture-mots/niv2/valise.png",
      "Lavabo": "Img/lecture-mots/niv2/lavabo.png",
      "Porte": "Img/lecture-mots/niv2/porte.png",
      "Plume": "Img/lecture-mots/niv2/plume.png",
      "Tortue": "Img/lecture-mots/niv2/tortue.png",
      "Caravane": "Img/lecture-mots/niv2/caravane.png",
      "Carotte": "Img/lecture-mots/niv2/carotte.png",
      "Lama": "Img/lecture-mots/niv2/lama.png"
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
