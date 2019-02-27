import React from 'react';
import './index.css';
import Board from '../Board';

function Game() {
    return (
        <div className="game">
            <div className="game__title">Tic Tac Toe Game</div>
            <Board /> 
        </div>
    )
}

export default Game;


