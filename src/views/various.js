import React, {Component} from "react";
import {Direction} from "../Board";

export class CardDeck extends Component {

    printDirection = function (dir) {
        if (dir == Direction.up) {
            return ("up");
        }
        if (dir == Direction.down) {
            return ("down");
        }
        if (dir == Direction.left) {
            return ("left");
        }
        if (dir == Direction.right) {
            return ("right");
        }
    }

    render = () =>
        <span> The last card was {this.props.card.magnitude} {this.props.card.direction} </span>
}

export class WaterLevelView extends Component {
    render = () =>
        <span> The water level of the {this.props.player.type} is currently {this.props.player.water_level}</span>
}