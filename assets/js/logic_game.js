// Obtenr elementos HTML
const printWord = document.getElementById('printWord');
const btnGetNewWord = document.getElementById('get-new-word');
const btnLetterAlphabet = document.querySelectorAll('.btn-alphabet');
const hangmanParts = document.querySelectorAll('.hide-hangman-parts');
const successResults = document.getElementById('successResults');
const mistakeResults = document.getElementById('mistakeResults');
const showWord = document.querySelector('.show-word');
const alertDanger = document.querySelector('.alert-danger');
const alertSuccess = document.querySelector('.alert-success');


class ReadFile{
    constructor(filePath){
        this.filePath = filePath
    }

    readFile(){
        let arr = new Array();

        var file = new XMLHttpRequest();
        file.open("GET", this.filePath, false);
        file.onreadystatechange = function (){
            if(file.readyState === 4){
                if(file.status === 200 || file.status == 0){
                    var text = file.responseText.split('\n');
                    for(var i = 0; i < text.length; i++){
                        arr.push(text[i]);
                    }
                    // console.log(arr[0]);
                    // return arr;
                }
            }
        }
        file.send(null);
        return arr;
    }
}

    // clase q contiene toda la logica del juego
class LogicGame{
    constructor(listOfWords){
        this.listOfWords = listOfWords;
        this.word;
        // Contador q lleva la posicion del array de las partes del cuerpo
        this.hangmanPartsOfBody = 0;
        // Array con la ubicacion HTML de las partes del cuerpo
        this.partsOfBodyArray = [2, 1, 3, 0, 4, 5];
        // Variables para llevar los puntos a favor y en contra
        this.successScore = 0;
        this.wrontScore = 0;
        // Variable auxiliar para saber si ha adivinado o no una letra
        this.guessTheLetter = false;
        this.numberOfBadAnswers = 0;  // Cuantas veces me equivoque
        this.numberOfCorrectAnswers = 0;  // Cuantes veces acerté
    }

    getRandomPosition(){
        // Generar posicion aleatoria
        let max = this.listOfWords.length;
        let randomPosition = Math.floor(Math.random() * max);

        return randomPosition;
    }

    // Metodo para obtener una palabra del array de forma aleatoria
    getWord(){
        let randomWord = this.listOfWords[this.getRandomPosition()];
        randomWord = randomWord.toUpperCase();
        this.word = randomWord;

        // Quitar las clase de animacion a los mensajes y agregar las clases q los oculta
        if (!alertDanger.classList.contains('hide-danger-alert')){
            alertDanger.classList.add('hide-danger-alert');
        }
        if (!alertSuccess.classList.contains('hide-success-alert')){
            alertSuccess.classList.add('hide-success-alert');
        }
        alertDanger.classList.remove('animation-alert');
        alertSuccess.classList.remove('animation-alert');
    
        return randomWord;
    }

    // Metodo para generar la cadena de underlines (_) para imprimir en pantalla
    turnWordInUnderlines(){
        const reg = /[A-Z]/g;
        let selectedWord = this.getWord();
        let underlines = selectedWord.replace(reg, "_ ");

        return underlines;
    }

    // Metodo para comparar la letra seleccionada con las letras de la palabra
    compareLetters(letter){
        // Asignar el valor actual de la cadena, para no perder las letras q se han identificado
            // Convirtiendo la cadena en array
        let underlinesArray = printWord.innerHTML.split(' ');

        // Ubicar la letra en el espacio que corresponde
        for(let i = 0; i < this.word.length; i++){
            if (this.word[i] == letter){
                underlinesArray[i] = letter;

                this.guessTheLetter = true;
                this.numberOfCorrectAnswers += 1;
            }
        }

        if (this.guessTheLetter == false){
            this.drawingHangman();
            this.numberOfBadAnswers += 1;
        }

        // Mostrar mensaje de perdiste
        // 6 partes del cuerpo
        if (this.numberOfBadAnswers == 6){
            // Agregar la palabra al mensaje
            showWord.innerText = this.word;

            alertDanger.classList.remove('hide-danger-alert');
            // Agregar animacion
            alertDanger.classList.add('animation-alert');

            // Finalizar juego
            this.gameOver();

            this.wrontScore += 1;
            mistakeResults.innerText = this.wrontScore;

        } else{
            // Mostrar el mensaje de ganaste
            if (this.numberOfCorrectAnswers == this.word.length){
                alertSuccess.classList.remove('hide-success-alert');
                alertSuccess.classList.add('animation-alert');
                this.gameOver();

                this.successScore += 1;
                successResults.innerText = this.successScore;
            }
        }

        // Convertir el array en string
        underlinesArray = underlinesArray.toString();
        // Eliminar las comas del string
        underlinesArray = underlinesArray.replace(/,/g, " ");

        this.guessTheLetter = false;

        return underlinesArray;
    }

    // Metodo para mostrar el ahorcado
    drawingHangman(){
        hangmanParts[this.partsOfBodyArray[this.hangmanPartsOfBody]].classList.remove('hide-hangman-parts');
        this.hangmanPartsOfBody += 1;
    }

    // Metodo para bloquear todos los controles cuando finalice el juego
    gameOver(){
        // Inactivar los botones del alfabeto
        btnLetterAlphabet.forEach((everyLetter, i) => {
            btnLetterAlphabet[i].disabled = true;
        });

        // Activar el boton para seleccionar una nueva palabra
        btnGetNewWord.disabled = false;
    }

    gameStart(){
        // Activar los botones del alfabeto
        btnLetterAlphabet.forEach((everyLetter, i) => {
            btnLetterAlphabet[i].disabled = false;
        });

        // Inactivar el boton para seleccionar una nueva palabra
        btnGetNewWord.disabled = true;

        // Ocultar el ahorcado
        hangmanParts.forEach((everyHangmanPart, i) => {
            if (!hangmanParts[i].classList.contains('hide-hangman-parts')){
                hangmanParts[i].classList.add('hide-hangman-parts');
            }
        });

        // Reset variables
        this.hangmanPartsOfBody = 0;
        this.numberOfBadAnswers = 0;
        this.numberOfCorrectAnswers = 0;
    }


}


// Leer archivo txt
let arrayWords = new Array();
let path = "./assets/words.txt";

// instanciamos la clase q lee el archivo
const txtFile = new ReadFile(path);
arrayWords = txtFile.readFile();


// Instanciamos la clase que ejecutara la logica del juego
const logicGame = new LogicGame(arrayWords);


btnGetNewWord.addEventListener('click', function(event){
    // Obtener palabra
    let underlines = logicGame.turnWordInUnderlines();

    // Imprimir la cadena convertida a underlines
    printWord.innerText = underlines;

    // Iniciar juego
    logicGame.gameStart();

});


btnLetterAlphabet.forEach((everyLetter, i) => {
	//asignando un CLICK a cada boton
	btnLetterAlphabet[i].addEventListener('click', () => {
		printWord.innerText = logicGame.compareLetters(btnLetterAlphabet[i].id);
        // Inactivar boton para que no se vuelva a usar
        btnLetterAlphabet[i].disabled = true;
	})
});