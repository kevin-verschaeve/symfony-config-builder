<script>
    export let node;

    let newValue;
    const addAllowedValue = () => {
        if (!newValue.trim()) {
            return;
        }

        node.options.allowedValues = [...node.options.allowedValues, newValue];
        newValue = null;
    }

    const removeAllowedValue = (index) => node.options.allowedValues = [...node.options.allowedValues.slice(0, index), ...node.options.allowedValues.slice(index + 1)];
</script>

<div class="config-row">
    <label for="newValue-{node.id}">Add a new value (encapsulate strings with quotes)</label>
    <input id="newValue-{node.id}" type="text" bind:value={newValue} class="node-config-enum-value-adder">
    <button on:click={addAllowedValue} class="btn btn-ok btn-enum-adder">Add</button>
    <p>
        Allowed values:
        {#each node.options.allowedValues as allowedValue, i}
            <span class="node-config-enum-value-list">
                {allowedValue}
                <button class="btn-enum-remover" title="Remove" on:click={() => removeAllowedValue(i)}>&times;</button>
            </span>
        {/each}
    </p>
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