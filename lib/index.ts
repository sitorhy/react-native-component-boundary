import React from "react";
import {ComponentPointcut, FallbackProps} from "./components/common";
import withBoundaryContainer from "./core/withBoundaryContainer";
import useErrorBoundary from "./core/useErrorBoundary";
import withTarget from "./core/withTarget";

import CoreComponents from "./components/core";
import AndroidComponents from "./components/android";
import IosComponents from "./components/ios";

function EmptyFunctionComponent() {
    return null;
}

export interface ContextType {
    useErrorBoundary: <P>(
        outerHandler: Function,
        pointcut: ComponentPointcut<P>
    ) => Function;
    withBoundaryContainer: <P>(
        pointcut: ComponentPointcut<P>
    ) => React.ComponentType<P>;
}

export default function (
    ReactNative: { [prop: string]: any },
    options: {
        enable?: boolean,
        components?: ComponentPointcut<any>[],
        fallbackComponent?: (
            props: FallbackProps<any>
        ) => React.ReactNode;
        fallbackRender?: (props: FallbackProps<any>) => any;
    }
): ContextType {
    const context: ContextType = {
        useErrorBoundary: <P>(outerHandler: Function, pointcut: ComponentPointcut<P>) => {
            if (!options.enable) {
                return outerHandler;
            }
            return useErrorBoundary(ReactNative, outerHandler, pointcut);
        },
        withBoundaryContainer: <P>(pointcut: ComponentPointcut<P>) => {
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

    const Components: ComponentPointcut<any>[] = options.components || CoreComponents.concat(AndroidComponents).concat(IosComponents);
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
