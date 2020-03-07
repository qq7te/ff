import {Direction} from "./Direction"

    /**
     * method that picks a card from the given deck1 and discards cards in deck2
     * @param deck1 the deck we're picking from
     * @param deck2 the deck where we discard
     * @returns the picked card
     */
    function pickCard (deck1, deck2) {
        console.log("the deck has " + deck1.length + " cards!");
        if (deck1.length === 0) {
            deck1.push(...deck2);
            deck2.splice(0, deck2.length);
            console.log("the deck ... now ...  has " + deck1.length + " cards!");
        }

        // here we make sure to pick something at random
        const index = Math.floor(Math.random() * deck1.length);
        const pickedCard = deck1[index];

        deck2.push(pickedCard);
        deck1.splice(index, 1);
        return pickedCard;
    }


class carta_normale {
    constructor(direction, magnitude) {
        this.direction = direction;
        this.magnitude = magnitude;
    }
}

class carta_speciale {
    constructor(tipo) {
        this.tipo = tipo;
    }
}

/**
 * This class contains both fresh cards and discard cards
 * and provides a method to pick the top card.
 */
class Deck {

    constructor(cards) {
        this.fresh_cards = cards;
        this.discarded = [];
    }

    pickCard = () => {
        return pickCard(this.fresh_cards, this.discarded);
    }

    topOfDiscard = () => {
        return this.discarded[this.discarded.length -1];
    }
}

export {carta_normale, carta_speciale, Deck};