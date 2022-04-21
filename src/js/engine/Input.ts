import { KeyCode } from "./KeyCode";

export class Input {

    private static _keys: number[] = [];
    private static _axes: Map<string, [KeyCode, KeyCode]> = new Map([
        ["x", [KeyCode.ArrowLeft, KeyCode.ArrowRight]],
        ["y", [KeyCode.ArrowUp, KeyCode.ArrowDown]],
    ]);

    static get keys(): number[] {
        return this._keys;
    }

    static getAxis(name: string): number {
        const [key1, key2] = this._axes.get(name) ?? [null, null];
        return this._calcAxis(key1, key2);
    }

    static setAxis(name: string, key1: KeyCode, key2: KeyCode) {
        this._axes.set(name, [key1, key2]);
    }

    //TODO change keyCode to key ?? code ?? keyCode
    //https://devstephen.medium.com/keyboardevent-key-for-cross-browser-key-press-check-61dbad0a067a
    private static _init = (() => {
        window.onkeydown = (e: KeyboardEvent) => {
            console.debug(`${e.keyCode} - ${e.key} - ${e.code}`);
            const key = e.keyCode ?? e.which;
            Input._keys.push(key);
        };
        
        window.onkeyup = (e: KeyboardEvent) => {
            const key = e.keyCode ?? e.which;
            Input._keys = Input._keys.filter(e => e !== key);
        };
    })();

    private static _calcAxis(key1: KeyCode, key2: KeyCode): number {
        let axis = 0
        if (Input._keys.includes(key1)) {
            axis -= 1;
        }
        if (Input._keys.includes(key2)) {
            axis += 1;
        }
        return axis;
    }

}