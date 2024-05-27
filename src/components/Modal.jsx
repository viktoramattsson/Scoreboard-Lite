import React from 'react';

const Modal = ({ isOpen, onClose, onSave, title, setTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Save</h2>
        <input
          type="text"
          placeholder="Enter game name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={onSave}
          >
            Save
          </button>
          <p>
            <i>
              Note that saved data will disapear if browser cockies are removed
            </i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
