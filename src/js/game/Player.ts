import { GameObject } from "../engine/GameObject";
import { Vector } from "../engine/Vector";
import { Direction } from "./Direction";
import { Camera } from "../engine/Camera";
import { CollisionManager } from "../engine/CollisionManager";
import { Dimension } from "../engine/Dimension";
import { SpriteRenderer } from "../engine/SpriteRenderer";
import { StateMachine } from "../engine/Animator";

export class Player extends GameObject {

    private _collisionManager: CollisionManager;

    constructor(
        sprite: SpriteRenderer, 
        pos: Vector, 
        dim: Dimension, 
        collision: boolean, 
        private _direction: Direction, 
        private _speed: number, 
        private _camera: Camera, 
    ) {
        super(sprite, pos, dim);
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
        if (this._sprite instanceof StateMachine) {
            this._sprite.setParmeter("keys", globalThis.keys);
        }
        super.update(delta);
        switch (this._direction) {
            case Direction.LEFT: {
                const pos = new Vector(this._pos.x - this._speed * delta, this.pos.y)
                this._pos = this._collisionManager.chackCollision(this, pos);
                break;
            }
            case Direction.TOP: {
                const pos = new Vector(this._pos.x, this.pos.y - this._speed * delta)
                this._pos = this._collisionManager.chackCollision(this, pos);
                break;
            }
            case Direction.RIGHT: {
                const pos = new Vector(this._pos.x + this._speed * delta, this.pos.y)
                this._pos = this._collisionManager.chackCollision(this, pos);
                break;
            }
            case Direction.DOWN: {
                const pos = new Vector(this._pos.x, this.pos.y + this._speed * delta)
                this._pos = this._collisionManager.chackCollision(this, pos);
                break;
            }
        }
    }
    
}