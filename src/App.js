import React, {Component} from 'react';
import './App.css';
import {Artifact, Board, Direction} from './Board.js';
import Player from "./Players";
import {BoardView} from "./views/BoardView";
import {CardDeck, WaterLevelView} from "./views/various";
import {carta_normale, carta_speciale} from "./Deck"

var initial_board = new Board();

var Climber = new Player("Climber", 1, [], 3, 3);
var Watercarrier = new Player("Watercarrier", 1, [], 5, 5);
var Explorer = new Player("Explorer", 1, [], 4, 4);
var Archaeologist = new Player("Archaeologist", 1, [], 3, 3);
var Navigator = new Player("Navigator", 1, [], 4, 4);
var Meteorologist = new Player("Meteorologist", 1, [], 4, 4);



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

var stormMeter = [2, 3, 4, 5, 6, 7];
var stormMeters = [[],[],[2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 7],
    [2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 7],
    [2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 7],
    [2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 7],
    [2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 7]];
var stormLevel = 0;


class PlayerView extends Component {
    render = () =>
        <span> {this.props.player_type}&rsquo;s position is ({this.props.pos.x}, {this.props.pos.y})</span>
}

export class StormMeter extends Component {
    render = () =>
        <span><p> Storm meter: {this.props.stormPiggy}</p></span>
}


class Brainz {
    constructor(playerObjectList, app) {
        this.board = new Board();
        this.currentPlayerIndex = 0;
        this.numberOfMoves = 4;
        this.playerObjectList = playerObjectList;
        this.callbackApp = app;
    }

    currentStormLevel = () => {
        return stormMeters[this.playerObjectList.length][stormLevel];
    }

    currentPlayer = () => {

        return this.playerObjectList[this.currentPlayerIndex];

    };


    movePlayer = (direction) => {
        const pos = this.board.idToPos(this.currentPlayer().tileID);
        const newpos = this.board.getNewCoordinates(pos, direction);

        const newtile = this.board.posToTile(newpos);
        const potentialTileIDs = this.currentPlayer().canMove(this.board, pos);
        if (potentialTileIDs.includes(newtile.id)) {
            this.currentPlayer().tileID = newtile.id;
            this.decreaseNumberOfMoves();
        }
    };

    nextplayer = () => {

        this.currentPlayerIndex = this.currentPlayerIndex + 1;
        this.numberOfMoves = 4;
        if (this.currentPlayerIndex === this.playerObjectList.length) {

            this.currentPlayerIndex = 0;
        }

    };

    nextturn = () => {
        this.nextplayer();
        this.callbackApp.app_moves_things();

    };

    decreaseNumberOfMoves = () => {

        this.numberOfMoves = this.numberOfMoves - 1;
        if (this.numberOfMoves === 0) {
            this.nextturn();
        }

    }
}


class App extends Component {

    constructor() {
        super();
        this.brainz = new Brainz([Climber, Watercarrier, Explorer, Archaeologist, Navigator, Meteorologist], this);
        this.state = {
            board: initial_board,
            usedDeck: [],
            theDeck: startDeck,
            lastCard: {magnitude: 20, direction: "nowhere"},
            players: [Climber, Watercarrier, Explorer, Archaeologist, Navigator, Meteorologist],
            currentPlayer: 0,
        };
    }

    app_moves_things = () => {
        for (var i = 0; i < this.brainz.currentStormLevel(); i++) {
            const pickedCard = pickCard(this.state.theDeck, this.state.usedDeck);
            this.handleCard(pickedCard, this.brainz.playerObjectList);
            this.moveTheStorm(pickedCard);
        }

    };

    handleCard = (pickedCard, modifiablePlayerList) => {
        if (pickedCard instanceof carta_speciale) {
            if (pickedCard.tipo === "WindPU") {
                stormLevel = stormLevel + 1;
            }
            if (pickedCard.tipo === "SunBD") {
                modifiablePlayerList.map((player) => {
                    player.water_level--;
                    return player
                });
            }
        }
    };


    render() {

        const currentPlayer = this.brainz.currentPlayer();//.state.players[this.state.currentPlayer];
        const playerPosition = this.state.board.idToPos(currentPlayer.tileID);
        const moves = currentPlayer.canMove(this.state.board, this.state.board.storm);
        var stormyPig = stormMeters[this.brainz.playerObjectList.length][stormLevel];
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                    </p>
                    <div className="flexy">
                        <BoardView board={this.state.board} players={this.brainz.playerObjectList} highlights={moves}/>
                        <CardDeck card={this.state.lastCard}/>
                        <StormMeter stormPiggy={stormyPig}/>

                        <div className="vertyflexy"><p>
                            <br/><PlayerView player_type={Climber.type} pos={this.state.board.idToPos(Climber.tileID)}/>,
                            <br/><PlayerView player_type={Explorer.type} pos={this.state.board.idToPos(Explorer.tileID)}/>,
                            <br/><PlayerView player_type={Archaeologist.type} pos={this.state.board.idToPos(Archaeologist.tileID)}/>,
                            <br/><PlayerView player_type={Watercarrier.type} pos={this.state.board.idToPos(Watercarrier.tileID)}/>,
                            <br/><PlayerView player_type={Navigator.type} pos={this.state.board.idToPos(Navigator.tileID)}/>,
                            <br/><PlayerView player_type={Meteorologist.type} pos={this.state.board.idToPos(Meteorologist.tileID)}/>.

                            <br/><WaterLevelView player={Climber}/>
                            <br/><WaterLevelView player={Explorer}/>
                            <br/><WaterLevelView player={Archaeologist}/>
                            <br/><WaterLevelView player={Watercarrier}/>
                            <br/><WaterLevelView player={Navigator}/>
                            <br/><WaterLevelView player={Meteorologist}/>
                        </p>
                            <p><span>Current player: {this.brainz.currentPlayer().type}</span></p>
                        </div>
                    </div>
                    <p/>
                        <div align="center">
                            <button
                                onClick={() => this.movePlayer(Direction.up)}>U
                            </button>
                        </div>
                        <div align="center">
                            <button
                                onClick={() => this.movePlayer(Direction.left)}>L
                            </button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button
                                onClick={() => this.movePlayer(Direction.right)}>R
                            </button>
                        </div>
                        <div align="center">
                            <button
                                onClick={() => this.movePlayer(Direction.down)}>D
                            </button>
                        </div>
                        <br/>
                        <br/>
                        <div align="center">
                            <button
                                onClick={() => this.shovel(this.state.board.idToPos(this.brainz.currentPlayer().tileID), Direction.up)}>Shovel
                                up
                            </button>
                        </div>
                        <div align="center">
                            <button
                                onClick={() => this.shovel(this.state.board.idToPos(this.brainz.currentPlayer().tileID), Direction.left)}>Shovel
                                left
                            </button>
                            &nbsp;
                            <button
                                onClick={() => this.shovel(this.state.board.idToPos(this.brainz.currentPlayer().tileID), "already here")}>Shovel
                                in place
                            </button>
                            &nbsp;
                            <button
                                onClick={() => this.shovel(this.state.board.idToPos(this.brainz.currentPlayer().tileID), Direction.right)}>Shovel
                                right
                            </button>
                        </div>
                        <div align="center">
                            <button
                                onClick={() => this.shovel(this.state.board.idToPos(this.brainz.currentPlayer().tileID), Direction.down)}>Shovel
                                down
                            </button>
                        </div>


                    <p>
                        <button onClick={() => {this.excavate()}}>Excavate</button>
                    </p>
                    <p>
                        <button onClick={() => {
                            console.log(this.brainz.board.findArtifact(Artifact.red));
                        }}>find red artifact
                        </button>
                    </p>
                </header>
            </div>
        );
    }

    shovel = (position, direction) => {
        var shoveltile = {x: 0, y: 0};
        if (direction === Direction.up) {
            shoveltile.x = position.x - 1;
            if (shoveltile.x < 1) {
                shoveltile.x = 0
            }
            shoveltile.y = position.y;

        }
        if (direction === Direction.down) {
            shoveltile.x = position.x + 1;
            if (shoveltile.x > 3) {
                shoveltile.x = 4
            }
            shoveltile.y = position.y;

        }

        if (direction === Direction.left) {
            shoveltile.y = position.y - 1;
            if (shoveltile.y < 1) {
                shoveltile.y = 0
            }
            shoveltile.x = position.x;

        }

        if (direction === Direction.right) {
            shoveltile.y = position.y + 1;
            if (shoveltile.y > 3) {
                shoveltile.y = 4
            }
            shoveltile.x = position.x;

        }

        if (direction === "already here") {
            shoveltile = position;
        }


        console.log("shoveling ID " + shoveltile.x + "," + shoveltile.y);
        let tile = this.state.board.posToTile(shoveltile);
        console.log("current sand level: " + tile.sand);
        tile.sand--;
        if (tile.sand < 0) {
            tile.sand = 0;
        }
        console.log("and now current sand level: " + tile.sand);
        this.setState({board: this.state.board})
    };


    moveBoard = (direction) => {
        this.state.board.moveStorm(direction);
        this.setState({board: this.state.board});
    };

    movePlayer = (direction) => {
        this.brainz.movePlayer(direction);
        this.setState({board:this.state.board, players: this.brainz.playerObjectList});
    };

    moveTheStorm = (carta) => {
        this.setState({theDeck: this.state.theDeck, usedDeck: this.state.usedDeck});
        this.setState({lastCard: carta});
        for (var i = 0; i < carta.magnitude; i++) {
            this.moveBoard(carta.direction);
            console.log("doom has been unleashed. i pity you.");
        }
    };
    
    excavate = () => {
        if (this.state.board.posToTile(this.state.board.idToPos(this.brainz.currentPlayer().tileID)).sand === 0) {
            this.state.board.posToTile(this.state.board.idToPos(this.brainz.currentPlayer().tileID)).excavated = true;
            this.setState({ board: this.state.board });
            console.log("A tile has been excavated! You're all going to die!");
        }
    };

}

export default App;

//Rishi waz here!
//DOOM HAS BEEN UNLEASHED. i pity you.
