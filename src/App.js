import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Board} from './Board.js';

import blackhat from './black-hat.png';
import me from './me.jpg';



class TileView extends Component
{
    render() {
        return (
            <div><img id={this.props.tile.id} src={"reg" === this.props.tile.type ? blackhat : me} width="90" alt={"hi"} /></div>
        )
    }
}


class BoardView extends Component
{
    render = () =>
        <div class={"grid-container"}>
            {this.props.board.tiles.map((row)  =>
                row.map((tile) =>
                    <TileView key={tile.id} tile={tile}/>
                )
            )}
        </div>
}

var board = new Board();


class App extends Component {

    constructor () {
        super();
        this.state = {board : board};
    }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
            <BoardView board={board}/>
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
            <button onClick={() => this.moveBoard("l")}>I like to move it</button>
          </p>
        </header>
      </div>
    );
  }

    moveBoard = (direction) => {
        this.state.board.moveIt(direction);
        this.setState({board: this.state.board});
    };


}

export default App;
