import { config } from '../stores.js';
import { createRoot, createNodeFromConfig } from './NodeFactory.js'

export const load = () => {
    let storedConfig = localStorage.getItem('config');
    if (!storedConfig) {
        restart();
        return;
    }

    let configuration = [];
    for (let conf of JSON.parse(storedConfig)) {
        configuration.push(createNodeFromConfig(conf));
    }
    config.set(configuration);
}

export const save = (config) => localStorage.setItem('config', JSON.stringify(config));

export const restart = () => config.set([createRoot()]);

export default {load, save, restart};