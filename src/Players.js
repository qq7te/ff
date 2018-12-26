//bool
const isValid = (pos) =>
{
    if (pos.x>4 || pos.x<0) return false;
    if (pos.y>4 || pos.y<0) return false;
    return true;
};

class Player{

            canMove = (board, currentPos) => {
                return [
                    board.posToTile({x: currentPos.x, y: currentPos.y - 1}).id,
                    board.posToTile({x: currentPos.x, y: currentPos.y + 1}).id,
                    board.posToTile({x: currentPos.x - 1, y:currentPos.y}).id,
                    board.posToTile({x: currentPos.x + 1, y:currentPos.y}).id
                ];
            }

}

export default Player;