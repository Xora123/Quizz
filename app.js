const url ='https://xora123.github.io/Kélian.json';

async function getItems(){
    const responce = await fetch(url);
    const data = await responce.json();
    for(let i=0; i<25; i++){
        var c = document.getElementById('questions').textContent = data.quizz.fr.débutant[i].question;
        var b = document.getElementById('propostions').textContent = data.quizz.fr.débutant[i].propositions;
        var newDiv = document.createElement('div');
    // console.log(data.quizz.fr.débutant[i].propositions);
    // console.log(data.quizz.fr.débutant[i].réponse)
    // console.log(data.quizz.fr.débutant[i].anecdote)

    }
}

getItems()