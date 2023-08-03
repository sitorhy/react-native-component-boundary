import installErrorBoundary, {ContextType} from './lib';
import ReactNative from 'react-native';

const context: ContextType = installErrorBoundary(ReactNative);

export default context;
