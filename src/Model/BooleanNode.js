import ConfigNode from './ConfigNode.js';

export default class BooleandNode extends ConfigNode {
    constructor(name = '', options = {}) {
        super(name, Object.assign({}, {defaultValue: ''}, options));
    }

    yaml() {
        return `${this.name}: ${this.options.defaultValue}`;
    }

    specific(spaces) {
        if ('' !== this.options.defaultValue) {
            return `\n${spaces}->default${'true' == this.options.defaultValue ? 'True' : 'False'}()`;
        }

        return '';
    }

    getType() {
        return 'boolean';
    }
}