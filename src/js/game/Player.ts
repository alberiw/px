import { GameObject } from "../engine/GameObject";
import { Vector } from "../engine/Vector";
import { Sprite } from "../engine/Sprite";
import { Direction } from "./Direction";
import { Camera } from "../engine/Camera";
import { Engine } from "../engine/Engine";

export class Player extends GameObject {

    private _direction: Direction;

    constructor(
        engine: Engine,
        sprite: Sprite, 
        pos: Vector, 
        direction: Direction | null,
        private _speed: number,
        collision: boolean,
        private _camera: Camera,
    ) {
        super(sprite, pos, []);
        // this.frameIndexX = 1,
        // this.numberOfFramesX = 3;
        // this.frameIndexY = 0,
        // this.numberOfFramesY = 4;
        // this.animation = [1,0,1,2];
    }

    get direction(): Direction {
        return this._direction;
    }

    set direction(direction: Direction) {
        this._direction = direction;
    }

    update(delta: number) {
        switch (this.direction) {
            case Direction.LEFT: {
                this._pos.x -= this._speed * delta;
                // this._sprite.animation(1);
                // const object = this._engine.chackCollision(this);
                // if (object !== null) {
                //     this._pos.x = object._pos.x + object.width;
                // }
                break;
            }
            case Direction.TOP: {
                this._pos.y -= this._speed * delta;
                // this._sprite.animation(3);
                // const object = this._engine.chackCollision(this);
                // if (object !== null) {
                //     this._pos.y = object._pos.y + object.height;
                // }
                break;
            }
            case Direction.RIGHT: {
                this._pos.x += this._speed * delta;
                // this._sprite.animation(2);
                // const object = this._engine.chackCollision(this);
                // if (object !== null) {
                //     this._pos.x = object._pos.x - this.width;
                // }
                break;
            }
            case Direction.DOWN: {
                this._pos.y += this._speed * delta;
                // this._sprite.animation(0);
                // const object = this._engine.chackCollision(this);
                // if (object !== null) {
                //     this._pos.y = object._pos.y - this.height;
                // }
                break;
            }
        }
    }
	
	// move(delta: number) {
    //     const tempPos = this._pos;
    //     super.move(delta);
    //     // this._camera.move(tempPos.minus(this._pos));
    // }
    
}