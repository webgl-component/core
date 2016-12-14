import GLContext from '../core/GLContext';
export default function glConstant(enums, value): number {
    return GLContext.gl[enums[value]];
}
