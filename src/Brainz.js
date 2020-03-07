import {Board} from './Board';
import Player from './Players'
import {Deck, carta_speciale, carta_normale} from "./Deck";

var stormMeter = [2, 3, 4, 5, 6, 7];
var stormMeters = [[],[],[2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 7],
    [2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 7],
    [2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 7],
    [2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 7],
    [2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 7]];
var stormLevel = 0;

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
    };

    currentPlayer = () => {

        return this.playerObjectList[this.currentPlayerIndex];

    };

    gameOver = (msg) => { this.callbackApp.gameOver(msg)};

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

        this.numberOfMoves--;
        if (this.numberOfMoves === 0) {
            this.nextturn();
        }

    };

    handleSunBeatsDown () {
        this.playerObjectList.map((player) => {
            player.water_level--;
            if (player.water_level === 0) {
                this.gameOver("player " + player.name + " has run out of water");
            }
            return player;
        });
    };

    handleCard = (pickedCard) => {
        if (pickedCard instanceof carta_speciale) {
            if (pickedCard.tipo === "WindPU") {
                stormLevel = stormLevel + 1;
                //************
                //   THIS IS BROKEN
                // *************
                console.log("wind picks up to " + stormMeter[stormLevel]);
            }
            if (pickedCard.tipo === "SunBD") {
                console.log("sun beats down");
                this.handleSunBeatsDown();
            }
        }
    };

}

export default Brainz;