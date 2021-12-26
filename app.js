const url = "https://xora123.github.io/Kélian.json"; // url de mon fichier JSON

var Emptytab = []; // Création d'un tableau vide pour mettre mes data dedans

// Fonction pour prendre les data de mon fichier JSON
async function getData() {
  const responce = await fetch(url);
  const data = await responce.json();

  tri(data.quizz.fr.débutant);
  return data.quizz.fr.débutant;
}
const copyMyData = async (data) => {
  const FillTab = await getData(data);
  Emptytab.push(...FillTab);

  return Emptytab;
};

const container = document.getElementById("container");

function createQuestion() {
  const NewDiv = document.getElementById("question");

  const NewText = document.createTextNode("Question");

  NewDiv.appendChild(NewText);

  console.log(NewDiv);
  return NewDiv;
}

function tri(array) {
  var a;
  var b;
  var temp;

  if (Array.isArray(array) === true) {
    // Si la fonction = true c'est un array , sinon non
    if (array.length == 0 || array.length == 1)
      // Si la taille du tableau est de 0 alors il n'y a pas de Tab, et si elle est de 1 alors pas besoin de trier
      return;

    for (a = array.length - 1; a != 0; a--) {
      // Ici je fais ma fonction de tri, j'assigne à A ma tab.length, et je décremente jusqu'a 0
      b = Math.floor(Math.random() * array.length); // Ici j'assigne a B un nombre entre 0 et la taille du tableau

      temp = array[b]; // Je mets dans ma variable temporaire la valeur de la case b
      array[b] = array[a]; // Je mets dans la case b la variable de la case a
      array[a] = temp; // Je mets dans la case A la variable temp
    }
  } else {
    alert("It's not a tab BOIZ"); // Alert pour pas un tab
  }

  return array;
}

window.addEventListener("load", async function () {
    await copyMyData();
  
    createAnswers(Emptytab);
  });
  
  const createAnswers = (value) => {
    // console.log(value[0].propositions)
    const answersDiv = document.getElementById("container");
  
    for (let i = 0; i < value.length; i++) {
      const QuestElement = document.createElement("h2");
      const QuestNode = document.createTextNode(value[i].question);
      QuestElement.appendChild(QuestNode);
  
      answersDiv.appendChild(QuestElement);
  
      for (let j = 0; j <= 3; j++) {
        const answerElement = document.createElement("input");
        answerElement.type = 'radio';
  
        const answerNode = document.createTextNode(value[i].propositions[j]);
        answerElement.appendChild(answerNode);
  
        answersDiv.appendChild(answerElement);
      }
    }
    return answersDiv.textContent;
  };