import ConfigNode from './ConfigNode.js';

export default class ScalarNode extends ConfigNode {
    constructor(name = '', options = {}) {
        super(name, Object.assign({}, {defaultValue: 'default'}, options));
    }

    specific(spaces) {
        if (this.options.defaultValue) {
            return `\n${spaces}->defaultValue('${this.options.defaultValue}')`;
        }

        return '';
    }

    getType() {
        return 'scalar';
    }
}