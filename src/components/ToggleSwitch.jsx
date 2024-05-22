import React from 'react';

function ToggleSwitch({ label, checked, onChange }) {
  return (
    <label className="flex items-center space-x-3">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-6 w-6 text-blue-600"
      />
    </label>
  );
}

export default ToggleSwitch;
