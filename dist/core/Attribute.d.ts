import Constants from './Constants';
export default class Attribute {
    static STATIC_DRAW: Constants.AttributeUsage;
    static DYNAMIC_DRA: Constants.AttributeUsage;
    static STREAM_DRAW: Constants.AttributeUsage;
    static BYTE: Constants.AttributeType;
    static UNSIGNED_BYTE: Constants.AttributeType;
    static SHORT: Constants.AttributeType;
    static UNSIGNED_SHORT: Constants.AttributeType;
    static FLOAT: Constants.AttributeType;
    protected updated: boolean;
    protected dataSize: number;
    protected _buffer: Constants.TypedArray;
    protected _bufferPointer: WebGLBuffer;
    protected _usage: Constants.AttributeUsage;
    protected _normalized: boolean;
    protected _stride: number;
    protected _offset: number;
    protected _type: Constants.AttributeType;
    protected _indexBuffer: Uint16Array | Uint8Array;
    constructor(buffer: Constants.TypedArray, type: Constants.AttributeType, dataSize: number);
    readonly needsUpdate: boolean;
    readonly buffer: WebGLBuffer;
    set(index: number, ...data: number[]): void;
    get(index: number): number[];
    indexBuffer: Uint16Array | Uint8Array;
    replaceWith(buffer: Constants.TypedArray): void;
    update(loc: number): void;
}
