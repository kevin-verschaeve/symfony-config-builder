<script>
    import { config } from './stores.js';
    import RootNodeComponent from './Node/RootNodeComponent.svelte';
    import NodeAdder from './NodeAdder.svelte';
    import RawNode from './RawNode.svelte';

    let configuration = [];
    const u = config.subscribe(conf => {
        configuration = conf.filter(n => !n.parent);
    });
</script>

<RootNodeComponent/>
{#each configuration as node}
<RawNode {node}/>
{/each}
<NodeAdder/>