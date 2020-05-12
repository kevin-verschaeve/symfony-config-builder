<script>
    import { selectedNode } from './stores.js';
    import { createNode } from './Services/NodeFactory.js'
    export let parent = null;

    const types = [
        {value: '', text: ''},
        {value: "scalar", text: "Scalar"},
        {value: "boolean", text: "Boolean"},
        {value: "integer", text: "Integer"},
        {value: "float", text: "Float"},
        {value: "enum", text: "Enum"},
        {value: "array", text: "Array"},
    ];

    let selected;
    const selectNode = () => {
        if (!selected.value) {
            selectedNode.set(null);

            return;
        }

        const node = createNode(selected.value);
        node.parent = parent;
        selectedNode.set(node);
    }

    const u = selectedNode.subscribe(node => {
        if (!node) {
            selected = types[0];
        }
    });
</script>

<div>
    <select bind:value={selected} on:change={selectNode}>
        {#each types as type}
        <option value="{type}">{type.text}</option>
        {/each}
    </select>
</div>