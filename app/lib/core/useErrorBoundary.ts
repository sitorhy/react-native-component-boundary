import unexpectedCatch from "./unexpectedCatch";
import {ComponentPointcut} from "../components/common";

export default function useErrorBoundary<P>(
    ReactNative: { [prop: string]: any },
    outerHandler: Function,
    pointcut: ComponentPointcut<P>
): Function {
    return function (...args: any[]) {
        try {
            if (typeof outerHandler === "function") {
                return outerHandler.apply(undefined, args);
            }
        } catch (e) {
            try {
                if (typeof pointcut.fallbackRender === "function") {
                    pointcut.fallbackRender({
                        error: e,
                        errorInfo: null,
                        pointcut
                    });
                }
            } catch (ignore) {
                unexpectedCatch(ReactNative, ignore);
            }
        }
    };
}
