import React, { Component } from 'react';
import './App.css';
import './Board.css';

import blackhat from './black-hat.png';
import me from './me.jpg';


class Tile
{
    constructor(id, type)
    {
        this.id = id;
        this.type = type;
    }
}


class TileView extends Component
{
    render() {
        return (
            <div><img id={this.props.tile.id} src={"reg" === this.props.tile.type ? blackhat : me} width="90" alt={"hi"} /></div>
        )
    }
}


class BoardView extends Component
{
    render = () =>
            <div class={"grid-container"}>
                {this.props.board.map((tile)  =>
                        <TileView key={tile.id} tile={tile}/>
                )}
            </div>
}

export { BoardView, Tile };
