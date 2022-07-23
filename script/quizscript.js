
let score = [];
let currentQuestion = 0;

// Se declaran las variables para los contadores. "score" como un array vacío y "currentQuestion" como tipo numérico igualado a 0.




const submitBtn = document.getElementById('submit-quiz');

// Se declara la variable del botón para enviar la respuesta elegida y pasar a la siguiente pregunta. Se usa el DOM para traerlo desde HTML.





quizGame();

// Lo primero, se ejecuta la función quizGame, declarada en la línea 23 como función asíncrona.





async function quizGame() {
    
    try {
        let responseQuiz = await fetch('https://opentdb.com/api.php?amount=13&category=17&difficulty=medium&type=multiple')
        let pregsQuiz = await responseQuiz.json()

        // Trae de la API las preguntas. En concreto, trae un objeto al que hemos llamado "pregsQuiz".Uno de los elementos de "pregsQuiz" es un array llamado "results" que contiene 13 objetos (preguntas) con sus propiedades (enunciado, respuesta correcta, incorrecta... Copiar enlace en navegador para ver la estructura). Este enlace está generado desde la API, con una configuración previa desde la API en la que se determinan el nº de preguntas, la temática, dificultad...




        paintQUest(
            pregsQuiz.results[currentQuestion].incorrect_answers,
            pregsQuiz.results[currentQuestion].correct_answer, 
            pregsQuiz.results[currentQuestion].question
            )

        // Se ejecuta la función "paintQUest", declarada en la línea 89 (fuera de la función asíncrona), que "pinta" el enunciado de la pregunta, la respuesta correcta y las 3 respuestas incorrectas de cada una de las preguntas correspondientes al contador "currentQuestion".




        

        submitBtn.addEventListener('click', () => {

        // Se asocia el botón con una función de escucha para cuando se haga click ejecute lo siguiente:


            checkGoodAnswer(pregsQuiz.results[currentQuestion].correct_answer, score)
            



            currentQuestion++;

            if (currentQuestion == pregsQuiz.results.length) {
                let total = 0;
                score.forEach(hit => {
                    total += hit
                })
                quiz.innerHTML = `
                    <br><br><br><br><br><br><br>
                    <h2>Has respondido ${total}/${pregsQuiz.results.length} preguntas correctamente</h2><br><br><br><br><br>
        
                    <button id="submit-quiz" onclick="location.reload()">Volver a jugar</button><br>
                    <input id="submit-quiz" type="button" onclick="location.href='../pages/home.html';" value="Home" />
                    `
            }else{
                deleteRadio()
                
                paintQUest(
                    pregsQuiz.results[currentQuestion].incorrect_answers,
                    pregsQuiz.results[currentQuestion].correct_answer, 
                    pregsQuiz.results[currentQuestion].question
                    )
    
            }


        })

    } catch (error) {
        console.log(error)
    }
}


function paintQUest(bads, good, quest) {

    let arrayresp = [...bads, good]; //para meter las 4 respuestas
    // console.log(arrayresp, quest);
    arrayresp = arrayresp.sort(() => Math.random() - 0.5) //para que la posición de la respuesta correcta vaya cambiando

    document.getElementById('question').innerHTML = `${quest}`
    document.getElementById('a_text').innerHTML = `${arrayresp[0]}`
    document.getElementById('b_text').innerHTML = `${arrayresp[1]}`
    document.getElementById('c_text').innerHTML = `${arrayresp[2]}`
    document.getElementById('d_text').innerHTML = `${arrayresp[3]}`

}

function checkGoodAnswer(goodAnswer, score) {
    let answers = document.getElementsByName('answer')
    answers.forEach(element => {
        if(element.checked && document.getElementById(`${element.id}_text`).textContent == goodAnswer){
            score.push(1)
        }
    })
}

function deleteRadio() {
    let answers = document.getElementsByName('answer')
    answers.forEach(element => {
        element.checked = false
    })
}












// Your web app's Firebase configuration
/*
const firebaseConfig = {
    apiKey: "AIzaSyCzZ7cOiBFSKZ21yBwNg3mps1764mSJOpo",
    authDomain: "quiz2-f87e2.firebaseapp.com",
    projectId: "quiz2-f87e2",
    storageBucket: "quiz2-f87e2.appspot.com",
    messagingSenderId: "346823333135",
    appId: "1:346823333135:web:0db11aaaca9f09df5e5a7a"
};



// Initialize Firebase
firebase.initializeApp(firebaseConfig);


//para llamar a la bbdd
const db = firebase.firestore();


//para crear colecciones
db.collection("users").add({
    name: "Nombre",
    email: "email@gmail.com",
    password:"00",
    score: 0
})
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });


//para obtener toda la info de nuestra BBDD

db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        console.log(doc.data())
    });
});
*/