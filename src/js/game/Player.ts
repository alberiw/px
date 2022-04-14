import { GameObject } from "../engine/GameObject";
import { Vector } from "../engine/Vector";
import { CollisionManager } from "../engine/CollisionManager";
import { Dimension } from "../engine/Dimension";
import { SpriteRenderer } from "../engine/SpriteRenderer";
import { StateMachine } from "../engine/Animator";
import { Input } from "../engine/Input";

import { Direction } from "./Direction";
import { KeyCode } from "../engine/KeyCode";

export class Player extends GameObject {

    private _collisionManager: CollisionManager;

    constructor(
        sprite: SpriteRenderer, 
        pos: Vector, 
        dim: Dimension, 
        private _direction: Direction, 
        private _velocity: number, 
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
            this._sprite.setParmeter("keys", Input.keys);
        }
        if (Input.keys.length == 0) {
            this._direction = null;
        } else if (!Input.keys.some(e => e === this._direction)) {
            this._direction = Input.keys.find(e => KeyCode.ArrowLeft <= e && e <= KeyCode.ArrowDown);
        }
        super.update(delta);
        switch (this._direction) {
            case Direction.LEFT: {
                const pos = new Vector(this._pos.x - this._velocity * delta, this.pos.y)
                this._pos = this._collisionManager.chackCollision(this, pos);
                break;
            }
            case Direction.TOP: {
                const pos = new Vector(this._pos.x, this.pos.y - this._velocity * delta)
                this._pos = this._collisionManager.chackCollision(this, pos);
                break;
            }
            case Direction.RIGHT: {
                const pos = new Vector(this._pos.x + this._velocity * delta, this.pos.y)
                this._pos = this._collisionManager.chackCollision(this, pos);
                break;
            }
            case Direction.DOWN: {
                const pos = new Vector(this._pos.x, this.pos.y + this._velocity * delta)
                this._pos = this._collisionManager.chackCollision(this, pos);
                break;
            }
        }
    }
    
}