<script>
	import Prism from 'prismjs';
	import 'prism-svelte';
	// import '$lib/styles/gruvbox.css';
	export let codeLanguage = 'language-r';
</script>

<pre class="code-container">
    <code class={codeLanguage}>
        <slot />
    </code>
</pre>

<style>
	.code-container {
		box-sizing: border-box;
		width: 100%;
		overflow-x: auto;
	}
</style>
