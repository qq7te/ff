//bool
const isValid = (pos) =>
{
    if (pos.x>4 || pos.x<0) return false;
    if (pos.y>4 || pos.y<0) return false;
    return true;
};

class Player{

            canMove = (board, currentPos) => {
                let potentials = [
                    {x: currentPos.x - 1, y: currentPos.y},  // up
                    {x: currentPos.x + 1, y: currentPos.y},  // down
                    {x: currentPos.x, y: currentPos.y - 1},  // left
                    {x: currentPos.x, y: currentPos.y + 1}   // right
                ];

                const good = potentials
                    .filter(isValid)
                    .map(board.posToTile)
                    .map((tile) => {return tile.id;});

                return good;
            }

}

export default Player;