import React, {Component} from "react";
import blackhat from "../black-hat.png";
import onesanded from "../one-sanded.png";
import blocked from "../blocked.png";
import green from "../green.png";
import bear from "../bear-ff-2.png";
import {TileType} from "../Board.js"

export class TileView extends Component {
    render() {
        let img = blackhat;
        const tile = this.props.tile;

        img = tile.image;
        if (tile.excavated === true) {img= tile.eximage};
        if (tile.sand === 1) img = onesanded;
        if (tile.sand > 1) img = blocked;
        if (tile.type === TileType.storm) {
            return (
                <div/>
            );
        }
        let hasClimber = false;
        for (let player of this.props.players) {
            if (player.tileID === tile.id) {
                hasClimber = true;
            }
        }

        return (
            <div className={this.props.hilight ? "hilight" : ""}>
                <img id={tile.id} src={img} width="90" alt={"hi"}/>
                {
                    hasClimber ? (
                        <img className={"pedone"} src={green} width={"90"}/>
                    ) : ('')
                }
            </div>
        )
    }
}