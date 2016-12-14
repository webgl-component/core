import {
    Attribute,
    Drawable,
    Stage,
} from '../dist';
import Test from '@webgl/test';
import * as path from 'path';
import * as chai from 'chai';
import * as gm from 'gm';


describe('triangle', () => {
    it('should draw plain triangle', done => {
        const test = new Test(100, 100);
        const stage = new Stage(test.gl, 100, 100);
        class Triangle extends Drawable {
            constructor() {
                super(
                    `
                        attribute vec2 a_position;

                        void main() {
                            gl_Position = projection(a_position);
                        }
                    `,
                    `
                        void main() {
                            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
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
        const triangle = new Triangle();
        triangle.attachAttribute('a_position', vertices);
        stage.add(triangle);
        stage.clear();
        stage.render();
        test.exportImage(path.resolve(__dirname, '../test-results/triangle.plain.png'));
        gm.compare(
            path.resolve(__dirname,'../test-input/triangle.plain.png'),
            path.resolve(__dirname,'../test-results/triangle.plain.png'),
            (err, isEqual) => {
                if (err) return done(err);
                chai.assert.isOk(isEqual);
                done();
            }
        );
    });
    it('should draw colorful triangle', done => {
        const test = new Test(100, 100);
        const stage = new Stage(test.gl, 100, 100);
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
        triangle.attachAttribute('a_position', vertices);
        triangle.attachAttribute('a_color', colors);
        stage.add(triangle);
        stage.clear();
        stage.render();
        test.exportImage(path.resolve(__dirname, '../test-results/triangle.color.png'));
        gm.compare(
            path.resolve(__dirname,'../test-input/triangle.color.png'),
            path.resolve(__dirname,'../test-results/triangle.color.png'),
            (err, isEqual) => {
                if (err) return done(err);
                chai.assert.isOk(isEqual);
                done();
            }
        );
    });
    it('should draw complex triangle', done => {
        const test = new Test(300, 300);
        const stage = new Stage(test.gl, 300, 300);
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
        triangle.position.x = 150;
        triangle.position.y = 150;
        triangle.scale.x = 1.5;
        triangle.scale.y = 1.5;
        triangle.rotation = Math.PI / 2;
        triangle.attachAttribute('a_position', vertices);
        triangle.attachAttribute('a_color', colors);
        stage.add(triangle);
        stage.clear();
        stage.render();
        test.exportImage(path.resolve(__dirname, '../test-results/triangle.complex.png'));
        gm.compare(
            path.resolve(__dirname,'../test-input/triangle.complex.png'),
            path.resolve(__dirname,'../test-results/triangle.complex.png'),
            (err, isEqual) => {
                if (err) return done(err);
                chai.assert.isOk(isEqual);
                done();
            }
        );
    });
});
