<script>
    import { config, selectedNode } from './stores.js';
    import NodeAdder from './NodeAdder.svelte';
    export let node;

    const edit = () => selectedNode.set(node);
    const remove = () => {
        config.update(conf => conf.filter(n => n.id != node.id));
        selectedNode.set(null);
    }
</script>

<div class="raw-node">
    <a href="#" on:click={edit} class:indent={node.type != 'root'}>{node.yaml()}</a>
    {#if node.type != 'root'}
    <button on:click={remove} class="btn-remove" title="Remove">&times;</button>
    {/if}

    {#if node.canHaveChildren()}
        <div class="indent">
            {#each node.children($config) as child}
            <svelte:self node={child}></svelte:self>
            {/each}
            <NodeAdder parent={node.id}/>
        </div>
    {/if}
</div>