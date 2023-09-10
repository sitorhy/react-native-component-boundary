import unexpectedCatch from './unexpectedCatch';
import {ComponentPointcut} from '../components/common';

export default function useErrorBoundary(
    ReactNative: { [prop: string]: any },
    outerHandler: Function,
    pointcut: ComponentPointcut
): Function {
    return function (...args: any[]) {
        try {
            if (typeof outerHandler === 'function') {
                return outerHandler.apply(undefined, args);
            }
        } catch (e) {
            try {
                if (typeof pointcut.fallbackRender === 'function') {
                    pointcut.fallbackRender({
                        error: e,
                        pointcut
                    });
                }
            } catch (ignore) {
                unexpectedCatch(ReactNative, ignore);
            }
        }
    };
}
