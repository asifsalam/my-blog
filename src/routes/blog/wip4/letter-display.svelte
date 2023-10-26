<script>
	export let letters;
	export let swapInfo;

	import { onMount } from 'svelte';

	const lettersType = 'decode';
	let sourceId = '';
	let sourceIndex = 0;
	let sourceLetter = '';

	function handleDragStart(e) {
		e.dataTransfer.setData('Text', e.target.id);
		sourceId = e.target.id;
		console.log('handleDragStart-sourceLetter: ', sourceLetter);
	}

	let targetId = '';
	let targetIndex = 0;
	let targetLetter = '';
	let dropped = false;
	function handleDrop(e) {
		// let sourceId = e.getData("Text");
		e.preventDefault();
		dropped = true;
		swapInfo.sId = e.dataTransfer.getData('Text');
		swapInfo.tId = e.target.id;
		console.log('Drag entered at: ', e, e.target.id);
		sourceLetter = swapInfo.sId.split('-')[1];
		targetLetter = swapInfo.tId.split('-')[1];
		swapInfo.sInd = letters.indexOf(sourceLetter);
		swapInfo.tInd = letters.indexOf(targetLetter);
		letters[swapInfo.sInd] = targetLetter;
		letters[swapInfo.tInd] = sourceLetter;
		letters = letters;
		console.log(
			'letter-display: handle-drop: ',
			sourceIndex,
			sourceLetter,
			targetIndex,
			targetLetter,
			letters[swapInfo.sInd],
			letters[swapInfo.tInd]
		);
	}

	function allowDrop(e) {
		e.preventDefault();
	}
</script>

<div class="letters-list">
	<div class="letters-table">
		{#key letters}
			{#each letters as letter}
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<span
					class="letter-box {lettersType}"
					id="decode-{letter}"
					draggable="true"
					on:dragstart={handleDragStart}
					on:drop={handleDrop}
					on:dragover={allowDrop}
				>
					{letter}
				</span>
			{/each}
		{/key}
	</div>
</div>

<style>
	.letters-list {
		margin: 10px 0 10px 0;
		display: grid;
		grid-template-columns: 1fr 8fr;
	}

	.letter-head {
		text-anchor: end;
		/* display: inline-block; */
		/* margin: 1em 0.5em 0 1em; */
		margin: auto 0;
		/* width: 3em; */
		justify-self: right;
		padding-right: 10px;
	}
	.letter-box {
		stroke: lightgray;
		fill: none;
		margin: auto;
		padding: 0.25em;
		border: 0.5px lightgray solid;
		width: 15px;
		float: left;
	}

	.letter {
		font-family: 'Scope One', Georgia, 'Times New Roman', Times, serif;
		fill: rgb(89, 89, 89);
		text-anchor: middle;
		font-size: 1em;
		color: rgb(89, 89, 89);
	}
	.cipher {
		font-family: 'Macondo', Georgia, 'Times New Roman', Times, serif;
		color: rgb(177, 37, 177);
	}

	.plaintext {
		font-family: 'Scope One', Allura, Macondo, Georgia, 'Times New Roman', Times, serif;
		/* border: 0.5px solid rgba(233, 233, 233, 0); */
		/* background-color: rgba(233, 233, 233, 0); */
	}

	.decrypted {
		font-family: Georgia, 'Times New Roman', Times, serif;
		color: rgb(1, 115, 156);
		/* border: 0.5px solid rgba(117, 37, 177, 0); */
	}
	.decode {
		font-family: Delius, Lancelot, Georgia, 'Times New Roman', Times, serif;
		color: rgb(193, 84, 1);
		/* border: 0.5px solid rgba(1, 156, 138, 0.8); */
	}
</style>
