import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {carta_normale, Deck} from "./Deck";
import Direction from "./Direction"

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

let startDeck = [
    new carta_normale(Direction.up, 1),
    new carta_normale(Direction.up, 2),
    new carta_normale(Direction.up, 3),
];

it('picks a card', () => {
    const initalSize = startDeck.length;
    let deck = new Deck(startDeck);
    for (let howManyTimes = 0; howManyTimes < 3; ++howManyTimes) {
        for (let pickedCard = 1; pickedCard <= initalSize; ++pickedCard) {
            const picked = deck.pickCard();
            expect(deck.discarded.length).toBe(pickedCard);
            expect(deck.fresh_cards.length).toBe(initalSize - pickedCard);
            expect(deck.topOfDiscard()).toEqual(picked);
        }
    }
});