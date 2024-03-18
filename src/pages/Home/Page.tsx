import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from './components/ExploreContainer';
import './Page.css';

import Home from './tabs/Home';
import Connect from './tabs/Connect';
import Settings from './tabs/Settings';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        { name === 'Home' ? <Home /> : name === 'Connect' ? <Connect /> : name === 'Settings' ? <Settings /> : <ExploreContainer name={name} />}
      </IonContent>
    </IonPage>
  );
};

export default Page;
