import React, { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/router';

function PlayerNamesInput({ onSubmit }) {
  const [currentNames, setCurrentNames] = useState(['', '']);
  const [selectedGameMode, setSelectedGameMode] = useState(null);
  const [duplicateNameWarning, setDuplicateNameWarning] = useState('');
  const [isXModalOpen, setIsXModalOpen] = useState(false);
  const [targetScore, setTargetScore] = useState('');

  const router = useRouter();

  const capitalize = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handleInputChange = (index, value) => {
    const capitalizedValue = capitalize(value);
    setCurrentNames((prevNames) => {
      const newNames = [...prevNames];
      newNames[index] = capitalizedValue;

      if (
        newNames.some((name, idx) => name === capitalizedValue && idx !== index)
      ) {
        setDuplicateNameWarning('Name already registered.');
      } else {
        setDuplicateNameWarning('');
      }

      return newNames;
    });
  };

  const handleAddField = () => {
    setCurrentNames((prevNames) => [...prevNames, '']);
  };

  const handleSubmit = () => {
    const validNames = currentNames
      .filter((name) => name.trim() !== '')
      .map((name) => capitalize(name));

    if (validNames.length > 0 && selectedGameMode && !duplicateNameWarning) {
      localStorage.setItem('playerNames', JSON.stringify(validNames));
      localStorage.setItem('gameMode', selectedGameMode);
      if (selectedGameMode === 'firstTo' && targetScore) {
        localStorage.setItem('targetScore', targetScore);
      }
      console.log('Saved player names to localStorage:', validNames);
      onSubmit(validNames, selectedGameMode);
      setCurrentNames(['', '']);
    }
  };

  const handleGameModeChange = (mode) => {
    setSelectedGameMode(mode);
    if (mode === 'firstTo') {
      setIsXModalOpen(true);
    }
  };

  const handleXModalClose = () => {
    setIsXModalOpen(false);
  };

  const handleXModalSubmit = () => {
    setIsXModalOpen(false);
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col justify-between min-h-screen p-6 bg-gradient-to-tr from-cyan-900 via-cyan-600 to-cyan-200 overflow-auto">
      <div className="relative w-full max-w-md p-4 pt-10 bg-gradient-to-r from-blue to-purple-500 border border-gray-500 rounded-xl mt-10 mx-auto">
        <FaTimes
          className="absolute top-4 right-4 text-2xl text-white cursor-pointer"
          onClick={handleCancel}
        />
        <div className="absolute -top-4 left-4 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-900 px-4 py-1 rounded-full shadow-lg">
          <h1 className="text-center text-white font-bold">Players</h1>
        </div>
        <div
          className={`grid gap-4 ${
            currentNames.length > 4 ? 'grid-cols-2' : 'grid-cols-1'
          }`}
        >
          {currentNames.map((name, index) => (
            <div key={index}>
              <input
                className="w-full p-2 rounded-lg bg-white text-black focus:outline-none focus:ring-4 focus:ring-red-500 shadow-lg transition-all duration-300 ease-in-out"
                type="text"
                placeholder="Enter Player Name"
                value={name}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        {duplicateNameWarning && (
          <div className="text-red-500 text-sm mt-2">
            {duplicateNameWarning}
          </div>
        )}
        <div className="flex justify-center mt-2">
          <FaPlus
            className="text-3xl text-white cursor-pointer transition-colors duration-300"
            onClick={handleAddField}
          />
        </div>
      </div>
      <div className="relative w-full max-w-md p-4 pt-10 bg-gradient-to-r from-blue to-purple-500 border border-gray-500 rounded-xl mt-10 mx-auto">
        <div className="absolute -top-4 left-4 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-900 px-3 py-1 rounded-full shadow-lg">
          <h2 className="text-white font-bold">Game mode</h2>
        </div>
        <div className="flex flex-col mt-2">
          <button
            className={`p-2 mb-2 rounded-lg shadow-lg transition-transform duration-300 ${
              selectedGameMode === 'highest'
                ? 'bg-gradient-to-r from-green-500 via-green-600 to-green-900 text-white'
                : 'bg-white text-black'
            }`}
            onClick={() => handleGameModeChange('highest')}
          >
            Highest Score Wins
          </button>
          <button
            className={`p-2 mb-2 rounded-lg shadow-lg transition-transform duration-300 ${
              selectedGameMode === 'lowest'
                ? 'bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white'
                : 'bg-white text-black'
            }`}
            onClick={() => handleGameModeChange('lowest')}
          >
            Lowest Score Wins
          </button>
          <button
            className={`p-2 rounded-lg shadow-lg transition-transform duration-300 ${
              selectedGameMode === 'firstTo'
                ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white'
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

      {isXModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <FaTimes
              className="absolute top-2 right-2 text-2xl text-black cursor-pointer"
              onClick={handleXModalClose}
            />
            <h2 className="mb-4 text-center text-lg font-bold">
              Enter Target Score
            </h2>
            <input
              type="number"
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
              value={targetScore}
              onChange={(e) => setTargetScore(e.target.value)}
            />
            <button
              className="w-full p-2 bg-blue-500 text-white rounded-lg shadow-lg"
              onClick={handleXModalSubmit}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayerNamesInput;
