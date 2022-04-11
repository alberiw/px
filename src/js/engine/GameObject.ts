import { Vector } from "./Vector";
import { Camera } from "./Camera";
import { Collider } from "./Collider";
import { Dimension } from "./Dimension";
import { SpriteRenderer } from "./SpriteRenderer";

export class GameObject {

    private _isVisable: boolean = true;

    constructor(
        protected _sprite: SpriteRenderer,
        protected _pos: Vector,
        protected _dim: Dimension,
        // protected _collision: boolean,
    ) {}

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
        return this._dim.width;
    }

    get height(): number {
        return this._dim.height;
    }

    get collider(): Collider {
        return new Collider(this._pos, this._dim);
    }

	update(delta: number) {
        this._sprite.update(delta);
    }

	draw(context: CanvasRenderingContext2D, camera: Camera) {
        // this._sprite.draw(context, this._pos.plus(camera.pos));
        this._sprite.draw(context, this._pos);
    }

}