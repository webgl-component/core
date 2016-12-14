declare namespace Constants {
    enum AttributeUsage {
        STATIC_DRAW = 0,
        DYNAMIC_DRAW = 1,
        STREAM_DRAW = 2,
    }
    enum AttributeType {
        BYTE = 0,
        UNSIGNED_BYTE = 1,
        SHORT = 2,
        UNSIGNED_SHORT = 3,
        FLOAT = 4,
    }
    enum DrawType {
        POINTS = 0,
        LINES = 1,
        LINE_STRIP = 2,
        LINE_LOOP = 3,
        TRIANGLES = 4,
        TRIANGLE_STRIP = 5,
        TRIANGLE_FAN = 6,
    }
    enum DrawMethod {
        ARRAYS = 0,
        ELEMENTS = 1,
    }
    enum ElementType {
        UNSIGNED_BYTE = 0,
        UNSIGNED_SHORT = 1,
    }
    enum UniformType {
        INT = 0,
        FLOAT = 1,
    }
    enum TextureMagFilter {
        LINEAR = 0,
        NEAREST = 1,
    }
    enum TextureMinFilter {
        LINEAR = 0,
        NEAREST_MIPMAP_NEAREST = 1,
        LINEAR_MIPMAP_NEAREST = 2,
        NEAREST_MIPMAP_LINEAR = 3,
        LINEAR_MIPMAP_LINEAR = 4,
    }
    enum TextureWrap {
        REPEAT = 0,
        CLAMP_TO_EDGE = 1,
        MIRRORED_REPEAT = 2,
    }
    enum TextureFormat {
        ALPHA = 0,
        RGB = 1,
        RGBA = 2,
        LUMINANCE = 3,
        LUMINANCE_ALPHA = 4,
    }
    enum TextureTexelFormat {
        UNSIGNED_BYTE = 0,
        UNSIGNED_SHORT_5_6_5 = 1,
        UNSIGNED_SHORT_4_4_4_4 = 2,
        UNSIGNED_SHORT_5_5_5_1 = 3,
    }
    type WebImage = ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    type TextureAlignment = 1 | 2 | 4 | 8;
    type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Uint32Array | Float32Array;
}
export default Constants;
