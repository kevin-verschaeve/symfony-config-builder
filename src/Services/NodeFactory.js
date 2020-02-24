import ScalarNode from '../Model/ScalarNode.js';
import BooleanNode from '../Model/BooleanNode.js';
import IntegerNode from '../Model/IntegerNode.js';
import FloatNode from '../Model/FloatNode.js';
import EnumNode from '../Model/EnumNode.js';
import ArrayNode from '../Model/ArrayNode.js';
import RootNode from '../Model/RootNode.js';

export function createNode(type) {
    switch (type) {
        case 'scalar':
            return new ScalarNode();
        case 'boolean':
            return new BooleanNode();
        case 'integer':
            return new IntegerNode();
        case 'float':
            return new FloatNode();
        case 'enum':
            return new EnumNode();
        case 'array':
            return new ArrayNode();
        case 'root':
            return new RootNode();
        default:
            throw new Error('Invalid type '+type);
    }
}

export function createNodeFromConfig(config) {
    let node = createNode(config.type);
    node.name = config.name;
    node.id = config.id;
    node.type = config.type;
    node.options = config.options;
    node.parent = config.parent;

    return node;
}