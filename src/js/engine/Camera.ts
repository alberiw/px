import { Vector } from "./Vector";
import { Dimension } from "./Dimension";

export class Camera {

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

    moveTo(pos: Vector) {
        this._pos = pos;
    }

    moveOf(pos: Vector) {
        this._pos = this._pos.plus(pos);
    }

}