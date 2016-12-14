import AbstractUniform from './AbstractUniform';
import Constants from './Constants';
import GLContext from './GLContext';
import glConstant from '../utils/glConstant';



export default class MatrixUniform extends AbstractUniform {

    private buffer: Float32Array;
    private _size: number;

    constructor(size: number) {
        super();
        this._size = size;
        this.buffer = new Float32Array(size * size);
    }
    protected _update(loc: WebGLUniformLocation): void {
        const gl = GLContext.gl;
        gl[`uniformMatrix${this._size}fv`](loc, false, this.buffer);
    }

    set(col: number, row: number, value: number): void {
        this.buffer[col * this._size + row] = value;
    }

    replace(buffer: Float32Array): void {
        this.buffer = buffer;
        this.updated = true;
    }

    public get size(): number {
        return this._size;
    }

    get(col: number, row: number): number {
        return this.buffer[col * this.size + row];
    }
}
