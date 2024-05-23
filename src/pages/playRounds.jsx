import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PlayerNamesInput from '../components/PlayerNamesInput';
import TotalScores from '../components/TotalScores';
import PrimaryButton from '../components/PrimaryButton';

function PlayRounds() {
  const [playerNames, setPlayerNames] = useState([]);
  const [scores, setScores] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [showTotalScores, setShowTotalScores] = useState(false);
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

  if (!isLoaded) {
    // Render nothing or a loading spinner while loading data from localStorage
    return null;
  }

  if (playerNames.length > 0) {
    const totalScores = calculateTotalScores();

    return (
      <div className="p-6">
        <div className="flex space-x-10">
          <button onClick={handlePreviousRound} disabled={currentRound === 1}>
            Previous
          </button>
          <h1>Round {currentRound}</h1>
          <button onClick={handleNextRound} disabled={!canProceedToNextRound()}>
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
        <PrimaryButton text="Results" onClick={handleShowTotalScores} />
        {showTotalScores && (
          <TotalScores
            playerNames={playerNames}
            totalScores={totalScores}
            onClose={handleCloseTotalScores}
            gameMode={gameMode}
          />
        )}
        <PrimaryButton text="End game" onClick={handleEndGame} />
      </div>
    );
  } else {
    return <PlayerNamesInput onSubmit={handlePlayerNamesSubmit} />;
  }
}

export default PlayRounds;
