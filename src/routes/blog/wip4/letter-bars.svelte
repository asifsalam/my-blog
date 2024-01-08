<script>
	import { scaleLinear, max } from 'd3';
	export let letterData;
	export let yKey = 'texts';
	export let chartOptions = {
		title: 'Frequency Chart'
	};
	export let fontColor = 'rgba(193, 84, 1, 1);';

	// letterData.sort((a, b) => {
	// 	return b.frequency - a.frequency;
	// });
	let barContainer = document.querySelector('.chart-container');
	// let barWidth = barContainer.offsetWidth;
	// console.log('barWidth: ', barContainer);
</script>

<div class="chart-container">
	<p class="chart-title">{chartOptions.title}</p>
	{#each letterData as letter, i}
		<p class="frequency-box" style="width:{(letter.frequency + 1) * 16}px;font-color:{fontColor}">
			{letter.letter}
		</p>
	{/each}
</div>

<style>
	.chart-container {
		display: flex;
		width: 100%;
		flex-direction: column;
	}

	.frequency-box {
		padding: 1px 2px 3px 2px;
		margin: 3px 3px;
		background-color: hsla(16, 100%, 43%, 0.07);
		font-family: Delius, Roboto, Arial, Helvetica, sans-serif;
		font-weight: normal;
		font-size: 16px;
		color: hsl(251, 100%, 15%, 0.8);
		border-radius: 4px;
		text-decoration: none;
		border: 1px solid hsla(251, 32%, 44%, 0.2);
		height: 1em;
	}
</style>
