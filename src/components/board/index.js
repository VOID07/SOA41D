import React from "react";
import Square from "../square";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      win: false,
      oWins: 0,
      xWins: 0,
      noWinnerCase: false
    };
  }

  setWinner() {
    this.setState({ win: true });
  }

  checkWinner(i, squares) {
    //alert(squares[i]);
    switch (i) {
      case 0:
        if (
          squares[i] === squares[i + 1] &&
          squares[i + 2] === squares[i + 1]
        ) {
          this.setWinner();
        } else if (
          squares[i] === squares[i + 4] &&
          squares[i + 8] === squares[i]
        ) {
          this.setWinner();
        } else if (
          squares[i] === squares[i + 3] &&
          squares[i + 6] === squares[i]
        ) {
          this.setWinner();
        }
        break;
      case 1:
        if (squares[i] === squares[i + 1] && squares[i - 1] === squares[i]) {
          this.setWinner();
        } else if (
          squares[i] === squares[i + 3] &&
          squares[i + 6] === squares[i]
        ) {
          this.setWinner();
        }
        break;
      case 2:
        if (squares[i] === squares[i - 1] && squares[i - 2] === squares[i]) {
          this.setWinner();
        } else if (
          squares[i] === squares[i + 2] &&
          squares[i + 4] === squares[i]
        ) {
          this.setWinner();
        } else if (
          squares[i] === squares[i + 3] &&
          squares[i + 6] === squares[i]
        ) {
          this.setWinner();
        }
        break;
      case 3:
        if (squares[i] === squares[i + 1] && squares[i + 2] === squares[i]) {
          this.setWinner();
        } else if (
          squares[i] === squares[i + 3] &&
          squares[i - 3] === squares[i]
        ) {
          this.setWinner();
        }
        break;
      case 4:
        if (squares[i] === squares[i + 1] && squares[i - 1] === squares[i]) {
          this.setWinner();
        } else if (
          squares[i] === squares[i + 3] &&
          squares[i - 3] === squares[i]
        ) {
          this.setWinner();
        } else if (
          squares[i] === squares[i - 4] &&
          squares[i + 4] === squares[i]
        ) {
          this.setWinner();
        } else if (
          squares[i] === squares[i - 2] &&
          squares[i + 2] === squares[i]
        ) {
          this.setWinner();
        }
        break;
      case 5:
        if (squares[i] === squares[i - 1] && squares[i - 2] === squares[i]) {
          this.setWinner();
        } else if (
          squares[i] === squares[i + 3] &&
          squares[i - 3] === squares[i]
        ) {
          this.setWinner();
        }
        break;
      case 6:
        if (squares[i] === squares[i + 1] && squares[i + 2] === squares[i]) {
          this.setWinner();
        } else if (
          squares[i] === squares[i - 2] &&
          squares[i - 4] === squares[i]
        ) {
          this.setWinner();
        } else if (
          squares[i] === squares[i - 3] &&
          squares[i - 6] === squares[i]
        ) {
          this.setWinner();
        }
        break;
      case 7:
        if (squares[i] === squares[i + 1] && squares[i - 1] === squares[i]) {
          this.setWinner();
        } else if (
          squares[i] === squares[i - 3] &&
          squares[i - 6] === squares[i]
        ) {
          this.setWinner();
        }
        break;
      case 8:
        if (squares[i] === squares[i - 1] && squares[i - 2] === squares[i]) {
          this.setWinner();
        } else if (
          squares[i] === squares[i - 3] &&
          squares[i - 6] === squares[i]
        ) {
          this.setWinner();
        } else if (
          squares[i] === squares[i - 4] &&
          squares[i - 8] === squares[i]
        ) {
          this.setWinner();
        }
        break;
      default:
        break;
    }
  }

  handleClick(i) {
    let squares = this.state.squares.slice();
    this.setState({ noWinnerCase: false });

    if (!squares[i] && !this.state.win) {
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        squares,
        xIsNext: !this.state.xIsNext
      });
      this.checkWinner(i, squares);
    }
    let full = true;
    for (let k = 0; k < 9; k++) {
      full = full && this.state.squares[k];
    }
    this.setState({ noWinnerCase: full });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => {
          this.handleClick(i);
        }}
      />
    );
  }

  drawRestartButton() {
    return <button className="restartButton" onClick={() => {}} />;
  }

  render() {
    //console.log("x next " + this.state.xIsNext);
    let gana = `Gana ${!this.state.xIsNext ? "X" : "O"}`;
    let empate = "Empate, no hay ganador";
    let siguiente = "Siguiente jugador: " + (this.state.xIsNext ? "X" : "O");
    return (
      <div>
        <div className="victoriasX">{`Victorias de X: ${
          this.state.xWins
        }`}</div>
        <div className="victoriasO">{`Victorias de O: ${
          this.state.oWins
        }`}</div>
        <div className="status">
          {this.state.win ? gana : this.state.noWinnerCase ? empate : siguiente}
        </div>
        <div className="row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="Reiniciar">
          {this.state.win || this.state.noWinnerCase
            ? this.drawRestartButton()
            : null}
        </div>
      </div>
    );
  }
}
