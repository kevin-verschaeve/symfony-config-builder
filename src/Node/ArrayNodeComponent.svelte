<script>
export let node;
</script>

<div class="config-row">
    <label>
        Prototype ?
        <input type="checkbox" bind:checked={node.options.isPrototype}>
    </label>
</div>