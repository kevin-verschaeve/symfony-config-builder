import ConfigNode from './ConfigNode.js';

export default class FloatNode extends ConfigNode {
    constructor(name = '', options = {}) {
        super(name, Object.assign({}, {min: null, max: null}, options));
    }

    yaml() {
        return `${this.name}: ${parseFloat(this.options.defaultValue) || 0.0}`;
    }

    specific(spaces) {
        let php = '';
        if (this.options.defaultValue) {
            php += `\n${spaces}->defaultValue(${parseFloat(this.options.defaultValue) || 0.0})`;
        }
        if (this.options.min) {
            php += `\n${spaces}->min(${parseFloat(this.options.min) || 0.0})`;
        }
        if (this.options.max) {
            php += `\n${spaces}->max(${parseFloat(this.options.max) || 0.0})`;
        }

        return php;
    }

    getType() {
        return 'float';
    }
}