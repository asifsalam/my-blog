<script>
	import { flip } from 'svelte/animate';
	export let letters;
	export let swapInfo;
	export let draggable = false;
	export let letterHead = 'Decode key';
	export let lettersType = 'decode';
	export let showLetters = true;

	import { interpolateLab } from 'd3-interpolate';
	import { tweened } from 'svelte/motion';

	const colors = ['rgb(226, 153, 43)', 'rgb(64, 179, 255)', 'rgb(103, 103, 120)'];

	const color = tweened(colors[0], {
		duration: 800,
		interpolate: interpolateLab
	});

	const flipOptions = { delay: 100, duration: 1000 };
	let showDash = letters.length === 0;

	function handleDragStart(e) {
		e.dataTransfer.setData('Text', e.target.id);
	}

	let dropped = false;
	let swapped = [];
	letters.forEach((d) => {
		swapped[d] = false;
	});

	// console.log('swapped: ', swapped);

	function handleDrop(e) {
		e.preventDefault();
		dropped = true;
		swapInfo.sId = e.dataTransfer.getData('Text');
		swapInfo.tId = e.target.id;
		console.log('Drag entered at: ', e, e.target.id);
		let sourceLetter = swapInfo.sId.split('-')[1];
		let targetLetter = swapInfo.tId.split('-')[1];
		swapInfo.sInd = letters.indexOf(sourceLetter);
		swapInfo.tInd = letters.indexOf(targetLetter);
		letters[swapInfo.sInd] = targetLetter;
		letters[swapInfo.tInd] = sourceLetter;
		if (sourceLetter !== targetLetter) {
			swapped[sourceLetter] = true;
			swapped[targetLetter] = true;
		}
	}

	function allowDrop(e) {
		e.preventDefault();
	}
	// console.log('letter-display: ', letterHead, letters);
</script>

<div class="letters-list">
	<p class="letter-head {lettersType}">{letterHead}</p>
	<div class="letters-table">
		{#key letters}
			{#each letters as letter (letter)}
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<p
					class="letter-box {lettersType}"
					id="decode-{letter}"
					class:swapped={swapped[letter]}
					{draggable}
					on:dragstart={handleDragStart}
					on:drop={handleDrop}
					on:dragover={allowDrop}
				>
					{#if showLetters}
						{letter}
					{:else}
						-
					{/if}
				</p>
			{/each}
		{/key}
	</div>
</div>

<style>
	.swapped {
		background-color: rgb(161, 249, 221);
		transition: background-color 10s;
	}
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
		/* background-color: rgb(226, 153, 43); */
		fill: none;
		margin: auto;
		padding: 0.25em;
		border: 0.5px lightgray solid;
		width: 15px;
		float: left;
		transition: all 5s;
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
