import React, { useEffect, useState } from 'react';
import '../styles.css';
import { on } from 'events';
import exp from 'constants';

const Square = ({ value, isHighlight, onSquareClick }:
   { value: string | null, isHighlight: boolean, onSquareClick: () => void }) => {
  return (
    <button className={`square ${isHighlight ? 'highlight' : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;