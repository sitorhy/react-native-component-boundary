import React from "react";
import {ComponentPointcut, FallbackProps} from './components/common';
import withBoundaryContainer from './core/withBoundaryContainer';
import withErrorBoundary from './core/withErrorBoundary';
import useErrorBoundary from './core/useErrorBoundary';
import withTarget from './core/withTarget';

import CoreComponents from './components/core';
import AndroidComponents from './components/android';
import IosComponents from './components/ios';

export interface ContextType {
    useErrorBoundary: (
        outerHandler: Function,
        pointcut: ComponentPointcut
    ) => ReturnType<typeof useErrorBoundary> | Function;
    withBoundaryContainer: (
        pointcut: ComponentPointcut
    ) => ReturnType<typeof withBoundaryContainer> | any;
    withErrorBoundary: (
        Component: (...args: any[]) => React.JSX.Element,
        pointcut: ComponentPointcut
    ) => ReturnType<typeof withErrorBoundary> | React.JSX.ElementType;
}

export default function (
    ReactNative: { [prop: string]: any },
    options: {
        enable?: boolean,
        components?: ComponentPointcut[],
        fallbackComponent?: (
            props: FallbackProps
        ) => React.JSX.Element;
        fallbackRender?: (props: FallbackProps) => any;
    }
): ContextType {
    const context: ContextType = {
        useErrorBoundary: (outerHandler: Function, pointcut: ComponentPointcut) => {
            if (!options.enable) {
                return outerHandler;
            }
            return useErrorBoundary(ReactNative, outerHandler, pointcut);
        },
        withBoundaryContainer: (pointcut: ComponentPointcut) => {
            if (!options.enable) {
                return pointcut.component;
            }
            if (typeof pointcut.fallbackRender !== "function") {
                pointcut.fallbackRender = options.fallbackRender;
            }
            if (typeof pointcut.fallbackComponent !== "function") {
                pointcut.fallbackComponent = options.fallbackComponent;
            }
            return withBoundaryContainer(ReactNative, pointcut);
        },
        withErrorBoundary: (Component: (...args: any[]) => React.JSX.Element, pointcut: ComponentPointcut) => {
            if (!options.enable) {
                return Component;
            }
            if (typeof pointcut.fallbackRender !== "function") {
                pointcut.fallbackRender = options.fallbackRender;
            }
            if (typeof pointcut.fallbackComponent !== "function") {
                pointcut.fallbackComponent = options.fallbackComponent;
            }
            return withErrorBoundary(ReactNative, Component, pointcut);
        }
    };

    const Components: ComponentPointcut[] = options.components || CoreComponents.concat(AndroidComponents).concat(IosComponents);
    if (options) {
        Components.forEach(i => {
            if (typeof options.fallbackRender !== "function") {
                i.fallbackRender = options.fallbackRender;
            }
            if (typeof options.fallbackComponent !== "function") {
                i.fallbackComponent = options.fallbackComponent;
            }
        });
    }

    if (options.enable) {
        withTarget(ReactNative, Components);
    }

    return context;
}
