<script>
    import { config } from '../stores.js';
    import RootNode from '../Model/RootNode.js';

    let previous = 'changeme';
    let node = createRoot();
    let editing = false;

    function createRoot() {
        return $config.find(n => n.type == 'root') || new RootNode(previous);
    }

    function editRoot() {
        previous = node.name;
        node.name = '';
        editing = true;
    }

    function cancelEdit() {
        editing = false;
        node.name = previous;
    }

    function configDone() {
        if (!node.name) {
            return;
        }

        editing = false;
        config.update(nodes => {
            let index = nodes.findIndex(n => n.id == node.id);

            if (index >= 0) {
                nodes[index] = node;
            } else {
                nodes.push(node);
            }

            return nodes;
        });
    }
</script>

<div>
    {#if editing}
    <input type="text" bind:value={node.name} autofocus>
    <button on:click={configDone}>ok</button>
    <button on:click={cancelEdit}>Cancel</button>
    {:else}
    <a href="#" on:click={editRoot}>{node.yaml()}</a>
    {/if}
</div>