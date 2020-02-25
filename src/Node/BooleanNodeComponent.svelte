<script>
export let node;
</script>

<div class="config-row">
    <label class="inline-block">Default value</label>
    <select bind:value={node.options.defaultValue} class="inline-block">
        <option value="true">true</option>
        <option value="false">false</option>
    </select>
</div>