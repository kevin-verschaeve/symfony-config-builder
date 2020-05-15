import ConfigNode from './ConfigNode.js';

export default class ArrayNode extends ConfigNode {
    constructor(name = '', options = {}) {
        super(name, Object.assign({}, {
            isPrototype: false,
            prototypeType: 'array',
            requiresAtLeastOneElement: false,
            ignoreExtraKeys: false,
            addDefaultIfNotSet: false,
            useAttributeAsKey: null,
        }, options));
    }

    canHaveChildren() {
        if (!this.options.isPrototype) {
            return true;
        }

        return this.options.prototypeType == 'array';
    }

    remove(config) {
        if (!this.canHaveChildren || this.children(config).length == 0) {
            return super.remove(config);
        }

        for (let child of this.children(config)) {
            config = child.remove(config);
        }

        return super.remove(config);
    }

    yaml() {
        if (this.options.isPrototype && this.options.prototypeType != 'array') {
            switch (this.options.prototypeType) {
                case 'scalar':
                    return `${this.name}: ['example', 'default', 'anything']`;
                case 'integer':
                    return `${this.name}: [42, 59, 77, 93]`;
                case 'float':
                    return `${this.name}: [42.24, 59.95, 77.77]`;
                case 'boolean':
                    return `${this.name}: [true, false]`;
            }
        }

        return `${this.name}:`;
    }

    specific(subSpaces, config) {
        let php = '';

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

        if (this.options.isPrototype && this.options.prototypeType != 'array') {
            php += `\n${subSpaces}->${this.options.prototypeType}Prototype()->end()`;

            return php;
        }

        php += `\n${this.options.isPrototype ? `${subSpaces}->arrayPrototype()\n${subSpaces + '    '}` : `${subSpaces}`}->children()`;

        for (let child of this.children(config)) {
            php += `\n${child.php(subSpaces + '    '.repeat(this.options.isPrototype ? 2 : 1), subSpaces + '    '.repeat(this.options.isPrototype ? 3 : 2), config)}`;
        }

        php += `\n${this.options.isPrototype ? subSpaces + '    ' : subSpaces}->end()`;
        php += `${this.options.isPrototype ? `\n${subSpaces}->end()` : ''}`;

        return php;
    }

    getType() {
        return 'array';
    }
}