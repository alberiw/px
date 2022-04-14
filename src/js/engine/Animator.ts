import { SpriteRenderer } from "./SpriteRenderer";
import { Vector } from "./Vector";

//Animator
export class StateMachine implements SpriteRenderer {

    private _state: State = this._default;
    private _states: State[] = [];
    private _transitions: Transition[] = [];
    private _prameters: Map<string, any> = new Map();

    constructor(
        private _default: State
    ) {}

    addState(state: State) {
        this._states.push(state);
    }

    addTransition(transition: Transition) {
        this._transitions.push(transition);
    }

    setParmeter(key: string, value: any) {
        this._prameters.set(key, value);
    }

    update(delta: number) {
        const transitions = this._transitions.filter(e => e[0](this._prameters) === true);
        if (transitions.length > 0) {
            if (!transitions.map(e => e[1]).includes(this._state)) {
                this._state = transitions[0][1];
            }
        } else {
            this._state = this._default;
        }
        this._state.update(delta);
    }

    draw(ctx: CanvasRenderingContext2D, pos: Vector) {
        this._state.draw(ctx, pos);
    }
}

//Layer
export type State = SpriteRenderer;

export type Transition = [Condition, State];

export type Condition = (prameters: Map<string, any>) => boolean;
