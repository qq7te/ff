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
        if (tile.type !== "reg") {
            return (
                <div/>
            );
        }
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
    var Archaeologist = new Player ("Archaeologist", 1, [], 4, 4);
    var Navigator = new Player ("Navigator", 1,[], 3,3);
    var Meteorologist = new Player ("Meteorologist",1, [], 3,3);

    var PlayerList = [Climber, Watercarrier, Explorer, Archaeologist, Navigator, Meteorologist];

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
     PlayerList[this.state.currentPlayer].position = tile;
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
  
  printDirection = function (dir){
    if (dir == Direction.up) {
      return("up");
    }
    if (dir == Direction.down) {
      return("down");
    }
    if (dir == Direction.left) {
      return("left");
    }
    if (dir == Direction.right) {
      return("right");
    }
  }
  
        render = () =>
            <span> The last card was {this.props.card.magnitude} {this.props.card.direction} </span>
    }

class StormMeter extends Component {
        render = () =>
            <span><p> Storm meter: {stormMeter[stormLevel]}</p></span>
}

class PlayerView extends Component {
        render = () =>
            <span> {this.props.player.type}&rsquo;s position is ({board.idToPos(this.props.player.position).x},{board.idToPos(this.props.player.position).y})</span>
}

class WaterLevelView extends Component {
        render = () =>
            <span> The water level of the {this.props.player.type} is currently {this.props.player.water_level}</span>
}

class App extends Component {

    constructor() {
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

    nextTurn() {
        let newPlayerIndex = this.state.currentPlayer + 1;
        if (newPlayerIndex === this.state.players.length) {
            newPlayerIndex = 0;
        }
        this.setState({currentPlayer: newPlayerIndex});
    }

  nextPlayer = () => {
      this.setState({currentPlayer: 2});
      console.log("Hello!");
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
                <StormMeter/>

                <div className="vertyflexy"><p>
                <br/><PlayerView player={Climber}/>,
                <br/><PlayerView player={Explorer}/>,
                <br/><PlayerView player={Archaeologist}/>,
                <br/><PlayerView player={Watercarrier}/>,
                <br/><PlayerView player={Navigator}/>,
                <br/><PlayerView player={Meteorologist}/>.

                    <br/><WaterLevelView player={Climber}/>
                        <br/><WaterLevelView player={Explorer}/>
                        <br/><WaterLevelView player={Archaeologist}/>
                        <br/><WaterLevelView player={Watercarrier}/>
                        <br/><WaterLevelView player={Navigator}/>
                        <br/><WaterLevelView player={Meteorologist}/>
                </p>
                <p><span>Current player: {PlayerList[this.state.currentPlayer].type}</span></p>
                </div>
            </div>
          <p>
              <div align="center"><button onClick={() => this.movePlayer(PlayerList[this.state.currentPlayer], Direction.up)}>U</button></div>
              <div align="center"><button onClick={() => this.movePlayer(PlayerList[this.state.currentPlayer], Direction.left)}>L</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={() => this.movePlayer(PlayerList[this.state.currentPlayer], Direction.right)}>R</button></div>
              <div align="center"><button onClick={() => this.movePlayer(PlayerList[this.state.currentPlayer], Direction.down)}>D</button></div>

          </p> <p>
                <button onClick={() => shovel(board.idToPos(11), Direction.up)}>Shovel up</button>
                <button onClick={() => shovel(board.idToPos(11), Direction.down)}>Shovel down</button>
                <button onClick={() => shovel(board.idToPos(11), Direction.left)}>Shovel left</button>
                <button onClick={() => shovel(board.idToPos(11), Direction.right)}>Shovel right</button>

            </p>
                    <button onClick={() => {
                        for (var i = 0; i < stormMeter[stormLevel]; i = i + 1) {
                            this.moveTheStorm(pickCard(this.state.theDeck, this.state.usedDeck))
                        }

                    }}>UNLEASH THE DOOM!!!
                    </button>
                    <p><button onClick={() => {
                        this.nextTurn();
                    }}>Next turn
                    </button></p>
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
        const newplayers = this.state.players.map((p) => {
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
        for (var i = 0; i < carta.magnitude; i++) {
            this.moveBoard(carta.direction);
            console.log ("doom has been unleashed. i pity you.");
        }
    };

}

export default App;

          //Rishi waz here!
      //DOOM HAS BEEN UNLEASHED. i pity you.
