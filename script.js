const wordContainer = document.getElementById('word-container');
const userInput = document.getElementById('user-input');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
let score = 0;
let timeLeft = 90; // 90-second timer
let wordInterval;
// Generate a random word
function generateRandomWord() {
  const words = ['apple', 'banana', 'orange', 'grape', 'kiwi']; // Add more words here
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}
// Create a falling word
function createFallingWord() {
  const word = document.createElement('div');
  word.classList.add('word');
  word.textContent = generateRandomWord();
  const startPosition = Math.random() * (wordContainer.clientWidth - 50);
  word.style.left = `${startPosition}px`;
  word.style.top = '0';
  wordContainer.appendChild(word);
  const animation = word.animate([
    { top: '0' },
    { top: '100%' }
  ], {
    duration: 3000,
    iterations: 1,
    easing: 'linear'
  });
  animation.onfinish = () => {
    word.remove();
  };
}
// Countdown timer function
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
  if (currentWord && userInput.value.trim().toLowerCase() === currentWord.textContent) {
    currentWord.remove();
    score++;
    scoreDisplay.textContent = score;
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