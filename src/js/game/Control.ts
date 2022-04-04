import { Direction } from "./Direction";
import { Player } from "./Player";

export enum Key {
    Up = 38,
    Down = 40,
    Left = 37,
    Right = 39,
}

export class Control {

    constructor(private _player: Player) {
        this._listner();
    }

    private _listner = () => {
        const player = this._player;

        window.onkeydown = (e: KeyboardEvent) => {
            const key = e.keyCode ? e.keyCode : e.which;
            switch (key) {
                case Key.Left: {
                    player.direction = Direction.LEFT;
                    break;
                }
                case Key.Up: {
                    player.direction = Direction.TOP;
                    break;
                }
                case Key.Right: {
                    player.direction = Direction.RIGHT;
                    break;
                }
                case Key.Down: {
                    player.direction = Direction.DOWN;
                    break;
                }
            }
        };
        
        window.onkeyup = (e: KeyboardEvent) => {
            const key = e.keyCode ? e.keyCode : e.which
            switch (key) {
                case Key.Left: {
                    if (player.direction === Direction.LEFT) {
                        player.direction = null;
                    }
                    break;
                }
                case Key.Up: {
                    if (player.direction === Direction.TOP) {
                        player.direction = null;
                    }
                    break;
                }
                case Key.Right: {
                    if (player.direction === Direction.RIGHT) {
                        player.direction = null;
                    }
                    break;
                }
                case Key.Down: {
                    if (player.direction === Direction.DOWN) {
                        player.direction = null;
                    }
                    break;
                }
            }
        };
    }

}