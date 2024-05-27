import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PlayerNamesInput from '../components/PlayerNamesInput';
import TotalScores from '../components/TotalScores';
import db from '../db';

function PlayRounds() {
  const [playerNames, setPlayerNames] = useState([]);
  const [scores, setScores] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [showTotalScores, setShowTotalScores] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [title, setTitle] = useState('');
  const [gameMode, setGameMode] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPlayerNames = localStorage.getItem('playerNames');
      const savedScores = localStorage.getItem('scores');
      const savedCurrentRound = localStorage.getItem('currentRound');
      const savedGameMode = localStorage.getItem('gameMode');

      if (savedPlayerNames) {
        const parsedNames = JSON.parse(savedPlayerNames);
        if (parsedNames.length > 0) {
          setPlayerNames(parsedNames);
          setScores(parsedNames.map(() => []));
        }
      }

      if (savedScores) {
        const parsedScores = JSON.parse(savedScores);
        setScores(parsedScores);
      }

      if (savedCurrentRound) {
        setCurrentRound(JSON.parse(savedCurrentRound));
      }

      if (savedGameMode) {
        setGameMode(savedGameMode);
      }

      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('scores', JSON.stringify(scores));
    }
  }, [scores, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('currentRound', JSON.stringify(currentRound));
    }
  }, [currentRound, isLoaded]);

  const handlePlayerNamesSubmit = (names, gameMode) => {
    setPlayerNames(names);
    setScores(names.map(() => []));
    setGameMode(gameMode);
    localStorage.setItem('playerNames', JSON.stringify(names));
    localStorage.setItem('gameMode', gameMode);
  };

  const handleScoreChange = (playerIndex, value) => {
    setScores((prevScores) => {
      const newScores = [...prevScores];
      newScores[playerIndex][currentRound - 1] = value;
      return newScores;
    });
  };

  const handleNextRound = () => {
    if (canProceedToNextRound()) {
      setCurrentRound((prevRound) => prevRound + 1);
    }
  };

  const handlePreviousRound = () => {
    if (currentRound > 1) {
      setCurrentRound((prevRound) => prevRound - 1);
    }
  };

  const handleShowTotalScores = () => {
    setShowTotalScores(true);
  };

  const handleCloseTotalScores = () => {
    setShowTotalScores(false);
  };

  const handleEndGame = () => {
    localStorage.removeItem('playerNames');
    localStorage.removeItem('scores');
    localStorage.removeItem('currentRound');
    localStorage.removeItem('gameMode');
    router.push('/');
  };

  const calculateTotalScores = () => {
    return scores.map((playerScores) =>
      playerScores.reduce((total, score) => total + (parseInt(score) || 0), 0)
    );
  };

  const canProceedToNextRound = () => {
    return playerNames.every(
      (_, index) => scores[index] && scores[index][currentRound - 1]
    );
  };

  const handleSaveGame = async () => {
    await db.games.add({
      title,
      playerNames,
      scores,
      currentRound,
      gameMode,
    });
    setShowSaveModal(false);
  };

  const handleKeyPress = (e) => {
    const charCode = e.charCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  if (!isLoaded) {
    return null;
  }

  const totalScores = calculateTotalScores();

  if (playerNames.length > 0) {
    return (
      <div className="relative min-h-screen p-4 pt-10 bg-gradient-to-r from-blue to-purple-500 border border-gray-500 mx-auto">
        <div className="flex mt-6 h-16 justify-between">
          <button
            className="flex-1 p-2 bg-gradient-to-r from-green-500 via-green-600 to-green-900 text-white rounded-lg shadow-lg transition-transform duration-300 mx-1"
            onClick={handlePreviousRound}
            disabled={currentRound === 1}
          >
            Previous
          </button>
          <h1 className="flex-1 text-center text-white font-bold mx-1">
            Round {currentRound}
          </h1>
          <button
            className="flex-1 p-2 bg-gradient-to-r from-green-500 via-green-600 to-green-900 text-white rounded-lg shadow-lg transition-transform duration-300 mx-1"
            onClick={handleNextRound}
            disabled={!canProceedToNextRound()}
          >
            Next
          </button>
        </div>
        <table className="w-2/3 mt-10 mx-auto">
          <thead>
            <tr>
              <th className="text-white text-left pl-4">Player</th>
              <th className="text-white text-center">Score</th>
            </tr>
          </thead>
          <tbody>
            {playerNames.map((name, index) => (
              <tr key={index} className="text-white mb-4">
                <td className="py-2 text-left pl-4">{name}</td>
                <td className="text-center">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Score"
                    value={
                      scores[index] && scores[index][currentRound - 1]
                        ? scores[index][currentRound - 1]
                        : ''
                    }
                    onChange={(e) => handleScoreChange(index, e.target.value)}
                    onKeyPress={handleKeyPress}
                    className=" my-2 p-2 w-16 h-16 rounded-full bg-white text-black focus:outline-none focus:ring-4 focus:ring-red-500 shadow-lg transition-all duration-300 ease-in-out text-center"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-10 h-20">
          <button
            className="p-2 w-1/4 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white rounded-lg shadow-2xl transition-transform duration-300"
            onClick={handleShowTotalScores}
          >
            Results
          </button>
          {showTotalScores && (
            <TotalScores
              playerNames={playerNames}
              totalScores={totalScores}
              onClose={handleCloseTotalScores}
              gameMode={gameMode}
            />
          )}
          <button
            className="p-2 w-1/4 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white rounded-lg shadow-2xl transition-transform duration-300"
            onClick={() => setShowSaveModal(true)}
          >
            Save Game
          </button>
          <button
            className="p-2 w-1/4 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-lg shadow-2xl transition-transform duration-300"
            onClick={handleEndGame}
          >
            End game
          </button>
        </div>

        {showSaveModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 p-6 rounded-lg shadow-lg relative w-4/5 max-w-80 min-h-[50%]">
              <h2 className="text-lg font-bold mb-4 text-white">Save Game</h2>
              <input
                type="text"
                placeholder="Game Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-4 border rounded-lg"
              />
              <button
                className="p-2 bg-gradient-to-r from-green-500 via-green-600 to-green-900 text-white rounded-lg shadow-lg transition-transform duration-300"
                onClick={handleSaveGame}
              >
                Save
              </button>
              <button
                className="p-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-lg shadow-lg transition-transform duration-300 mt-4"
                onClick={() => setShowSaveModal(false)}
              >
                Cancel
              </button>
              <p>
                <i>
                  Note that saved data will disapear if browser cockies are
                  removed
                </i>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return <PlayerNamesInput onSubmit={handlePlayerNamesSubmit} />;
  }
}

export default PlayRounds;
