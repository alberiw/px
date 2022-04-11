import { Dimension } from "./Dimension";
import { Vector } from "./Vector";

export class Collider {

    constructor(
        private _pos: Vector,
        private _dim: Dimension,
    ) {}

    get pos(): Vector {
        return this._pos;
    }

    get dim(): Dimension {
        return this._dim;
    }
    
    collide(other: Collider): boolean {
        console.log(`${this._pos.x}, ${this._pos.y} = ${other._pos.x}, ${other._pos.y}`)
        if (!other || this === other) {
            return false;
        }
        return (
            this._pos.x + this._dim.width > other._pos.x &&
            this._pos.x < other._pos.x + other._dim.width &&
            this._pos.y + this._dim.height > other._pos.y &&
            this._pos.y < other._pos.y + other._dim.height
        )
    }

}