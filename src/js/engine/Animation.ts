import { Sprite } from "./Sprite";
import { SpriteRenderer } from "./SpriteRenderer";
import { Vector } from "./Vector";

export class Animation implements SpriteRenderer {

    private _currentFrame: number = 0;
    private _time: number = 0;

    constructor(
        private _sprites: Sprite[],
        private _iteration: number[],
        private _delay: number,
    ) {}

    get sprite(): Sprite {
        return this._sprites[this._iteration[this._currentFrame]];
    }

    update(delta: number) {
        this._time += delta;
        if (this._time >= this._delay) {
            this._time = 0;
            this._currentFrame = (this._currentFrame + 1) % this._iteration.length;
        }
    }

    draw(ctx: CanvasRenderingContext2D, pos: Vector) {
        this.sprite.draw(ctx, pos);
    }

}