import './Board.css';

const Direction = Object.freeze({
    up: 'u',
    down: 'd',
    left: 'l',
    right: 'r'
});



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

            ]            , [
                new Tile(10, "reg"),
                new Tile(11, "reg"),
                new Tile(12, "mew"),
                new Tile(13, "reg"),
                new Tile(14, "reg")

            ]            , [
                new Tile(10, "reg"),
                new Tile(11, "reg"),
                new Tile(12, "reg"),
                new Tile(13, "reg"),
                new Tile(14, "reg")

            ]            , [
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
            case Direction.up: {
                newx = x - 1;
                newy = y;
                break;
            }
            case Direction.down: {
                newx = x + 1;
                newy = y;
                break;
            }
            case Direction.left: {
                newx = x; newy = y-1;
                break;
            }
            case Direction.right: {
                newx = x; newy = y+1;
                break;
            }

        }
        if (newx<0||newx>4)
            return;
        if(newy<0||newy>4)
            return;
        const tmp = this.tiles[x][y];
        this.tiles[x][y] = this.tiles[newx][newy];
        this.tiles[newx][newy] = tmp;
        this.storm = {x: newx, y: newy};
    }


}
export { Board, Direction, Tile };
