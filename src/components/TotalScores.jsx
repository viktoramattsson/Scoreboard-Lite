import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

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

  const handleReveal = (e) => {
    if (!e.target.closest('#close-button')) {
      if (revealCount < playersWithScores.length - 2) {
        setRevealCount(revealCount + 1);
      } else if (revealCount === playersWithScores.length - 2) {
        setRevealCount(revealCount + 2); // Reveal the last two players at once
      }
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-purple-800 via-blue-700 to-indigo-900 bg-opacity-90 p-10 z-50"
      onClick={handleReveal}
    >
      <motion.div
        className="relative w-full max-w-md p-8 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 border border-purple-900 rounded-xl shadow-2xl"
        initial={{ rotate: 0 }}
        animate={{ rotate: revealCount * 1080 }}
        transition={{ type: 'spring', bounce: 0.5, duration: 1 }}
      >
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
                    <li
                      key={player.name + index}
                      className={`mb-2 p-2 rounded-lg text-black ${
                        index === 0 ? 'text-3xl' : 'text-xl'
                      }`}
                    >
                      <span className="font-bold text-2xl mr-2">
                        {playerNames.length - (revealCount - 1 - index)}.
                      </span>{' '}
                      {player.name}{' '}
                      <span className="text-lg">
                        <i>{player.score}p</i>
                      </span>
                    </li>
                  ))}
            </ul>
          )}
        </div>
        <FaTimes
          id="close-button"
          className="absolute top-4 right-4 text-3xl cursor-pointer text-white"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        />
      </motion.div>
    </div>
  );
}

export default TotalScores;
