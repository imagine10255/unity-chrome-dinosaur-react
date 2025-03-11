import {useCallback, useEffect, useRef, useState} from 'react';
import { Unity, useUnityContext,  } from "react-unity-webgl";
import { ReactUnityEventParameter } from 'react-unity-webgl/distribution/types/react-unity-event-parameters';
import Button from "../../components/Button";



const Example = () => {
    const [isVisible, setVisible] = useState(true);
    const [score, setScore] = useState<number>(0);

    const { unityProvider, sendMessage, addEventListener, removeEventListener, isLoaded, loadingProgression  } = useUnityContext({
        loaderUrl: "/data/Snake.loader.js",
        dataUrl: "/data/Snake.data.br",
        frameworkUrl: "/data/Snake.framework.js.br",
        codeUrl: "/data/Snake.wasm.br",
    });


    useEffect(() => {
        addEventListener("SetScore", handleSetScore);
        return () => {
            removeEventListener("SetScore", handleSetScore);
        };
    }, [addEventListener, removeEventListener, setScore]);



    /**
     * 設定分數
     */
    const handleSetScore = useCallback((score: any) => {
        // Do something with the score
        setScore(score);
    }, []);



    const send = () => {
        sendMessage("snake_0", "SpawnEnemies", 999); // 调用send函数
    }

    const renderContent = () => {

        return <Unity unityProvider={unityProvider} style={{width: '100%', height: '100%'}}/>;
    };


    return <div style={{width: '100%', height: '100%', margin: '0 auto'}}>

        {!isLoaded && <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>}

        {renderContent()}

        <Button onClick={send}>Set PrevScroe</Button>
        <div>current score: {score}</div>
    </div>;
};

export default Example;




