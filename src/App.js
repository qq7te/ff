import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Board, Direction} from './Board.js';

import blocked from './blocked.png';
import onesanded from './one-sanded.png';
import blackhat from './black-hat.png';
import me from './me.jpg';
import Player from "./Players";
//import 'math';


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


    class carta_normale {
        constructor (direction, magnitude) {
            this.direction = direction;
            this.magnitude = magnitude;
        }
    }

    class carta_speciale {
        constructor (tipo) {
            this.tipo = tipo;
        }
    }


 var startDeck = [
            new carta_normale(Direction.up, 1),
            new carta_normale(Direction.up, 2),
            new carta_normale(Direction.up, 3),

            new carta_normale(Direction.down, 1),
            new carta_normale(Direction.down, 2),
            new carta_normale(Direction.down, 3),

            new carta_normale(Direction.left, 1),
            new carta_normale(Direction.left, 2),
            new carta_normale(Direction.left, 3),

            new carta_normale(Direction.right, 1),
            new carta_normale(Direction.right, 2),
            new carta_normale(Direction.right, 3),

           // new carta_speciale("WindPU")
//            new carta_speciale("SunBD")
 ];

    // var usedDeck = [];

    var stormMeter = [2,2,3,3,4,5,6];
    var stormLevel = 0;






    function checkCard (pickedCard){
        if(pickedCard instanceof carta_speciale){
        if(pickedCard.tipo === "WindPU"){
            stormLevel++;
        }
        }
    }

    function pickCard (deck1, deck2){
       console.log("the deck has " + deck1.length + " cards!");
        var index = Math.floor(Math.random() * deck1.length);
       var pickedCard = deck1[index];
       deck2.push(pickedCard);
       deck1.splice(index, 1);
       if(deck1.length === 0){
           deck1.push(...deck2);
           deck2.splice(0, deck2.length);
           console.log("the deck ... now ...  has " + deck1.length + " cards!");
       }
       return pickedCard;
    }

class CardDeck extends Component {
        render = () =>
            <table>
                <tr>
                    <td>{this.props.card.magnitude}</td>
                    <td>{this.props.card.direction}</td>
                </tr>
            </table>
}



class App extends Component {

    constructor () {
        super();
        this.state = {
            board: board,
            usedDeck: [],
            theDeck: startDeck,
            lastCard: {magnitude: 20, direction: "nowhere"}
        };
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
            <CardDeck card={this.state.lastCard}/>
          <p>
              <button onClick={() => this.moveBoard(Direction.up)}>U</button>
              <button onClick={() => this.moveBoard(Direction.down)}>D</button>
              <button onClick={() => this.moveBoard(Direction.left)}>L</button>
              <button onClick={() => this.moveBoard(Direction.right)}>R</button>

          </p>
  <button onClick={() => this.moveTheStorm(pickCard(this.state.theDeck, this.state.usedDeck))}>UNLEASH THE DOOM!!!</button>
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
        this.setState({theDeck: this.state.theDeck, usedDeck: this.state.usedDeck});
        this.setState({lastCard: carta});
        for (var i=0; i<carta.magnitude; i++) {
            this.moveBoard(carta.direction);
        }
    };

}


// rishi waz here

export default App;
