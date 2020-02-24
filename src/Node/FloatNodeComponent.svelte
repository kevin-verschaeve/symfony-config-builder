<script>
export let node;
</script>

<div>
    <label for="default">Valeur par défaut</label>
    <input id="default" type="text" bind:value={node.options.defaultValue}>
</div>
<div>
    <label for="min">Min</label>
    <input id="min" type="text" bind:value={node.options.min}>
</div>
<div>
    <label for="max">Max</label>
    <input id="max" type="text" bind:value={node.options.max}>
</div>
