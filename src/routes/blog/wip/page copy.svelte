<script>
	export let data;
	import '$lib/styles/blog.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	const chartWidth = 1000;
	const chartHeight = 1000;

	onMount(() => {
		const svg = d3.select('#chart');
		const margin = { top: 100, right: 100, bottom: 40, left: 90 };

		const width = chartWidth - margin.left - margin.right;
		const height = chartHeight - margin.top - margin.bottom;
		const modelData = data.modelData.filter((d) => d.parameters > 0);
		const minDate = d3.timeParse('%Y-%m-%d')('2017-01-01');
		const maxDate = d3.timeParse('%Y-%m-%d')('2024-01-01');
		const minParameters = 1;
		const maxParameters = 100000000000000;
		// Scales
		// const x = d3
		// 	.scaleTime()
		// 	.domain(d3.extent(modelData, (d) => d.date))
		// 	.range([0, width]);
		const x = d3.scaleTime().domain([minDate, maxDate]).range([0, width]);

		// const y = d3
		// 	.scaleLog()
		// 	.domain([1, d3.max(modelData, (d) => d.parameters)])
		// 	.range([height, 0]);
		const y = d3.scaleLog().domain([1, maxParameters]).range([height, 0]);

		// Add axes
		svg
			.append('g')
			.attr('transform', `translate(${margin.right},${height})`)
			.call(d3.axisBottom(x));
		svg.append('g').attr('transform', `translate(${margin.right},0)`).call(d3.axisLeft(y));

		// Some checks
		// console.log(d3.extent(modelData, (d) => d.date));
		// console.log(d3.min(modelData, (d) => d.date));

		// Draw circles
		svg
			.selectAll('circle')
			.data(modelData)
			.enter()
			.append('circle')
			.attr('cx', (d) => x(d.date))
			.attr('cy', (d) => y(d.parameters))
			.attr('r', 15)
			.style('fill', 'none')
			.style('stroke', 'lightblue');

		// Add labels (simplified)
		svg
			.selectAll('text')
			.data(modelData)
			.enter()
			.append('text')
			.attr('x', (d) => x(d.date))
			.attr('y', (d) => y(d.parameters))
			.text((d) => d.model_name)
			.style('font-size', '12px');
	});

	// console.log(modelData);
</script>

{#key $page.params.id}
	<!-- <div class="sidebar">
		<PostsListCard {posts} />
		<p class="topics">
			<SidebarTags useThemes={'yes'} useCategories={'yes'} />
		</p>
	</div> -->
	<div>This is a sidebar</div>

	<div class="main-content">
		<div class="heading">
			<h1>this is a test</h1>
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
