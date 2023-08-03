import createFallbackRender from './createFallbackRender';
import withBoundaryContainer from './withBoundaryContainer';
import {ComponentPointcut} from '../components/common';

export default function withTarget(
    ReactNative: { [prop: string]: any },
    pointcuts: ComponentPointcut[]
) {
    if (!pointcuts || !pointcuts.length) {
        return;
    }
    if (!ReactNative) {
        return;
    }
    const properties: {
        name: string | number | symbol;
        configurable?: boolean;
        enumerable?: boolean;
        value?: any;
        writable?: boolean;
        get?(): any;
        set?(v: any): void;
    }[] = [];

    const defaultFallbackRender = createFallbackRender(ReactNative);

    pointcuts.forEach(function (pointcut) {
        if (pointcut.name) {
            const component = ReactNative[pointcut.name];
            pointcut.accepted =
                typeof component === 'function' ||
                (typeof component === 'object' &&
                    typeof component.render === 'function');
            if (pointcut.accepted && !pointcut.component) {
                if (typeof pointcut.fallbackRender !== 'function') {
                    pointcut.fallbackRender = defaultFallbackRender;
                }
                pointcut.component = component;
                properties.push({
                    name: pointcut.name,
                    value: withBoundaryContainer(ReactNative, pointcut)
                });
            }
        }
    });
    if (properties.length) {
        Object.defineProperties(
            ReactNative,
            properties.reduce((s, i) => {
                const {name, ...o} = i;
                Object.assign(s, {
                    [name]: o
                });
                return s;
            }, {})
        );
    }
}
