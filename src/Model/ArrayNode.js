import ConfigNode from './ConfigNode.js';

export default class ArrayNode extends ConfigNode {
    constructor(name = '', options = {}) {
        super(name, Object.assign({}, {
            isPrototype: false,
            prototypeType: null,
            requiresAtLeastOneElement: false,
            ignoreExtraKeys: false,
            addDefaultIfNotSet: false,
            useAttributeAsKey: null,
        }, options));
    }

    children(config) {
        return config.filter(n => n.parent == this.id);
    }

    yaml() {
        return `${this.name}:`;
    }

    php(spaces, subSpaces, config = []) {
        let php = `${spaces}->arrayNode('${this.name}')`;

        if (this.options.required) {
            php += `\n${subSpaces}->isRequired()`;
        }

        if (this.options.required && this.options.requiresAtLeastOneElement) {
            php += `\n${subSpaces}->requiresAtLeastOneElement()`;
        }

        if (this.options.ignoreExtraKeys) {
            php += `\n${subSpaces}->ignoreExtraKeys()`;
        }

        if (this.options.addDefaultIfNotSet) {
            php += `\n${subSpaces}->addDefaultIfNotSet()`;
        }

        if (this.options.useAttributeAsKey) {
            php += `\n${subSpaces}->useAttributeAsKey('${this.options.useAttributeAsKey}')`;
        }

        if (this.options.cannotBeEmpty) {
            php += `\n${subSpaces}->cannotBeEmpty()`;
        }

        if (this.options.info) {
            php += `\n${subSpaces}->info('${this.options.info}')`;
        }

        php += `\n${this.options.isPrototype ? `${subSpaces}->arrayPrototype()\n${subSpaces + '    '}` : `${subSpaces}`}->children()`;

        for (let child of this.children(config)) {
            php += `\n${child.php(subSpaces + '    '.repeat(this.options.isPrototype ? 2 : 1), subSpaces + '    '.repeat(this.options.isPrototype ? 3 : 2), config)}`;
        }

        php += `\n${this.options.isPrototype ? subSpaces + '    ' : subSpaces}->end()\n`;
        php += `${this.options.isPrototype ? `${subSpaces}->end()\n` : ''}${spaces}->end()`;

        return php;
    }

    getType() {
        return 'array';
    }
}