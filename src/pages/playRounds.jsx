import React, { useState } from 'react';
import PlayerNamesInput from '../components/PlayerNamesInput';
import TotalScores from '../components/TotalScores';
import PrimaryButton from '../components/PrimaryButton';

function PlayRounds() {
  const [playerNames, setPlayerNames] = useState([]);
  const [scores, setScores] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [showTotalScores, setShowTotalScores] = useState(false);
  const [highestWin, setHighestWin] = useState(false);

  const handlePlayerNamesSubmit = (names) => {
    setPlayerNames(names);
    setScores(names.map(() => [])); // Initialize scores array
  };

  const handleScoreChange = (playerIndex, value) => {
    setScores((prevScores) => {
      const newScores = [...prevScores];
      newScores[playerIndex][currentRound - 1] = value;
      return newScores;
    });
  };

  const handleNextRound = () => {
    setCurrentRound((prevRound) => prevRound + 1);
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

  const calculateTotalScores = () => {
    return scores.map((playerScores) =>
      playerScores.reduce((total, score) => total + (parseInt(score) || 0), 0)
    );
  };

  if (playerNames.length > 0) {
    const totalScores = calculateTotalScores();

    return (
      <div className="p-6">
        <div className="flex space-x-10">
          <button onClick={handlePreviousRound} disabled={currentRound === 1}>
            Previous
          </button>
          <h1>Round {currentRound}</h1>
          <button onClick={handleNextRound}>Next</button>
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
                    value={scores[index][currentRound - 1] || ''}
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
            highestWin={highestWin}
          />
        )}
      </div>
    );
  }

  return <PlayerNamesInput onSubmit={handlePlayerNamesSubmit} />;
}

export default PlayRounds;
