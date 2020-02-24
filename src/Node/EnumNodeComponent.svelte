<script>
    export let node;

    let newValue;
    function addAllowedValue() {
        node.options.allowedValues = [...node.options.allowedValues, newValue];
        newValue = null;
    }
</script>

<div>
    <p>Valeurs autorisées: {node.options.allowedValues.join(',')}</p>

    <label for="newValue">Ajouter une valeur</label>
    <input id="newValue" type="text" bind:value={newValue}>
    <button on:click={addAllowedValue}>ok</button>
</div>
<div>
    <label for="default">Valeur par défaut</label>
    <select bind:value={node.options.defaultValue}>
        <option></option>
        {#each node.options.allowedValues as value}
            <option {value}>{value}</option>
        {/each}
    </select>
</div>