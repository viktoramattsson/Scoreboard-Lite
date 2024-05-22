import React from 'react';

function PrimaryButton({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
}

export default PrimaryButton;
