import { useLottie } from "lottie-react";
import loadingAnimation from "../assets/Lotties/loading.json"

export default function LoaderAnimation() {
    const { View } = useLottie({ animationData: loadingAnimation, loop: true, style: { height: 100 } });

    return (<div>{View}</div>);
}