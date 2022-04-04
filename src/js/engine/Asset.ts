import { Dimension } from "./Dimension";
import { Loadable } from "./Loader";

export class Asset implements Loadable {

    private _basePath: string = "./dist/assets/";

    private _img: HTMLImageElement;
    private _isLoaded: boolean = false;

    constructor(
        private _path: string,
        private _dim?: Dimension,
    ) {}

    get dim(): Dimension {
        return this._dim;
    }

    get isLoaded(): boolean {
        return this._isLoaded;
    }

    get img(): HTMLImageElement {
        return this._img;
    }

    private _createImage(dim?: Dimension): HTMLImageElement {
        if (dim) {
            return new Image(dim.width, dim.height);
        } else {
            return new Image();
        }
    }

    load(): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img: HTMLImageElement = this._createImage(this._dim);
            img.src = this._basePath + this._path;
            img.addEventListener("load", () => {
                this._isLoaded = true;
                this._dim.width = img.width;
                this._dim.height = img.height;
                this._img = img;
                resolve(img);
            });
            img.addEventListener("error", () => {
                reject(new Error(`${img.src} failed to load.`));
            });
        });
    }
}