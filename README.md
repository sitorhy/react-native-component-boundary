# react-native-component-boundary

## Usage

```
import useErrorBoundary from 'react-native-component-boundary';
import ReactNative from 'react-native';

export default useErrorBoundary(ReactNative, {
    fallbackRender: function (fallback) {
        Alert.alert('Uncaught Exception', `${fallback.error}`);
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

export default ErrorBoundary.withErrorBoundary(BadComponent, {
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
