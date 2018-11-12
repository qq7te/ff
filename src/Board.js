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


class Tile_View extends Component
{
    constructor(tile) {
        super();
        // alert(tile.type);
        const src = "reg" === tile.type ? blackhat : me;
        this.state = {
            model: tile,
            src: src
        };
    }
    render() {
        return (
            <div><img id={this.state.model.id} src={this.state.src} width="90" alt={"hi"} /></div>
        )
    }
}


class Board_View extends Component
{



    constructor()
    {
        super();
        this.state = {board:
                [
                    new Tile(0, "reg"),
                    new Tile(1, "reg"),
                    new Tile(2, "reg"),
                    new Tile(3, "mew"),
                    new Tile(4, "reg")
                ]};
    }

    render() {
        return (
            <div class={"grid-container"}>

                {this.state.board.map((tile)  => {
                    return new Tile_View(tile).render();
                })}

            </div>
        );
    }
}

export { Board_View };
