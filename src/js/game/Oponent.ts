import { GameObject } from "../engine/GameObject";
import { Vector } from "../engine/Vector";
import { Sprite } from "../engine/Sprite";
import { Direction } from "./Direction";
import { Dimension } from "../engine/Dimension";

export class Oponent extends GameObject {

    private _nextDirection: Direction;

    constructor(
        sprite: Sprite, 
        pos: Vector, 
        dim: Dimension, 
        collision: boolean, 
        private _direction: Direction, 
        private _speed: number, 
    ) {
        super(sprite, pos, dim);
        // this.frameIndexX = 1,
        // this.numberOfFramesX = 3;
        // this.frameIndexY = 0,
        // this.numberOfFramesY = 4;
        // this.animation = [1,0,1,2];
    }
	
	// collider(object: GameObject) {
	// 	var result = super.collider(object);
	// 	if (result !== null) {
    //         switch (this._direction) {
    //             case Direction.RIGHT: {
    //                 this._nextDirection = Direction.LEFT;
    //                 break;
    //             }
    //             case Direction.LEFT: {
    //                 this._nextDirection = Direction.RIGHT;
    //                 break;
    //             }
    //             case Direction.TOP: {
    //                 this._nextDirection = Direction.DOWN;
    //                 break;
    //             }
    //             case Direction.DOWN: {
    //                 this._nextDirection = Direction.TOP;
    //                 break;
    //             }
    //         }
    //     }
	// 	return result;
    // }
    
    update(delta: number) {
        super.update(delta);
        this._direction = this._nextDirection;
        switch (this._direction) {
            case Direction.LEFT: {
                // this._sprite.animation(1);
                break;
            }
            case Direction.TOP: {
                // this._sprite.animation(3);
                break;
            }
            case Direction.RIGHT: {
                // this._sprite.animation(2);
                break;
            }
            case Direction.DOWN: {
                // this._sprite.animation(0);
                break;
            }
        }
        super.update(delta);
    }
}