<script>
    import { config, selectedNode } from './stores.js';
    import { getConfigTreeBuilder, getConfigInYaml } from './Services/ConfigWriter.js';
    import ConfigManager from './Services/ConfigManager.js';
    import Highlight from 'svelte-highlight';
    import { php, yaml as yamlLang } from 'svelte-highlight/languages';
    import RawNode from './RawNode.svelte';
    import NodeConfig from './NodeConfig.svelte';
    import Modal from './Modal.svelte';
    import 'svelte-highlight/styles/monokai-sublime.css';

    ConfigManager.load();

    let yaml = false;
    let copied = false;

    $: root = $config.find(n => n.type == 'root');
    $: tree = getConfigTreeBuilder($config);
    $: yamlConfig = yaml && getConfigInYaml($config)
    $: {ConfigManager.save($config);}

    const clear = () => ConfigManager.restart();

    const copyToClipBoard = (content) => {
        navigator.permissions.query({name: "clipboard-write"}).then(result => {
            if (result.state == "granted" || result.state == "prompt") {
                navigator.clipboard.writeText(content).then(() => {
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
    {#if $config.length}
    <button on:click={() => yaml = !yaml}>{yaml ? 'Builder' : 'To Yaml'}</button>
    <button on:click={clear}>Clear</button>
    {/if}
    {#if copied}
        <div id="copy-message">Copied to clipboard !</div>
    {/if}
</div>
<div class="flexbox-container">
    <div class="configuration" class:yaml>
        {#if yaml}
            <button on:click={copyToClipBoard(yamlConfig)} class="btn-copy">Copy to clipboard</button>
            <Highlight language={yamlLang} code={yamlConfig}/>
        {:else}
            <RawNode node={root}/>
        {/if}
    </div>
    <div id="code-panel">
        <button on:click={copyToClipBoard(tree)} class="btn-copy">Copy to clipboard</button>
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

{#if $selectedNode}
<Modal on:close="{() => selectedNode.set(null)}">
    <NodeConfig node={$selectedNode}/>
</Modal>
{/if}

<div id="logos">
    <a href="https://github.com/kevin-verschaeve/symfony-config-builder" target="_blank" title="Contribute">
        <img src="/github.png" alt="Github repository" width="24">
    </a>
</div>
