<script>
    import { config } from './stores.js';
    import { getConfigTreeBuilder } from './Services/ConfigWriter.js';
    import NodeConfig from './NodeConfig.svelte';
    import Configuration from './Configuration.svelte';
    import ConfigManager from './Services/ConfigManager.js';

    ConfigManager.load();

    let configuration = [];
    let ready = false;
    let yaml = false;
    const u = config.subscribe(conf => {
        configuration = conf;
        ready = conf.length > 0;
        ConfigManager.save($config);
    });

    let tree;
    function buildTree() {
        tree = getConfigTreeBuilder(configuration);
    }

    function clear() {
        ConfigManager.clear();
    }

    let copied = false;
    function copyToClipBoard() {
        navigator.permissions.query({name: "clipboard-write"}).then(result => {
            if (result.state == "granted" || result.state == "prompt") {
                navigator.clipboard.writeText(tree).then(() => {
                    copied = true;
                    setTimeout(() => {copied = false;}, 2000);
                }, () => {
                    console.error('Unable to copy to clipboard.');
                });
            }
        });
    }
</script>

<h1 class="center">Config Tree Builder Builder</h1>
<div class="flexbox-container">
    <div class="configuration" class:yaml>
        <Configuration/>
        {#if ready}
            <button on:click={buildTree}>Get config tree builder</button>
            <button on:click={() => yaml = !yaml}>To Yaml</button>
        {/if}
        {#if configuration.length}
            <button on:click={clear}>Clear</button>
        {/if}
    </div>
    <div>
        <NodeConfig/>

        {#if tree}
        <p>Astuce : pour coller dans phpstorm sans perdre le formattage, coller avec le raccourci : Ctrl + Alt + Shift + V</p>
        <button on:click={copyToClipBoard}>Copy to clipboard</button>
        {#if copied}
            Copied to clipboard !
        {/if}
        <pre>
        {`
<?php

namespace Acme\\MyBundleConfiguration;

use Symfony\\Component\\Config\\Definition\\Builder\\TreeBuilder;
use Symfony\\Component\\Config\\Definition\\ConfigurationInterface;

class MyConfiguration implements ConfigurationInterface
{
    public function getConfigTreeBuilder()
    {
${tree}
    }
}
`}
        </pre>
        {/if}
    </div>
</div>
Icons made by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

<style>
.flexbox-container {
    display: -ms-flex;
    display: -webkit-flex;
    display: flex;
}

.flexbox-container > div {
    width: 50%;
    padding: 10px;
}

.flexbox-container > div:first-child {
    margin-right: 20px;
}
</style>