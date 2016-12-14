import GLContext from './GLContext';

const gl = GLContext.gl;

namespace Constants {
    export enum AttributeUsage {
        STATIC_DRAW,
        DYNAMIC_DRAW,
        STREAM_DRAW,
    }
    export enum AttributeType {
        BYTE,
        UNSIGNED_BYTE,
        SHORT,
        UNSIGNED_SHORT,
        FLOAT,
    }
    export enum DrawType {
        POINTS,
        LINES,
        LINE_STRIP,
        LINE_LOOP,
        TRIANGLES,
        TRIANGLE_STRIP,
        TRIANGLE_FAN,
    }
    export enum DrawMethod {
        ARRAYS,
        ELEMENTS,
    }
    export enum ElementType {
        UNSIGNED_BYTE,
        UNSIGNED_SHORT,
    }
    export enum UniformType {
        INT,
        FLOAT,
    }
    export enum TextureMagFilter {
        LINEAR,
        NEAREST,
    }
    export enum TextureMinFilter {
        LINEAR,
        NEAREST_MIPMAP_NEAREST,
        LINEAR_MIPMAP_NEAREST,
        NEAREST_MIPMAP_LINEAR,
        LINEAR_MIPMAP_LINEAR,
    }
    export enum TextureWrap {
        REPEAT,
        CLAMP_TO_EDGE,
        MIRRORED_REPEAT,
    }
    export enum TextureFormat {
        ALPHA,
        RGB,
        RGBA,
        LUMINANCE,
        LUMINANCE_ALPHA,
    }
    export enum TextureTexelFormat {
        UNSIGNED_BYTE,
        UNSIGNED_SHORT_5_6_5,
        UNSIGNED_SHORT_4_4_4_4,
        UNSIGNED_SHORT_5_5_5_1,
    }
    export type WebImage = ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    export type TextureAlignment = 1 | 2 | 4 | 8;
    export type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Uint32Array | Float32Array;
}

export default Constants;
