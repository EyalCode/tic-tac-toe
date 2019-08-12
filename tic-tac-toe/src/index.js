import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button
      className="square"
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
}

function Button(props) {
  return (
    <div>
      <button
        className="button"
        onClick={() => props.onClick()}
      >
        {'Turn: ' + props.buttonNumber}
      </button>
    </div>
  );
}


class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }



  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      turnNumber: 1
    }
  }

  renderButton(i) {
    return (
      <li key={i}>
        <Button
          buttonNumber={i}
          onClick={() => this.buttonClick(i)}
        />
      </li>
    );
  }

  buttonClick(i) {
    this.setState({
      turnNumber: i,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.turnNumber);
    const current = history[history.length-1];
    const squares = current.squares.slice();
    //do ONLY IF this square is empty.
    if (squares[i] === null && !calculateWinner(squares)) {
      squares[i] = (this.state.turnNumber%2 === 0) ? 'O' : 'X';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        turnNumber: (this.state.turnNumber + 1)
      });
    }
  }

  render() {
    const turnNumber = this.state.turnNumber;
    const history = this.state.history;
    const current = history[turnNumber -1];
    const winner = calculateWinner(current.squares);

    let status;

    const list = history.map((step, move) => {
      return(this.renderButton(move));
    });


    //console.log(list);

    if (winner) {
      status = 'The Winner is ' + winner;
    }
    else {
      status = 'Next player: ' + ((turnNumber%2 === 0) ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{list}</ol>
        </div>
      </div>
    );
  }
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
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
