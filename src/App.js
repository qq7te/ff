import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Board, Direction} from './Board.js';

import blocked from './blocked.png';
import onesanded from './one-sanded.png';
import blackhat from './black-hat.png';
import me from './me.jpg';
import PlayerCan from "./Players";
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

    class Player {
        constructor(type, tileID, gear_cards, water_size, water_level) {
            this.type = type;
            this.position = tileID;
            this.gear_cards = gear_cards;
            this.water_size = water_size;
            this.water_level = water_level;
         }
    }
    var Climber = new Player ("Climber", 1, [], 4, 4);
    var Watercarrier = new Player ("Watercarrier", 1, [], 6, 6);
    var Explorer = new Player ("Explorer", 1, [], 3, 3);
    var Archaeologist = new Player ("Archaeologist", 1, [], 4, 4);
    var Navigator = new Player ("Navigator", 1,[], 3,3);
    var Meteorologist = new Player ("Meteorologist",1, [], 3,3);

var PlayerList = [Climber, Watercarrier, Explorer, Archaeologist, Navigator, Meteorologist];

    var activePlayerIndex = 0;

    function nextTurn (){
        activePlayerIndex = activePlayerIndex+1;
        if (activePlayerIndex===PlayerList.length) {
            activePlayerIndex = 0;
        }
    }


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

            new carta_speciale("WindPU"),
            new carta_speciale("SunBD")
 ];

var stormMeter = [2,3,4,5,6];
var stormLevel = 0;


    function checkCard (pickedCard){
        if(pickedCard instanceof carta_speciale){
        if(pickedCard.tipo === "WindPU"){
            stormLevel = stormLevel+1;
        }
        if(pickedCard.tipo === "SunBD"){
            var i;
            for (i=0; i<PlayerList.length; i++){
                PlayerList[i].water_level = PlayerList[i].water_level -1
            }
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

function movePlayer (board, playerType, direction) {
       var playerX=board.idToPos(playerType.position).x;
       var playerY=board.idToPos(playerType.position).y;

        if (direction=="up"){
            playerX=playerX-1;
        }
        else if (direction=="down"){
            playerX=playerX+1;
        }
        else if (direction=="left"){
            playerY=playerY-1;
        }
        else if (direction=="right"){
            playerY=playerY+1;
        } else {}

    var tile = board.posToTile(playerX, playerY);
     PlayerList[activePlayerIndex].position = tile;
    }


function shovel (position, direction) {
 var shoveltile = {x:0, y:0};
        if (direction===Direction.up){
        shoveltile.x=position.x-1;
            if(shoveltile.x<1){
                shoveltile.x=0
            }
            shoveltile.y=position.y;

            }
    if (direction===Direction.down){
        shoveltile.x=position.x+1;
        if(shoveltile.x>3){
            shoveltile.x=4
        }
        shoveltile.y=position.y;

    }

    if (direction===Direction.left){
        shoveltile.y=position.y-1;
        if(shoveltile.y<1){
            shoveltile.y=0
        }
        shoveltile.x=position.x;

    }

    if (direction===Direction.right){
        shoveltile.y=position.y+1;
        if(shoveltile.y>3){
            shoveltile.y=4
        }
        shoveltile.x=position.x;

    }

    board.posToTile(shoveltile).sand--;
console.log("i shovevled");

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

class WaterLevelView extends Component {
        render = () =>
            <span> The water level of the {this.props.player.type} is currently {this.props.player.water_level}</span>
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
        this.players = [new PlayerCan()];
        this.currentPlayer = 0;
    }


  render() {

      const moves = this.players[this.currentPlayer].canMove(board, board.storm);
      const bb = this.state.board;
      return (
      <div className="App">
        <header className="App-header">
          <p>
          </p>
            <div class="flexy">
                <BoardView board={board} highlights={moves}/>
                <CardDeck card={this.state.lastCard}/>
                <StormMeter/><p>
                <PlayerView player={Climber}/>
                <PlayerView player={Explorer}/>
                <PlayerView player={Archaeologist}/>
                <PlayerView player={Watercarrier}/>
                <PlayerView player={Navigator}/>
                <PlayerView player={Meteorologist}/>
                <WaterLevelView player={Climber}/>
                <WaterLevelView player={Explorer}/>
                <WaterLevelView player={Archaeologist}/>
                <WaterLevelView player={Watercarrier}/>
                <WaterLevelView player={Navigator}/>
                <WaterLevelView player={Meteorologist}/>
                </p>
            </div>
          <p>
              <button onClick={() => movePlayer(bb, PlayerList[activePlayerIndex],"up")}>U</button>
              <button onClick={() => movePlayer(bb, PlayerList[activePlayerIndex],"down")}>D</button>
              <button onClick={() => movePlayer(bb, PlayerList[activePlayerIndex],"left")}>L</button>
              <button onClick={() => movePlayer(bb, PlayerList[activePlayerIndex],"right")}>R</button>

          </p>
            <p>
                <button onClick={() => shovel(board.idToPos(11), Direction.up)}>Shovel up</button>
                <button onClick={() => shovel(board.idToPos(11), Direction.down)}>Shovel down</button>
                <button onClick={() => shovel(board.idToPos(11), Direction.left)}>Shovel left</button>
                <button onClick={() => shovel(board.idToPos(11), Direction.right)}>Shovel right</button>

            </p>
  <button onClick={() => {
      for(var i = 0; i<stormMeter[stormLevel]; i = i+1){
          this.moveTheStorm(pickCard(this.state.theDeck, this.state.usedDeck))
      }

  }}>UNLEASH THE DOOM!!!</button>
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
            console.log ("doom has been unleashed. i pity you.");
        }
    };

}

export default App;

      //DOOM HAS BEEN UNLEASHED. i pity you.
