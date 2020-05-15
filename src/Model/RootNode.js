import ConfigNode from './ConfigNode.js';

export default class RootNode extends ConfigNode {
    yaml() {
        return `${this.name}:`;
    }

    php() {
        return `$treeBuilder = new TreeBuilder('${this.name}');\n        $rootNode = $treeBuilder->getRootNode();\n        $rootNode->children()`;
    }

    getType() {
        return 'root';
    }

    canHaveChildren() {
        return true;
    }
}