import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

function PlayerNamesInput({ onSubmit }) {
  const [currentNames, setCurrentNames] = useState(['', '']); // Start with two fields
  const [selectedGameMode, setSelectedGameMode] = useState(null);

  const handleInputChange = (index, value) => {
    setCurrentNames((prevNames) => {
      const newNames = [...prevNames];
      newNames[index] = value;
      return newNames;
    });
  };

  const handleAddField = () => {
    setCurrentNames((prevNames) => [...prevNames, '']);
  };

  const handleSubmit = () => {
    const validNames = currentNames.filter((name) => name.trim() !== '');
    if (validNames.length > 0) {
      localStorage.setItem('playerNames', JSON.stringify(validNames)); // Save to localStorage
      console.log('Saved player names to localStorage:', validNames); // Debug log
      onSubmit(validNames);
      setCurrentNames(['', '']); // Reset fields to initial state
    }
  };

  const handleGameModeChange = (mode) => {
    setSelectedGameMode(mode);
  };

  return (
    <div className="bg-green-500 flex flex-col items-center justify-between min-h-screen px-8 pt-20 pb-10">
      <div className="relative w-full max-w-md p-4 pt-10 mb-4 border border-black rounded-lg">
        <div className="absolute -top-3 left-4 bg-green-500 px-2">
          <h1 className="text-center">Players</h1>
        </div>
        {currentNames.map((name, index) => (
          <div key={index} className="mb-6">
            <input
              className="w-full p-2 rounded-lg"
              type="text"
              placeholder="Enter Player Name"
              value={name}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        ))}
        <div className="flex justify-center">
          <FaPlus
            className="text-2xl text-black cursor-pointer"
            onClick={handleAddField}
          />
        </div>
      </div>
      <div className="relative w-full max-w-md p-4 pt-10 mb-4 border border-black rounded-lg">
        <div className="absolute -top-3 left-4 bg-green-500 px-2">
          <h2>Game mode</h2>
        </div>
        <div className="flex flex-col">
          <button
            className={`p-2 mb-2 rounded-lg ${
              selectedGameMode === 'highest'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-black'
            }`}
            onClick={() => handleGameModeChange('highest')}
          >
            Highest Score Wins
          </button>
          <button
            className={`p-2 rounded-lg ${
              selectedGameMode === 'lowest'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-black'
            }`}
            onClick={() => handleGameModeChange('lowest')}
          >
            Lowest Score Wins
          </button>
        </div>
      </div>
      <button
        className="p-2 bg-blue-500 text-white rounded-lg h-20 w-2/3 max-w-sm mb-4"
        onClick={handleSubmit}
      >
        Start!
      </button>
    </div>
  );
}

export default PlayerNamesInput;
