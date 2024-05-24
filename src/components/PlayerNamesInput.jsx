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
    if (validNames.length > 0 && selectedGameMode) {
      localStorage.setItem('playerNames', JSON.stringify(validNames)); // Save to localStorage
      localStorage.setItem('gameMode', selectedGameMode); // Save game mode to localStorage
      console.log('Saved player names to localStorage:', validNames); // Debug log
      onSubmit(validNames, selectedGameMode);
      setCurrentNames(['', '']); // Reset fields to initial state
    }
  };

  const handleGameModeChange = (mode) => {
    setSelectedGameMode(mode);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen p-6 bg-gradient-to-r from-purple-800 via-blue-700 to-indigo-900">
      <div className="relative w-full max-w-md p-4 pt-10 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 border border-purple-900 rounded-xl shadow-2xl mt-10">
        <div className="absolute -top-4 left-4 bg-gradient-to-r from-purple-800 via-blue-700 to-indigo-900 px-3 py-1 rounded-full shadow-lg">
          <h1 className="text-center text-white font-bold">Players</h1>
        </div>
        {currentNames.map((name, index) => (
          <div key={index} className="mb-4">
            <input
              className="w-full p-2 rounded-lg bg-white text-black focus:outline-none focus:ring-4 focus:ring-pink-500 shadow-lg transition-all duration-300 ease-in-out"
              type="text"
              placeholder="Enter Player Name"
              value={name}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        ))}
        <div className="flex justify-center mt-2">
          <FaPlus
            className="text-3xl text-pink-500 cursor-pointer transition-colors duration-300"
            onClick={handleAddField}
          />
        </div>
      </div>
      <div className="relative w-full max-w-md p-4 pt-10 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 border border-purple-900 rounded-xl shadow-2xl mt-10">
        <div className="absolute -top-4 left-4 bg-gradient-to-r from-purple-800 via-blue-700 to-indigo-900 px-3 py-1 rounded-full shadow-lg">
          <h2 className="text-white font-bold">Game mode</h2>
        </div>
        <div className="flex flex-col mt-2">
          <button
            className={`p-2 mb-2 rounded-lg shadow-lg transition-transform duration-300 ${
              selectedGameMode === 'highest'
                ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white'
                : 'bg-white text-black'
            }`}
            onClick={() => handleGameModeChange('highest')}
          >
            Highest Score Wins
          </button>
          <button
            className={`p-2 mb-2 rounded-lg shadow-lg transition-transform duration-300 ${
              selectedGameMode === 'lowest'
                ? 'bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white'
                : 'bg-white text-black'
            }`}
            onClick={() => handleGameModeChange('lowest')}
          >
            Lowest Score Wins
          </button>
          <button
            className={`p-2 rounded-lg shadow-lg transition-transform duration-300 ${
              selectedGameMode === 'firstTo'
                ? 'bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 text-white'
                : 'bg-white text-black'
            }`}
            onClick={() => handleGameModeChange('firstTo')}
          >
            First to reach X
          </button>
        </div>
      </div>
      <button
        className="p-2 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white rounded-lg h-16 w-2/3 max-w-sm shadow-2xl transition-transform duration-300 mt-10 mb-4 self-center"
        onClick={handleSubmit}
      >
        Start!
      </button>
    </div>
  );
}

export default PlayerNamesInput;
