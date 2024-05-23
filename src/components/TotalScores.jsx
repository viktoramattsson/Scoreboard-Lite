import React, { useState } from 'react';
import PrimaryButton from './PrimaryButton';

function TotalScores({ playerNames, totalScores, onClose, gameMode }) {
  // Kombinera spelarnamn och deras totala poäng i en array
  const playersWithScores = playerNames.map((name, index) => ({
    name,
    score: totalScores[index],
  }));

  // Sortera arrayen baserat på gameMode
  playersWithScores.sort((a, b) => {
    if (gameMode === 'highest') {
      return b.score - a.score; // Högst poäng först
    } else {
      return a.score - b.score; // Lägst poäng först
    }
  });

  // Reverse the sorted array to start revealing from the last position
  const reversedPlayersWithScores = [...playersWithScores].reverse();

  const [revealCount, setRevealCount] = useState(0);

  const handleReveal = () => {
    if (revealCount < reversedPlayersWithScores.length) {
      setRevealCount(revealCount + 1);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-purple-800 via-blue-700 to-indigo-900 bg-opacity-90 p-10 z-50"
      onClick={handleReveal}
    >
      <div
        className="relative w-full max-w-md p-8 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 border border-purple-900 rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
        onClick={(e) => e.stopPropagation()} // Prevents triggering reveal when clicking inside the modal
      >
        <div className="absolute -top-4 left-4 bg-gradient-to-r from-purple-800 via-blue-700 to-indigo-900 px-3 py-1 rounded-full shadow-lg">
          <h2 className="text-center text-white font-bold">Total Scores</h2>
        </div>
        <div className="mb-4 mt-6 text-center">
          {revealCount === 0 ? (
            <p className="text-white text-lg">Tap to reveal results</p>
          ) : (
            <ul>
              {revealCount > 0 &&
                reversedPlayersWithScores
                  .slice(0, revealCount)
                  .reverse()
                  .map((player, index) => (
                    <li
                      key={index}
                      className="mb-2 p-2 bg-gradient-to-r from-white to-gray-300 rounded-lg text-black shadow-lg transform hover:scale-105 transition-transform duration-300"
                    >
                      <span className="font-bold text-lg">
                        {playerNames.length - (revealCount - 1 - index)}.
                      </span>{' '}
                      {player.name}: {player.score}
                    </li>
                  ))}
            </ul>
          )}
        </div>
        <PrimaryButton text="Close" onClick={onClose} className="mt-2" />
      </div>
    </div>
  );
}

export default TotalScores;
