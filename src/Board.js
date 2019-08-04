import './Board.css';

const Direction = Object.freeze({
    up: 'u',
    down: 'd',
    left: 'l',
    right: 'r'
});


class Tile {
    constructor(id, type) {
        this.id = id;
        this.type = type;
        this.sand = 0;
    }
}

class Board {
    constructor() {
        this.storm = {x: 2, y: 2};
        this.tiles =
            [[
                new Tile(0, "reg"),
                new Tile(1, "reg"),
                new Tile(2, "reg"),
                new Tile(3, "reg"),
                new Tile(4, "reg")
            ]
                , [
                new Tile(10, "reg"),
                new Tile(11, "reg"),
                new Tile(12, "reg"),
                new Tile(13, "reg"),
                new Tile(14, "reg")

            ], [
                new Tile(20, "reg"),
                new Tile(21, "reg"),
                new Tile(22, "mew"),
                new Tile(23, "reg"),
                new Tile(24, "reg")

            ], [
                new Tile(30, "reg"),
                new Tile(31, "reg"),
                new Tile(32, "reg"),
                new Tile(33, "reg"),
                new Tile(34, "reg")

            ], [
                new Tile(40, "reg"),
                new Tile(41, "reg"),
                new Tile(42, "reg"),
                new Tile(43, "reg"),
                new Tile(44, "reg")

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
