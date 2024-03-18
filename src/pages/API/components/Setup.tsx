import * as THREE from "three";
import { useStorage } from "../../../hooks/useStorage";

const Setup: React.FC = () => {

    const { configs } = useStorage();

    let videoTrack = Array.from(document.getElementsByClassName('remoteStreamVideo'));

    let idleVideo = document.createElement('video');

    return (

        <>

            {videoTrack[0] ? (
                <mesh position={[-2, 0, -0.5]} scale={[-1, 1, 1]} >
                    <cylinderGeometry args={[7, 7, 7, configs?.screenCurvature, 1, true, -5.2, 1.5]} />
                    <meshBasicMaterial map={new THREE.VideoTexture(videoTrack[0] as any)} side={THREE.BackSide} toneMapped={false} />
                </mesh>
            ) : ( /* [ ERROR ] - NO DISPLAY AT ALL */
                <mesh position={[-2, 0, -0.5]} scale={[-1, 1, 1]} >
                    <cylinderGeometry args={[7, 7, 7, configs?.screenCurvature, 1, true, -5.2, 1.5]} />
                    <meshBasicMaterial map={new THREE.VideoTexture(idleVideo)} side={THREE.BackSide} toneMapped={false} />
                </mesh>
            )}
            {videoTrack[1] ? (
                <mesh position={[0, 0, -1.5]} scale={[-1, 1, 1]}>
                    <cylinderGeometry args={[7, 7, 7, configs?.screenCurvature, 1, true, -3.9, 1.5]} />
                    <meshBasicMaterial map={new THREE.VideoTexture(videoTrack[1] as any)} side={THREE.BackSide} toneMapped={false} />
                </mesh>
            ) : ( /* [ ERROR ] - NO VIDEO */
                console.log('no left display')
            )}
            {videoTrack[2] ? (
                <mesh position={[2, 0, -0.5]} scale={[-1, 1, 1]}>
                    <cylinderGeometry args={[7, 7, 7, configs?.screenCurvature, 1, true, -2.6, 1.5]} />
                    <meshBasicMaterial /*color={0xff8300}*/ map={new THREE.VideoTexture(videoTrack[2] as any)} side={THREE.BackSide} toneMapped={false} /*attach="material"*/ />
                </mesh>
            ) : ( /* [ ERROR ] - NO VIDEO */
                console.log('no right display')
            )}

        </>

    );

};

export default Setup;