import { Asset } from "./Asset";
import { Dimension } from "./Dimension";

export class TileMap {

    constructor(
        private _asset: Asset,
        private _dim: Dimension,
        private _template: number[][]
    ) {}

    draw(ctx: CanvasRenderingContext2D) {
        const rows = this._template.length;
        const columns = this._template[0].length;

        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                const tile = this._template[row][column];
                ctx.drawImage(
                    this._asset.img,
                    tile * this._dim.width,
                    tile * this._dim.height,
                    this._dim.width,
                    this._dim.height,
                    column * this._dim.width,
                    row * this._dim.height,
                    this._dim.width,
                    this._dim.height
                );
            }
        }
    }
    
}