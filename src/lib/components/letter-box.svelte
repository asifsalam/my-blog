<script>
	export let alphabet;
	export let cipher;
	export let createCipher = () => {};
	export let cipherGenerated;
	const yPos = 50;
	const letterSpacing = 25;
	const boxHeight = letterSpacing * 1.5;
	const alphabetOffset = 100;
	const chartWidth = 800;
</script>

<div class="container">
	<svg class="letters-chart">
		<text class="letter-head" fill="rgb(89, 89, 89)" x={alphabetOffset - 20} y={yPos}>Letters</text>
		<text class="cipher-head" fill="rgb(177, 37, 177)" x={alphabetOffset - 20} y={yPos + 55}
			>Cipher</text
		>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<text
			class="generate-cipher"
			x={(alphabet.length * letterSpacing) / 2 + alphabetOffset}
			y={yPos - letterSpacing + 115}
			fill="blue"
			on:click={() => {
				createCipher();
			}}
			cursor="pointer"
			text-anchor="middle"
			font-size="0.8em"
			>Generate cipher (random shuffle)
		</text>
		{#each alphabet as letter, i}
			<text class="letter" x={i * letterSpacing + alphabetOffset} y={yPos}>{letter}</text>
			<rect
				class="letter-svg"
				x={i * letterSpacing + alphabetOffset - letterSpacing / 2}
				y={yPos - letterSpacing - 2}
				width={letterSpacing}
				height={boxHeight}
			/>
			{#if cipherGenerated}
				<text class="cipher" x={i * letterSpacing + alphabetOffset} y={yPos + 55}>{cipher[i]}</text>
			{/if}
			<rect
				class="letter-svg"
				x={i * letterSpacing + alphabetOffset - letterSpacing / 2}
				y={yPos - letterSpacing - 2 + 55}
				width={letterSpacing}
				height={boxHeight}
			/>
		{/each}
	</svg>
</div>

<style>
	.letter {
		font-family: 'Scope One', Georgia, 'Times New Roman', Times, serif;
		fill: rgb(89, 89, 89);
		text-anchor: middle;
		font-size: 1em;
		color: rgb(89, 89, 89);
	}

	.letter-head {
		font-family: 'Scope One', Georgia, 'Times New Roman', Times, serif;
		text-anchor: end;
		/* display: inline-block; */
		/* margin: 1em 0.5em 0 1em; */
		margin: auto 0;
		/* width: 3em; */
		justify-self: right;
		padding-right: 10px;
	}

	.letter-svg {
		stroke: lightgray;
		fill: none;
		margin: auto;
		padding: 0.25em;
		border: 0.5px lightgray solid;

		float: left;
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

	.cipher {
		font-family: Macondo, Georgia, 'Times New Roman', Times, serif;
		fill: rgb(177, 37, 177);
		text-anchor: middle;
		color: rgb(177, 37, 177);
	}
</style>
