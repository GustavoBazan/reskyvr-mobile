import React, { useState } from 'react';

import { IonItem, IonInput } from '@ionic/react';
import './Connect.css';

const Connect: React.FC = () => {

    const [code, setCode] = useState('');

    const handleChange = (event:any) => {
        setCode(event.target.value);
      };

    return (

        <div id='connect'>
            <h1>Connect</h1>
            <IonItem>
                <IonInput value={code} labelPlacement="floating" label="Connection" placeholder="Enter code" onIonChange={handleChange}></IonInput>
            </IonItem>
            <IonItem routerLink={"../API/" + code} disabled={code != '' ? false : true}>START</IonItem>
        </div>

    );

};

export default Connect;