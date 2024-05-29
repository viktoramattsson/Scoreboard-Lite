import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import db from '../db';
import { FaTimes, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Feedback from '../components/Feedback.jsx';
import InstallModal from '../components/InstallModal.jsx';

const Home = () => {
  const [savedGames, setSavedGames] = useState([]);
  const [showSavedGames, setShowSavedGames] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [prompt, setPrompt] = useState(null);
  const [browserNotSupported, setBrowserNotSupported] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setPrompt(event);

      // Only show install modal if not in standalone mode
      if (
        !window.matchMedia('(display-mode: standalone)').matches &&
        !window.navigator.standalone
      ) {
        setShowInstallModal(true);
      }
    };

    if ('onbeforeinstallprompt' in window) {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    } else {
      console.log('PWA installation prompt is not supported in this browser.');
      setBrowserNotSupported(true);
      if (!window.navigator.standalone) {
        setShowInstallModal(true);
      }
    }

    return () => {
      if ('onbeforeinstallprompt' in window) {
        window.removeEventListener(
          'beforeinstallprompt',
          handleBeforeInstallPrompt
        );
      }
    };
  }, []);

  useEffect(() => {
    const isIosDevice = /iPhone|iPad|iPod/.test(navigator.userAgent);
    const isStandalone = window.navigator.standalone === true;

    if (isIosDevice) {
      setIsIos(true);
      if (!isStandalone) {
        setBrowserNotSupported(true);
        setShowInstallModal(true);
      }
    }
  }, []);

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

  const handleDeleteGame = async (gameId) => {
    try {
      await db.games.delete(gameId);
      setSavedGames(savedGames.filter((game) => game.id !== gameId));
    } catch (error) {
      console.error('Failed to delete game:', error);
    }
  };

  const handleCloseFeedback = () => {
    setShowFeedback(false);
  };

  const handleInstallClick = () => {
    if (prompt) {
      prompt.prompt();
      prompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setPrompt(null);
        setShowInstallModal(false);
      });
    } else {
      console.warn('PWA installation prompt is not available.');
    }
  };

  const handleCloseInstall = () => {
    setShowInstallModal(false);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen p-6 bg-gradient-to-tr from-cyan-900 via-cyan-600 to-cyan-200">
      <div className="relative w-full max-w-md p-4 bg-gradient-to-r from-blue to-purple-500 border border-gray-500 rounded-xl mt-10 mx-auto">
        <div className="absolute -top-4 left-4 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-900 px-4 py-1 rounded-full shadow-lg">
          <h1 className="text-center text-white font-bold">Scoreboard Lite</h1>
        </div>
        <ul className="my-10 text-center">
          <li>
            <button className="p-2 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white rounded-lg h-16 w-2/3 max-w-sm shadow-2xl mt-10 mb-4 self-center">
              <Link href="/playRounds">Play Rounds</Link>
            </button>
          </li>
          <li>
            <button
              className="p-2 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white rounded-lg h-16 w-2/3 max-w-sm shadow-2xl mt-10 mb-4 self-center"
              onClick={() => setShowSavedGames(!showSavedGames)}
            >
              Saved Games
            </button>
          </li>
          <li>
            <button
              className="p-2 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white rounded-lg h-16 w-2/3 max-w-sm shadow-2xl mt-10 mb-4 self-center"
              onClick={() => setShowFeedback(!showFeedback)}
            >
              Feedback
            </button>
          </li>
        </ul>
      </div>
      {showFeedback && <Feedback closeIt={handleCloseFeedback} />}
      {showSavedGames && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 p-6 rounded-lg shadow-lg relative w-4/5 max-w-80 min-h-[50%]">
            <h2 className="text-lg font-bold mb-6">Saved Games</h2>
            <ul className="w-full flex flex-col items-center">
              {savedGames.map((game) => (
                <li key={game.id} className="flex items-center w-full mb-1">
                  <div
                    className="cursor-pointer flex-grow text-center bg-gradient-to-r from-green-500 via-green-600 to-green-700 rounded-lg h-10 p-2 flex items-center justify-center"
                    onClick={() => handleLoadGame(game)}
                  >
                    {game.title}
                  </div>
                  <FaTrash
                    className="text-red-600 cursor-pointer text-3xl ml-6 flex items-center"
                    onClick={() => handleDeleteGame(game.id)}
                  />
                </li>
              ))}
            </ul>
            <FaTimes
              className="absolute top-4 right-6 text-3xl cursor-pointer text-black"
              onClick={() => setShowSavedGames(false)}
            />
          </div>
        </div>
      )}
      <InstallModal
        ios={isIos}
        notSupported={browserNotSupported}
        show={showInstallModal}
        onInstall={handleInstallClick}
        onClose={handleCloseInstall}
      />
    </div>
  );
};

export default Home;
