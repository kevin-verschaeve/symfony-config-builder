<script>
    import { config, selectedNode } from './stores.js';
    import NodeAdder from './NodeAdder.svelte';
    export let node;

    function edit() {
        selectedNode.set(node);
    }

    function remove() {
        config.update(conf => conf.filter(n => n.id != node.id));
        selectedNode.set(null);
    }
</script>

<div class="raw-node">
    <a href="#" on:click={edit} class:indent={node.type != 'root'}>{node.yaml()}</a>
    {#if node.type != 'root'}
    <a href="#" on:click={remove}><img src="bin.svg" alt="[remove]" width="15"></a>
    {/if}

    {#if node.type == 'array'}
        <div class="indent">
            {#each node.children($config) as child}
            <svelte:self node={child}></svelte:self>
            {/each}
            <NodeAdder parent={node.id}/>
        </div>
    {/if}
</div>