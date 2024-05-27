import React, { useState } from 'react';

function TotalScores({ playerNames, totalScores, onClose, gameMode }) {
  const playersWithScores = playerNames.map((name, index) => ({
    name,
    score: totalScores[index],
  }));

  playersWithScores.sort((a, b) => {
    if (gameMode === 'highest') {
      return b.score - a.score;
    } else {
      return a.score - b.score;
    }
  });

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
      <div className="relative w-full h-4/5 max-w-md p-8 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 border border-purple-900 rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
        <div className="absolute -top-4 left-4 bg-gradient-to-r from-purple-800 via-blue-700 to-indigo-900 px-4 py-1 rounded-full shadow-lg">
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
                    <li key={index} className=" text-black ">
                      <span className="font-bold text-lg">
                        {playerNames.length - (revealCount - 1 - index)}.
                      </span>{' '}
                      {player.name}: {player.score}p
                    </li>
                  ))}
            </ul>
          )}
        </div>
        <button
          className="p-2 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white rounded-lg shadow-2xl transition-transform duration-300 mt-2"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default TotalScores;
