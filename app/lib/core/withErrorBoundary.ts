import {ComponentPointcut} from '../components/common';
import unexpectedCatch from './unexpectedCatch';

export default function withErrorBoundary(
  ReactNative: {[prop: string]: any},
  Component: Function,
  pointcut: ComponentPointcut
) {
  return function () {
    try {
      return Component.apply(undefined, arguments);
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
