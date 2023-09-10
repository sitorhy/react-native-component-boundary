import React from "react";
import {ComponentPointcut, FallbackProps} from './components/common';
import withBoundaryContainer from './core/withBoundaryContainer';
import useErrorBoundary from './core/useErrorBoundary';
import withTarget from './core/withTarget';

import CoreComponents from './components/core';
import AndroidComponents from './components/android';
import IosComponents from './components/ios';


function EmptyFunctionComponent() {
    return null;
}

export interface ContextType {
    useErrorBoundary: (
        outerHandler: Function,
        pointcut: ComponentPointcut
    ) => Function;
    withBoundaryContainer: (
        pointcut: ComponentPointcut
    ) => React.ComponentType;
}

export default function (
    ReactNative: { [prop: string]: any },
    options: {
        enable?: boolean,
        components?: ComponentPointcut[],
        fallbackComponent?: (
            props: FallbackProps
        ) => React.ReactNode;
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
                return pointcut.component || EmptyFunctionComponent;
            }
            if (typeof pointcut.fallbackRender !== "function") {
                pointcut.fallbackRender = options.fallbackRender;
            }
            if (typeof pointcut.fallbackComponent !== "function") {
                pointcut.fallbackComponent = options.fallbackComponent;
            }
            return withBoundaryContainer(ReactNative, pointcut);
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
