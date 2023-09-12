import {FallbackProps} from "../components/common";

export default function createFallbackRender<P>(ReactNative: {
    [prop: string]: any;
}): (props: FallbackProps<P>) => any {
    if (
        ReactNative &&
        typeof ReactNative.Alert === "function" &&
        typeof ReactNative.Alert.alert === "function"
    ) {
        return function (e: FallbackProps<P>) {
            try {
                ReactNative.Alert.alert("Runtime Error", `${e ? e.error : ""}`);
            } catch (ignore) {
                console.error(e);
            }
        };
    } else {
        return function (e: FallbackProps<P>) {
            console.error(e.error);
        };
    }
}
