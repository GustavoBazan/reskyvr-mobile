import { TextureLoader } from 'three';
import { useStorage } from '../../../hooks/useStorage';

const DeveloperSkyBox: React.FC = () => {

    const { configs } = useStorage();

    const panorama = new TextureLoader().load('./images/panoramas/' + configs?.background + '.jpeg');

    return (

        <mesh>

            <sphereGeometry args={[30, 30, 30]} />
            <meshBasicMaterial
                map={panorama}
                side={2}
            />
            
        </mesh>

    );
};

export default DeveloperSkyBox;