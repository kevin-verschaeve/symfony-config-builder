export function getConfigTreeBuilder(configuration) {
    let space = '    ';
    let indent = 2;
    let spaces = space.repeat(indent)

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

export function getConfigInYaml(configuration, level = 1) {
    let yaml = '';

    yaml += `${configuration.find(n => n.type == 'root').yaml()}\n`;

    for (let node of configuration.filter(n => !n.parent && n.type != 'root')) {
        yaml += `${' '.repeat(2 * level)}${node.yaml()}\n`;
        if (node.type == 'array') {
            yaml += getChildrenConfigInYaml(configuration, node, level + 1);
        }
    }

    return yaml;
}

function getChildrenConfigInYaml(configuration, parent, level) {
    let yaml = '';
    for (let node of configuration.filter(n => n.parent == parent.id)) {
        yaml += `${' '.repeat(2 * level)}${node.yaml()}\n`;
        if (node.type == 'array') {
            yaml += getChildrenConfigInYaml(configuration, node, level + 1);
        }
    }

    return yaml;
}