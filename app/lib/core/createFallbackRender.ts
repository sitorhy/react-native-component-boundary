import {FallbackProps} from '../components/common';

export default function createFallbackRender(ReactNative: {
    [prop: string]: any;
}) {
    if (
        ReactNative &&
        typeof ReactNative.Alert === 'function' &&
        typeof ReactNative.Alert.alert === 'function'
    ) {
        return function (e: FallbackProps) {
            try {
                ReactNative.Alert.alert('Runtime Error', `${e ? e.error : ''}`);
            } catch (ignore) {
                console.error(e);
            }
        };
    } else {
        return function (e: FallbackProps) {
            console.error(e.error);
        };
    }
}
