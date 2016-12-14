import Constants from './Constants';
import GLContext from './GLContext';
import glConstant from '../utils/glConstant';

export default class Attribute {
    static STATIC_DRAW: Constants.AttributeUsage = Constants.AttributeUsage.STATIC_DRAW;
    static DYNAMIC_DRA: Constants.AttributeUsage = Constants.AttributeUsage.DYNAMIC_DRAW;
    static STREAM_DRAW: Constants.AttributeUsage = Constants.AttributeUsage.STREAM_DRAW;

    static BYTE: Constants.AttributeType = Constants.AttributeType.BYTE;
    static UNSIGNED_BYTE: Constants.AttributeType = Constants.AttributeType.UNSIGNED_BYTE;
    static SHORT: Constants.AttributeType = Constants.AttributeType.SHORT;
    static UNSIGNED_SHORT: Constants.AttributeType = Constants.AttributeType.UNSIGNED_SHORT;
    static FLOAT: Constants.AttributeType = Constants.AttributeType.FLOAT;


    protected updated: boolean = true;
    protected dataSize: number;
    protected _buffer: Constants.TypedArray;
    protected _bufferPointer: WebGLBuffer;
    protected _usage: Constants.AttributeUsage = Constants.AttributeUsage.STATIC_DRAW;
    protected _normalized: boolean = false;
    protected _stride: number = 0;
    protected _offset: number = 0;
    protected _type: Constants.AttributeType;
    protected _indexBuffer: Uint16Array | Uint8Array;

    constructor(
        buffer: Constants.TypedArray,
        type: Constants.AttributeType,
        dataSize: number
    ) {
        this._type = type;
        this._buffer = buffer;
        this.dataSize = dataSize;
    }

    public get needsUpdate(): boolean {
        return this.updated;
    }

    public get buffer(): WebGLBuffer {
        return this._bufferPointer;
    }

    set(index: number, ...data: number[]): void {
        if (data.length > this.dataSize) {
            throw new Error(`This attribute is for ${this.dataSize}-byte size array`);
        }
        for (let i = 0; i < data.length; i++) {
            this._buffer[index * this.dataSize + i] = data[i];
        }
        this.updated = true;
    }

    get(index: number): number[] {
        const result: number[] = [];
        for (let i = 0; i < this.dataSize; i++) {
            result.push(this._buffer[index * this.dataSize + i]);
        }
        return result;
    }

    public get indexBuffer(): Uint16Array | Uint8Array {
        return this._indexBuffer;
    }

    public set indexBuffer(indexBuffer: Uint16Array | Uint8Array) {
        this._indexBuffer = indexBuffer;
        this.updated = true;
    }

    replaceWith(buffer: Constants.TypedArray): void {
        this._buffer = buffer;
    }


    update(loc: number): void {
        const gl = GLContext.gl;
        if (!this._bufferPointer) {
            this._bufferPointer = gl.createBuffer();
        }

        const usage = glConstant(Constants.AttributeUsage, this._usage);
        const type = glConstant(Constants.AttributeType, this._type);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._bufferPointer);
        gl.bufferData(gl.ARRAY_BUFFER, this._buffer, usage);
        gl.vertexAttribPointer(
            loc,
            this.dataSize,
            type,
            this._normalized,
            this._stride,
            this._offset
        );
        if (this._indexBuffer) {
            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer, usage);
        }
        this.updated = false;
    }
}
