import React, { useEffect } from 'react';
import { GoShare } from 'react-icons/go';

const InstallModal = ({ ios, notSupported, show, onClose, onInstall }) => {
  useEffect(() => {
    if (show) {
      console.log('Showing installation modal');
    }
  }, [show]);

  return (
    <>
      {show && !notSupported && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="relative w-5/6 max-w-md p-6 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 border border-gray-500 rounded-xl shadow-lg">
            <h2 className="text-center text-white font-bold mb-6">
              Install the App
            </h2>
            <p className="text-white mb-8">
              Please install for a better experience, or close to continue in
              browser
            </p>
            <div className="flex justify-between h-12">
              <button
                className="w-1/3 p-2 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white rounded-lg shadow-lg transition-transform duration-300"
                onClick={onInstall}
              >
                Install
              </button>
              <button
                className="w-1/3 p-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-lg shadow-lg transition-transform duration-300"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {show && notSupported && !ios && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="relative w-5/6 max-w-md p-6 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 border border-gray-500 rounded-xl shadow-lg">
            <h3 className="text-center text-white mb-6">
              Please install for a better experience
            </h3>
            <p className="text-white mb-8">
              Click on this symbol{' '}
              <span className="inline-flex items-center text-xl align-middle">
                <GoShare />
              </span>{' '}
              and scroll down to <i>Add to home screen</i>
            </p>
            <p className="mb-8 text-white">
              Or close to close to continue in browser
            </p>
            <div className="flex justify-center h-12">
              <button
                className="w-1/3 p-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-lg shadow-lg transition-transform duration-300"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {show && notSupported && ios && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="relative w-5/6 max-w-md p-6 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 border border-gray-500 rounded-xl shadow-lg">
            <h3 className="text-center text-white mb-6">
              Please install for a better experience
            </h3>
            <p className="text-white mb-8">
              Click on this symbol{' '}
              <span className="inline-flex items-center text-xl align-middle">
                <GoShare />
              </span>{' '}
              and scroll down to <i>Add to home screen</i>
            </p>
            <p className="mb-8 text-white">
              Or close to close to continue in browser
            </p>
            <div className="flex justify-center h-12">
              <button
                className="w-1/3 p-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-lg shadow-lg transition-transform duration-300"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallModal;
