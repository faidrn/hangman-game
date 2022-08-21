# HANGMAN GAME

![](https://github.com/faidrn/hangman-game/tree/main/assets/images/ScreenShot.png)


Hangman is a guessing game about the player tries to guess a word by suggesting letters within a certain number of guesses. Originally a Paper-and-pencil game, this is HTML, CSS and JavaScript's version.


### Javascript code

#### alphabet.js

The next code is using to create and add the buttons with the alphabet into the HTML code

```javascript
// Get the element that will contain the buttons
const alphabetContainer = document.querySelector('.alphabet');


const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function renderAlphabet(arr){
    for (letter of arr){
        // Create the buttons
        const btnLetter = document.createElement('button');
        // Assigning an id
        btnLetter.setAttribute('id', letter);
        // Assigning classes
        btnLetter.classList.add('button', 'btn-alphabet');
        //  Assigning a value
        btnLetter.innerText = `${letter}`;
        // Add the buttons into of the div that will contain them
        alphabetContainer.appendChild(btnLetter);
    }
}

renderAlphabet(alphabet);
```

#### logic_game.js

The next code is using to do the logic game:

Get controls game (elements HTML to print results, select random word, select alphabet letters)

```javascript
const printWord = document.getElementById('printWord');
const btnGetNewWord = document.getElementById('get-new-word');
const btnLetterAlphabet = document.querySelectorAll('.btn-alphabet');
const hangmanParts = document.querySelectorAll('.hide-hangman-parts');
const successResults = document.getElementById('successResults');
const mistakeResults = document.getElementById('mistakeResults');
const showWord = document.querySelector('.show-word');
const alertDanger = document.querySelector('.alert-danger');
const alertSuccess = document.querySelector('.alert-success');
```

Class to read the txt file with a list of words, the constructor method get the file path and save the list of the words into of an array, finally return the array.

```javascript
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
                }
            }
        }
        file.send(null);
        return arr;
    }
}
```

Class that contain the game logic

```javascript
class LogicGame{
    constructor(listOfWords){
        this.listOfWords = listOfWords;
        this.word;
        // Count to the position into the array of the hangman parts
        this.hangmanPartsOfBody = 0;
        // Array with the HTML location of the hangman parts
        this.partsOfBodyArray = [2, 1, 3, 0, 4, 5];
        // Variables to the score
        this.successScore = 0;
        this.wrontScore = 0;
        // Variables to know if player guess or not the letter
        this.guessTheLetter = false;
        this.numberOfBadAnswers = 0;
        this.numberOfCorrectAnswers = 0;
    }

    // Method to get a random position
    getRandomPosition(){
        let max = this.listOfWords.length;
        let randomPosition = Math.floor(Math.random() * max);

        return randomPosition;
    }

    // Mthod to get a new random word
    getWord(){
        let randomWord = this.listOfWords[this.getRandomPosition()];
        randomWord = randomWord.toUpperCase();
        this.word = randomWord;

        // Add the classes to hide the alerts
        if (!alertDanger.classList.contains('hide-danger-alert')){
            alertDanger.classList.add('hide-danger-alert');
        }
        if (!alertSuccess.classList.contains('hide-success-alert')){
            alertSuccess.classList.add('hide-success-alert');
        }
        // Remove the alerts animation
        alertDanger.classList.remove('animation-alert');
        alertSuccess.classList.remove('animation-alert');
    
        return randomWord;
    }

    // Method to get the chain of underlines (_) to print on screen
    turnWordInUnderlines(){
        const reg = /[A-Z]/g;
        let selectedWord = this.getWord();
        let underlines = selectedWord.replace(reg, "_ ");

        return underlines;
    }

    // Method to compare the selected letter with a every letter of the word
    compareLetters(letter){
        // Get and turn into array the letter in the HTML element p
        let underlinesArray = printWord.innerHTML.split(' ');

        // To compare and put the letter in the location correct
        for(let i = 0; i < this.word.length; i++){
            if (this.word[i] == letter){
                underlinesArray[i] = letter;

                this.guessTheLetter = true;
                this.numberOfCorrectAnswers += 1;
            }
        }

        // If player not guess the letter, drawing a hangman part and count the errors
        if (this.guessTheLetter == false){
            this.drawingHangman();
            this.numberOfBadAnswers += 1;
        }

        // If number of errors is equal to the number of hangman parts, show a alert with the word
        if (this.numberOfBadAnswers == 6){
            // Add the word at the alert
            showWord.innerText = this.word;

            alertDanger.classList.remove('hide-danger-alert');
            // Add animation
            alertDanger.classList.add('animation-alert');

            // Game over
            this.gameOver();

            // Print the score
            this.wrontScore += 1;
            mistakeResults.innerText = this.wrontScore;

        } else{
            // If player guess the letter, show success alert and score
            if (this.numberOfCorrectAnswers == this.word.length){
                alertSuccess.classList.remove('hide-success-alert');
                alertSuccess.classList.add('animation-alert');
                this.gameOver();

                this.successScore += 1;
                successResults.innerText = this.successScore;
            }
        }

        // Turn the array into string
        underlinesArray = underlinesArray.toString();
        // Delete the comas of the string
        underlinesArray = underlinesArray.replace(/,/g, " ");

        // Put the variable in false to the next letter
        this.guessTheLetter = false;

        return underlinesArray;
    }

    // Method to show the hangman
    drawingHangman(){
        hangmanParts[this.partsOfBodyArray[this.hangmanPartsOfBody]].classList.remove('hide-hangman-parts');
        this.hangmanPartsOfBody += 1;
    }

    // Method to lock every control (buttons)  when game over
    gameOver(){
        // To disable the alphabet buttons
        btnLetterAlphabet.forEach((everyLetter, i) => {
            btnLetterAlphabet[i].disabled = true;
        });

        // Enable the buton the select a new word
        btnGetNewWord.disabled = false;
    }

    // Method to restart the game
    gameStart(){
        // Enable the alphabet buttons
        btnLetterAlphabet.forEach((everyLetter, i) => {
            btnLetterAlphabet[i].disabled = false;
        });

        // To disable the buton to select a new word
        btnGetNewWord.disabled = true;

        // Hide the hangman
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
```

Instantiate classes

```javascript
// Read tha txt file
let arrayWords = new Array();
let path = "./assets/words.txt";

// Instantiate the class to read file and get the word
const txtFile = new ReadFile(path);
arrayWords = txtFile.readFile();


const logicGame = new LogicGame(arrayWords);


btnGetNewWord.addEventListener('click', function(event){
    // Get the word become underlines
    let underlines = logicGame.turnWordInUnderlines();

    printWord.innerText = underlines;

    // Game start
    logicGame.gameStart();

});

// Select the laphabet letters to compare with every letter of the word
btnLetterAlphabet.forEach((everyLetter, i) => {
	btnLetterAlphabet[i].addEventListener('click', () => {
		printWord.innerText = logicGame.compareLetters(btnLetterAlphabet[i].id);
        // To disable the button
        btnLetterAlphabet[i].disabled = true;
	})
});
```