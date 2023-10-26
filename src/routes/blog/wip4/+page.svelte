<script>
	export let data;
	import Layout from '../../+layout.svelte';
	import LetterDisplay from './letter-display.svelte';

	$: decodeKey = [...'ABCD'];

	$: swapInfo = { sId: '', tId: '', sInd: 0, tInd: 0 };
	$: {
		decodeKey = decodeKey;
		console.log('decodeKey: ', decodeKey);
	}
</script>

<p>This is a test</p>
<LetterDisplay bind:letters={decodeKey} bind:swapInfo />

<style>
</style>
