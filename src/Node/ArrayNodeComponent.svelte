<script>
export let node;
</script>

<div class="config-row">
    <div class="inline-block">
        <input id="prototype-{node.id}" type="checkbox" bind:checked={node.options.isPrototype} class="node-config-checkbox">
        <label for="prototype-{node.id}" class="node-config-checkbox-label">Prototype ?</label>
    </div>

    <div class="config-row">
        <label for="attribue-as-key-{node.id}">Use attribute as key</label>
        <input id="attribue-as-key-{node.id}" type="text" bind:value={node.options.useAttributeAsKey}>
    </div>
</div>

<div class="config-row">
    {#if node.options.required}
    <input id="not-empty-{node.id}" type="checkbox" bind:checked={node.options.requiresAtLeastOneElement} class="node-config-checkbox">
    <label for="not-empty-{node.id}" class="node-config-checkbox-label">Requires at least one element ?</label>
    {/if}

    <input id="ignore-extra-{node.id}" type="checkbox" bind:checked={node.options.ignoreExtraKeys} class="node-config-checkbox">
    <label for="ignore-extra-{node.id}" class="node-config-checkbox-label">Ignore extra keys ?</label>

    <input id="add-default-{node.id}" type="checkbox" bind:checked={node.options.addDefaultIfNotSet} class="node-config-checkbox">
    <label for="add-default-{node.id}" class="node-config-checkbox-label">Add default if not set ?</label>
</div>
