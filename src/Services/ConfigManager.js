import { config } from '../stores.js';
import { createRoot, createNodeFromConfig } from './NodeFactory.js'

export function load() {
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

export function save(config) {
    localStorage.setItem('config', JSON.stringify(config));
}

export function restart() {
    config.set([createRoot()]);
}

export default {load, save, restart};