import React, { Component } from 'react';
import './App.css';
import {Board, Direction} from './Board.js';

import blocked from './blocked.png';
import onesanded from './one-sanded.png';
import blackhat from './black-hat.png';
import me from './me.jpg';
import green from './green.png';
import Player from "./Players";


class TileView extends Component
{
    render() {
        let img = blackhat;
        const tile = this.props.tile;
        if (tile.sand === 1) img  = onesanded;
        if (tile.sand > 1) img = blocked;
        if (tile.type !== "reg") img = me;
        let hasClimber = false;
        for (let player of this.props.players) {
            if (player.position === tile.id) {
                hasClimber = true;
            }
        }
        return (
            <div class={this.props.hilight ? "hilight" :""}>
                <img id={tile.id} src={img} width="90" alt={"hi"} />
                {
                    hasClimber ? (
                        <img className={"pedone"} src={green} width={"90"}/>
                    ) : ('')
                }
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
                    <TileView players={this.props.players} hilight={this.props.highlights.indexOf(tile.id) > -1} key={tile.id} tile={tile}/>
                )
            )}
        </div>
}

var board = new Board();

    var Climber = new Player ("Climber", 1, [], 4, 4);
    var Watercarrier = new Player ("Watercarrier", 1, [], 6, 6);
    var Explorer = new Player ("Explorer", 1, [], 3, 3);
    var Archaeologist = new Player ("Adventurer", 1, [], 4, 4);
    var Navigator = new Player ("Navigator", 1,[], 3,3);
    var Meteorologist = new Player ("Meteorologist",1, [], 3,3);

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

            new carta_speciale("WindPU")
//          new carta_speciale("SunBD")
 ];

var stormMeter = [2,3,4,5,6];
var stormLevel = 0;


    function checkCard (pickedCard){
        if(pickedCard instanceof carta_speciale){
        if(pickedCard.tipo === "WindPU"){
            stormLevel = stormLevel+1;
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
       checkCard(pickedCard);
       return pickedCard;
    }

class CardDeck extends Component {
        render = () =>
            <span> the last card was {this.props.card.magnitude} {this.props.card.direction} </span>
    }

class StormMeter extends Component {
        render = () =>
            <span> Storm meter: {stormMeter[stormLevel]}</span>
}

class PlayerView extends Component {
        render = () =>
            <span> {this.props.player.type} is on tile ({board.idToPos(this.props.player.position).x},{board.idToPos(this.props.player.position).y})</span>
}

class App extends Component {

    constructor () {
        super();
        this.state = {
            board: board,
            usedDeck: [],
            theDeck: startDeck,
            lastCard: {magnitude: 20, direction: "nowhere"},
            players: [Climber, Watercarrier, Explorer, Archaeologist, Navigator, Meteorologist],
            currentPlayer: 0,
        };
    }

    nextTurn (){
        let newPlayerIndex = this.state.currentPlayer + 1;
        if (newPlayerIndex===this.state.players.length) {
            newPlayerIndex = 0;
        }
        this.setState({currentPlayer: newPlayerIndex});
    }

  render() {

      const currentPlayer = this.state.players[this.state.currentPlayer];
      const moves = currentPlayer.canMove(board, board.storm);
      return (
      <div className="App">
        <header className="App-header">
          <p>
          </p>
            <div class="flexy">
                <BoardView board={board} players={this.state.players} highlights={moves}/>
                <CardDeck card={this.state.lastCard}/>
                <StormMeter/><p>
                <PlayerView player={this.state.players[0]}/>
                <PlayerView player={this.state.players[1]}/>
                <PlayerView player={this.state.players[2]}/>
                <PlayerView player={this.state.players[3]}/>
                <PlayerView player={this.state.players[4]}/>
                <PlayerView player={this.state.players[5]}/>
                </p>
            </div>
          <p>
              <button onClick={() => this.movePlayer(currentPlayer,Direction.up)}>U</button>
              <button onClick={() => this.movePlayer(currentPlayer,Direction.down)}>D</button>
              <button onClick={() => this.movePlayer(currentPlayer,Direction.left)}>L</button>
              <button onClick={() => this.movePlayer(currentPlayer,Direction.right)}>R</button>

          </p>
  <button onClick={() => {
      for(var i = 0; i<stormMeter[stormLevel]; i = i+1){
          this.moveTheStorm(pickCard(this.state.theDeck, this.state.usedDeck))
      }

  }}>UNLEASH THE DOOM!!!</button>
            <button onClick={() => {this.nextTurn();}}>Next turn</button>
        </header>
      </div>
    );
  }

    moveBoard = (direction) => {
        this.state.board.moveStorm(direction);
        this.setState({board: this.state.board});
    };

    movePlayer = (player, direction) => {

        const pos = this.state.board.idToPos(player.position);
        const newpos = board.getNewCoordinates(pos, direction);

        const newtile = board.posToTile(newpos);
        const newplayers = this.state.players.map((p) =>
        {
            if (p.type === player.type) {
                p.position = newtile.id;
            }
            return p;
        });
        this.setState({players: newplayers});
    };

    moveTheStorm = (carta) => {
        this.setState({theDeck: this.state.theDeck, usedDeck: this.state.usedDeck});
        this.setState({lastCard: carta});
        for (var i=0; i<carta.magnitude; i++) {
            this.moveBoard(carta.direction);
        }
    };

}

export default App;

          //bello!
