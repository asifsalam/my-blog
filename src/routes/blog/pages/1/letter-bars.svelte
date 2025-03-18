<script>
	export let letterData;
	export let yKey = 'texts';
	export let chartOptions = {
		title: 'Frequency Chart',
		barType: 'letter'
	};
	export let fontColor = 'rgba(193, 84, 1, 1);';

	let barContainer = document.querySelector('.chart-container');
</script>

<div class="chart-container">
	<p class="chart-title {chartOptions.barType}" style="background:none;border:none">
		{chartOptions.title}
	</p>
	{#each letterData as letter, i}
		<div class="single-bar">
			<span
				class="axis-letter {chartOptions.barType}"
				style="border:none;background:none;width:20px;font-color:{fontColor}">{letter.letter}</span
			>
			<span class="frequency-box {chartOptions.barType}" style="width:{letter.frequency * 12}px;" />
		</div>
	{/each}
</div>

<style>
	.chart-container {
		display: flex;
		width: 100%;
		flex-direction: column;
	}

	.single-bar {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.axis-letter {
		text-align: end;
		padding-right: 5px;
	}

	.letter {
		background-color: hsla(251, 100%, 21%, 0.05);
		border: 1px solid hsla(251, 100%, 21%, 1);
		font-family: Delius, Roboto, Arial, Helvetica, sans-serif;
		color: hsl(251, 100%, 15%, 0.8);
	}

	.cipher {
		background-color: rgb(177, 37, 177, 0.05);
		border: 1px solid rgb(177, 37, 177);
		font-family: Macondo, Georgia, 'Times New Roman', Times, serif;
		color: rgb(177, 37, 177);
	}

	.frequency-box {
		padding: 1px 2px 3px 2px;
		margin: 3px 3px;
		/* background-color: hsla(16, 100%, 43%, 0.07); */
		/* font-family: Delius, Roboto, Arial, Helvetica, sans-serif; */
		font-weight: normal;
		font-size: 1em;
		/* color: hsl(251, 100%, 15%, 0.8); */
		border-radius: 4px;
		text-decoration: none;
		/* border: 1px solid hsla(251, 32%, 44%, 0.2); */
		height: 1em;
	}
</style>
