<script>
export let node;
</script>

<div>
    <label for="default">Valeur par défaut</label>
    <select bind:value={node.options.defaultValue}>
        <option value="true">true</option>
        <option value="false">false</option>
    </select>
</div>