import AbstractUniform from './AbstractUniform';
import Attribute from './Attribute';
import Constants from './Constants';
import Uniform from './Uniform';
import Vector2 from '../math/Vector2';
import MatrixUniform from './MatrixUniform';
export default class Drawable {
    static POINTS: Constants.DrawType;
    static LINES: Constants.DrawType;
    static LINE_STRIP: Constants.DrawType;
    static LINE_LOOP: Constants.DrawType;
    static TRIANGLES: Constants.DrawType;
    static TRIANGLE_STRIP: Constants.DrawType;
    static TRIANGLE_FAN: Constants.DrawType;
    protected attributes: {
        [name: string]: {
            attribute: Attribute;
            attached: boolean;
        };
    };
    protected uniforms: {
        [name: string]: AbstractUniform;
    };
    protected _program: WebGLProgram;
    protected _drawType: Constants.DrawType;
    protected _startIndex: number;
    protected _endIndex: number;
    protected _id: number;
    protected _zIndex: number;
    protected _name: string;
    protected _drawMethod: Constants.DrawMethod;
    protected _elementType: Constants.ElementType;
    position: Vector2;
    scale: Vector2;
    _rotation: number;
    private rotationUpdated;
    protected u_offscreen: Uniform;
    protected _viewMatrix: MatrixUniform;
    constructor(vertexShaderString: string, fragmentShaderString: string);
    readonly id: number;
    offscreen: boolean;
    rotation: number;
    zIndex: number;
    readonly program: WebGLProgram;
    readonly drawType: Constants.DrawType;
    readonly drawMethod: Constants.DrawMethod;
    readonly elementType: Constants.ElementType;
    startIndex: number;
    endIndex: number;
    name: string;
    updateAttribuets(): void;
    updateUniforms(): void;
    attachAttribute(name: string, attribute: Attribute): void;
    detachAttribute(name: string): void;
    attachUniform(name: string, uniform: AbstractUniform): void;
    detachUniform(name: string): void;
    update(): void;
}
