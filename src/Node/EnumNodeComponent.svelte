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
    <label for="newValue-{node.id}">Add a new value</label>
    <input id="newValue-{node.id}" type="text" bind:value={newValue} class="node-config-enum-value-adder">
    <button on:click={addAllowedValue} class="btn btn-ok btn-enum-adder">Add</button>
    <p>Allowed values: <span class="node-config-enum-value-list">{node.options.allowedValues.join(', ')}</span></p>
</div>
<div class="config-row">
    <label class="inline-block">Default value</label>
    <select bind:value={node.options.defaultValue} class="inline-block">
        <option>None</option>
        {#each node.options.allowedValues as value}
            <option {value}>{value}</option>
        {/each}
    </select>
</div>