import React from 'react';
import Square from '../Square';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
          squares: Array(9).fill(null),
          xIsNext: true
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }

    renderSquare(i) {
        return <Square 
            value={this.state.squares[i]} 
            onClick={() => this.handleClick(i)}
        />;
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        const drawn = isDrawnGame(this.state.squares);
        let status;
        let action;
        if (winner) {
            status = 'Winner is ' + winner;
            action = 'Congratulations!';
        } else if (drawn) {
            status = 'Drawn!';
            action = null;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            action = 'Go!'
        }
            
        return (
          <div className="game__board board">
            <div className="status">{status}</div>
            {action &&  <div className="action">{action}</div>}
            <div className="board__row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board__row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board__row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
        );
    }
}

function calculateWinner(squares) {
    const indexesOfSquares = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < indexesOfSquares.length; i++) {
      const [a, b, c] = indexesOfSquares[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}

function isDrawnGame(squares) {
    return squares.every(el => !!el)
}

export default Board;