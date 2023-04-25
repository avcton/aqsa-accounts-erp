import { useLottie } from "lottie-react";
import loadingAnimation from "../assets/Lotties/loading.json"

export default function LoaderAnimation({ small }) {
    const { View } = useLottie({ animationData: loadingAnimation, loop: true, style: { height: small ? 50 : 100 } });

    return (<div>{View}</div>);
}