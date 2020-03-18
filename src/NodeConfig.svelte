<script>
    import { config, selectedNode } from './stores.js';
    import { createNode } from './Services/NodeFactory.js';
    import ScalarNodeComponent from './Node/ScalarNodeComponent.svelte';
    import BooleanNodeComponent from './Node/BooleanNodeComponent.svelte';
    import IntegerNodeComponent from './Node/IntegerNodeComponent.svelte';
    import FloatNodeComponent from './Node/FloatNodeComponent.svelte';
    import EnumNodeComponent from './Node/EnumNodeComponent.svelte';
    import ArrayNodeComponent from './Node/ArrayNodeComponent.svelte';
    import RootNodeComponent from './Node/RootNodeComponent.svelte';

    export let node;

    const components = {
        scalar: ScalarNodeComponent,
        boolean: BooleanNodeComponent,
        integer: IntegerNodeComponent,
        float: FloatNodeComponent,
        enum: EnumNodeComponent,
        array: ArrayNodeComponent,
    };

    function configDone() {
        if (!node.name) {
            return;
        }

        config.update(nodes => {
            let index = nodes.findIndex(n => n.id == node.id);

            if (index >= 0) {
                nodes[index] = node;
            } else {
                nodes.push(node);
            }

            return nodes;
        });
        selectedNode.set(null);
    }

    function cancel() {
        selectedNode.set(null);
    }
</script>

<div class="node-config">
    <h2 class="node-config-title">{node.type == 'root' ? 'Edit root name' : `Add a node of type "${node.type}"`}</h2>

    <div class="config-form">
        {#if node.type == 'root'}
            <RootNodeComponent {node}/>
        {:else}
        <div class="config-row">
            <label for="name-{node.id}">Name</label>
            <input id="name-{node.id}" type="text" bind:value={node.name} autofocus>
        </div>
        <div class="config-row">
            <input id="required-{node.id}" type="checkbox" bind:checked={node.options.required} class="node-config-checkbox">
            <label for="required-{node.id}" class="node-config-checkbox-label">Required ?</label>
            <input id="empty-{node.id}" class="node-config-checkbox" type="checkbox" bind:checked={node.options.cannotBeEmpty}>
            <label for="empty-{node.id}" class="node-config-checkbox-label">Cannot be empty ?</label>
        </div>
        <div class="config-row">
            <label for="info-{node.id}">Info</label>
            <input type="text" id="info-{node.id}" bind:value={node.options.info}>
        </div>

        <svelte:component this={components[node.type]} {node}/>
        {/if}

        <div class="config-row">
            <button class="btn btn-ok" on:click={configDone}>Done</button>
            <button class="btn btn-cancel btn-cancel-config" on:click={cancel}>Cancel</button>
        </div>
    </div>
</div>