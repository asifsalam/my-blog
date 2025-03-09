<script>
	export let events;
	import * as d3 from 'd3';

	const minYear = 1930;
	const maxYear = 2030;
	const currentYear = 2025;

	const svgHeight = (2030 - 1930) * 25 + 50;
	const svgWidth = 800;
	const timelineX = svgWidth / 2;
	const timelineY = svgHeight / 2 - 25;

	const yearRange = maxYear - minYear;
	// const yScale = (svgHeight - 50) / yearRange;
	const yScale = d3
		.scaleLinear()
		.domain([minYear, maxYear])
		.range([25, svgHeight - 25]);

	// Function to calculate the y position for a given year
	const getYPosition = (year) => (year - minYear) * yScale + 25;
	const yearList = d3.range(1930, 2031);
	console.log(yearList);
</script>

<div class="visual">
	<svg class="chart" width={svgWidth} height={svgHeight}>
		<!-- Draw the timeline line -->
		<line x1="0" y1={0} x2={svgWidth} y2={0} stroke="black" stroke-width="2" />

		<rect
			x={svgWidth / 2 - 10}
			y="20"
			width="20"
			height={svgHeight - 25}
			fill="lightgrey"
			stroke="lightgrey"
		/>

		<!-- Draw the events -->

		{#each events as event, i (event.year)}
			<g transform={`translate(${timelineX}, ${yScale(event.year)})`}>
				<!-- Draw a circle for the event 
							<circle cx="0" cy="0" r="5" fill="blue" />
-->
				<!-- Draw the year and description -->
				<text
					x="0"
					y="0"
					font-size="12"
					text-anchor="middle"
					dominant-baseline="middle"
					fill="blue"
				>
					{event.year}
				</text>
				<text x="50" y="0" font-size="12" fill="black">
					{event.description}
				</text>
			</g>
		{/each}
	</svg>
</div>

<style>
	.visual {
		margin-top: 20px;
	}
</style>
