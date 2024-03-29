const input = document.querySelector('#input');
const letters = document.querySelectorAll('.letter');
const cityNames = ['raleigh', 'boulder', 'seattle', 'providence', 'poughkeepsie', 'kihei', 'phoenix', 'milwaukee', 'vancouver', 'mobile', 'honolulu', 'fairbanks', 'charlotte', 'yonkers', 'burlington', 'hartford', 'morgantown', 'birmingham', 'chicago', 'dallas', 'asheville', 'baltimore', 'miami', 'havana', 'amarillo', 'albuquerque', 'denver', 'kingston', 'madison', 'helena', 'kissimmee', 'lincoln', 'schenectady', 'rochester', 'minneapolis', 'bismarck', 'spokane', 'tuscon', 'newark', 'montreal', 'augusta', 'tijuana', 'guadalajara', 'anchorage', 'cheyenne', 'bozeman', 'boise', 'tacoma', 'missoula', 'fresno', 'wichita']

let answer = "";
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
const reset = document.querySelector('#reset');

function shuffleCity() {
  let index = Math.floor(Math.random() * cityNames.length)

  answer = cityNames[index];
  console.log(cityNames)
  cityNames.splice(index, 1);
  console.log(cityNames)
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    updateKeyboardUI(chosenLetter, "green")
    playerWins();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    updateKeyboardUI(chosenLetter, "red")
    playerLoses();
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateKeyboardUI(chosenLetter, color) {
  letters.forEach((letterDiv) => {
    if (letterDiv.dataset.letter.toLowerCase() === chosenLetter.toLowerCase()) {
      letterDiv.style.backgroundColor = color
    }
  })
}

function resetBoardUI(color) {
  letters.forEach((letterDiv) => {
      letterDiv.style.backgroundColor = color
  })
}
 
function updateMistakes() {
  document.getElementById("mistakes").innerHTML = mistakes;
}

function playerWins() {
  if (wordStatus === answer) {
    document.getElementById('message').innerHTML = 'You guessed it! 🎉';
    document.getElementById('keyboard').style.display = "none"
  }
}

function playerLoses() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The city was ' + answer + '.';
    document.getElementById('keyboard').style.display = "none"
    document.getElementById('message').innerHTML = "Better luck next time! 🤞";
  }
}

reset.addEventListener("click", resetButton)

function resetButton() {
  mistakes = 0
  guessed = [];

  shuffleCity();
  guessedWord();
  updateMistakes();
  resetBoardUI("yellow")
  document.getElementById('keyboard').style.display = "block";
  document.getElementById('message').innerHTML = "";
}

shuffleCity();
guessedWord();
resetBoardUI();


let handleKeyDown = (e) => {

  let press = e.key
  handleGuess(press)
  
  for (let i = 0; i < letters.length; i++) {
    if (press === letters[i].dataset.letter) {
      letters[i].classList.add('active');
    }
  }
}

function keydownColor() {
  letters.style.backgroundColor = "red";
}

let handleKeyUp = (e) => {

  let press = e.key

  for (let i = 0; i < letters.length; i++) {
    if (press === letters[i].dataset.letter) {
      letters[i].classList.remove('active');
    }
    input.value = ""
  }
}

input.addEventListener('keydown', handleKeyDown);
input.addEventListener('keyup', handleKeyUp);