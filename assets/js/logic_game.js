// Obtenr elementos HTML
const printWord = document.getElementById('printWord');
const getNewWord = document.getElementById('get-new-word');


// Leer archivo txt
let arrayWords = new Array();
let filePath = "./assets/words.txt";

function readFile(){
    var file = new XMLHttpRequest();
    file.open("GET", filePath, false);
    file.onreadystatechange = function (){
        if(file.readyState === 4){
            if(file.status === 200 || file.status == 0){
                var text = file.responseText.split('\n');
                for(var i = 0; i < text.length; i++){
                    arrayWords.push(text[i]);
                }
                // console.log(arr[0]);
                // return text;
            }
        }
    }
    file.send(null);

}


readFile();
// console.log(arrayWords)

// Obtener una palabra del array de forma aleatoria
var word;

getNewWord.addEventListener('click', function(){
    // Generar posicion aleatoria
    let max = arrayWords.length;
    let randomPosition = Math.floor(Math.random() * max);

    // Obtener palabra
    word = arrayWords[randomPosition];
    word = word.toUpperCase();

    // Generar la cadena de underlines (_) para imprimir en pantalla
    const reg = /[A-Z]/g;
    let underlines = word.replace(reg, "_ ");

    // Imprimir la cadena convertida a underlines
    printWord.innerText = underlines;

});




// Comparar la letra seleccionada con las letras de la palabra
console.log(word);


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