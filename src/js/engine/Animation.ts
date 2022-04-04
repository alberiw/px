import { Sprite } from "./Sprite";
import { Vector } from "./Vector";

export class Animation {

    private _currentFrame: number;
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
            this._currentFrame = (this._currentFrame + 1) % this._iteration.length;
            // if (this._currentFrame < this._iteration.length-1) {
            //     this._currentFrame += 1;
            // } else {
            //     this._currentFrame = 0;
            // }
        }
    }

    draw(ctx: CanvasRenderingContext2D, pos: Vector) {
        this.sprite.draw(ctx, pos);
    }

}


    // animation(dir: number) {
    //     if (this._frameIndexY == dir) {
    //         if (--this._delay == 0) {
    //             this._delay = 30;
    //             if (this._animationFrame < this._animation.length - 1) {
    //             //if (o1.frameIndexX < o1.numberOfFramesX - 1) {
    //                 //++o1.frameIndexX;
    //                 ++this._animationFrame;
    //             } else {
    //                 //o1.frameIndexX = 0;
    //                 this._animationFrame = 0;
    //             }
    //         }
    //         // this._frameIndexY = dir;
    //     } else {
    //         this._frameIndexX = 0;
    //         this._frameIndexY = dir;
    //     }
    // }