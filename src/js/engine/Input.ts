export class Input {

    //TODO change to axis
    private static _keys: number[] = [];

    static get keys(): number[] {
        return this._keys;
    }

    //TODO change keyCode to key ?? code ?? keyCode
    //https://devstephen.medium.com/keyboardevent-key-for-cross-browser-key-press-check-61dbad0a067a
    private static _init = (() => {
        window.onkeydown = (e: KeyboardEvent) => {
            const key = e.keyCode ?? e.which;
            Input._keys.push(key);
            console.log(`${key} - ${e.key} - ${e.code}`);
        };
        
        window.onkeyup = (e: KeyboardEvent) => {
            const key = e.keyCode ?? e.which
            Input._keys = Input._keys.filter(e => e !== key);
        };
    })();

}