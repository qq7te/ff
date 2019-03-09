import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Board, Direction} from './Board.js';

import blocked from './blocked.png';
import onesanded from './one-sanded.png';
import blackhat from './black-hat.png';
import me from './me.jpg';
import Player from "./Players";



class TileView extends Component
{
    render() {
        let img = blackhat;
        if (this.props.tile.sand === 1) img  = onesanded;
        if (this.props.tile.sand > 1) img = blocked;
        if (this.props.tile.type !== "reg") img = me;
        return (
            <div class={this.props.hilight ? "hilight" :""}>
                <img id={this.props.tile.id} src={img} width="90" alt={"hi"} />
            </div>
        )
    }
}


class BoardView extends Component
{
    render = () =>
        <div class={"grid-container"}>
            {this.props.board.tiles.map((row)  =>
                row.map((tile) =>
                    <TileView hilight={this.props.highlights.indexOf(tile.id) > -1} key={tile.id} tile={tile}/>
                )
            )}
        </div>
}

var board = new Board();


class App extends Component {

    constructor () {
        super();
        this.state = {board : board};
        this.players = [new Player()];
        this.currentPlayer = 0;
    }


  render() {

      const moves = this.players[this.currentPlayer].canMove(board, board.storm);
      return (
      <div className="App">
        <header className="App-header">
          <p>
          </p>
            <BoardView board={board} highlights={moves}/>
          <p>
              <button onClick={() => this.moveBoard(Direction.up)}>U</button>
              <button onClick={() => this.moveBoard(Direction.down)}>D</button>
              <button onClick={() => this.moveBoard(Direction.left)}>L</button>
              <button onClick={() => this.moveBoard(Direction.right)}>R</button>

          </p>
  <button onClick={() => this.moveTheStorm(pickCard(deck, usedDeck))}>UNLEASH THE DOOM!!!</button>
            {/*<img src={logo} className="App-logo" alt="logo" />*/}
        </header>
      </div>
    );
  }

    moveBoard = (direction) => {
        this.state.board.moveIt(direction);
        this.setState({board: this.state.board});
    };


moveTheStorm = (carta) => {
  for (var i=0, i<carta.magnitude, i++) {
    moveBoard(carta.direction);
  }
}

}


// rishi waz here

export default App;
