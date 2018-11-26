import './Board.css';

class Tile
{
    constructor(id, type)
    {
        this.id = id;
        this.type = type;
    }
}

class Board
{
    constructor()
    {
        this.storm = {x: 0, y: 3};
        this.tiles =
            [[
                new Tile(0, "reg"),
                new Tile(1, "reg"),
                new Tile(2, "reg"),
                new Tile(3, "mew"),
                new Tile(4, "reg")
            ]
                , [
                new Tile(10, "reg"),
                new Tile(11, "reg"),
                new Tile(12, "reg"),
                new Tile(13, "reg"),
                new Tile(14, "reg")

            ]];
    }

    moveIt (direction)
    {
        var x = this.storm.x;
        var y = this.storm.y;
        var newx, newy;
        switch (direction) {
            case "u": {
                newx = x - 1;
                newy = y;
                break;
            }
            case "d": {
                newx = x + 1;
                newy = y;
                break;
            }
            case "l": {
                newx = x; newy = y-1;
                break;
            }
            case "r": {
                newx = x; newy = y+1;
                break;
            }

        }

        const tmp = this.tiles[x][y];
        this.tiles[x][y] = this.tiles[newx][newy];
        this.tiles[newx][newy] = tmp;
        this.storm = {x: newx, y: newy};
    }


}
export { Board, Tile };
