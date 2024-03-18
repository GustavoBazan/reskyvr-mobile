import { IonItem } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {

    return (

        <div id='home'>
            <h1>ReskyVR</h1>
            <p>Access a Virtual Reality work environment, mirror your computer screen on multiple virtual monitors. <a href="http://reskyvr.com.br/">See beyond the impossible!</a></p>
            <IonItem routerLink="./Connect">Conectar</IonItem>
        </div>

    );

};

export default Home;