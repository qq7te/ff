import Brainz from "../Brainz";
import Player from "../Players";
import App from "../App";

var Climber = new Player("Climber", 1, [], 3, 3);
var Watercarrier = new Player("Watercarrier", 1, [], 5, 5);
var Explorer = new Player("Explorer", 1, [], 4, 4);
var Archaeologist = new Player("Archaeologist", 1, [], 3, 3);
var Navigator = new Player("Navigator", 1, [], 4, 4);
var Meteorologist = new Player("Meteorologist", 1, [], 4, 4);


const call_me = jest.fn(x => {return x;});

it('handlesSunBeatsDown', () => {
    const brainz = new Brainz([Climber, Watercarrier]);
    brainz.handleSunBeatsDown();
    expect(Climber.water_level).toBe(2);
    expect(Watercarrier.water_level).toBe(4);
});

it ('can end the game', () => {
    const brainz = new Brainz([Climber, Watercarrier], {gameOver: (msg) => {call_me(msg)}});

    const msg = brainz.gameOver("hello");
    expect(call_me).toHaveBeenCalledWith("hello");
});

it('ends the game when we\'re out of water', () => {
    const brainz = new Brainz([Climber, Watercarrier], {gameOver: (msg) => {call_me(msg)}});
    brainz.handleSunBeatsDown();
    brainz.handleSunBeatsDown();
    brainz.handleSunBeatsDown();
    expect(call_me).toBeCalled();
});