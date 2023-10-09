import React, { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [count,setCount] = useState(0);
  const [start,setStart] = useState(false);

  const checkWinner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (state[a] && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }

    return false;
  };

  const isWinner = checkWinner();

  const handleClick = (index) => {
    if (state[index] !== null) {
      return;
    }
    const copyState = [...state];
    copyState[index] = isXTurn ? "X" : "O";
    setState(copyState);
    setIsXTurn(!isXTurn);
    setCount(prev => prev+1);
    // console.log(count)
  };

  const handleReset = () => {
    setCount(0);
    setState(Array(9).fill(null));
  };

  // console.log(isWinner,count)

  return (
    <div className="board-container">
      {
        !start ?
        (
          <div style={{display: 'flex',justifyContent: 'center',alignItems:'center',height: '100vh'}}>
            <button onClick={() => setStart(true)} className="btn">Start Game</button>
          </div>
        ):
        (
          <>
            {isWinner ? (
              <div style={{display: 'flex',justifyContent: 'center',alignItems:'center',height: '100vh'}}>
                <h2 className="heading">{isWinner} won the game{" "}</h2>
                <button onClick={handleReset} className="btn">Play Again</button>
              </div>
            ): !isWinner && count >= 9 ? (
              <div style={{display: 'flex',justifyContent: 'center',alignItems:'center',height: '100vh'}}>
                  <h2 className="heading">Game is Draw {" "}</h2>
                  <button onClick={handleReset} className="btn">Play Again</button>
              </div>
            ): (
              <>
                <h2 className="heading">Player <span className={isXTurn ? "X" : "O"}>{isXTurn ? "X" : "O"}</span> please move</h2>
                <div className="board-row">
                  <Square onClick={() => handleClick(0)} value={state[0]} />
                  <Square onClick={() => handleClick(1)} value={state[1]} />
                  <Square onClick={() => handleClick(2)} value={state[2]} />
                </div>
                <div className="board-row">
                  <Square onClick={() => handleClick(3)} value={state[3]} />
                  <Square onClick={() => handleClick(4)} value={state[4]} />
                  <Square onClick={() => handleClick(5)} value={state[5]} />
                </div>
                <div className="board-row">
                  <Square onClick={() => handleClick(6)} value={state[6]} />
                  <Square onClick={() => handleClick(7)} value={state[7]} />
                  <Square onClick={() => handleClick(8)} value={state[8]} />
                </div>
              </>
            )}
          </>
        )
      }
    </div>
  );
};

export default Board;
