import Drawable from './Drawable';
import Vector2 from '../math/Vector2';
export default class Stage {
    private _children;
    private hitMap;
    constructor(gl: WebGLRenderingContext, width: number, height: number);
    readonly children: Drawable[];
    readonly camera: Vector2;
    readonly scale: Vector2;
    add(child: Drawable): void;
    remove(child: Drawable): void;
    clear(): void;
    clickTest(x: number, y: number): number;
    render(): void;
}
