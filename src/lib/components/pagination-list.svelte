<script>
	import { fade, slide, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import '$lib/styles/global.css';
	import { itemsPerPage } from '$lib/json/stores';
	import ContentCardMedium from '$lib/components/content-card-medium-v3.svelte';
	import Pagination from '$lib/components/pagination.svelte';
	export let articles;
	export let category;
	export let totalQuantity;

	let numArticles = articles.length;
	let articlesPerPage = $itemsPerPage;
	$: totalPages = Math.ceil(totalQuantity / articlesPerPage);
	$: currentPage = 1;
	$: pageSet = 5;
	let startArticleNum = 0;
	// console.log('pagination-list', articles);
	$: articleSet = articles.slice(startArticleNum, articlesPerPage);
	//	let currentPage = 1;
	let trimStart = 0;
	let trimEnd = trimStart + pageSet;

	function handlePageChange(subPage) {
		currentPage = subPage;
		trimStart = (currentPage - 1) * articlesPerPage;
		trimEnd = trimStart + articlesPerPage;
		articleSet = articles.slice(trimStart, trimEnd);
		// fetch new data for the current page
	}
	/*
    In this example, the currentPage and totalPages props are used to display the current page and the total number of pages respectively. The onChangePage prop is a callback function that is called when the user changes the page, and it takes the new page number as its argument. When the user clicks the "Previous" or "Next" buttons or any of the page number buttons, the corresponding functions in the component are called to update the currentPage prop and call the onChangePage callback with the new page number.
    */
	currentPage = currentPage;
	articleSet = articleSet;
</script>

<!-- <Pagination {currentPage} {totalPages} onChangePage={handlePageChange} /> -->
<div class="pagination-container">
	<div class="page-info">
		<p class="page-info-details">
			Total pages: <span style="font-weight:bold;">{totalPages}</span>
		</p>
		{#if totalPages > 0}
			<p class="page-info-details">
				Item set: <span style="font-weight:bold;"
					>{trimStart + 1} - {trimStart + articleSet.length}</span
				>
			</p>
		{:else}
			<p class="page-info-details">
				Item set: <span style="font-weight:bold;">None</span>
			</p>
		{/if}
	</div>
	{#key category}
		<Pagination
			{currentPage}
			startPage={1}
			{totalPages}
			{pageSet}
			onChangePage={handlePageChange}
		/>
	{/key}
</div>
{#key articleSet}
	<div
		class="category-container"
		out:fly={{ delay: 0, duration: 200, opacity: 0, x: -100 }}
		in:fly={{ delay: 250, duration: 200, x: 200 }}
	>
		{#each articleSet as article, i}
			<ContentCardMedium {article} />
		{/each}
	</div>
{/key}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300&family=Roboto:wght@100;300&display=swap');
	.pagination-container {
		margin: 0 0 15px 0;
		padding: 0;
		/* display: flex; */
		display: grid;
		grid-template-columns: 1fr 3fr;
		justify-content: space-between;
		align-content: stretch;
		align-items: flex-start;
		border-top: 2px dotted hsla(251, 100%, 20%, 0.7);
	}

	.page-info {
		margin: 10px 0;
		padding: 0;
	}

	.page-info-details {
		margin: 0px 0;
		padding: 3px 0;
	}
	.category-container {
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: start;
		column-gap: 1.5rem;
		row-gap: 1.5rem;
		align-content: start;
		/* margin-bottom: 15px; */
	}
	@media (max-width: 768px) {
		.pagination-container {
			grid-template-columns: 1fr;
			justify-items: center;
			height: auto;
		}
		.page-info {
			margin: 5px 0;
		}
		.category-container {
			grid-template-columns: 1fr;
		}
	}
</style>
