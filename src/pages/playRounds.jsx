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
  const [isLoaded, setIsLoaded] = useState(false); // Track if localStorage data is loaded
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPlayerNames = localStorage.getItem('playerNames');
      const savedScores = localStorage.getItem('scores');
      const savedCurrentRound = localStorage.getItem('currentRound');
      const savedGameMode = localStorage.getItem('gameMode');

      console.log('Loaded player names from localStorage:', savedPlayerNames);
      console.log('Loaded scores from localStorage:', savedScores);
      console.log('Loaded current round from localStorage:', savedCurrentRound);
      console.log('Loaded game mode from localStorage:', savedGameMode);

      if (savedPlayerNames) {
        const parsedNames = JSON.parse(savedPlayerNames);
        console.log('Parsed player names:', parsedNames);
        if (parsedNames.length > 0) {
          setPlayerNames(parsedNames);
          setScores(parsedNames.map(() => [])); // Initialize scores array
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
      console.log('Saved scores to localStorage:', scores);
    }
  }, [scores, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('currentRound', JSON.stringify(currentRound));
      console.log('Saved current round to localStorage:', currentRound);
    }
  }, [currentRound, isLoaded]);

  const handlePlayerNamesSubmit = (names, gameMode) => {
    setPlayerNames(names);
    setScores(names.map(() => [])); // Initialize scores array
    setGameMode(gameMode);
    localStorage.setItem('playerNames', JSON.stringify(names)); // Save to localStorage
    localStorage.setItem('gameMode', gameMode); // Save game mode to localStorage
    console.log('Saved player names to localStorage:', names);
    console.log('Saved game mode to localStorage:', gameMode);
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

  if (!isLoaded) {
    // Render nothing or a loading spinner while loading data from localStorage
    return null;
  }

  const totalScores = calculateTotalScores();

  if (playerNames.length > 0) {
    return (
      <div className="p-6">
        <div className="flex space-x-10">
          <button
            className="p-2 bg-blue-500 text-white rounded-lg"
            onClick={handlePreviousRound}
            disabled={currentRound === 1}
          >
            Previous
          </button>
          <h1>Round {currentRound}</h1>
          <button
            className="p-2 bg-blue-500 text-white rounded-lg"
            onClick={handleNextRound}
            disabled={!canProceedToNextRound()}
          >
            Next
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Player Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {playerNames.map((name, index) => (
              <tr key={index}>
                <td>{name}</td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter Score"
                    value={
                      scores[index] && scores[index][currentRound - 1]
                        ? scores[index][currentRound - 1]
                        : ''
                    }
                    onChange={(e) => handleScoreChange(index, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="p-2 bg-blue-500 text-white rounded-lg mt-4"
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
          className="p-2 bg-green-500 text-white rounded-lg mt-4"
          onClick={() => setShowSaveModal(true)}
        >
          Save Game
        </button>
        <button
          className="p-2 bg-red-500 text-white rounded-lg mt-4"
          onClick={handleEndGame}
        >
          End game
        </button>

        {showSaveModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Save Game</h2>
              <input
                type="text"
                placeholder="Game Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-4 border rounded-lg"
              />
              <button
                className="p-2 bg-blue-500 text-white rounded-lg"
                onClick={handleSaveGame}
              >
                Save
              </button>
              <button
                className="p-2 bg-gray-500 text-white rounded-lg mt-4"
                onClick={() => setShowSaveModal(false)}
              >
                Cancel
              </button>
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
