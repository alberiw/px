export interface Loadable {
    load(): Promise<any>
}

export class Loader {

    private _loadables: Loadable[];

    constructor() {
        this._loadables = [];
    }

    add(loadable: Loadable) {
        this._loadables.push(loadable);
    }

    load(): Promise<any[]> {
        return Promise.all(this._loadables.map(e => e.load()));
    }

}