# react-native-component-boundary

React native error boundary component.

## Usage

```javascript
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
import at the top of the entry point.
```javascript
import 'path/useErrorBoundary';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// ....
```

## Watch custom component
```javascript
import ErrorBoundary from "path/useErrorBoundary";

function BadComponent() {
    return <Text>{[1, 2, null].map(i => i.toString()).join(' ,')}</Text>
}

export default ErrorBoundary.withErrorBoundary({
    component: BadComponent,
    name: 'BadComponent'
});
```
```javascript
import BadComponent from "path";

function App() {
    return (
        <View>
            <BadComponent/>
        </View>
    );
}
```
## Fallback properties
+ error: Error;
+ errorInfo?: React.ErrorInfo;
+ pointcut: { name:string, component: React.ComponentType };
+ resetError?: Function

## Inside component handler
catch asynchronous code.
```javascript
export default useErrorBoundary(ReactNative, {
    enable: true,
    components: [
        {
            name: "Text",
            handlers: ["onPress", "onPressIn", "onPressOut"]
        }
    ],
    fallbackRender: function (fallback) {
        // ...
    },
    fallbackComponent: function (fallback) {
        // ...
    }
});
```

## Note: React.Children as a prop
The children node as a prop has already been created by parent component.
The exception from parent component cannot be caught in the child component.
```javascript
function SimpleComponent({ children }) {
    return (
        <View>
            { children }
        </View>
    );
}

const BadPracticeComponent = ErrorBoundary.withErrorBoundary({
    component: SimpleComponent,
    name: 'BadPracticeComponent'
});

// There is no perfect solution to save fucking code
<BadPracticeComponent>
    <Text>{ [null][0].toString() }</Text>
</BadPracticeComponent>
```
Is not recommend to use logic inside render.
```javascript
function getRenderText() {
    try {
        // ....
        return "Normal";
    } catch (e) {
        return "Error";
    }
}

// follow the best practices
<BadPracticeComponent>
    <Text>{ getRenderText() }</Text>
</BadPracticeComponent>
```
