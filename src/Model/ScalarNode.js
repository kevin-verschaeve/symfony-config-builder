import ConfigNode from './ConfigNode.js';

export default class ScalarNode extends ConfigNode {
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