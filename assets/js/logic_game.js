// Obtenr elementos HTML
const printWord = document.getElementById('printWord');
const getNewWord = document.getElementById('get-new-word');
const letterAlphabet = document.querySelectorAll('.btn-alphabet');
const hangmanParts = document.querySelectorAll('.hide-hangman-parts');


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
        this.auxScore = 0;
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
        let aux = 0;

        // Ubicar la letra en el espacio que corresponde
        for(var i = 0; i < this.word.length; i++){
            if (this.word[i] == letter){
                if (underlinesArray[i] == '_'){
                    underlinesArray[i] = letter;
                    aux -= 1;
                }
            } else{
                aux += 1;
            }
        }
        console.log(aux, this.word.length);
        if (aux == this.word.length){
            this.drawingHangman();
        }

        // Convertir el array en string
        underlinesArray = underlinesArray.toString();
        // Eliminar las comas del string
        underlinesArray = underlinesArray.replace(/,/g, " ");

        return underlinesArray;
    }

    // Metodo para mostrar el ahorcado
    drawingHangman(){
        hangmanParts[this.partsOfBodyArray[this.hangmanPartsOfBody]].classList.remove('hide-hangman-parts');
        this.hangmanPartsOfBody += 1;
    }


}


// Leer archivo txt
let arrayWords = new Array();
// let filePath = "./assets/words.txt";
let path = "./assets/words.txt";

// instanciamos la clase q lee el archivo
const txtFile = new ReadFile(path);
arrayWords = txtFile.readFile();


// Instanciamos la clase que ejecutara la logica del juego
const logicGame = new LogicGame(arrayWords);



getNewWord.addEventListener('click', function(event){
    // Obtener palabra
    let underlines = logicGame.turnWordInUnderlines();
    console.log(logicGame.word, 'no class');

    // Imprimir la cadena convertida a underlines
    printWord.innerText = underlines;
});


letterAlphabet.forEach((everyLetter, i) => {
	//asignando un CLICK a cada boton
	letterAlphabet[i].addEventListener('click', () => {
		printWord.innerText = logicGame.compareLetters(letterAlphabet[i].id);
	})
});




// read file using promises and asyn
// const readFile = (filePath) => {
//     return new Promise((resolve, reject) => {
//         let arr = new Array();

//         var file = new XMLHttpRequest();
//         file.open("GET", filePath, false);
//         file.onreadystatechange = function (){
//             if(file.readyState === 4){
//                 if(file.status === 200 || file.status == 0){
//                     var text = file.responseText.split('\n');
//                     for(var i = 0; i < text.length; i++){
//                         arr.push(text[i]);
//                     }
//                     // console.log(text);
//                     resolve(arr);
//                 } else{
//                     reject('Error, request is not succeess');
//                 }
//             } else{
//                 reject('Error, Operation is not complete')
//             }
//         }
//         file.send(null);
//   })}
  
// const read_file = async (filePath) => { 
//     try{
//         console.log('Reading file...');
//         // const result = await readFile(filePath); //2. Esperas aquí mientras envíamos el dinero, lo verifican y te preparan el helado 
//         arrayWords = await readFile(filePath); //2. Esperas aquí mientras envíamos el dinero, lo verifican y te preparan el helado
//         console.log(arrayWords); //4. Imprimimos tu pedido! si todo salió bien.
//         // return result;
//     } catch(e) {
//         console.log(e); //4. Te decimos que no salió bien el proceso porque tu dinero no es suficiente.
//     }
// }

// read_file(filePath); //1. llamas a la funcion comprar helado e Ingresas el dinero
// console.log(arrayWords);