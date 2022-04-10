import { GameObject } from "../engine/GameObject";
import { Vector } from "../engine/Vector";
import { Sprite } from "../engine/Sprite";
import { Direction } from "./Direction";
import { Camera } from "../engine/Camera";
import { Engine } from "../engine/Engine";
import { CollisionManager } from "../engine/CollisionManager";

export class Player extends GameObject {

    private _direction: Direction;
    private _collisionManager: CollisionManager;

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

    set collisionManger(collisionManager: CollisionManager) {
        this._collisionManager = collisionManager;
    }

    update(delta: number) {
        super.update(delta);
        switch (this.direction) {
            case Direction.LEFT: {
                const pos = new Vector(this._pos.x - this._speed * delta, this.pos.y)
                this._pos = this._collisionManager.chackCollision(this, pos);
                console.log(this._pos);
                break;
            }
            case Direction.TOP: {
                const pos = new Vector(this._pos.x, this.pos.y - this._speed * delta)
                this._pos = this._collisionManager.chackCollision(this, pos);
                console.log(this._pos);
                break;
            }
            case Direction.RIGHT: {
                const pos = new Vector(this._pos.x + this._speed * delta, this.pos.y)
                this._pos = this._collisionManager.chackCollision(this, pos);
                console.log(this._pos);
                break;
            }
            case Direction.DOWN: {
                const pos = new Vector(this._pos.x, this.pos.y + this._speed * delta)
                this._pos = this._collisionManager.chackCollision(this, pos);
                console.log(this._pos);
                break;
            }
        }
    }
    
}