import { GameObject } from "./GameObject";
import { Loader } from "./Loader";

export class Engine {

    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _interval: number;

    private _maxFps = 60;
    private _lastFrame = 0;
    private _delta = 0;
    private _timestep = 1000 / this._maxFps;

    private _gameObjects: GameObject[];

    constructor() {
        this._canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this._canvas.height = window.innerHeight;
        this._canvas.width = window.innerWidth;
        this._context = this._canvas.getContext("2d");
        this._gameObjects = [];
    }

    get gameObjects(): GameObject[] {
        return this._gameObjects;
    }

    add(gameObject: GameObject) {
        this._gameObjects.push(gameObject);
    }

    start(loader: Loader) {
        loader.load().then(() => this._interval = requestAnimationFrame(this._mainLoop()));
    }

    stop() {
        cancelAnimationFrame(this._interval);
    }

    private _update(delta: number) {
        this._gameObjects.forEach(gameObject => {
            gameObject.update(delta);
        });
    }

    private _draw(delta: number) {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._gameObjects.forEach(gameObject => {
            gameObject.draw(this._context);
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