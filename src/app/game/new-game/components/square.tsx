import React from 'react';
import '../styles.css';

const Square = ({ value, isHighlight, onSquareClick }:
   { value: string | null, isHighlight: boolean, onSquareClick: () => void }) => {
  return (
    <button className={`square ${isHighlight ? 'highlight' : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;