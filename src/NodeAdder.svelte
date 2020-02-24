<script>
    import { selectedNode } from './stores.js';
    import { createNode } from './Services/NodeFactory.js'
    export let parent = null;

    let types = [
        {value: "scalar", text: "Scalar"},
        {value: "boolean", text: "Boolean"},
        {value: "integer", text: "Integer"},
        {value: "float", text: "Float"},
        {value: "enum", text: "Enum"},
        {value: "array", text: "Array"},
    ];

    let selected;
    function selectNode() {
        let node = createNode(selected.value);
        node.parent = parent;
        selectedNode.set(node);
    }
</script>

<div class="yaml-hidden">
    <select bind:value={selected} on:change={selectNode}>
        <option></option>
        {#each types as type}
        <option value="{type}">{type.text}</option>
        {/each}
    </select>
</div>