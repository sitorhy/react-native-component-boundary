import useErrorBoundary from './lib';
import ReactNative, {Alert} from 'react-native';
import React from "react";

export default useErrorBoundary(ReactNative, {
    enable: true,
    fallbackRender: function (fallback) {
        Alert.alert('Uncaught Exception', `${fallback.error}`);
    },
    fallbackComponent: function (fallback) {
        return React.createElement(ReactNative.Text, {}, `${fallback.pointcut.name}: ${fallback.error}`);
    }
});

