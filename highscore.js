export function saveHighscore(score) {
    // Retrieve the current highest score data from local storage
    const highestScoreData = JSON.parse(localStorage.getItem('highestScoreData')) || { score: 0, player: '' };
  
    // Update the highest score if the current score is higher
    if (score > highestScoreData.score){
      // Prompt the user for their name or use a pre-defined logic
      const playerName = prompt('Congratulations! You achieved a new high score. Enter your name:') || 'Anonymous';
  
      // Update the highest score data
      highestScoreData.score = score;
      highestScoreData.player = playerName;
  
      // Save the updated highest score data to local storage
      localStorage.setItem('highestScoreData', JSON.stringify(highestScoreData));
    }
  }