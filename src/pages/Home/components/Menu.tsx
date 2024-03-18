import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { homeOutline, homeSharp, laptopOutline, laptopSharp, settingsOutline, settingsSharp, phonePortraitOutline, phonePortraitSharp, personOutline, personSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  disabled: boolean;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/pages/Home',
    iosIcon: homeOutline,
    mdIcon: homeSharp,
    disabled: false
  },
  {
    title: 'Connect',
    url: '/pages/Connect',
    iosIcon: laptopOutline,
    mdIcon: laptopSharp,
    disabled: false
  },
  {
    title: 'Settings',
    url: '/pages/Settings',
    iosIcon: settingsOutline,
    mdIcon: settingsSharp,
    disabled: false
  },
  {
    title: 'Devices',
    url: '/pages/Devices',
    iosIcon: phonePortraitOutline,
    mdIcon: phonePortraitSharp,
    disabled: true
  },
  {
    title: 'Account',
    url: '/pages/Account',
    iosIcon: personOutline,
    mdIcon: personSharp,
    disabled: true
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>ReskyVR</IonListHeader>
          <IonNote>beta@v0.1.3</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem disabled={appPage.disabled} className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
