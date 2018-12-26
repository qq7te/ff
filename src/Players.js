//bool
const isValid = (pos) =>
{
    if (pos.x>4 || pos.x<0) return false;
    if (pos.y>4 || pos.y<0) return false;
    return true;
};

class Player{

            canMove = (board, currentPos) => {
                let good = [];
                const up = {x: currentPos.x - 1, y: currentPos.y};
                if (isValid(up)) {
                    const goodUpID = board.posToTile(up).id;
                    good.push(goodUpID);
                }
                const down = {x: currentPos.x + 1, y: currentPos.y};
                if (isValid(down)) {
                    const goodDownID = board.posToTile(down).id;
                    good.push(goodDownID);
                }
                const left = {x: currentPos.x, y: currentPos.y - 1};
                if (isValid(left)) {
                    const goodLeftID = board.posToTile(left).id;
                    good.push(goodLeftID)
                }
                const right = {x: currentPos.x, y: currentPos.y + 1};
                if (isValid(right)) {
                    const goodRightID = board.posToTile(right).id;
                    good.push(goodRightID)
                }

                return good;
            }

}

export default Player;