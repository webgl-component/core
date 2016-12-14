import Attribute from './src/core/Attribute';
import Drawable from './src/core/Drawable';
import Stage from './src/core/Stage';
import Uniform from './src/core/Uniform';
import Vector2 from './src/math/Vector2';
import Texture from './src/core/Texture';
import Font from './src/core/Font';
import ImageUtil from './src/utils/ImageUtil';
import Color from './src/core/Color';

const canvas = document.createElement('canvas');
canvas.width = 1000;
canvas.height = 1000;
const gl = canvas.getContext('webgl');
gl.clearColor(0, 0, 0, 0);
document.body.appendChild(canvas);
const stage = new Stage(gl, 1000, 1000);

class Triangle extends Drawable {
    constructor() {
        super(
            `
                attribute   vec2 a_position;
                attribute   vec4 a_color;
                varying     vec4 v_color;

                void main() {
                    v_color = a_color;
                    gl_Position = projection(a_position);
                }
            `,
            `
                varying     vec4 v_color;
                void main() {
                    gl_FragColor = v_color;
                }
            `
        );
        this._endIndex = 3;
    }
}

const vertices = new Attribute(new Float32Array(6), Attribute.FLOAT, 2);
vertices.set(0, 0, 0);
vertices.set(1, 0, 100);
vertices.set(2, 100, 100);
const colors = new Attribute(new Float32Array(12), Attribute.FLOAT, 4);
colors.set(0, 1, 0, 0, 1);
colors.set(1, 0, 1, 0, 1);
colors.set(2, 0, 0, 1, 1);
const triangle = new Triangle();
triangle.position.x = 100;
triangle.position.y = 100;
//triangle.rotation = Math.PI / 2;
triangle.attachAttribute('a_position', vertices);
triangle.attachAttribute('a_color', colors);
stage.add(triangle);


function render() {
    stage.clear();
    stage.render();
    triangle.rotation = (triangle.rotation + 0.01) % (Math.PI * 2);
    requestAnimationFrame(render);
}

render();


document.onmousedown = e => {
    console.log(`click: ${stage.clickTest(e.clientX, e.clientY)}`);
}
