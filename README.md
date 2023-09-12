# react-native-component-boundary

React error boundary component.

## Usage

```
import useErrorBoundary from 'react-native-component-boundary';
import ReactNative from 'react-native';

export default useErrorBoundary(ReactNative, {
    fallbackRender: function (fallback) {
         Alert.alert("Uncaught Exception", `${fallback.pointcut ? fallback.pointcut.name : ""}\n${fallback.error}\n${fallback.errorInfo ? fallback.errorInfo.componentStack : ""}`);
    },
    fallbackComponent: function (fallback) {
        return React.createElement(ReactNative.Text, {style: {color: 'red'}}, `${fallback.pointcut.name}: ${fallback.error}`);
    }
});
```

## Watch Custom Component
```
import ErrorBoundary from "path/useErrorBoundary";

function BadComponent() {
    return <Text>{[1, 2, null].map(i => i.toString()).join(' ,')}</Text>
}

export default ErrorBoundary.withErrorBoundary({
    component: BadComponent,
    name: 'BadComponent'
});
```
```
import BadComponent from "path";

function App() {
    return (
        <View>
            <BadComponent/>
        </View>
    );
}
```