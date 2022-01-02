const url = "https://xora123.github.io/Kélian.json"; // url de mon fichier JSON
const username = document.getElementById("username")
const saveScoreBtn =document.getElementById("username")

var Emptytab = []; // Création d'un tableau vide pour mettre mes data dedans

async function getData() {
  // Fonction pour prendre les data de mon fichier JSON
  const responce = await fetch(url);
  const data = await responce.json();

  tri(data.quizz.fr.débutant);
  return data.quizz.fr.débutant;
}
const copyMyData = async (data) => {
  // Fonction Pour remplir mon Tab vide pour pouvoir l'utiliser partout
  const FillTab = await getData(data);
  Emptytab.push(...FillTab);

  return Emptytab;
};

const container = document.getElementById("container");

function tri(array) {
  // Fonction pour shuffle le Tab.
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
 
  const answersDiv = document.getElementById("container");


  for (let i = 0; i < value.length - 20; i++) {
    const div = document.createElement("div")
    div.classList.add('questionContainer');
    const QuestElement = document.createElement("h2"); // Ici on crée toute les question en fonction la taille de value, ici 30 - 10 (-10 pour pas que ce soit les mêmes questions)
    const QuestNode = document.createTextNode(value[i].question); // Ici on crée un textnode pour mettre les questions dans h2
    QuestElement.appendChild(QuestNode); // Ici on le fait spawn

    div.appendChild(QuestElement);

    answersDiv.appendChild(div)

    for (let j = 0; j <= 3; j++) {
      // Ici c'est pour crée les Propositions pour chaque questions
      const answerElement = document.createElement("input"); // On crée un input
      answerElement.id = "salut" + j;
      answerElement.value = j;
      answerElement.type = "radio"; // le Type = radio

      const nameRadios = () => {  // Collect all radios into an array
        const allRadios = [...document.querySelectorAll(`[type='radio']`)];// Each set of 4 radios get a unique name
        for (let i = 0; i < allRadios.length; i++) {
          let q = Math.floor(i / 4);
          allRadios[i].name = `rad${q}`;
        }
      };
      nameRadios();
      answerElement.classList = "input";

      const CreateLabel = document.createElement("label"); // On crée le label pour les inputs
      CreateLabel.classList = "Label";
      CreateLabel.name = "input";
      var score = 0;                            // Variable pour compter le nombre de réponses justes

      CreateLabel.setAttribute("for", "salut" + j); // Ici on le setUnAttribut
      const answerNode = document.createTextNode(value[i].propositions[j]); // On crée le TextNode
      
      answerElement.addEventListener("click", () => { // Evénement pour mettre une couleur si c'est juste ou faux

        CreateLabel.style.backgroundColor = "white"; // On set le style a blanc de base
        if (value[i].propositions[j] == value[i].réponse) {
          CreateLabel.style.backgroundColor = "green"; // On set le style a green quand c'est juste
          document.querySelectorAll(`[name=${answerElement.name}]`) // Quand on click sur une propostions on set les autres en disabled
            .forEach((otherAnswer) => {
              otherAnswer.disabled = true;
            });
           localStorage.setItem("score", score++)
            score.innerhtml
          const anecdoteElement = document.createElement("p");

          const anecdoteNode = document.createTextNode(value[i].anecdote); // Crée l'anecdote quand c'est juste
           anecdoteElement.style.backgroundColor ="none"
          anecdoteElement.appendChild(anecdoteNode);
          CreateLabel.appendChild(anecdoteElement);
        } else {
          CreateLabel.style.backgroundColor = "red"; // On set le style a green quand c'est juste
          document.querySelectorAll(`[name=${answerElement.name}]`)   // Quand on click sur une propostions on set les autres en disabled
          .forEach((otherAnswer) => {
            otherAnswer.disabled = true;
          });
        }
      });

      CreateLabel.appendChild(answerNode); // On fou AnswerNode dans label

      div.appendChild(CreateLabel); // On fou Label dans le Container

      div.appendChild(answerElement); // On fou Element Dans le container aussi

      answersDiv.appendChild(div)

    }
  }
  return   {
    answersDiv
  }
};

const storedValue = localStorage.getItem("names");
console.log(storedValue) 
var start = document.getElementById("start")

start.addEventListener("click", () =>{
  const name = document.getElementById("myinput").value
  localStorage.setItem('names', name)
  console.log(name)
})


var end = document.getElementById("end")

end.addEventListener("click", () => {
  localStorage.setItem('score', score)
})

// HELP \\ // HELP \\ // HELP \\ // HELP \\ // HELP \\ // HELP \\ // HELP \\
