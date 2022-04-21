export class Vector {

    constructor(
        readonly x: number, 
        readonly y: number,
    ) {}

    plus(pos: Vector): Vector {
        return new Vector(this.x + pos.x, this.y + pos.y);
    }

    minus(pos: Vector): Vector {
        return new Vector(this.x - pos.x, this.y - pos.y);
    }

}