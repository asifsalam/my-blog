<script>
	export let data;
	import '$lib/styles/blog.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { text } from '@sveltejs/kit';
	const chartWidth = 1000;
	const chartHeight = 800;

	const svg = d3.select('#chart');
	const margin = { top: 10, right: 150, bottom: 100, left: 90 };

	const width = chartWidth - margin.left - margin.right;
	const height = chartHeight - margin.top - margin.bottom;
	console.log('width: ', width);
	console.log('height: ', height);
	const modelData = data.modelData.filter((d) => d.parameters > 0);
	const minDate = d3.timeParse('%Y-%m-%d')('2017-01-01');
	const maxDate = d3.timeParse('%Y-%m-%d')('2024-01-01');
	const minParameters = 1000000;
	const maxParameters = 10000000000000;

	const xScale = d3.scaleTime().domain([minDate, maxDate]).range([0, width]);
	const yScale = d3.scaleLog().domain([minParameters, maxParameters]).range([height, 0]);

	const yearFormatter = d3.timeFormat('%Y');
	const dateFormatter = d3.timeFormat('%Y-%m-%d');
	const parFormatter = d3.format('0.2s');
	const modelDevelopers = [
		'Krizhevsky',
		'BigScience',
		'TII',
		'Rosenblatt',
		'StabilityAI',
		'X',
		'Google',
		'OpenAI',
		'Meta',
		'Nvidia',
		'Other'
	];
	const modelDevelopersLegend = [
		{ developer: 'Google', color: '#4080ee' },
		{ developer: 'OpenAI', color: '#12a07d' },
		{ developer: 'Meta', color: '#8c564b' },
		{ developer: 'Nvidia', color: '#a31d1e' },
		{ developer: 'Other', color: '#909090' }
	];

	const developerColorScale = d3
		.scaleOrdinal()
		.domain(modelDevelopers)
		.range([
			d3.color('#909090'),
			d3.color('#909090'),
			d3.color('#909090'),
			d3.color('#909090'),
			d3.color('#909090'),
			d3.color('#909090'),
			d3.color('#4080ee'),
			d3.color('#12a07d'),
			d3.color('#8c564b'),
			d3.color('#a31d1e'),
			d3.color('#909090')
		]);
	// yScale.ticks().forEach((d) => {
	// 	console.log(d);
	// });
</script>

<div><p><br /></p></div>

<div class="main-content">
	<div class="heading">
		<h1 class="chart-title">Parameter counts of selected AI models</h1>
		<div class="legend-container">
			{#each modelDevelopersLegend as { developer, color }}
				<p class="legend" style="background:{color}">{developer}</p>
			{/each}
		</div>
		<br />
	</div>

	<svg id="chart" width={chartWidth} height={chartHeight}>
		<g transform={`translate(${margin.left},${margin.top})`}>
			<!-- <g bind:this={yAxis} /> -->
			{#each xScale.ticks(5) as tickValue}
				<g transform={`translate(${xScale(tickValue)},0)`}>
					<line y2={height} stroke="#dddddd4f" />
					<text text-anchor="middle" dy=".71em" y={height + 15}>
						{yearFormatter(tickValue)}
					</text>
				</g>
			{/each}
			{#each yScale.ticks(7) as tickValue}
				<g transform={`translate(0,${yScale(tickValue)})`}>
					<line x2={width} stroke="#dddddd4f" />
					<text text-anchor="end" dx="-1em">{parFormatter(tickValue).replace('G', 'B')}</text>
				</g>
			{/each}
			{#each modelData as { date, parameters, model_name, developer, highlight, entity }}
				{#if highlight === '1'}
					<circle
						cx={xScale(date)}
						cy={yScale(parameters)}
						r="10"
						fill={developerColorScale(developer)}
						stroke={developerColorScale(developer)}
						fill-opacity="0.2"
						stroke-width="2px"
					>
						<title
							>{`Date: ${dateFormatter(
								date
							)}\nModel Name: ${model_name}\nParameters: ${parFormatter(parameters).replace(
								'G',
								'B'
							)}`}</title
						>
					</circle>
					<text
						class="label"
						x={xScale(date)}
						dx="-1em"
						y={yScale(parameters)}
						dy="0.4em"
						text-anchor="end">{model_name}</text
					>
				{:else}
					<circle
						cx={xScale(date)}
						cy={yScale(parameters)}
						r="5"
						fill={developerColorScale(developer)}
						stroke={developerColorScale(developer)}
						fill-opacity="0.4"
						stroke-width="0.5px"
					>
						<title
							>{`Date: ${dateFormatter(date)}\nModel Name: ${entity}\nParameters: ${parFormatter(
								parameters
							).replace('G', 'B')}`}</title
						>
					</circle>
				{/if}
			{/each}
			<line
				x1={0}
				x2={1000 - margin.left - margin.right}
				y1={height + 1}
				y2={height + 1}
				stroke="lightgrey"
			/>
			<text class="axis-label" transform={`translate(${-75},${height / 2}) rotate(-90)`}
				>Parameters</text
			>
			<text class="axis-label" x={width / 2} y={height + 60}>Model Release Date</text>
		</g>
	</svg>
</div>

<style>
	.heading h1 {
		margin-top: 10px;
		margin-bottom: 20px;
	}

	.main-content {
		width: 100%;
		display: grid;
		justify-items: center;
	}

	.legend-container {
		display: grid;
		grid-auto-flow: column;
		grid-column-gap: 10px;
		justify-items: center;
		align-items: center;
		justify-content: center;
	}
	.legend {
		margin: 5px;
		color: white;
		padding: 5px;
	}

	.chart-title {
		font-size: 2.5em;
		margin-top: 20em;
	}
	.axis-label {
		font-family: Delius;
		font-size: 1.2em;
	}

	.label {
		font-family: Roboto, 'Antic Slab';
		font-size: 0.9em;
		font-weight: bold;
		color: hsla(0, 0%, 54%, 0.9);
	}

	@media (max-width: 1000px) {
		div.sidebar {
			margin: 0px;
			padding-bottom: 20px;
			border-bottom: 2px dotted var(--main-color);
		}
	}
</style>
