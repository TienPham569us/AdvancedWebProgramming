'use client'

import React, { useEffect, useState } from 'react';
import './styles.css';
import { on } from 'events';
import Square from './components/square';
import Board from './components/Board'; 


export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext: boolean = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  
  const [isReversed, setIsReversed] = useState(false);
  const [moveIndex, setMoveIndex] = useState([Array(2).fill(null)]);

  const [isEndGame, setIsEndGame] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [isExistedWinner, setIsExistedWinner] = useState(false);

  const [winningLine, setWinningLine] = useState(Array(3).fill(-1));

  const width: number = 3;
  const height: number = 3;

  function handlePlay(nextSquares: Array<string | null>, rowIndex: number, colIndex: number) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);

    const nextMoveIndex = [...moveIndex.slice(0, currentMove + 1), [rowIndex, colIndex]];
    setMoveIndex(nextMoveIndex);

    setCurrentMove(nextHistory.length - 1);

    const full = checkIsFull(nextSquares)
    const winner = calculateWinner(nextSquares, width, height) ? true : false;

    setIsFull(full);
    setIsExistedWinner(winner);
    setIsEndGame(full || winner);
    
    if (winner) {
      setWinningLine(calculateWinningLine(nextSquares, width, height));
    }

    if (full && !winner) {
      alert('Draw game!');
    }
  }
  
  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);

    const full = checkIsFull(history[nextMove]);
    const winner = calculateWinner(history[nextMove], width, height) ? true : false;
   
    setIsFull(full);
    setIsExistedWinner(winner);
    setIsEndGame(full || winner);
    
    if (winner) {
      setWinningLine(calculateWinningLine(history[nextMove], width, height));
    } else {
      setWinningLine(Array(3).fill(-1));  
    }
  }
  
  const moves: React.JSX.Element[] = isReversed 
  ? ([...history].reverse()).map((squares, move) => {
    let description;
    const length = history.length - 1;
    if (move != length) {
      description = 'Go to move #' + (length - move) + `: (row, col) = (${moveIndex[length-move][0]}, ${moveIndex[length-move][1]})`;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        {
          ((length-move) === currentMove) 
          ? <p className="current-move">{description}</p>
          : <button className="btn-rollback" onClick={() => jumpTo(length - move)}>{description}</button>
        }
      </li>
    );  
  })
  : (history).map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move + `: (row, col) = (${moveIndex[move][0]}, ${moveIndex[move][1]})`;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        {
          (move === currentMove) 
          ? <p className="current-move">{description}</p>
          : <button className="btn-rollback" onClick={() => jumpTo(move)}>{description}</button>
        }
      </li>
    );
  });

  const reverseMoves = () => {
    setIsReversed(!isReversed);
  } 

  
  return (<>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    
        <div className="game">
          <div className="game-board">
            <Board xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            isExistedWinner={isExistedWinner}
            width={width} height={height}
            isEndGame={isEndGame}
            isFull={isFull} winningLine={winningLine} />
          </div>
          <div className="game-info">
            <button className="btn-sort" onClick={reverseMoves}>Sort Moves</button>
            <ol>{moves}</ol>
          </div>
        </div>
      </main>
    </div>
  </>);
}

const checkIsFull = (squares: Array<string | null>) => { 
  return squares.every((square) => square !== null);
}

// calculate winner
const calculateWinner = (board: Array<string | null>, 
  width: number, height: number): string | null => {
  
  // Check rows
  for (let row = 0; row < height; row++) {
    for (let col = 0; col <= width - 3; col++) {
      const start = row * width + col;
      if (board[start] && board[start] === board[start + 1] && board[start] === board[start + 2]) {
        return board[start];
      }
    }
  }

  // Check columns
  for (let col = 0; col < width; col++) {
    for (let row = 0; row <= height - 3; row++) {
      const start = row * width + col;
      if (board[start] && board[start] === board[start + width] && board[start] === board[start + 2 * width]) {
        return board[start];
      }
    }
  }

  // Check top-left to bottom-right diagonals
  for (let row = 0; row <= height - 3; row++) {
    for (let col = 0; col <= width - 3; col++) {
      const start = row * width + col;
      if (board[start] && board[start] === board[start + width + 1] && board[start] === board[start + 2 * (width + 1)]) {
        return board[start];
      }
    }
  }

// Check top-right to bottom-left diagonals
for (let row = 0; row <= height - 3; row++) {
  for (let col = 2; col < width; col++) {
    const start = row * width + col;
    if (board[start] && board[start] === board[start + width - 1] && board[start] === board[start + 2 * (width - 1)]) {
      return board[start];
    }
  }
}

  // No winner found
  return null;

};

// calculate winning line
const calculateWinningLine = (board: Array<string | null>, 
  width: number, height: number): Array<number> => {
  
  // Check rows
  for (let row = 0; row < height; row++) {
    for (let col = 0; col <= width - 3; col++) {
      const start = row * width + col;
      if (board[start] && board[start] === board[start + 1] && board[start] === board[start + 2]) {
        return [start, start + 1, start + 2];
      }
    }
  }

  // Check columns
  for (let col = 0; col < width; col++) {
    for (let row = 0; row <= height - 3; row++) {
      const start = row * width + col;
      if (board[start] && board[start] === board[start + width] && board[start] === board[start + 2 * width]) {
        return [start, start + width, start + 2 * width];
      }
    }
  }

  // Check top-left to bottom-right diagonals
  for (let row = 0; row <= height - 3; row++) {
    for (let col = 0; col <= width - 3; col++) {
      const start = row * width + col;
      if (board[start] && board[start] === board[start + width + 1] && board[start] === board[start + 2 * (width + 1)]) {
        return [start, start + width + 1, start + 2 * (width + 1)];
      }
    }
  }

  // Check top-right to bottom-left diagonals
  for (let row = 0; row <= height - 3; row++) {
    for (let col = 2; col < width; col++) {
      const start = row * width + col;
      if (board[start] && board[start] === board[start + width - 1] && board[start] === board[start + 2 * (width - 1)]) {
        return [start, start + width - 1, start + 2 * (width - 1)];
      }
    }
  }

  // No winner found
  return Array(3).fill(-1);
};
