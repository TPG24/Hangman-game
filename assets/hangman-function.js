//DOM
var $hangmanGameButton = document.getElementById('hangman-game-button');

var $placeholders = document.getElementById('place-holders');

var $guessedLetter = document.getElementById('guessed-letter');

var $guessesLeft = document.getElementById('guess-left');

var $wins = document.getElementById('wins');

var $losses = document.getElementById('losses');



//variable for game

var wordBank = ['Shifty Shafts', 'Haunted Hills', 'Loot Lake', 'Tilted Towers', 'Salty Springs', 'Fatal Fields', 'Snobby Shores',
'Retail Row', 'Tomato Town', 'Battle Royal', 'Anarchy Acres', 'Lonely Lodge', 'Moisty Mire', 'Flush Factory', 'Greasy Grove'];

var wins = 0;

var losses = 0;

var gameRunning = false;

var guessesLeft = 7;

var pickedWord = '';

var pickedWordPlaceholderArr = [];

var guessedLetterBank = [];

var incorrectLetterBank = [];

//new game
function newGame(){
    gameRunning = true;
    guessesLeft = 7;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];

    //new word
    pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    //placeholders
    for (var i = 0; i < pickedWord.length; i++){
        if (pickedWord[i] === ' '){
            pickedWordPlaceholderArr.push(' ');
        } else {
            pickedWordPlaceholderArr.push('_');
        }
    }

    //DOM INFO
    $guessesLeft.textContent = guessesLeft;
    $placeholders.textContent = pickedWordPlaceholderArr.join('');
    $guessedLetter.textContent = incorrectLetterBank;
}

//guess letter
function letterGuess(letter){
    console.log(letter);

    if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1){
        guessedLetterBank.push(letter);
        //Guessed letter in picked word
        for (var i = 0; i < pickedWord.length; i++) {
            if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                pickedWordPlaceholderArr[i] = pickedWord[i];
            }
        }

        $placeholders.textContent = pickedWordPlaceholderArr.join('');
        checkIncorrect(letter);

    }
    else {
        if (!gameRunning){
            alert("Start Conquering the Fort!");
        } else {
            alert ("You have guessed that letter, try a new letter!");
        }
    }
}

//check incorrect letter
function checkIncorrect(letter) {
    if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 &&
        pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1) {
        guessesLeft--;
        incorrectLetterBank.push(letter);
        $guessedLetter.textContent = incorrectLetterBank.join(' ');
        $guessesLeft.textContent = guessesLeft;
    }
    checkLoss();
}

//if lost
function checkLoss() {
    if (guessesLeft === 0) {
        losses++;
        gameRunning = false;
        $losses.textContent = losses;
        $placeholders.textContent = pickedWord;
        alert ("You lose! Start Over by clicking the 'Conquering the Fort!' Button")
    }
    checkWin();
}

//if win
function checkWin () {
    if (pickedWord.toLowerCase() === pickedWordPlaceholderArr.join('').toLowerCase())
    {
        wins++;
        gameRunning = false;
        $wins.textContent = wins;
        alert ("You WIN! Click the 'Conquering the Fort' Button to play again!")
    }
}

//event listener to game button
$hangmanGameButton.addEventListener('click', newGame);

//onkeyup
document.onkeyup = function(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }
};