import {ComponentPointcut} from './components/common';
import withBoundaryContainer from './core/withBoundaryContainer';
import withErrorBoundary from './core/withErrorBoundary';
import withTarget from './core/withTarget';

import CoreComponents from './components/core';

export interface ContextType {
  withBoundaryContainer: (
    pointcut: ComponentPointcut
  ) => ReturnType<typeof withBoundaryContainer>;
  withErrorBoundary: (
    Component: Function,
    pointcut: ComponentPointcut
  ) => ReturnType<typeof withErrorBoundary>;
}

export default function (ReactNative: {[prop: string]: any}): ContextType {
  const context: ContextType = {
    withBoundaryContainer: (pointcut: ComponentPointcut) => {
      return withBoundaryContainer(ReactNative, pointcut);
    },
    withErrorBoundary: (Component: Function, pointcut: ComponentPointcut) => {
      return withErrorBoundary(ReactNative, Component, pointcut);
    }
  };

  withTarget(ReactNative, CoreComponents);

  return context;
}
