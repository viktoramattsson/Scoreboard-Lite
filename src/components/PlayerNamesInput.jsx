import React, { useState } from 'react';

function PlayerNamesInput({ onSubmit }) {
  const [currentNames, setCurrentNames] = useState(['']);

  const handleInputChange = (index, value) => {
    setCurrentNames((prevNames) => {
      const newNames = [...prevNames];
      newNames[index] = value;
      if (index === prevNames.length - 1 && value.trim() !== '') {
        newNames.push('');
      }
      return newNames;
    });
  };

  const handleSubmit = () => {
    const validNames = currentNames.filter((name) => name.trim() !== '');
    if (validNames.length > 0) {
      onSubmit(validNames);
      setCurrentNames(['']);
    }
  };

  return (
    <div className="bg-green-500 p-14">
      <h1>Enter Player Names</h1>

      {currentNames.map((name, index) => (
        <input
          className="my-5"
          key={index}
          type="text"
          placeholder="Enter Player Name"
          value={name}
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
      ))}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default PlayerNamesInput;
