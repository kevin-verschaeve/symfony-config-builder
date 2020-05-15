export const getConfigTreeBuilder = (configuration) => {
    const space = '    ';
    const indent = 2;
    const spaces = space.repeat(indent)
    const root = configuration.find(n => n.type == 'root');

    let tree = spaces;

    tree += `${root.php()}\n`;

    for (let node of root.children(configuration)) {
        tree += `${node.php(space.repeat(indent + 1), space.repeat(indent + 2), configuration)}\n`;
    }
    tree += `${spaces}->end();\n\n${spaces}return $treeBuilder;`;

    return tree;
}

export const getConfigInYaml = (configuration, level = 1) => {
    let yaml = '';
    const root = configuration.find(n => n.type == 'root');

    yaml += `${root.yaml()}\n`;

    for (let node of root.children(configuration)) {
        yaml += `${' '.repeat(2 * level)}${node.yaml()}\n`;
        if (node.canHaveChildren()) {
            yaml += getChildrenConfigInYaml(node.children(configuration), configuration, level + 1);
        }
    }

    return yaml;
}

const getChildrenConfigInYaml = (children, configuration, level) => {
    let yaml = '';
    for (let node of children) {
        yaml += `${' '.repeat(2 * level)}${node.yaml()}\n`;
        if (node.canHaveChildren()) {
            yaml += getChildrenConfigInYaml(node.children(configuration), configuration, level + 1);
        }
    }

    return yaml;
}