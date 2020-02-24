<script>
export let node;
</script>

<div>
    <label for="default">Valeur par défaut</label>
    <input id="default" type="text" bind:value={node.options.defaultValue}>
</div>