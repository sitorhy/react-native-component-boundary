export default function unexpectedCatch(
    ReactNative: { [prop: string]: any },
    e: unknown
) {
    try {
        if (
            ReactNative &&
            typeof ReactNative.Alert === 'function' &&
            typeof ReactNative.Alert.alert === 'function'
        ) {
            ReactNative.Alert.alert('Unexpected Error', `${e}`);
        }
    } catch (ignore) {
        console.error(e);
    }
}
