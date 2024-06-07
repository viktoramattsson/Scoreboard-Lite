import React from 'react';

const SaveModal = ({ isOpen, onClose, onSave, title, setTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 p-6 rounded-lg shadow-lg relative w-4/5 max-w-80 min-h-52">
        <h2 className="text-lg font-bold mb-4 text-white">Save</h2>
        <input
          type="text"
          placeholder="Enter game name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <p className=" text-white">
          <i>
            Note that saved data will disapear if browser cockies are removed
          </i>
        </p>
        <div className="flex justify-between mt-10 h-12">
          <button
            className="p-2 w-1/3 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white rounded-lg shadow-lg transition-transform duration-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="p-2 w-1/3 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-lg shadow-lg transition-transform duration-300"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveModal;
