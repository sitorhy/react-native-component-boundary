import {ComponentPointcut} from '../components/common';
import unexpectedCatch from './unexpectedCatch';
import React from "react";

export default function withErrorBoundary(
    ReactNative: { [prop: string]: any },
    Component: (...args: any[]) => React.JSX.Element,
    pointcut: ComponentPointcut
) {
    return function () {
        try {
            return Component(...arguments);
        } catch (e) {
            try {
                if (typeof pointcut.fallbackComponent === 'function') {
                    return pointcut.fallbackComponent({
                        error: e,
                        pointcut
                    });
                }
            } catch (ignore) {
                unexpectedCatch(ReactNative, ignore);
                return null;
            }
        }
    };
}
