import { Vector } from "./Vector";
import { Collider } from "./Collider";
import { Dimension } from "./Dimension";
import { SpriteRenderer } from "./SpriteRenderer";

export class GameObject {

    private _visable: boolean = true;
    private _collision: boolean = true;

    constructor(
        protected _sprite: SpriteRenderer,
        protected _pos: Vector,
        protected _dim: Dimension,
    ) {}

    get visable(): boolean {
        return this._visable;
    }

    set visable(visable: boolean) {
        this._visable = visable;
    }

    get collision(): boolean {
        return this._collision;
    }

    set collision(collision: boolean) {
        this._collision = collision;
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
        if (this._collision) {
            return new Collider(this._pos, this._dim);
        } else {
            return null;
        }
    }

	update(delta: number) {
        this._sprite.update(delta);
    }

	draw(context: CanvasRenderingContext2D) {
        if (this._visable) {
            this._sprite.draw(context, this._pos);
        }
    }

}