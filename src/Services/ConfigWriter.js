export const getConfigTreeBuilder = (configuration) => {
    const space = '    ';
    const indent = 2;
    const spaces = space.repeat(indent)

    let tree = spaces;

    tree += `${configuration.find(n => n.type == 'root').php()}\n`;

    for (let node of configuration.filter(n => !n.parent)) {
        if (node.type == 'root') {
            continue;
        }

        tree += `${node.php(space.repeat(indent + 1), space.repeat(indent + 2), configuration)}\n`;
    }
    tree += `${spaces}->end();\n\n${spaces}return $treeBuilder;`;

    return tree;
}

export const getConfigInYaml = (configuration, level = 1) => {
    let yaml = '';

    yaml += `${configuration.find(n => n.type == 'root').yaml()}\n`;

    for (let node of configuration.filter(n => !n.parent && n.type != 'root')) {
        yaml += `${' '.repeat(2 * level)}${node.yaml()}\n`;
        if (node.canHaveChildren()) {
            yaml += getChildrenConfigInYaml(configuration, node, level + 1);
        }
    }

    return yaml;
}

const getChildrenConfigInYaml = (configuration, parent, level) => {
    let yaml = '';
    for (let node of configuration.filter(n => n.parent == parent.id)) {
        yaml += `${' '.repeat(2 * level)}${node.yaml()}\n`;
        if (node.canHaveChildren()) {
            yaml += getChildrenConfigInYaml(configuration, node, level + 1);
        }
    }

    return yaml;
}