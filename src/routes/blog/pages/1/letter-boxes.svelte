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
	const chartWidth = 600;
	const letterOffset = chartWidth / 8;
	const yPos = letterOffset / 5;
	const letterSpacing = letterOffset / 5;
	const boxSpacing = letterSpacing / 4;
	const boxHeight = letterSpacing * 1.2;

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
		if (draggable) {
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

<svg class="letters-chart">
	<text class="letter-head {lettersType}" fill="rgb(89, 89, 89)" x={letterOffset - 10} y={yPos}
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

<style>
	svg {
		height: 35px;
		width: 100%;
	}
	.first-click {
		fill: rgb(3, 97, 128);
	}
	.letter {
		font-family: 'Scope One', Georgia, 'Times New Roman', Times, serif;
		text-anchor: middle;
		font-size: 1.1em;
	}

	.letter-head {
		font-family: 'Scope One', Georgia, 'Times New Roman', Times, serif;
		margin: auto 0;
		justify-self: right;
		padding-right: 10px;
		text-anchor: end;
	}

	.letter-svg {
		stroke: lightgray;
		cursor: pointer;
	}
	.letter-box {
		cursor: pointer;
	}

	.cipher {
		font-family: Macondo, Georgia, 'Times New Roman', Times, serif;
		fill: rgb(177, 37, 177);
		color: rgb(177, 37, 177);
	}
	.decode {
		font-family: Delius, Lancelot, Georgia, 'Times New Roman', Times, serif;
		fill: rgb(193, 84, 1);
	}
	.swapped {
		fill: lightgreen;
	}
</style>
