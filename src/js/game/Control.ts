import { Direction } from "./Direction";
import { Player } from "./Player";

declare global {
    var keys: number[];
}

//TODO replace by Input with static method 
globalThis.keys = [];

export enum Key {
    UP = 38,
    DOWN = 40,
    LEFT = 37,
    RIGHT = 39,
}

export class Control {

    constructor(private _player: Player) {
        this._listner();
    }

    //TODO change keyCode to key ?? code ?? keyCode
    private _listner = () => {
        const player = this._player;

        window.onkeydown = (e: KeyboardEvent) => {
            const key = e.keyCode ?? e.which;
            globalThis.keys.push(key);
            console.log(`${key} - ${e.key} - ${e.code}`);
            switch (key) {
                case Key.LEFT: {
                    player.direction = Direction.LEFT;
                    break;
                }
                case Key.UP: {
                    player.direction = Direction.TOP;
                    break;
                }
                case Key.RIGHT: {
                    player.direction = Direction.RIGHT;
                    break;
                }
                case Key.DOWN: {
                    player.direction = Direction.DOWN;
                    break;
                }
            }
        };
        
        window.onkeyup = (e: KeyboardEvent) => {
            const key = e.keyCode ?? e.which
            globalThis.keys = globalThis.keys.filter(e => e !== key);
            switch (key) {
                case Key.LEFT: {
                    if (player.direction === Direction.LEFT) {
                        player.direction = null;
                    }
                    break;
                }
                case Key.UP: {
                    if (player.direction === Direction.TOP) {
                        player.direction = null;
                    }
                    break;
                }
                case Key.RIGHT: {
                    if (player.direction === Direction.RIGHT) {
                        player.direction = null;
                    }
                    break;
                }
                case Key.DOWN: {
                    if (player.direction === Direction.DOWN) {
                        player.direction = null;
                    }
                    break;
                }
            }
        };
    }

}