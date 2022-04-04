import { GameObject } from "./GameObject";
import { Camera } from "./Camera";
import { Loader } from "./Loader";

export class Engine {

    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _interval: number;

    private _maxFps = 60;
    private _lastFrame = 0;
    private _delta = 0;
    private _timestep = 1000 / this._maxFps;

    private _camera: Camera;
    private _gameObjects: GameObject[];

    constructor() {
        this._canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this._canvas.height = window.innerHeight;
        this._canvas.width = window.innerWidth;
        this._context = this._canvas.getContext("2d");
        this._gameObjects = [];
    }

    add(camera: Camera)
    add(gameObject: GameObject)
    add(input: Camera | GameObject) {
        if (input instanceof Camera) {
            this._camera = input;
        } else {
            this._gameObjects.push(input);
        }
    }

    start(loader: Loader) {
        loader.load().then(() => this._interval = requestAnimationFrame(this._mainLoop()));
    }

    stop() {
        cancelAnimationFrame(this._interval);
    }

    //TODO replace by AABB tree
    //https://www.azurefromthetrenches.com/introductory-guide-to-aabb-tree-collision-detection/
    chackCollision(o1: GameObject): GameObject | null {
        if (!o1.collider) {
            return null;
        }
        const result = this._gameObjects
            .filter(gameObject => o1.collider.collide(gameObject.collider));
    
        if (result.length > 0) {
            console.log("collision", o1, result)
            return result[0];
        } else {
            return null;
        }
    }

    private _update(delta: number) {
        this._gameObjects.forEach(gameObject => {
            // gameObject.move(delta);
            gameObject.update(delta);
            this.chackCollision(gameObject);
        });
    }

    private _draw(delta: number) {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._gameObjects.forEach(gameObject => {
            gameObject.draw(this._context, this._camera);
        })
    }

    private _mainLoop(): FrameRequestCallback {
        return (time: number) => {
            try {
                let numUpdateSteps = 0;
                this._delta += time - this._lastFrame;
                this._lastFrame = time;
                while (this._delta >= this._timestep) {
                    this._update(this._timestep);
                    this._delta -= this._timestep;
                    if (++numUpdateSteps >= 240) {
                        this._delta = 0;
                        break;
                    }
                }
                this._draw(this._timestep);
                this._interval = requestAnimationFrame(this._mainLoop());
            } catch(err) {
                console.error(err);
                cancelAnimationFrame(this._interval);
            }
        }
    }

}