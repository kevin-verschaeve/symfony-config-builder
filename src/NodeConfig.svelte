<script>
    import { config, selectedNode } from './stores.js';
    import ScalarNodeComponent from './Node/ScalarNodeComponent.svelte';
    import BooleanNodeComponent from './Node/BooleanNodeComponent.svelte';
    import IntegerNodeComponent from './Node/IntegerNodeComponent.svelte';
    import FloatNodeComponent from './Node/FloatNodeComponent.svelte';
    import EnumNodeComponent from './Node/EnumNodeComponent.svelte';
    import ArrayNodeComponent from './Node/ArrayNodeComponent.svelte';

    let node;
    const u = selectedNode.subscribe(n => {
        node = n;
    });

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
</script>

{#if node && node.type != undefined}
    <div>
        <p>Ajouter un node de type "{node.type}"</p>

        <div>
            <label for="name">Nom</label>
            <input id="name" type="text" bind:value={node.name}>
        </div>
        <div>
            <label>
                Required ?
                <input type="checkbox" bind:checked={node.options.required}>
            </label>
        </div>
        <div>
            <label>
                Cannot be empty ?
                <input type="checkbox" bind:checked={node.options.cannotBeEmpty}>
            </label>
        </div>
        <div>
            <label>
                Info
                <input type="text" bind:value={node.options.info}>
            </label>
        </div>

        <svelte:component this={components[node.type]} {node}/>

        <button on:click={configDone}>Terminer</button>
    </div>
{/if}