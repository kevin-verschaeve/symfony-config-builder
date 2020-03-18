import ConfigNode from './ConfigNode.js';

export default class BooleandNode extends ConfigNode {
    constructor(name = '', options = {}) {
        super(name, Object.assign({}, {defaultValue: null}, options));
    }

    yaml() {
        return `${this.name}: ${this.options.defaultValue}`;
    }

    specific(spaces) {
        if (this.options.defaultValue) {
            return `\n${spaces}->defaultValue(${this.options.defaultValue})`;
        }

        return '';
    }

    getType() {
        return 'boolean';
    }
}