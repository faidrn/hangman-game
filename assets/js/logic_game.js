// Leer archivo txt
let arrayWords = new Array();
let filePath = "./assets/words.txt";

function readFile(){
// function readFile(filePath){
    let arr = new Array();

    var file = new XMLHttpRequest();
    file.open("GET", filePath, false);
    file.onreadystatechange = function (){
        if(file.readyState === 4){
            if(file.status === 200 || file.status == 0){
                var text = file.responseText;
                for(var i = 0; i < text.length; i++){
                    arr.push(text[i]);
                }
                // console.log(text);
                return arr;
            }
        }
    }
    file.send(null);

}


// Llamar a la funcin que lee el archivo txt
// window.addEventListener('load', readFile);
// let arrayWord = readFile(filePath);
console.log(readFile());
