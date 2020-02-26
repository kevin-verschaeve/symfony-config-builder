import ConfigNode from './ConfigNode.js';

export default class EnumNode extends ConfigNode {
    constructor(name = '', options = {}) {
        super(name, Object.assign({}, {defaultValue: null, allowedValues: []}, options));
    }

    yaml() {
        return `${this.name}: [${this.options.allowedValues.join(", ")}]`;
    }

    specific(spaces) {
        let php = '';

        if (this.options.defaultValue) {
            php += `\n${spaces}->defaultValue(${this.options.defaultValue})`;
        }

        php += `\n${spaces}->values([${this.options.allowedValues.join(', ')}])`;

        return php;
    }

    getType() {
        return 'enum';
    }
}