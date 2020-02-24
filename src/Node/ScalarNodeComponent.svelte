<script>
export let node;
</script>

<div class="config-row">
    <label for="default">Default value</label>
    <input id="default" type="text" bind:value={node.options.defaultValue}>
</div>