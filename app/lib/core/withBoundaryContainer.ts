import React from 'react';
import {ComponentPointcut} from '../components/common';
import unexpectedCatch from './unexpectedCatch';
import useErrorBoundary from './useErrorBoundary';

export default function withBoundaryContainer(
    ReactNative: { [prop: string]: any },
    pointcut: ComponentPointcut
) {
    return function (props: { [k: string]: any }) {
        try {
            const injection = Object.assign({}, props);
            if (Array.isArray(pointcut.handlers) && pointcut.handlers.length) {
                pointcut.handlers.forEach(i => {
                    Object.assign(injection, {
                        [i]: useErrorBoundary(ReactNative, props[i], pointcut)
                    });
                });
            }
            if (pointcut.component) {
                return React.createElement(pointcut.component, injection);
            } else {
                return null;
            }
        } catch (e) {
            if (typeof pointcut.fallbackComponent === 'function') {
                try {
                    const fallbackComponent = pointcut.fallbackComponent({
                        error: e,
                        pointcut
                    });
                    return React.isValidElement(fallbackComponent)
                        ? fallbackComponent
                        : null;
                } catch (ignore) {
                    unexpectedCatch(ReactNative, ignore);
                    return null;
                }
            }
        }
    };
}
