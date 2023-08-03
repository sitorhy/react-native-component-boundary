import React from 'react';

export interface ComponentPointcut {
  name: string;
  component?: React.FunctionComponent | React.ComponentClass;
  fallbackComponent?: (
    props: FallbackProps
  ) => React.JSX.Element;
  fallbackRender?: (props: FallbackProps) => any;
  handlers?: string[];
  accepted?: boolean;
}

export interface FallbackProps {
  error: unknown;
  pointcut: ComponentPointcut;
}
