import { GameObject } from "../engine/GameObject";
import { Vector } from "../engine/Vector";
import { CollisionManager } from "../engine/CollisionManager";
import { Dimension } from "../engine/Dimension";
import { SpriteRenderer } from "../engine/SpriteRenderer";
import { StateMachine } from "../engine/Animator";
import { Input } from "../engine/Input";
import { KeyCode } from "../engine/KeyCode";

export class Player extends GameObject {

    private _collisionManager: CollisionManager;

    constructor(
        sprite: SpriteRenderer, 
        pos: Vector, 
        dim: Dimension, 
        private _velocity: number, 
    ) {
        super(sprite, pos, dim);
    }

    set collisionManger(collisionManager: CollisionManager) {
        this._collisionManager = collisionManager;
    }

    update(delta: number) {
        if (this._sprite instanceof StateMachine) {
            this._sprite.setParmeter("keys", Input.keys);
            this._sprite.setParmeter("x", Input.getAxis("x"));
            this._sprite.setParmeter("y", Input.getAxis("y"));
        }

        const x = this._pos.x + Input.getAxis("x") * this._velocity * delta;
        const y = this._pos.y + Input.getAxis("y") * this._velocity * delta;

        //TODO
        //this._pos = this._collisionManager.chackCollision(this, new Vector(x, y));
        const direction = Input.keys.find(e => KeyCode.ArrowLeft <= e && e <= KeyCode.ArrowDown)
        if (direction == KeyCode.ArrowLeft || direction == KeyCode.ArrowRight) {
            this._pos = this._collisionManager.chackCollision(this, new Vector(x, this._pos.y));
        } else {
            this._pos = this._collisionManager.chackCollision(this, new Vector(this._pos.x, y));
        }

        super.update(delta);
    }
    
}