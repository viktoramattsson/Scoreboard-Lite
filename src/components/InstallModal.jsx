import React from 'react';

const InsallModal = ({ show, onClose, onInstall }) => {
  return (
    show && (
      <div className="fixed inset-10 flex items-center justify-center z-50">
        <div className="bg-white  p-4 rounded-lg">
          <h2 className="text-lg mb-2 text-black">Install the App</h2>
          <p>Please install for better experience</p>
          <div>
            <button className="bg-blue" onClick={onInstall}>
              Install
            </button>
            <button className="bg-blue" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default InsallModal;
