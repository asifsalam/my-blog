<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { articleList, postList, categories, themes, clickedCategory } from '$lib/json/stores';
	import { filterCategory, searchArticles } from '$lib/modules/utility_functions';
	import RandomQuote from '$lib/components/random-quote.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import SidebarTags from '$lib/components/sidebar-tags.svelte';

	import CreateTags from '$lib/components/create-tags.svelte';
	import SidebarHeading from '$lib/components/sidebar-heading.svelte';
	import SectionHeadingBasic from '$lib/components/section-heading-basic-v2.svelte';
	import PaginationList from '$lib/components/pagination-list.svelte';

	$: selectedCategory = '';
	$: category = '';
	$: articles = [];
	$: searchTerm = '';
	let categoryObj = {};
	const combinedList = [...$articleList, ...$postList].sort((a, b) => {
		if (a.link_id > b.link_id) {
			return -1;
		} else {
			return 1;
		}
	});

	onMount(() => {
		categoryObj = $categories.filter((d) => d.name === $clickedCategory)[0];
		category = categoryObj.name;
		articles = filterCategory(combinedList, categoryObj);
	});

	function categoryClicked(clCategory) {
		selectedCategory = clCategory;
		$clickedCategory = selectedCategory;
		categoryObj = $categories.filter((d) => d.name === $clickedCategory)[0];
		category = categoryObj.name;
		articles = filterCategory(combinedList, categoryObj);
	}

	const searchItems = () => {
		articles = searchArticles(articles, searchTerm, $clickedCategory, combinedList);
	};

	/** @type {string}*/
	const headingText = 'Category: ';
	$: totalQuantity = articles.length;
	let sidebarTagHeading = 'Categories';

	articles = articles;
</script>

<RandomQuote />
<Breadcrumbs />

<div class="container">
	<div class="sidebar">
		<SidebarHeading
			sidebarLeadinText={'Select articles and resources from the categories below.'}
		/>
		<SidebarTags useThemes={'yes'} />
		<p class="topics">
			<CreateTags
				tags={$categories}
				tagClicked={categoryClicked}
				tagType="category"
				headingText={sidebarTagHeading}
			/>
		</p>
		<SidebarTags useTags={'yes'} />
	</div>
	<div class="posts-list">
		<!-- <SectionHeadingBasic selectedTag={category} {totalQuantity} headingTitle={headingText} /> -->
		<SectionHeadingBasic
			selectedTag={category}
			{totalQuantity}
			headingTitle={headingText}
			bind:searchTerm
			{searchItems}
		/>
		{#key articles}
			<PaginationList {articles} {category} {totalQuantity} />
		{/key}
	</div>
</div>

<style>
	div.container {
		width: 100%;
		display: grid;
		grid-template-columns: 2fr 5fr;
		margin: 10px 0px 5px 0px;
	}
	.sidebar {
		float: left;
		margin: 10px 30px 0px 0px;
		flex-flow: column;
	}

	.topics {
		display: inline;
		line-height: 1.5;
		margin: 0 0 50px 0px;
		font-size: 1.2rem;
		font-weight: bold;
	}
	@media (max-width: 900px) {
		div.container {
			grid-template-columns: 2fr 4fr;
		}
	}

	@media (max-width: 600px) {
		div.container {
			/* display: grid; */
			grid-template-columns: 1fr;
			/* flex-direction: row; */
		}
		.sidebar {
			margin-right: 0px;
		}
	}
</style>
