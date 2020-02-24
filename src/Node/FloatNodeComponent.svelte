<script>
export let node;
</script>

<div class="config-row">
    <label for="default">Default value</label>
    <input id="default" type="text" bind:value={node.options.defaultValue}>
</div>
<div class="config-row">
    <label for="min">Min</label>
    <input id="min" type="text" bind:value={node.options.min}>
</div>
<div class="config-row">
    <label for="max">Max</label>
    <input id="max" type="text" bind:value={node.options.max}>
</div>
