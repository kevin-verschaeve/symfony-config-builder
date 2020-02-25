<script>
export let node;
</script>

<div class="config-row">
    <input id="prototype-{node.id}" type="checkbox" bind:checked={node.options.isPrototype} class="node-config-checkbox">
    <label for="prototype-{node.id}" class="node-config-checkbox-label">Prototype ?</label>
</div>