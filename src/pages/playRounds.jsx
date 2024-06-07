import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import PlayerNamesInput from '../components/PlayerNamesInput';
import TotalScores from '../components/TotalScores';
import SaveModal from '../components/SaveModal';
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
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPlayerNames = localStorage.getItem('playerNames');
      const savedScores = localStorage.getItem('scores');
      const savedCurrentRound = localStorage.getItem('currentRound');
      const savedGameMode = localStorage.getItem('gameMode');
      const savedTitle = localStorage.getItem('isPlayingSavedGame');

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

      if (savedTitle) {
        setTitle(JSON.parse(savedTitle));
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
    localStorage.setItem('isPlayingSavedGame', JSON.stringify(''));
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
    localStorage.removeItem('isPlayingSavedGame');
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
    const existingGame = await db.games.where('title').equals(title).first();
    if (existingGame) {
      await db.games.update(existingGame.id, {
        playerNames,
        scores,
        currentRound,
        gameMode,
      });
    } else {
      await db.games.add({
        title,
        playerNames,
        scores,
        currentRound,
        gameMode,
      });
    }
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
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue to-purple-500">
        <div className="max-w-md m-auto min-h-[500px] px-4 w-full flex flex-col">
          <div className="flex justify-between h-16">
            <button
              className="w-1/4 h-full p-2 bg-gradient-to-r from-green-500 via-green-600 to-green-900 text-white rounded-lg shadow-lg transition-transform duration-300 mx-1 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
              onClick={handlePreviousRound}
              disabled={currentRound === 1}
            >
              Previous
            </button>
            <h1 className="text-center font-gluten text-white font-bold mx-1 text-3xl flex-grow h-full flex items-center justify-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
              Round {currentRound}
            </h1>
            <button
              className="w-1/4 h-full p-2 bg-gradient-to-r from-green-500 via-green-600 to-green-900 text-white rounded-lg shadow-lg transition-transform duration-300 mx-1 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
              onClick={handleNextRound}
              disabled={!canProceedToNextRound()}
            >
              Next
            </button>
          </div>
          <div
            className="flex-grow flex items-center justify-center mt-4"
            style={{ height: 'calc(100% - 64px - 64px - 32px)' }}
          >
            <div className="w-full flex flex-col justify-between">
              <table className="w-3/4 m-auto">
                <tbody
                  className="flex flex-col justify-between"
                  style={{ height: '100%' }}
                >
                  {playerNames.map((name, index) => (
                    <tr
                      key={index}
                      className="text-white mb-4 flex justify-between items-center"
                    >
                      <td className="py-2 text-left text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
                        {name}
                      </td>

                      <td className="text-center p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
                        <motion.div
                          animate={{
                            scale:
                              scores[index] && scores[index][currentRound - 1]
                                ? 1
                                : focusedInput === index
                                ? 1
                                : [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 1,
                            repeat:
                              scores[index] && scores[index][currentRound - 1]
                                ? 0
                                : focusedInput === index
                                ? 0
                                : Infinity,
                            repeatType: 'loop',
                          }}
                        >
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
                            onFocus={() => setFocusedInput(index)}
                            onBlur={() => setFocusedInput(null)}
                            onChange={(e) =>
                              handleScoreChange(index, e.target.value)
                            }
                            onKeyPress={handleKeyPress}
                            className={`w-20 h-14 rounded-full bg-white text-black focus:outline-none shadow-lg transition-all duration-300 ease-in-out text-center ${
                              scores[index] && scores[index][currentRound - 1]
                                ? 'border-4 border-green-500'
                                : 'focus:ring-4 focus:ring-red-500'
                            }`}
                          />
                        </motion.div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-between mt-4 h-16">
            <button
              className="p-2 w-1/4 h-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white rounded-lg shadow-2xl transition-transform duration-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
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
              className="p-2 w-1/4 h-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white rounded-lg shadow-2xl transition-transform duration-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
              onClick={() => setShowSaveModal(true)}
            >
              Save Game
            </button>
            <button
              className="p-2 w-1/4 h-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-lg shadow-2xl transition-transform duration-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
              onClick={handleEndGame}
            >
              End game
            </button>
          </div>

          <SaveModal
            isOpen={showSaveModal}
            onClose={() => setShowSaveModal(false)}
            onSave={handleSaveGame}
            title={title}
            setTitle={setTitle}
          />
        </div>
      </div>
    );
  } else {
    return <PlayerNamesInput onSubmit={handlePlayerNamesSubmit} />;
  }
}

export default PlayRounds;
