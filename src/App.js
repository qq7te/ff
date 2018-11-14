import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BoardView, Tile} from './Board.js';


class App extends Component {

    constructor () {
        super();
        this.state = { board : [
    new Tile(0, "reg"),
    new Tile(1, "reg"),
    new Tile(2, "reg"),
    new Tile(3, "mew"),
    new Tile(4, "reg")
] };
    }

  moveBoard = () => {
      const b = this.state.board.slice();
      const tmp = b[2];
      b[2] = b[3];
      b[3] = tmp;
      this.setState({board: b});
  };


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
            <BoardView board={this.state.board}/>
          hello
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React or else.
          </a>
          <p>
            <button onClick={this.moveBoard}>I like to move it</button>
          </p>
        </header>
      </div>
    );
  }
}

export default App;
