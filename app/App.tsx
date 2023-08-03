import React from 'react';
import {View, Button, Text} from 'react-native';
import ErrorBoundary from './useErrorBoundary';

function Test1() {
    // @ts-ignore
    return <Text>{[1, 2, null].map(i => i.toString()).join(' ,')}</Text>
}

const TestHoc = ErrorBoundary.withErrorBoundary(Test1, {
    name: 'Test1'
});

function App() {
    const onPressSync = () => {
        // @ts-ignore
        [1, 2, 3, null].forEach(i => i.toString());
    };

    return (
        <View>
            <TestHoc/>
            <Button title="Catch Sync" onPress={onPressSync}/>
        </View>
    );
}

export default ErrorBoundary.withErrorBoundary(App, {
    name: 'App'
});
