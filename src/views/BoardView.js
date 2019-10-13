import React, {Component} from "react";
import {TileView} from "./TileView";

export class BoardView extends Component {
    render = () =>
        <div class={"grid-container"}>
            {this.props.board.tiles.map((row) =>
                row.map((tile) =>
                    <TileView players={this.props.players} hilight={this.props.highlights.indexOf(tile.id) > -1}
                              key={tile.id} tile={tile}/>
                )
            )}
        </div>
}