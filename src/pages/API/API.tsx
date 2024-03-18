import './API.css';

import FirebaseConnection from './firebase/FirebaseConnection';

import { useRef, useState } from 'react';
import { useIonAlert } from '@ionic/react';
import { useStorage } from '../../hooks/useStorage';

import { Canvas } from '@react-three/fiber';
import { isPlatform } from '@ionic/react';
import { useParams } from 'react-router';

import {
    DeviceOrientationControls,
    PerspectiveCamera,
    PointerLockControls,
} from "@react-three/drei";

import DeveloperSkyBox from './components/DeveloperSkybox';
import Setup from './components/Setup';

import { Vector3 } from 'three';

import CameraPreview from './components/CameraPreview';

const Render: React.FC = () => {

    return (

        <Setup />

    );

};

const MobileRenderer: React.FC = () => {

    const { configs } = useStorage();
    const [lookingDown, setLookingDown] = useState(false);

    const camera: any = useRef();

    function onOrientationChangeEvent(target: any) {
        if (target.getWorldDirection(new Vector3).y <= -0.5) {
            setLookingDown(true);
        } else {
            setLookingDown(false);
        };
    };

    return (

        <div id='screen'>
            <Canvas id='canvas'>
                <Render />
                {
                    !lookingDown ? <DeveloperSkyBox /> : <></>
                }
                <PerspectiveCamera fov={configs?.fov} makeDefault ref={camera} />
                <DeviceOrientationControls />
            </Canvas>
            <Canvas id='canvas'>
                <Render />
                {
                    !lookingDown ? <DeveloperSkyBox /> : <></>
                }
                <PerspectiveCamera fov={configs?.fov} makeDefault ref={camera} />
                <DeviceOrientationControls onChange={(e) => onOrientationChangeEvent(camera.current)} />
            </Canvas>
            <div id='camera-preview'>
                <CameraPreview/>
                <CameraPreview/>
            </div>
        </div>

    );

};

const DeveloperRenderer: React.FC = () => {

    const { configs } = useStorage();
    const [lookingDown, setLookingDown] = useState(false);

    const camera: any = useRef();

    function onCameraChangeEvent(e: any) {
        if (e.getWorldDirection(new Vector3).y <= -0.8) {
            setLookingDown(true);
        } else {
            setLookingDown(false);
        };
    };

    return (

        <div id='screen'>
            <Canvas id='canvas'>
                <Render />
                {
                    !lookingDown ? <DeveloperSkyBox /> : <></>
                }

                <PerspectiveCamera fov={configs?.fov} makeDefault ref={camera} />
                <PointerLockControls onChange={(e) => onCameraChangeEvent(camera.current)} />
            </Canvas>
            <div id='camera-preview'>
                <CameraPreview/>
                <CameraPreview/>
            </div>
            
        </div>

    );

};

const API: React.FC = () => {

    const [appReady, setAppReady] = useState(false);
    const [presentAlert] = useIonAlert();

    const { code } = useParams<{ code: string; }>();

    const isMobile = isPlatform("mobile");

    presentAlert({
        header: 'ReskyVR',
        message: 'You are now connected to: ' + code,
        buttons: [{
            text: 'Start',
            role: 'start',
            handler: () => {
                setAppReady(true);
            },
        }],
    });

    return (

        <div id='API'>
            <FirebaseConnection code={code} />
            {appReady ?
                <>{isMobile ? <MobileRenderer /> : <DeveloperRenderer />} </>
                :
                <></>
            }
        </div>

    );

};

export default API;