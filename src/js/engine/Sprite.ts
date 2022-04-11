import { Vector } from "./Vector";
import { Asset } from "./Asset";
import { Dimension } from "./Dimension";
import { SpriteRenderer } from "./SpriteRenderer";

export class Sprite implements SpriteRenderer {

    constructor(
        private _asset: Asset,
        private _frameIndexX: number = 0,
        private _frameIndexY: number = 0,
        private _dim: Dimension = _asset.dim,
    ) {}

    get width(): number {
        return this._dim.width;
    }

    get height(): number {
        return this._dim.height;
    }

    update(delta: number) {}

    draw(ctx: CanvasRenderingContext2D, pos: Vector) {
        ctx.drawImage(
            this._asset.img,
            this._frameIndexX * this.width,
            this._frameIndexY * this.height,
            this.width,
            this.height,
            pos.x,
            pos.y,
            this.width,
            this.height
        );
    }
  
}

export class SpriteBuilder {

    private _columns: number = 1;
    private _rows: number = 1;
    private _dim: Dimension = this._asset.dim;

    constructor(
        private _asset: Asset
    ) {}

    columns(columns: number): SpriteBuilder {
        this._columns = columns;
        return this;
    }

    rows(rows: number): SpriteBuilder {
        this._rows = rows;
        return this;
    }

    dim(dim: Dimension): SpriteBuilder {
        this._dim = dim;
        return this;
    }

    build(): Sprite[] {
        const sprites: Sprite[] = [];
        for (let x = 0; x < this._columns; x++) {
            for (let y = 0; y < this._rows; y++) {
                sprites.push(new Sprite(this._asset, x, y, this._dim));
            }
        }
        return sprites;
    }

}