import Vector2 from '../math/Vector2';
import Matrix3 from '../math/Matrix3';
import Constants from './Constants';


export class GLContext {
    private _gl: WebGLRenderingContext;
    private _camera: Vector2 = new Vector2(0, 0);
    private _scale: Vector2 = new Vector2(1.0, 1.0);
    private _viewport: Matrix3;

    public updateViewport(width: number, height: number) {
        this._gl.viewport(0, 0, width, height);
        this._viewport = new Matrix3(
            2.0 / width, 0.0, 1.0,
            0.0, -2.0 / height, 1.0,
            -1.0, 1.0, 1.0,
        );
    }


    public get gl(): WebGLRenderingContext {
        return this._gl;
    }

    public set gl(gl: WebGLRenderingContext) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        this._gl = gl;
    }

    public get viewport(): Matrix3 {
        return this._viewport;
    }

    public get camera(): Vector2 {
        return this._camera;
    }

    public get scale(): Vector2 {
        return this._scale;
    }

}

const context = new GLContext();
export default context;
