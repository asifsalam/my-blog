<script>
	export let letterData;
	export let yKey = 'texts';
	console.log('yKey', yKey);

	let chartData = [];
	letterData.forEach((d) => {
		// let y = d[yKey];
		let x = { x: d.Letter, y: +String(d[yKey]).replace(',', '.') };
		// console.log('chartdata-', typeof y);
		chartData.push(x);
	});

	chartData.sort((a, b) => {
		return b.y - a.y;
	});
	console.log('chart data: ', chartData);

	//     x.forEach(d => delete d["a"])
	//     x.forEach(function(x) {
	//   obj.label = obj.text;
	//   delete obj.text; }
</script>

<div class="chart-container">
	{#each chartData as letter, i}
		<p class="frequency-box" style="width:{(letter.y + 1) * 8}px">{letter.x}</p>
	{/each}
</div>
<p>This is where the chart will go</p>

<style>
	.chart-container {
		display: flex;
		width: 50%;
		flex-direction: column;
	}

	.frequency-box {
		display: inline-block;
		padding: 2px 5px;
		margin: 3px 10px 3px 0;
		/* background-color: #eafaff; */
		background-color: hsla(196, 67%, 54%, 0.07);
		font-family: Roboto, Arial, Helvetica, sans-serif;
		font-weight: normal;
		/* font-size: 16em; */
		font-size: 16px;
		color: hsl(251, 100%, 15%, 0.6);
		border-radius: 4px;
		text-decoration: none;
		border: 1px solid hsla(251, 32%, 44%, 0.2);
		height: 1em;
	}
</style>
