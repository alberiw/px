export class Vector {

    constructor(
        private _x: number, 
        private _y: number,
    ) {}

    get x(): number {
        return this._x;
    }

    set x(x: number) {
        this._x = x;
    }

    get y(): number {
        return this._y;
    }

    set y(y: number) {
        this._y = y;
    }

    plus(pos: Vector): Vector {
        this._x += pos.x;
        this._y += pos.y ;
        return this;
    }

    minus(pos: Vector): Vector {
        this._x -= pos.x;
        this._y -= pos.y;
        return this;
    }

}