import { KeyCode } from "./KeyCode";

export class Input {

    private static _keys: number[] = [];
    private static _axes: Map<string, number> = new Map();

    static get keys(): number[] {
        return this._keys;
    }

    static getAxis(key: string): number {
        return this._axes.get(key) ?? 0;
    }

    //TODO change keyCode to key ?? code ?? keyCode
    //https://devstephen.medium.com/keyboardevent-key-for-cross-browser-key-press-check-61dbad0a067a
    private static _init = (() => {
        window.onkeydown = (e: KeyboardEvent) => {
            console.log(`${e.keyCode} - ${e.key} - ${e.code}`);
            const key = e.keyCode ?? e.which;
            Input._keys.push(key);
            Input._updateAxes();
            
        };
        
        window.onkeyup = (e: KeyboardEvent) => {
            const key = e.keyCode ?? e.which;
            Input._keys = Input._keys.filter(e => e !== key);
            Input._updateAxes();
        };
    })();

    private static _updateAxes() {
        let x = 0
        if (Input._keys.includes(KeyCode.ArrowLeft)) {
            x -= 1;
        }
        if (Input._keys.includes(KeyCode.ArrowRight)) {
            x += 1;
        }
        Input._axes.set("x", x);
        
        let y = 0
        if (Input._keys.includes(KeyCode.ArrowUp)) {
            y -= 1;
        }
        if (Input._keys.includes(KeyCode.ArrowDown)) {
            y += 1;
        }
        Input._axes.set("y", y)
    }

}