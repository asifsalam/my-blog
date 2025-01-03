<script>
	export let data;
	import '$lib/styles/blog.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	const chartWidth = 1000;
	const chartHeight = 700;
	// Dummy data - replace this with your actual data

	// Prepare your data - convert date strings to actual Date objects

	// Function to create the chart
	function createChart(modelData) {
		const svg = d3.select('#chart');
		const margin = { top: 20, right: 30, bottom: 50, left: 80 };
		const width = chartWidth - margin.left - margin.right;
		const height = chartHeight - margin.top - margin.bottom;

		// Set up the scales
		const xScale = d3
			.scaleTime()
			.domain(d3.extent(modelData, (d) => d.date))
			.range([0, width]);
		// console.log('xScale: ', xScale(modelData[2].date));

		const yScale = d3
			.scaleLog()
			.domain([10000, d3.max(modelData, (d) => d.parameters)])
			.range([height, 0]);
		// console.log('yScale: ', modelData[2].parameters, yScale(modelData[2].parameters));

		// Add the SVG to the page
		const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

		// X-axis
		g.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(xScale));

		// Y-axis
		g.append('g').call(d3.axisLeft(yScale));

		// X-axis label
		svg
			.append('text')
			.attr('text-anchor', 'end')
			.attr('x', width / 2 + margin.left)
			.attr('y', height + margin.top + 40)
			.text('Model Release Date');

		// Y-axis label
		svg
			.append('text')
			.attr('text-anchor', 'end')
			.attr('transform', 'rotate(-90)')
			.attr('y', 20)
			.attr('x', -margin.top - height / 2 + 20)
			.text('# of Parameters');

		// Plot the data
		g.selectAll('.model-dot')
			.data(modelData)
			.enter()
			.append('circle')
			.attr('class', 'model-dot')
			.attr('r', 5) // Adjust radius as needed
			.attr('cx', (d) => xScale(d.date))
			.attr('cy', (d) => {
				return yScale(d.parameters);
			})
			.style('fill', (d) => (d.highlight ? 'red' : 'blue')) // Adjust colors as needed
			.style('opacity', 0.5);

		// Optionally, add labels to highlighted points
		g.selectAll('.model-label')
			.data(modelData.filter((d) => d.highlight))
			.enter()
			.append('text')
			.attr('x', (d) => xScale(d.date))
			.attr('y', (d) => yScale(d.parameters))
			.attr('dy', -10) // Adjust label position
			.style('text-anchor', 'middle')
			.text((d) => d.model_name);
	}

	onMount(() => {
		console.log(data.modelData);
		createChart(data.modelData.filter((d) => d.parameters > 10));
	});
</script>

{#key $page.params.id}
	<!-- <div class="sidebar">
		<PostsListCard {posts} />
		<p class="topics">
			<SidebarTags useThemes={'yes'} useCategories={'yes'} />
		</p>
	</div> -->
	<div />

	<div class="main-content">
		<div class="heading">
			<h1>Parameter counts of selected AI systems</h1>
		</div>
		<svg id="chart" width={chartWidth} height={chartHeight} />
	</div>
{/key}

<style>
	.heading h1 {
		margin-top: 10px;
		margin-bottom: 20px;
	}

	.meta-info {
		border-left: hsl(251, 100%, 15%) solid 4px;
		padding: 0 0 0 10px;
	}

	.meta-info .author,
	.date {
		font-family: Roboto, Verdana, Geneva, Tahoma, sans-serif;
		font-style: oblique;
		margin: 5px;
	}

	.main-content {
		width: 100%;
	}

	.sidebar {
		margin: 10px 30px 0px 0px;
	}
	@media (max-width: 1000px) {
		div.sidebar {
			margin: 0px;
			padding-bottom: 20px;
			border-bottom: 2px dotted var(--main-color);
		}
	}
</style>
