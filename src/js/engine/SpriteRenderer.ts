import { Vector } from "./Vector";

export interface SpriteRenderer {
    update(delta: number);
    draw(ctx: CanvasRenderingContext2D, pos: Vector);
}