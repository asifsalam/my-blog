<script>
	import { onMount } from 'svelte';

	export let currentPage = 1;
	export let totalPages = 1;
	export let onChangePage = () => {};
	export let pageSet = 5;
	export let startPage = 1;
	export let pageList = Array.from(
		{ length: lastVisiblePage() - startPage + 1 },
		(_, i) => i + startPage
	);

	function pageListUpdate() {}

	function pageListUpdateNext() {
		pageList = Array.from({ length: lastVisiblePage() - startPage + 1 }, (_, i) => i + startPage);
		let addPages = pageSet - pageList.length;
		if (addPages > 0) {
			for (let i = 0; i < addPages; i++) {
				pageList.push(0);
			}
		}
		pageList = pageList;
	}

	// Function to calculate the last visible page number
	function lastVisiblePage() {
		let lastPage = startPage + pageSet - 1;
		return Math.min(lastPage, totalPages);
	}

	// Function to go to the next page
	function nextPage() {
		if (currentPage < totalPages) {
			let pageSetEndBoundary = currentPage % pageSet === 0;
			// console.log('nextPage: ', pageSetEndBoundary);
			currentPage++;
			onChangePage(currentPage);
			if (currentPage > lastVisiblePage()) {
				startPage++;
			}
			if (pageSetEndBoundary) {
			}
			pageListUpdateNext();
		}
	}

	// Function to go to the previous page
	function prevPage() {
		if (currentPage > 1) {
			let pageSetStartBoundary = currentPage % pageSet === 1;
			// console.log('prevPage: ', pageSetStartBoundary);
			currentPage--;
			onChangePage(currentPage);
			if (currentPage < startPage) {
				startPage--;
			}
			// if (pageSetStartBoundary) {
			pageListUpdateNext();
			// }
		}
	}

	// Function to go to a specific page
	function gotoPage(page) {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
			onChangePage(currentPage);
			if (page < startPage || page > lastVisiblePage()) {
				startPage = page;
			}
		}
	}

	// Function to go to the next set of pages
	function nextSet() {
		if (startPage + pageSet <= totalPages) {
			startPage += pageSet;
			currentPage = startPage;
		} else {
			startPage = totalPages - pageSet + 1;
			currentPage = totalPages;
		}
		pageListUpdateNext();
		onChangePage(currentPage);
	}

	// Function to go to the previous set of pages
	function prevSet() {
		if (startPage - pageSet >= 1) {
			startPage -= pageSet;
			currentPage = startPage;
		} else {
			startPage = 1;
			currentPage = 1;
		}
		pageListUpdateNext();
		onChangePage(currentPage);
	}

	onMount(() => {
		// pageList = Array.from({ length: lastVisiblePage() - startPage + 1 }, (_, i) => i + startPage);
		pageListUpdateNext();
	});
</script>

<div class="pagination">
	<button class="page-nav previous-set" on:click={prevSet} class:disabled={startPage === 1}>
		&laquo;
	</button>

	<button class="page-nav previous-page" on:click={prevPage} class:disabled={currentPage === 1}>
		Prev. <br /> page
	</button>

	{#each pageList as page}
		{#if page > 0}
			<button class="page-link" on:click={() => gotoPage(page)} class:active={page === currentPage}>
				{page}
			</button>
		{:else}
			<button class="page-link disabled hide" on:click={() => gotoPage(page)}>
				{page}
			</button>
		{/if}
	{/each}
	<button
		class="page-nav next-page"
		on:click={nextPage}
		class:disabled={currentPage === totalPages || totalPages === 0}
	>
		Next <br /> page
	</button>
	<button
		class="page-nav next-set"
		on:click={nextSet}
		class:disabled={startPage + pageSet > totalPages}
	>
		&raquo;
	</button>
</div>

<style>
	.pagination {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px 0;
		width: 100%;
	}
	.pagination button {
		background-color: hsla(0, 0%, 96%, 0.5);
		border: 0.1px solid hsla(251, 32%, 44%, 0.5);
		border-radius: 5px;
		/* color: #bababa; */
		color: hsla(251, 100%, 20%, 0.5);
		cursor: pointer;
	}

	.pagination button.active {
		font-family: Roboto, Arial, Helvetica, sans-serif;
		font-size: medium;
		/* background-color: hsla(251, 100%, 20%, 0.9); */
		background-color: hsl(251, 25%, 67%);
		color: #fff;
	}
	.previous-page {
		width: 3rem;
		padding: 0;
		margin: 0;
	}

	.previous-set {
		width: 3rem;
	}
	.next-page {
		width: 3rem;
	}
	.next-set {
		width: 3rem;
	}

	.page-nav {
		height: 2.5rem;
		cursor: pointer;
		color: #007bff;
		text-decoration: none;
	}
	.page-nav:hover {
		text-decoration: underline;
	}

	.page-nav.disabled {
		pointer-events: none;
		color: #6c757d;
		background-color: #c6ccd1;
	}

	.page-link {
		height: 2.5rem;
		width: 3rem;
		margin: 0 0.5rem;
		cursor: pointer;
		color: #007bff;
		text-decoration: none;
	}

	.page-link:hover {
		text-decoration: underline;
	}

	.page-link.disabled {
		pointer-events: none;
		color: #9c9e9f;
		background-color: #c9ccce80;
		/* color: #6c757d;
		background-color: #c6ccd1; */
	}
	.page-link.hide {
		visibility: hidden;
	}

	.medium {
		display: none;
	}

	@media (max-width: 1000px) {
		.previous-page {
			width: 2.5rem;
			padding: 0;
			margin: 0;
		}

		.previous-set {
			width: 2rem;
		}
		.next-page {
			width: 2.5rem;
		}
		.next-set {
			width: 2rem;
		}

		.page-nav {
			height: 2.5rem;
		}

		.page-link {
			width: 2rem;
			margin: 0 0.2rem;
		}
	}
</style>
