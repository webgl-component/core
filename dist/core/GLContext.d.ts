import Vector2 from '../math/Vector2';
import Matrix3 from '../math/Matrix3';
export declare class GLContext {
    private _gl;
    private _camera;
    private _scale;
    private _viewport;
    updateViewport(width: number, height: number): void;
    gl: WebGLRenderingContext;
    readonly viewport: Matrix3;
    readonly camera: Vector2;
    readonly scale: Vector2;
}
declare const context: GLContext;
export default context;
