export default class ConfigNode {
    constructor(name = '', options = {}) {
        if (this.constructor === ConfigNode) {
            throw new TypeError('Abstract class "ConfigNode" cannot be instantiated directly.');
        }

        if (this.getType === undefined) {
            throw new TypeError('Classes extending the ConfigNode abstract class must define a type.');
        }

        this.id = Math.random().toString(36).substr(2, 9);
        this.name = name;
        this.options = Object.assign({}, {defaultValue: 42, required: null, cannotBeEmpty: false, info: null}, options);
        this.parent = null;
        this.type = this.getType();
    }

    yaml() {
        return `${this.name}: '${this.options.defaultValue}'`;
    }

    php(spaces, subSpaces, configuration) {
        let php = `${spaces}->${this.type}Node('${this.name}')`;

        if (true === this.options.required) {
            php += `\n${subSpaces}->isRequired()`;
        }

        if (this.options.cannotBeEmpty) {
            php += `\n${subSpaces}->cannotBeEmpty()`;
        }

        if (this.options.info) {
            php += `\n${subSpaces}->info('${this.options.info}')`;
        }

        const specific = this.specific(subSpaces, configuration)
        php += specific;

        const hasSubRules = this.options.required || this.options.cannotBeEmpty || this.options.info || specific.length;
        php += `${hasSubRules ? `\n${spaces}` : ''}->end()`;

        return php;
    }

    specific() {
        return '';
    }

    canHaveChildren() {
        return false;
    }

    children(config) {
        return config.filter(n => n.parent == this.id);
    }

    remove(config) {
        return config.filter(n => n.id != this.id);
    }
}
