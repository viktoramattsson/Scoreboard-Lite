import React from 'react';
import PrimaryButton from './PrimaryButton';

function TotalScores({ playerNames, totalScores, onClose, highestWin }) {
  // Kombinera spelarnamn och deras totala poäng i en array
  const playersWithScores = playerNames.map((name, index) => ({
    name,
    score: totalScores[index],
  }));

  // Sortera arrayen baserat på highestWin flaggan
  playersWithScores.sort((a, b) => {
    if (highestWin) {
      return b.score - a.score; // Högst poäng först
    } else {
      return a.score - b.score; // Lägst poäng först
    }
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-300 bg-opacity-90 p-10 z-50">
      <div className="bg-white p-12 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Total Scores</h2>
        <ul className="mb-4">
          {playersWithScores.map((player, index) => (
            <li key={index} className="mb-2">
              {player.name}: {player.score}
            </li>
          ))}
        </ul>
        <PrimaryButton text="Close" onClick={onClose} />
      </div>
    </div>
  );
}

export default TotalScores;
