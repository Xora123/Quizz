const url = "https://xora123.github.io/Kélian.json"; // url de mon fichier JSON

var Emptytab = []; // Création d'un tableau vide pour mettre mes data dedans

async function getData() { // Fonction pour prendre les data de mon fichier JSON
  const responce = await fetch(url);
  const data = await responce.json();

  tri(data.quizz.fr.débutant);
  return data.quizz.fr.débutant;
}
const copyMyData = async (data) => { // Fonction Pour remplir mon Tab vide pour pouvoir l'utiliser partout
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
  var res = document.getElementById("end")
  res.addEventListener("click" , Resolve) 
});

const createAnswers = (value) => {
 
  const answersDiv = document.getElementById("container");


  for (let i = 0; i < value.length - 25; i++) {
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
      answerElement.id = "salut";
      answerElement.value = Emptytab[i].propositions[j]
      answerElement.type = "radio"; // le Type = radio

      const nameRadios = () => {  // On met tout les input radio , dans un array
        const allRadios = [...document.querySelectorAll(`[type='radio']`)];// Chaque groupe de 4 inputs radio auront un nom unique
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

      CreateLabel.setAttribute("for", "salut" + j); // Ici on le setUnAttribut
      const answerNode = document.createTextNode(value[i].propositions[j]); // On crée le TextNode
      
      answerElement.addEventListener("click", () => { // Evénement pour mettre une couleur si c'est juste ou faux

        if (value[i].propositions[j] == value[i].réponse) {
          CreateLabel.style.backgroundColor = "green"; // On set le style a green quand c'est juste
          document.querySelectorAll(`[name=${answerElement.name}]`) // Quand on click sur une propostions on set les autres en disabled
            .forEach((otherAnswer) => {
              otherAnswer.disabled = true;
            });
          const anecdoteElement = document.createElement("p");

          const anecdoteNode = document.createTextNode(value[i].anecdote); // Crée l'anecdote quand c'est juste
           anecdoteElement.style.backgroundColor ="none"
          anecdoteElement.appendChild(anecdoteNode);
          CreateLabel.appendChild(anecdoteElement);
        } else {
          CreateLabel.style.backgroundColor = "red"; // On set le style a red quand c'est faux
          document.querySelectorAll(`[name=${answerElement.name}]`)   // Quand on click sur une propostions on set les autres en disabled
          .forEach((otherAnswer) => {
            otherAnswer.disabled = true;
          });
        }
      });

      CreateLabel.appendChild(answerNode); // On fou AnswerNode dans label

      div.appendChild(CreateLabel); // On fou Label dans le Container

      div.appendChild(answerElement); // On fou Element Dans le container aussi

      answersDiv.appendChild(div); // On met toutes nos petites div dans le container de tout les éléments
    }
  }
  return{   
    answersDiv
  }
};

var score = 0;

// Fonction pour avoir son score final qui s'affiche a fin! 
function Resolve() {
  var Check = [];
  
  Check = document.querySelectorAll("input:checked"); // Récuper les inputs qui ont étaient selectionés 

  for (let i = 0; i < Emptytab.length - 25; i++){ 
    if (Check[i].value == Emptytab[i].réponse){ // Si l'input selectioné corresponds a la réponse, alors on incrémente le score
      score++;
    }
    console.log(Check.length) 
  document.getElementById("ScoreFinal").innerText = "Votre score est de : " + score + "/" +(Check.length); // Affichage du Score
  document.body.scrollTop = 0; // Score final en haut de la page
  document.documentElement.scrollTop = 0;
}
}
