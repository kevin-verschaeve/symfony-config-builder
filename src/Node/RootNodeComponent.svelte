<script>
export let node;
</script>

<div class="config-row">
    <label for="root-{node.id}">Name:</label>
    <input id="root-{node.id}" type="text" bind:value={node.name} autofocus>
</div>