import unexpectedCatch from './unexpectedCatch';
import {ComponentPointcut} from '../components/common';

export default function useErrorBoundary(
  ReactNative: {[prop: string]: any},
  outerHandler: Function,
  pointcut: ComponentPointcut
) {
  return function () {
    try {
      if (typeof outerHandler === 'function') {
        return outerHandler.apply(undefined, arguments);
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
