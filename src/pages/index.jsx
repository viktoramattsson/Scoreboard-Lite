import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import db from '../db';
import { FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Feedback from '../components/Feedback.jsx';

const Home = () => {
  const [savedGames, setSavedGames] = useState([]);
  const [showSavedGames, setShowSavedGames] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSavedGames = async () => {
      try {
        const games = await db.games.toArray();
        setSavedGames(games);
      } catch (error) {
        console.error('Failed to fetch games:', error);
      }
    };

    if (showSavedGames) {
      fetchSavedGames();
    }
  }, [showSavedGames]);

  const handleLoadGame = (game) => {
    localStorage.setItem('playerNames', JSON.stringify(game.playerNames));
    localStorage.setItem('scores', JSON.stringify(game.scores));
    localStorage.setItem('currentRound', game.currentRound);
    localStorage.setItem('gameMode', game.gameMode);
    router.push('/playRounds');
  };

  const handleCloseFeedback = () => {
    setShowFeedback(false);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen p-6 bg-gradient-to-tr from-cyan-900 via-cyan-600 to-cyan-200">
      <div className="relative w-full max-w-md p-4 pt-10 bg-gradient-to-r from-blue to-purple-500 border border-gray-500 rounded-xl mt-10 mx-auto">
        <div className="absolute -top-4 left-4 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-900 px-4 py-1 rounded-full shadow-lg">
          <h1 className="text-center text-white font-bold">Scoreboard Lite</h1>
        </div>
        <ul className="mt-6 text-center">
          <li className="mb-4">
            <Link
              href="/playRounds"
              className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-900 p-2 rounded-lg shadow-lg transition-transform duration-300"
            >
              Play Rounds
            </Link>
          </li>
          <li>
            <button
              className="p-2 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white rounded-lg h-16 w-2/3 max-w-sm shadow-2xl transition-transform duration-300 mt-10 mb-4 self-center"
              onClick={() => setShowFeedback(!showFeedback)}
            >
              Feedback
            </button>
          </li>
        </ul>
        <button
          className="p-2 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white rounded-lg h-16 w-2/3 max-w-sm shadow-2xl transition-transform duration-300 mt-10 mb-4 self-center"
          onClick={() => setShowSavedGames(!showSavedGames)}
        >
          Saved Games
        </button>
      </div>
      {showFeedback && <Feedback closeIt={handleCloseFeedback} />}
      {showSavedGames && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 p-6 rounded-lg shadow-lg relative w-4/5 max-w-80 min-h-[50%]">
            <h2 className="text-lg font-bold mb-2">Saved Games</h2>
            <ul>
              {savedGames.map((game) => (
                <li key={game.id} className="mb-1">
                  <div
                    className="bg-green-200 rounded-lg h-10 text-center flex items-center justify-center cursor-pointer"
                    onClick={() => handleLoadGame(game)}
                  >
                    {game.title}
                  </div>
                </li>
              ))}
            </ul>
            <FaTimes
              className="absolute top-2 right-2 text-3xl cursor-pointer text-black"
              onClick={() => setShowSavedGames(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
