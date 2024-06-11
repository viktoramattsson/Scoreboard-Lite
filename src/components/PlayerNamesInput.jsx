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
    <div className="flex flex-col justify-between min-h-screen p-6 pt-10 bg-gradient-to-tr from-cyan-900 via-cyan-600 to-cyan-200 overflow-auto">
      <FaTimes
        className="absolute top-6 right-6 text-3xl text-white cursor-pointer drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
        onClick={handleCancel}
      />
      <div className="relative w-full max-w-md p-4 pt-10 bg-gradient-to-r from-blue to-purple-500 border border-gray-500 rounded-xl mt-10 mx-auto drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
        <div className=" drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] absolute -top-4 left-4 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-900 px-4 py-1 rounded-full shadow-lg">
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
                className="w-full p-2 rounded-lg bg-white text-black focus:outline-none focus:ring-4 focus:ring-red-500 shadow-lg transition-all duration-300 ease-in-out drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
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
            className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] text-3xl mt-4 text-white cursor-pointer transition-colors duration-300"
            onClick={handleAddField}
          />
        </div>
      </div>
      <div className="relative w-full max-w-md p-4 pt-10 bg-gradient-to-r from-blue to-purple-500 border border-gray-500 rounded-xl mt-10 mx-auto drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
        <div className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] absolute -top-4 left-4 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-900 px-3 py-1 rounded-full shadow-lg">
          <h2 className="text-white font-bold">Game mode</h2>
        </div>
        <div className="flex flex-col mt-2">
          <button
            className={`p-2 mb-4 rounded-lg text-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] transition-transform duration-300 ${
              selectedGameMode === 'highest'
                ? 'bg-gradient-to-r from-green-500 via-green-600 to-green-900 text-white'
                : 'bg-gradient-to-r from-purple-600 via-purple-600 to-purple-800 text-white'
            }`}
            onClick={() => handleGameModeChange('highest')}
          >
            Highest Score Wins
          </button>
          <button
            className={`p-2 mb-4 rounded-lg text-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] transition-transform duration-300 ${
              selectedGameMode === 'lowest'
                ? 'bg-gradient-to-r from-green-500 via-green-600 to-green-900 text-white'
                : 'bg-gradient-to-r from-purple-600 via-purple-600 to-purple-800 text-white'
            }`}
            onClick={() => handleGameModeChange('lowest')}
          >
            Lowest Score Wins
          </button>
          <button
            className={`p-2 rounded-lg text-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] transition-transform duration-300 ${
              selectedGameMode === 'firstTo'
                ? 'bg-gradient-to-r from-green-500 via-green-600 to-green-900 text-white'
                : 'bg-gradient-to-r from-purple-600 via-purple-600 to-purple-800 text-white'
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="flex flex-col bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-900 py-10 rounded-lg shadow-2xl relative max-w-md mx-10 px-14 justify-center">
            <FaTimes
              className="absolute top-4 right-4 text-3xl text-white cursor-pointer"
              onClick={handleXModalClose}
            />
            <h2 className="mb-4 text-center text-2xl font-bold text-white">
              Enter Target Score
            </h2>
            <p className="text-center text-white mb-10">
              The player who reaches the target score first wins
            </p>
            <input
              type="text"
              className="text-3xl text-center w-1/2 p-2 mb-10 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 self-center"
              value={targetScore}
              onChange={(e) => setTargetScore(e.target.value)}
            />
            <button
              className={`w-1/2 h-16 ${
                targetScore
                  ? 'bg-gradient-to-r from-green-500 via-green-600 to-green-700'
                  : 'bg-gray-400'
              } text-white rounded-lg shadow-lg transition-transform duration-300 self-center`}
              onClick={handleXModalSubmit}
              disabled={!targetScore}
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
