import { config } from '../stores.js';
import { createNodeFromConfig } from './NodeFactory.js'

export function load() {
    let storedConfig = localStorage.getItem('config');
    if (!storedConfig) {
        return [];
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

export function clear() {
    config.set([]);
}

export default {load, save, clear};