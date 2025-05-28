const mots = ["OS", "ANE", "SAC", "COL", "BAL", "VIS", "OR", "BOL", "AS", "BUS", "COR", "MUR"];
const images = {
  "OS": "Img/lecture-mots/os.png",
  "ANE": "Img/lecture-mots/ane.png",
  "SAC": "Img/lecture-mots/sac.png",
  "COL": "Img/lecture-mots/col.png",
  "BAL": "Img/lecture-mots/bal.png",
  "VIS": "Img/lecture-mots/vis.png",
  "OR": "Img/lecture-mots/or.png",
  "BOL": "Img/lecture-mots/bol.png",
  "AS": "Img/lecture-mots/as.png",
  "BUS": "Img/lecture-mots/bus.png",
  "COR": "Img/lecture-mots/cor.png",
  "MUR": "Img/lecture-mots/mur.png"
};

let motChoisi = "";

function melanger(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function nouvelleQuestion() {
  motChoisi = mots[Math.floor(Math.random() * mots.length)];
  document.getElementById("mot-a-trouver").textContent = `${motChoisi}`;

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

function verifier(choix) {
  if (choix === motChoisi) {
    alert("Bravo !");
  } else {
    alert("Essaie encore.");
  }
  nouvelleQuestion();
}

document.addEventListener("DOMContentLoaded", nouvelleQuestion);
