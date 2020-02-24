<script>
export let node;
</script>

<div class="config-row">
    <label for="default">Default value</label>
    <select bind:value={node.options.defaultValue}>
        <option value="true">true</option>
        <option value="false">false</option>
    </select>
</div>