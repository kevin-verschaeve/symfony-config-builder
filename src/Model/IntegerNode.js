import ConfigNode from './ConfigNode.js';

export default class IntegerNode extends ConfigNode {
    constructor(name = '', options = {}) {
        super(name, Object.assign({}, {min: null, max: null}, options));
    }

    specific(spaces) {
        let php = '';
        if (this.options.defaultValue) {
            php += `\n${spaces}->defaultValue(${parseInt(this.options.defaultValue) || 0})`;
        }
        if (this.options.min) {
            php += `\n${spaces}->min(${parseInt(this.options.min) || 0})`;
        }
        if (this.options.max) {
            php += `\n${spaces}->max(${parseInt(this.options.max) || 0})`;
        }

        return php;
    }

    getType() {
        return 'integer';
    }
}