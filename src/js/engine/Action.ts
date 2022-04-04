import { GameObject } from "./GameObject";
import { Vector } from "./Vector";

export class Action {

    constructor(
        private _object: GameObject,
    ) {}

    moveOf(pos: Vector) {
        this._object.pos = this._object.pos.plus(pos);
    }

    moveTo(pos: Vector) {
        this._object.pos = pos;
    }

}