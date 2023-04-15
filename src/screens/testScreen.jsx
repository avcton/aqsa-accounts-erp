import { useLottie } from "lottie-react";
import React from "react";
import loading from '../assets/Lotties/loading.json'

const TestScreen = () => {
    const options = {
        animationData: loading,
        loop: true
    };

    const { View } = useLottie(options);

    return <div>{View}</div>;
};

export default TestScreen;