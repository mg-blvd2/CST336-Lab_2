var randomNumber = Math.floor(Math.random() * 99) + 1;
var guesses = document.querySelector('#guesses');
var lastResult = document.querySelector('#lastResult');
var lowOrHi = document.querySelector("#lowOrHi");

var guessSubmit = document.querySelector('.guessSubmit');
var guessField = document.querySelector('.guessField');

var guessCount = 1;
var resetButton = document.querySelector('#reset');

var numWins = 0;
var numLosses = 0;
var winLossMessage = document.querySelector('#winLoss')
winLossMessage.innerHTML = "Wins: " + numWins + " Losses: " + numLosses;

//If the person is using the website for the first time, they won't see the win
//loss message.
$("#winLoss").hide();

resetButton.style.display = 'none';

function checkGuess() {
    var userGuess = Number(guessField.value);
    if(guessCount === 1){
        guesses.innerHTML = "Previous guesses: ";
    }
    if(isNaN(userGuess) || userGuess > 99){
        alert("The value entered is not valid.")
    } else {
        guesses.innerHTML += userGuess + ' ';
        if(userGuess === randomNumber){
            lastResult.innerHTML = "Congratulations! You got it right!";
            lastResult.style.backgroundColor = 'green';
            lowOrHi.innerHTML = '';
            numWins++;
            setGameOver();
        } else if (guessCount === 7) {
            lastResult.innerHTML = "Sorry, you lost!";
            numLosses++;
            setGameOver();
        } else {
            lastResult.innerHTML = "Wrong!";
            lastResult.style.backgroundColor = 'red';
            if(userGuess < randomNumber){
                lowOrHi.innerHTML = "Last guess was too low!";
            } else if(userGuess > randomNumber) {
                lowOrHi.innerHTML = "Last guess was too high!";
            }
        }
    
        guessCount++;
        guessField.value = '';
        guessField.focus();
    }
}

guessSubmit.addEventListener('click', checkGuess);

document.getElementById("numberToGuess").innerHTML = randomNumber;

function setGameOver() {
    //guessField.disabled = true;
    //guessSubmit.disabled = true;
    //Instead of disabling the fields, I'm going to hide them from view so the user
    //Doesn't try typing and submitting another guess.
    $(".guessSubmit").hide();
    $(".guessField").hide();
    resetButton.style.display = 'inline';
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    guessCount = 1;
    
    var resetParas = document.querySelectorAll('.resultParas p');
    for(var i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }
    winLossMessage.innerHTML = "Wins: " + numWins + " Losses: " + numLosses;
    resetButton.style.display = 'none';
    
    //guessField.disabled = false;
    //guessSubmit.disabled = false;
    //When the game is reset, I will show the fields for typing and submitting again.
    $(".guessSubmit").show();
    $(".guessField").show();
    
    //When the game is started for a second time, the user will now see their 
    //win loss message.
    $("#winLoss").show();
    
    guessField.value = '';
    guessField.focus();
    
    lastResult.style.backgroundColor = 'white';
    
    randomNumber = Math.floor(Math.random() * 99) + 1;
}