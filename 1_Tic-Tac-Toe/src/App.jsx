import { useState } from "react";

function Square({ value, onSquareClick, styleName}) {
  if (styleName === undefined) {
    styleName = "square";
  }
  return (
    <button className={styleName} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [win, setWin] = useState(Array(9).fill("square"));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner[0];
    for (let i of winner[1]) {
      win[i] = "square square_win";
    }
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} styleName={win[0]} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} styleName={win[1]} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} styleName={win[2]} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} styleName={win[3]} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} styleName={win[4]} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} styleName={win[5]} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} styleName={win[6]} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} styleName={win[7]} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} styleName={win[8]} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]];
    }
  }
  return null;
}
