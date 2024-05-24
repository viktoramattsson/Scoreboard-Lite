import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import db from '../db';
import { FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/router'; // Importing useRouter from next/router

const Home = () => {
  const [savedGames, setSavedGames] = useState([]);
  const [showSavedGames, setShowSavedGames] = useState(false);
  const router = useRouter(); // Initializing router

  useEffect(() => {
    const fetchSavedGames = async () => {
      try {
        const games = await db.games.toArray();
        console.log('Fetched games:', games); // Debugging log
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

  return (
    <>
      <div>
        <h1>Scoreboard Lite</h1>
      </div>
      <div>
        <ul>
          <li>
            <Link href="/playRounds">Play Rounds</Link>
          </li>
          <li>
            <Link href="/">About Us</Link>
          </li>
        </ul>
        <button
          className="p-2 bg-blue-500 text-white rounded-lg mt-4"
          onClick={() => setShowSavedGames(!showSavedGames)}
        >
          Saved Games
        </button>
        {showSavedGames && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-blue-300 p-6 rounded-lg shadow-lg relative w-4/5 max-w-80 min-h-[50%]">
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
    </>
  );
};

export default Home;
