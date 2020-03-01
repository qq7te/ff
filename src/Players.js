import {board, TileType} from './Board.js'

const isValid = (pos) => {
    if (pos.x > 4 || pos.x < 0) return false;
    if (pos.y > 4 || pos.y < 0) return false;
    return true;
};

const isStorm = (board) => {
    return (pos) => {
        return board.posToTile(pos).type !== TileType.storm;
    };
};

class Player {
    constructor(type, tileID, gear_cards, water_size, water_level) {
        this.type = type;
        this.tileID = tileID;
        this.gear_cards = gear_cards;
        this.water_size = water_size;
        this.water_level = water_level;
    }


    // not true or false, instead gives a list of tile ids you can move to

    canMove = (board, currentPos) => {
        let potentials = [
            {x: currentPos.x - 1, y: currentPos.y},  // up
            {x: currentPos.x + 1, y: currentPos.y},  // down
            {x: currentPos.x, y: currentPos.y - 1},  // left
            {x: currentPos.x, y: currentPos.y + 1}   // right
        ];

        const good = potentials
            .filter(isValid)
            .filter(isStorm(board))
            .map(board.posToTile)
            .map((tile) => {
                return tile.id;
            });

        return good;
    }

}

export default Player;