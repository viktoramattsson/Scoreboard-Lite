import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import db from '../db';

const Home = () => {
  const [savedGames, setSavedGames] = useState([]);
  const [showSavedGames, setShowSavedGames] = useState(false);

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
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-bold mb-2">Saved Games</h2>
            <ul>
              {savedGames.map((game) => (
                <li key={game.id} className="mb-1">
                  {game.title} spel
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
