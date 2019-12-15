import './Board.css';
import ivybackground from "./ivybackground-ff-1.png"
import bear from "./bear-ff-2.png"

const Direction = Object.freeze({
    up: 'u',
    down: 'd',
    left: 'l',
    right: 'r'
});

const Artifact = Object.freeze({
    red: 'r',
    orange: 'o',
    yellow: 'y',
    grey: 'g'
});

class Tile {
    constructor(id, type, tileImage, eximage) {
        this.id = id;
        this.type = type;
        this.sand = 0;
        this.excavated = false;
        this.image = tileImage;
        this.eximage = eximage;
    }
}

const TileType = Object.freeze({

    well: 0,
    mirage: 1,
    onlygear: 2,
    grayColumn: 3,
    grayRow: 4,
    redColumn: 5,
    redRow: 6,
    orangeColumn: 7,
    orangeRow: 8,
    yellowColumn: 9,
    yellowRow: 10,
    tunnel: 11,
    launchpad: 12,
    crashsite: 13,
    storm: 14,


})

class Board {
    constructor() {
        this.storm = {x: 2, y: 2};
        this.tiles =
            [[
                new Tile(0, TileType.well, ivybackground, bear),
                new Tile(1, TileType.well, ivybackground, bear),
                new Tile(2, TileType.mirage, ivybackground, bear),
                new Tile(3, TileType.launchpad, ivybackground, bear),
                new Tile(4, TileType.crashsite, ivybackground, bear)
            ]
                , [
                new Tile(10, TileType.onlygear, ivybackground,bear),
                new Tile(11, TileType.onlygear, ivybackground,bear),
                new Tile(12, TileType.onlygear, ivybackground,bear),
                new Tile(13, TileType.onlygear, ivybackground,bear),
                new Tile(14, TileType.onlygear, ivybackground,bear)

            ], [
                new Tile(20, TileType.onlygear, ivybackground, bear),
                new Tile(21, TileType.onlygear, ivybackground, bear),
                new Tile(22, TileType.storm),
                new Tile(23, TileType.onlygear, ivybackground, bear),
                new Tile(24, TileType.tunnel, ivybackground, bear)

            ], [
                new Tile(30, TileType.tunnel, ivybackground, bear),
                new Tile(31, TileType.tunnel, ivybackground, bear),
                new Tile(33, TileType.redColumn, ivybackground, bear),
                new Tile(34, TileType.redRow, ivybackground, bear),
                new Tile(35, TileType.orangeColumn, ivybackground, bear)

            ], [

                new Tile(40, TileType.orangeRow, ivybackground, bear),
                new Tile(41, TileType.yellowColumn, ivybackground, bear),
                new Tile(42, TileType.yellowRow, ivybackground, bear),
                new Tile(43, TileType.grayColumn, ivybackground, bear),
                new Tile(44, TileType.grayRow, ivybackground, bear)

            ]];
        this.size = this.tiles.length;
    }

    getNewCoordinates(old_point, direction) {
        const x = old_point.x;
        const y = old_point.y;
        var point;
        switch (direction) {
            case Direction.up: {
                point = {x: Math.max(0, x - 1), y: y};
                break;
            }
            case Direction.down: {
                point = {x: Math.min(this.size - 1, x + 1), y: y};
                break;
            }
            case Direction.left: {
                point = {x: x, y: Math.max(0, y - 1)};
                break;
            }
            case Direction.right: {
                point = {x: x, y: Math.min(this.size - 1, y + 1)};
                break;
            }
            default:
                throw 'invalid direction! This is impossible!';
        }
        return point;
    }


    moveStorm(direction) {
        const x = this.storm.x;
        const y = this.storm.y;
        const newpoint = this.getNewCoordinates({x: x, y: y},
            direction);
        const newx = newpoint.x;
        const newy = newpoint.y;

        const tmp = this.tiles[x][y];
        this.tiles[x][y] = this.tiles[newx][newy];
        this.tiles[newx][newy] = tmp;
        //add sand
        this.tiles[x][y].sand++;
        this.storm = {x: newx, y: newy};
    }

    idToPos = (id) => {
        let x = 0;
        for (let row of this.tiles) {
            let y = 0;
            for (let cell of row) {
                if (cell.id === id) return {x: x, y: y};
                y++;
            }
            x++;
        }
        throw {id: id, message: "Invalid tile ID!!"};
    };

    posToTile = (pos) => {
        return this.tiles[pos.x][pos.y];
    }

    findRedArtifact = () => {
        return this.tiles[this.idToPos(33).x][this.idToPos(34).y];
    }

    findArtifact = (artifact) => {
        if (artifact === Artifact.red) {
            return this.tiles[this.idToPos(33).x][this.idToPos(34).y];
        }

        if (artifact === Artifact.orange) {
            return this.tiles[this.idToPos(35).x][this.idToPos(40).y];
        }

        if (artifact === Artifact.yellow) {
            return this.tiles[this.idToPos(41).x][this.idToPos(42).y];
        }

        if (artifact === Artifact.grey) {
            return this.tiles[this.idToPos(43).x][this.idToPos(44).y];
        }
    }

}

export {Board, Direction, Tile, TileType, Artifact};