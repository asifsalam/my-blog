<script>
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
	export let letters;
	export let swapInfo;
	export let draggable = false;
	export let letterHead = 'Decode key';
	export let lettersType = 'decode';
	export let showLetters = true;
	const yPos = 50;
	const letterSpacing = 20;
	const boxSpacing = 5;
	const boxHeight = letterSpacing * 1.2;
	const letterOffset = 105;
	const chartWidth = 800;

	let swapped = [];
	let firstClick = false;

	// $: console.log('letter-box-letters: ', letters);

	letters.forEach((d) => {
		swapped[d] = false;
	});

	let xPos = [];
	$: letters.forEach((d, i) => {
		xPos[d] = letterOffset + i * (letterSpacing + boxSpacing);
	});

	// letterOffset + i * (letterSpacing + boxSpacing) - letterSpacing / 2;
	// letterOffset + i * (letterSpacing + boxSpacing)
	let sourceLetter = '';
	let targetLetter = '';

	let boxColors = [];
	letters.forEach((d) => {
		boxColors[d] = 'none';
	});

	// console.log('boxColors: ', boxColors);

	function updatePosition(e) {
		console.log(e.currentTarget.childNodes[1].firstChild.data);
		if (firstClick) {
			console.log('second click');
			targetLetter = e.currentTarget.childNodes[1].firstChild.data;
			swapInfo.sInd = letters.indexOf(sourceLetter);
			swapInfo.tInd = letters.indexOf(targetLetter);
			letters[swapInfo.sInd] = targetLetter;
			letters[swapInfo.tInd] = sourceLetter;
			if (sourceLetter !== targetLetter) {
				swapped[sourceLetter] = true;
				swapped[targetLetter] = true;
				xPos[sourceLetter] =
					letterOffset + swapInfo.tInd * (letterSpacing + boxSpacing) - letterSpacing / 2;
				xPos[targetLetter] =
					letterOffset + swapInfo.sInd * (letterSpacing + boxSpacing) - letterSpacing / 2;
				console.log('Source: ', sourceLetter, '\tTarget: ', targetLetter);
				console.log('Sind: ', swapInfo.sInd, '\tTarget: ', swapInfo.tInd);
			}
			boxColors[sourceLetter] = 'lightgreen';
			boxColors[targetLetter] = 'lightgreen';
			// console.log(swapped);
			firstClick = false;
		} else {
			firstClick = true;
			sourceLetter = e.currentTarget.childNodes[1].firstChild.data;
			boxColors[sourceLetter] = 'lightblue';
			console.log('first click');
		}

		// alert('Position Updaed');
	}

	function handleClick(letter) {
		console.log('handClick: ', letter);
		if (firstClick) {
			firstClick = false;
			targetLetter = letter;
			if (sourceLetter !== targetLetter) {
				const sourceIndex = letters.indexOf(sourceLetter);
				const targetIndex = letters.indexOf(targetLetter);
				const sourcePos = xPos[sourceLetter];
				const targetPos = xPos[targetLetter];
				letters[targetIndex] = sourceLetter;
				letters[sourceIndex] = targetLetter;
				xPos[targetLetter] = sourcePos;
				xPos[sourceLetter] = targetPos;
				boxColors[sourceLetter] = 'lightgreen';
				boxColors[targetLetter] = 'lightgreen';
				swapped[targetLetter] = true;
				swapped[sourceLetter] = true;
			} else if (swapped[targetLetter]) {
				boxColors[targetLetter] = 'lightgreen';
			} else {
				boxColors[targetLetter] = 'none';
			}
		} else {
			firstClick = true;
			sourceLetter = letter;
			boxColors[sourceLetter] = 'lightblue';
			console.log('first click');
		}
	}

	function moveBox(node, { from, to }, params) {
		const dx = from.left - to.left;
		const dy = from.top - to.top;

		const d = Math.sqrt(dx * dx + dy * dy);

		return {
			delay: 0,
			duration: 2000,
			easing: elasticOut,
			css: (t, u) => `transform: translate(${u * dx}px, ${u * dy}px);`
		};
	}
</script>

<div class="container">
	<svg class="letters-chart">
		<text class="letter-head {lettersType}" fill="rgb(89, 89, 89)" x={letterOffset - 20} y={yPos}
			>{letterHead}</text
		>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		{#each letters as letter, i (letter)}
			<g draggable="true" on:click={handleClick(letter)} class="letter-box" animate:moveBox>
				<rect
					x={xPos[letter]}
					y={yPos - letterSpacing + 3}
					width={letterSpacing}
					height={boxHeight}
					fill={boxColors[letter]}
					stroke="lightgray"
				/>
				<text class="letter {lettersType}" x={xPos[letter] + letterSpacing / 2} y={yPos + 1}>
					{#if showLetters}
						{letter}
					{:else}
						-
					{/if}</text
				>
			</g>
		{/each}
	</svg>
</div>

<style>
	svg {
		height: 100px;
		width: 100%;
	}
	.first-click {
		fill: rgb(3, 97, 128);
	}
	.letter {
		font-family: 'Scope One', Georgia, 'Times New Roman', Times, serif;
		/* fill: rgb(89, 89, 89); */
		text-anchor: middle;
		font-size: 1em;
		/* color: rgb(89, 89, 89); */
	}

	.letter-head {
		font-family: 'Scope One', Georgia, 'Times New Roman', Times, serif;
		text-anchor: end;
		margin: auto 0;
		justify-self: right;
		padding-right: 10px;
	}

	.letter-svg {
		stroke: lightgray;
		/* margin: auto; */
		/* padding: 0.25em; */
		/* border: 0.5px lightgray solid; */
		/* fill: none; */
		cursor: pointer;
	}
	.letter-box {
		/* stroke: lightgray; */
		/* fill: none; */
		/* margin: auto; */
		/* padding: 0.25em; */
		/* border: 0.5px lightgray solid; */
		/* width: 15px; */
		cursor: pointer;
		/* float: left; */
	}

	.cipher {
		font-family: Macondo, Georgia, 'Times New Roman', Times, serif;
		fill: rgb(177, 37, 177);
		text-anchor: middle;
		color: rgb(177, 37, 177);
	}
	.decode {
		font-family: Delius, Lancelot, Georgia, 'Times New Roman', Times, serif;
		/* text-anchor: end; */
		fill: rgb(193, 84, 1);
		/* border: 0.5px solid rgba(1, 156, 138, 0.8); */
	}
	.swapped {
		fill: lightgreen;
	}
</style>
