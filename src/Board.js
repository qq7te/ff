import './Board.css';
import ivybackground from "./ivybackground-ff-1.png"

const Direction = Object.freeze({
    up: 'u',
    down: 'd',
    left: 'l',
    right: 'r'
});


class Tile {
    constructor(id, type, tileImage) {
        this.id = id;
        this.type = type;
        this.sand = 0;
        this.excavated = false;
        this.image = tileImage;
    }
}

class Board {
    constructor() {
        this.storm = {x: 2, y: 2};
        this.tiles =
            [[
                new Tile(0, "reg", ivybackground),
                new Tile(1, "reg", ivybackground),
                new Tile(2, "reg", ivybackground),
                new Tile(3, "reg", ivybackground),
                new Tile(4, "reg", ivybackground)
            ]
                , [
                new Tile(10, "reg", ivybackground),
                new Tile(11, "reg", ivybackground),
                new Tile(12, "reg", ivybackground),
                new Tile(13, "reg", ivybackground),
                new Tile(14, "reg", ivybackground)

            ], [
                new Tile(20, "reg", ivybackground),
                new Tile(21, "reg", ivybackground),
                new Tile(22, "storm"),
                new Tile(23, "reg", ivybackground),
                new Tile(24, "reg", ivybackground)

            ], [
                new Tile(30, "reg", ivybackground),
                new Tile(31, "reg", ivybackground),
                new Tile(32, "reg", ivybackground),
                new Tile(33, "reg", ivybackground),
                new Tile(34, "reg", ivybackground)

            ], [
                new Tile(40, "reg", ivybackground),
                new Tile(41, "reg", ivybackground),
                new Tile(42, "reg", ivybackground),
                new Tile(43, "reg", ivybackground),
                new Tile(44, "reg", ivybackground)

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

}

export {Board, Direction, Tile};
