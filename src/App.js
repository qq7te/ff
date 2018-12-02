import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Board, Direction} from './Board.js';

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
          <p>
          </p>
            <BoardView board={board}/>
          <p>
            <button onClick={() => this.moveBoard(Direction.up)}>U</button>
              <button onClick={() => this.moveBoard(Direction.down)}>D</button>
              <button onClick={() => this.moveBoard(Direction.left)}>L</button>
              <button onClick={() => this.moveBoard(Direction.right)}>R</button>

          </p>
            {/*<img src={logo} className="App-logo" alt="logo" />*/}
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
