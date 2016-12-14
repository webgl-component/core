import Drawable from './Drawable';
import Constants from './Constants';
import Matrix3 from '../math/Matrix3';
import Vector2 from '../math/Vector2';
import { removeId } from '../utils/guid';
import GLContext from './GLContext';
import glConstant from '../utils/glConstant';


export default class Stage {
    private _children: Drawable[] = [];
    private hitMap: WebGLFramebuffer;

    constructor(gl: WebGLRenderingContext, width: number, height: number) {
        GLContext.gl = gl;
        GLContext.updateViewport(width, height);
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.drawingBufferWidth, gl.drawingBufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        const rb = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, rb);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, gl.drawingBufferWidth, gl.drawingBufferHeight);
        const fb = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, rb);
        this.hitMap = fb;
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    public get children(): Drawable[] {
        return this._children;
    }

    public get camera(): Vector2 {
        return GLContext.camera;
    }

    public get scale(): Vector2 {
        return GLContext.scale;
    }

    public add(child: Drawable): void {
        this._children.push(child);
    }

    public remove(child: Drawable): void {
        const index = this._children.indexOf(child);
        if (index !== -1) {
            this._children.splice(index, 1);
            removeId(child.id);
        }
    }

    clear() {
        const gl = GLContext.gl;
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    clickTest(x: number, y: number): number {
        const gl = GLContext.gl;
        const children = this._children.sort((a, b) => a.zIndex - b.zIndex);


        gl.disable(gl.BLEND);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.hitMap);
        for (const child of children) {
            gl.useProgram(child.program);
            child.offscreen = true;
            child.update();
            const drawType = glConstant(Constants.DrawType, child.drawType);
            if (child.drawMethod === Constants.DrawMethod.ARRAYS) {
                gl.drawArrays(drawType, child.startIndex, child.endIndex);
            } else {
                const elementType = glConstant(Constants.ElementType, child.elementType);
                gl.drawElements(drawType, child.endIndex, elementType, child.startIndex);
            }
        }
        const bytes = new Uint8Array(4);
        gl.readPixels(x, gl.drawingBufferHeight - y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, bytes);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        this.render();
        return bytes[0] * 255 * 255 + bytes[1] * 255 + bytes[2];
    }

    render() {
        const gl = GLContext.gl;
        const children = this._children.sort((a, b) => a.zIndex - b.zIndex);

        gl.disable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        for (const child of children) {
            gl.useProgram(child.program);
            child.offscreen = false;
            child.update();
            if (child.drawMethod === Constants.DrawMethod.ARRAYS) {
                gl.drawArrays(child.drawType, child.startIndex, child.endIndex);
            } else {
                gl.drawElements(child.drawType, child.endIndex, child.elementType, child.startIndex);
            }
        }

        GLContext.scale.updated = false;
        GLContext.camera.updated = false;
    }
}
