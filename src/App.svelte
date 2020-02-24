<script>
    import { config, selectedNode } from './stores.js';
    import { getConfigTreeBuilder } from './Services/ConfigWriter.js';
    import Configuration from './Configuration.svelte';
    import ConfigManager from './Services/ConfigManager.js';
    import Highlight from 'svelte-highlight';
    import { php } from 'svelte-highlight/languages';

    ConfigManager.load();

    let tree;
    let configuration = [];
    let yaml = false;
    const u = config.subscribe(conf => {
        configuration = conf;
        ConfigManager.save($config);
        buildTree();
    });

    function buildTree() {
        if (configuration.length) {
            tree = getConfigTreeBuilder(configuration);
        } else {
            tree = '';
        }
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
<div class="center">
    {#if configuration.length}
    <button on:click={() => yaml = !yaml}>{yaml ? 'Builder' : 'To Yaml'}</button>
    <button on:click={clear}>Clear</button>
    {/if}
</div>
<div class="flexbox-container">
    <div class="configuration" class:yaml>
        <Configuration/>
    </div>
    <div id="code-panel">
        <button on:click={copyToClipBoard} id="btn-copy">Copy to clipboard</button>
        {#if copied}
            Copied to clipboard !
        {/if}
        <Highlight language={php} code={
`<?php

namespace Acme\\MyBundleConfiguration;

use Symfony\\Component\\Config\\Definition\\Builder\\TreeBuilder;
use Symfony\\Component\\Config\\Definition\\ConfigurationInterface;

class MyConfiguration implements ConfigurationInterface
{
    public function getConfigTreeBuilder()
    {
${tree}
    }
}`}
/>
        </div>
</div>
Icons made by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

<div id="logos">
    <a href="https://github.com/kevin-verschaeve/symfony-config-builder" target="_blank" title="Contribute">
        <img src="/github.png" alt="Github repository" width="24">
    </a>
</div>
