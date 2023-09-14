import React from "react";

export interface ComponentPointcut<P> {
    name: string;
    component?: React.ComponentType<P>;
    fallbackComponent?: (
        props: FallbackProps<P>
    ) => React.ReactNode;
    fallbackRender?: (props: FallbackProps<P>) => any;
    handlers?: string[];
    accepted?: boolean;
}

export interface FallbackProps<P> {
    error: unknown;
    errorInfo?: React.ErrorInfo | null;
    pointcut: ComponentPointcut<P>;
    resetError?: () => void;
}
