import { useEffect, useState } from "react";
import { Storage } from "@ionic/storage";

const CONFIGS_KEY = 'device-config';

const defaultConfig = {
    fov: 70,
    screenSize: 1,
    screenCurvature: 7,
    background: 'default'
};

export interface DeviceConfiguration {
    fov: number;
    screenSize: number;
    screenCurvature: number;
    background: string,
}

export function useStorage() {

    const [store, setStore] = useState<Storage>();
    const [configs, setConfigs] = useState<DeviceConfiguration>();

    useEffect(() => {
        const initStorage = async () => {
            const newStore = new Storage({
                name: 'reskyvrdb'
            });
            const store = await newStore.create();
            setStore(store);

            const storedConfigs = await store.get(CONFIGS_KEY) || defaultConfig;
            console.log('LOADED SETTINGS: ', storedConfigs);
            setConfigs(storedConfigs);
        }
        initStorage();
    }, []);

    const updateConfig = (fov: number, screenSize: number, screenCurvature: number, background: string) => {
        const newSettings = {
            fov,
            screenSize,
            screenCurvature,
            background
        };
        const updatedSettings = newSettings;
        setConfigs(updatedSettings);
        console.log(updatedSettings);
        store?.set(CONFIGS_KEY, updatedSettings);
    };

    return {configs, updateConfig};

}