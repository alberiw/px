import { Collider } from "./Collider";
import { GameObject } from "./GameObject";
import { Vector } from "./Vector";

//TODO replace by AABB tree
//https://www.azurefromthetrenches.com/introductory-guide-to-aabb-tree-collision-detection/
export class CollisionManager {

    constructor(
        private _gameObjects: GameObject[]
    ) {}

    chackCollision(gameObject1: GameObject, target: Vector): Vector {
        if (!gameObject1.collider) {
            return null;
        }
        const collider = new Collider(target, gameObject1.collider.dim)

        const result = this._gameObjects
            .filter(gameObject2 => collider.collide(gameObject2.collider));

        if (result.length > 0) {
            return this.max(target, gameObject1, result.map(e => e.collider));
        } else {
            return target;
        }
    }

    max(target: Vector, collider1: GameObject, colliders: Collider[]): Vector {
        console.log(`> ${target.y} ${target.x}`)
        console.log(`< ${collider1.pos.y} ${collider1.pos.x}`)
        const collider2 = colliders[0]; //TODO
        if (target.y == collider1.pos.y) {
            if (collider1.pos.x > collider2.pos.x) {
                //left
                console.log("left");
                return new Vector(collider2.pos.x + collider2.dim.width, collider1.pos.y);
            } else {
                //right
                console.log("right")
                return new Vector(collider2.pos.x - collider1.collider.dim.width, collider1.pos.y);
            }
        } else if (target.x == collider1.pos.x) {
            if (collider1.pos.y > collider2.pos.y) {
                //top
                console.log("top")
                return new Vector(collider1.pos.x, collider2.pos.y + collider2.dim.height);
            } else {
                //down
                console.log("down")
                return new Vector(collider1.pos.x, collider2.pos.y - collider1.collider.dim.height);
            }
        } else {
            console.log("boom");
        }
    }

}