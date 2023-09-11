import React from "react";

export interface ComponentPointcut {
    name: string;
    component?: React.ComponentType;
    fallbackComponent?: (
        props: FallbackProps
    ) => React.ReactNode;
    fallbackRender?: (props: FallbackProps) => any;
    handlers?: string[];
    accepted?: boolean;
}

export interface FallbackProps {
    error: unknown;
    errorInfo?: React.ErrorInfo | null;
    pointcut: ComponentPointcut;
}
