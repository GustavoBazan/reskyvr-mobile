import { IonSelect, IonSelectOption, IonRange, IonButton, IonContent } from '@ionic/react';
import './Settings.css';
import { useStorage } from '../../../hooks/useStorage';
import { useEffect, useState } from 'react';

const Settings: React.FC = () => {

    const { configs, updateConfig } = useStorage();

    const [fov, setFov] = useState(0);
    const [size, setSize] = useState(0);
    const [curvature, setCurvature] = useState(0);
    const [background, setBackground] = useState('');

    useEffect(() => {
        setFov(fov || configs?.fov!);
        setSize(size || configs?.screenSize!);
        setCurvature(curvature || configs?.screenCurvature!);
        setBackground(background || configs?.background!);
    });

    async function saveSettings() {
        await updateConfig(fov, size, curvature, background);
    }

    return (

        <div id='settings'>

            <IonRange class='range' onIonChange={(e) => setFov(((e.detail.value as number) * 10) + 50)} labelPlacement="start" value={(fov - 50)/10}  label="FOV:" pin={true} pinFormatter={(value: number) => `${(value * 10) + 50}°`} ticks={true} snaps={true} min={0} max={5}></IonRange>

            <IonRange class='range' onIonChange={(e) => setSize((e.detail.value as number) * 0.5)} labelPlacement="start" label="Screen Size:" value={size / 0.5} pin={true} pinFormatter={(value: number) => `${(value * 0.5)}`} ticks={true} snaps={true} min={1} max={3}></IonRange>

            <IonRange class='range' onIonChange={(e) => setCurvature((e.detail.value as number) === 2 ? 4 : (e.detail.value as number) === 3 ? 8 : (e.detail.value as number) === 4 ? 16 : (e.detail.value as number) )} labelPlacement="start" label="Screen Curvature:" value={curvature === 4 ? 2 : curvature === 8 ? 3 : curvature === 16 ? 4 : curvature} pin={true} pinFormatter={(value: number) => value === 2 ? 4 : value === 3 ? 8 : value === 4 ? 16 : value} ticks={true} snaps={true} min={1} max={4}></IonRange>

            <IonSelect label="Background:" onIonChange={(e) => setBackground(e.detail.value)} placeholder={configs?.background}>
                <IonSelectOption value="aquatic-city">Aquatic City</IonSelectOption>
                <IonSelectOption value="cityscape">Cityscape</IonSelectOption>
                <IonSelectOption value="cyberpunk-city">Cyberpunk City</IonSelectOption>
                <IonSelectOption value="desert-landscape">Desert Landscape</IonSelectOption>
                <IonSelectOption value="hotel-room">Hotel Room</IonSelectOption>
                <IonSelectOption value="rustic-room">Rustic Room</IonSelectOption>
                <IonSelectOption value="underground-facility">Underground Facility</IonSelectOption>
            </IonSelect>

            <div className='buttons'>
                <IonButton routerLink="./Connect" onClick={() => saveSettings()} fill="outline">Save</IonButton>
                <IonButton routerLink="./Connect" color="danger" fill="clear">Cancel</IonButton>
            </div>

        </div>

    );

};

export default Settings;