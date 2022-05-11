import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        turn: 0,
        squares: Array(9).fill(null),
        xIsNext: true,
        selectedNext: false,
        prevI: -1,
      };
    }

  
    openAdj(i) {
        const squares = this.state.squares;
        if (i === 0 && (!squares[1] || !squares[3] || !squares[4])) return true;
        if (i === 1 && ( squares[6] ||  squares[7] ||  squares[8])) return true;
        if (i === 2 && (!squares[1] || !squares[4] || !squares[5])) return true;
        if (i === 3 && ( squares[2] ||  squares[5] ||  squares[8])) return true;
        if (i === 4) return true;
        if (i === 5 && ( squares[0] ||  squares[3] ||  squares[6])) return true;
        if (i === 6 && (!squares[3] || !squares[4] || !squares[7])) return true;
        if (i === 7 && ( squares[0] ||  squares[1] ||  squares[2])) return true;
        if (i === 8 && (!squares[4] || !squares[5] || !squares[7])) return true;
        return false;        
    }

    validDest(i, j) {
        if ( Math.abs(i - j) === 3 || ( Math.abs(i - j) === 1 && (i + j !== 7 && i + j !== 13))) return true;
        if ( Math.abs(i - j) === 4 || ( Math.abs(i - j) === 2 && (i + j !== 4 && i + j !== 10 && i + j !== 16))) return true;
        return false;

    }

    handleClick(i) {
      const squares = this.state.squares.slice();
      if (calculateWinner(squares)) return;
      if (this.state.turn > 5 && squares[i] == null && this.state.selectedNext === false) return;
      if (this.state.turn < 6 && (calculateWinner(squares) || squares[i])) return;


      if (this.state.turn < 6) {
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            turn: this.state.turn + 1,
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
      }

      else if (squares[i] !== null) {
          if ((this.state.xIsNext === true && squares[i] === 'O') || (this.state.xIsNext === false && squares[i] === 'X'))
            return;
          if (this.state.selectedNext === false && this.openAdj(i)) {
            squares[i] = "'" + squares[i] + "'";
            this.setState({
                prevI: i,
                selectedNext: true,
                squares: squares,
    
            });       
          }
          else if (this.state.selectedNext === true && this.openAdj(i) && i !== this.state.prevI) {
            const mark = Array.from(squares[this.state.prevI]);
            squares[i] = "'" + squares[i] + "'";
            squares[this.state.prevI] = mark[1];
            this.setState({
                prevI: i,
                selectedNext: true,
                squares: squares,
    
            });
          }
      }
      else {
        const mark = Array.from(squares[this.state.prevI]);
        let flag = true;
        if ((squares[4] === 'X' && this.state.xIsNext === true) || (squares[4] === 'O' && this.state.xIsNext === false))
            flag = false;
        squares[i] = mark[1];
        squares[this.state.prevI] = null;
        if (this.validDest(i + 1, this.state.prevI + 1) && (calculateWinner(squares) || (flag))) {
            this.setState({
                prevI: -1,
                selectedNext: false,
                squares: squares,
                xIsNext: !this.state.xIsNext,
            });
        }
        
      }
      
    }
  
    renderSquare(i) {
      return (
        <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
      );
    }
  
    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
  
      return (
        <div>
          <div className="status">{status}</div>
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
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
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
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  
  