import React from "react";
import {ComponentPointcut} from "../components/common";
import unexpectedCatch from "./unexpectedCatch";
import useErrorBoundary from "./useErrorBoundary";

function EmptyFunctionComponent(): null {
    return null;
}

type ContainerProps = { [key: string]: any };

type ContainerState = {
    error: unknown | null;
    errorInfo: React.ErrorInfo | null;
};

export default function withBoundaryContainer<P extends ContainerProps>(
    ReactNative: { [prop: string]: any },
    pointcut: ComponentPointcut<P>
): React.ComponentType<P> {
    return class extends React.Component<P, ContainerState> {

        state: ContainerState = {
            error: null,
            errorInfo: null
        };

        componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
            this.setState({
                error,
                errorInfo
            });
        }

        render() {
            if (this.state.error) {
                if (typeof pointcut.fallbackComponent === "function") {
                    try {
                        const fallbackNode = pointcut.fallbackComponent({
                            error: this.state.error,
                            errorInfo: this.state.errorInfo,
                            pointcut
                        });
                        return React.isValidElement(fallbackNode)
                            ? fallbackNode
                            : null;
                    } catch (ignore) {
                        unexpectedCatch(ReactNative, ignore);
                        return null;
                    }
                }
            }

            const injection = Object.assign({}, this.props);
            if (Array.isArray(pointcut.handlers) && pointcut.handlers.length) {
                pointcut.handlers.forEach(i => {
                    Object.assign(injection, {
                        [i]: useErrorBoundary(ReactNative, this.props[i], pointcut)
                    });
                });
            }

            return React.createElement(pointcut.component || EmptyFunctionComponent, injection);
        }
    };
}
