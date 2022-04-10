import { Sprite } from "./Sprite";
import { Vector } from "./Vector";
import { Camera } from "./Camera";
import { Animation } from "./Animation";
import { Collider } from "./Collider";
import { Dimension } from "./Dimension";

export class GameObject {

    private _isVisable: boolean = true;
    private _collider: Collider;

    constructor(
        protected _sprite: Sprite, 
        protected _pos: Vector, 
        protected _animations: Animation[] = [],
    ) {
        this._collider = new Collider(
            this._pos,
            new Dimension(
                this.width, 
                this.height
            )
        );
    }

    get visable(): boolean {
        return this._isVisable;
    }

    set visable(visable: boolean) {
        this._isVisable = visable;
    }

    get pos(): Vector {
        return this._pos;
    }

    set pos(pos: Vector) {
        this._pos = pos;
    }

    get width(): number {
        return this._sprite.width;
    }

    get height(): number {
        return this._sprite.height;
    }

    get collider(): Collider {
        return this._collider;
    }

	update(delta: number) {
        this._animations.forEach(animation => animation.update(delta));
    }

	draw(context: CanvasRenderingContext2D, camera: Camera) {
        // this._sprite.draw(context, this._pos.plus(camera.pos));
        this._sprite.draw(context, this._pos);
    }

}