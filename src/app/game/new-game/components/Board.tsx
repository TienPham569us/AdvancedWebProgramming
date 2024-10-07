import React from 'react';
import '../styles.css';
import Square from './square';

const Board = ({ width, height, xIsNext, squares, isExistedWinner, isEndGame, isFull, winningLine, onPlay,  }: 
    { width: number, height: number, xIsNext: boolean, 
      squares: Array<string | null>, isExistedWinner: boolean, 
      isEndGame: boolean, isFull: boolean,
      winningLine: Array<number>,
      onPlay: (squares: Array<string | null>, rowIndex: number, colIndex: number) => void}) => {
    
  
    const handleClick = (index: number) => {
     
      if (isFull) {
        return;
      }
  
      if (squares[index]) {   
        return;
      }
  
      if (isEndGame) {
        return;
      }
  
      const nextSquares = squares.slice();
         
      nextSquares[index] = xIsNext ? 'X' : 'O';
      const rowIdx: number = Math.floor(index / width);
      const colIdx: number = index % width;
      onPlay(nextSquares, rowIdx, colIdx);  
      
    };
  
    const renderSquare = (index: number, isHighlight: boolean = false) => (
      <Square value={squares[index]} onSquareClick={() => handleClick(index)} isHighlight={isHighlight} />
    );
  
    let status;
  
    if (isFull) {
      status = isExistedWinner ? `Winner: ${xIsNext ? 'O' : 'X'}` : 'Draw';
    } else {
      status = isExistedWinner ? `Winner: ${xIsNext ? 'O' : 'X'}` : `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
  
    const generateSquares = () => {
      const board = Array.from({ length: height }, (_, row) => {
        const squares = Array.from({ length: width }, (_, col) => {
          const squareIndex = row * width + col;
          return (
            <div key={`${row}-${col}`} className="square">
              {renderSquare(squareIndex, winningLine.includes(squareIndex))}
            </div>
          );
        });
  
        return (
          <div key={row} className="board-row ">
            {squares}
          </div>
        );
      })
  
      return board;
    };
    return (
      <div>
        <div className="status">{status}</div>
        {generateSquares()}
      </div>
    );
  };

export default Board;
