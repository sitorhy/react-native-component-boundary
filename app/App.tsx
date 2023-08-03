import React from 'react';
import {View, Button, Text} from 'react-native';
import {default as ErrorBoundary} from './useErrorBoundary';

function App() {
  const onPressSync = () => {
    // @ts-ignore
    [1, 2, 3, null].forEach(i => i.toString());
  };

  return (
    <View>
      <Text>{[1, 2, null].map(i => i.toString()).join(' ,')}</Text>
      <Button title="Catch Sync" onPress={onPressSync} />
    </View>
  );
}

export default ErrorBoundary.withErrorBoundary(App, {
  name: 'App',
  fallbackComponent: fallback => {
    return <Text>{`${fallback.error}`}</Text>;
  }
});
