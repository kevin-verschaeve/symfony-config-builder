<script>
    export let node;

    let newValue;
    function addAllowedValue() {
        if (!newValue.trim()) {
            return;
        }

        node.options.allowedValues = [...node.options.allowedValues, newValue];
        newValue = null;
    }
</script>

<div class="config-row">
    <p>Allowed values: {node.options.allowedValues.join(',')}</p>

    <label for="newValue">Add a new value</label>
    <input id="newValue" type="text" bind:value={newValue}>
    <button on:click={addAllowedValue}>ok</button>
</div>
<div class="config-row">
    <label for="default">Default value</label>
    <select bind:value={node.options.defaultValue}>
        <option></option>
        {#each node.options.allowedValues as value}
            <option {value}>{value}</option>
        {/each}
    </select>
</div>