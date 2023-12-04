const wordContainer = document.getElementById('word-container');
const userInput = document.getElementById('user-input');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
let score = 0;
let timeLeft = 90; // 90-second timer
let wordInterval;
let correctSound; // Variable to store the audio element for the correct sound

// Generate a random word
async function generateRandomWord() {
  const url = 'https://random-word-api.herokuapp.com/word';
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result[0]; // Assuming the API returns an array of words, and you want the first word
  } catch (error) {
    console.error(error);
  }
}

// Create a falling word
async function createFallingWord() {
  const word = document.createElement('div');
  word.classList.add('word');
  // Use await to get the result from the asynchronous function
  word.textContent = await generateRandomWord();
  const startPosition = Math.random() * (wordContainer.clientWidth - 50);
  word.style.left = `${startPosition}px`;
  word.style.top = '0';
  wordContainer.appendChild(word);
  const animation = word.animate([
    { top: '0' },
    { top: '100%' }
  ], {
    duration: 4000,
    iterations: 1,
    easing: 'linear'
  });
  animation.onfinish = () => {
    word.remove();
  };
}
// Initialize the audio element
correctSound = document.getElementById('correctSound');


function playCorrectSound() {
  if (correctSound) {
    correctSound.currentTime = 0; // Reset the audio to the beginning
    correctSound.play();
  }
}



function countdown() {
  const timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      clearInterval(wordInterval); // Stop word generation
      userInput.disabled = true; // Disable input field
      endGame();
    }
  }, 1000);
}

// Check user input against the displayed word
userInput.addEventListener('input', function() {
  const currentWord = document.querySelector('.word');
  if (currentWord) {
    const enteredWord = userInput.value.trim().toLowerCase();
    const correctWord = currentWord.textContent.toLowerCase();
    if (enteredWord === correctWord) {
      // If the entered word is correct, remove the word and update the score
      currentWord.remove();
      score++;
      scoreDisplay.textContent = score;
      userInput.value = '';
      playCorrectSound(); // Play the sound effect
    }
  }
});

// Additional event listener to clear input when the user misses the word
userInput.addEventListener('change', function() {
  const currentWord = document.querySelector('.word');
  if (currentWord) {
    // Clear the input when the user misses the word
    userInput.value = '';
  }
});

// Function to end the game
function endGame() {
  alert('Game Over! Your score: ' + score);
}

// Start the timer and word generation
countdown();
wordInterval = setInterval(createFallingWord, 2000);
