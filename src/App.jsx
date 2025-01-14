import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import { useState } from 'react';
import Log from './components/Log.jsx';
import {WINNING_COMBINATIONS} from './winning-combinations.js'
import GameOver from './components/GameOver.jsx';

const initialGameBoard = [
  [null, null,null],
  [null, null,null],
  [null, null,null]
]

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';
  //let b =  initialGameBoard;
      
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  //const [hasWinner, setHasWinner] = useState(false);
  //const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);

  //let gameBoard = initialGameBoard;
  let gameBoard = [...initialGameBoard.map(array=> [...array])];

  for (const turn of gameTurns){
      const {square, player} = turn;
      const {row, col } = square;

      gameBoard[row][col] = player;
  }
      let winner = null;

    for(const combination of WINNING_COMBINATIONS){
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

      if (firstSquareSymbol && 
        secondSquareSymbol === firstSquareSymbol && 
        thirdSquareSymbol === firstSquareSymbol
      ){ 
        winner = firstSquareSymbol;
      }
    }

    function handleRestart(){
      setGameTurns([]);

    }





const hasDraw = gameTurns.length === 9 && !winner;



 
    //const activePlayer = deriveActivePlayer(gameTurns);

    function handleSelectSquare(rowIndex, colIndex){

    //setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O':'X'); 

    setGameTurns(prevTurns => {
      //let currentPlayer = deriveActivePlayer(prevTurns);
      //let currentPlayer = 'X';
      const currentPlayer = deriveActivePlayer(prevTurns);
     
      if(prevTurns.length > 0 && prevTurns[0].player === 'X'){
        //currentPlayer = 'O';
      }

      const updatedTurns = [
        {square: { row: rowIndex, col: colIndex }, player: currentPlayer} ,
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  return(
    <main>
          <div id="game-container">

          <ol id="players" className='highlight-player'>
            <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
            <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>

        {winner && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
        </div>
        <Log turns={gameTurns}/>
    </main>
  )
}



export default App
