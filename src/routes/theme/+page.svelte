<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { articleList, postList, themes, clickedTheme } from '$lib/json/stores';
	import { filterArticles, searchArticles } from '$lib/modules/utility_functions';
	import RandomQuote from '$lib/components/random-quote.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import SidebarTags from '$lib/components/sidebar-tags.svelte';
	import CreateTags from '$lib/components/create-tags.svelte';
	import SidebarHeading from '$lib/components/sidebar-heading.svelte';
	import SectionHeadingBasic from '$lib/components/section-heading-basic-v2.svelte';
	import PaginationList from '$lib/components/pagination-list.svelte';

	$: selectedTheme = '';
	$: theme = '';
	$: articles = [];
	$: searchTerm = '';
	let themeObj = {};

	const combinedList = [...$articleList, ...$postList].sort((a, b) => {
		if (a.link_id > b.link_id) {
			return -1;
		} else {
			return 1;
		}
	});

	onMount(() => {
		themeObj = $themes.filter((d) => d.name === $clickedTheme)[0];
		theme = themeObj.name;
		articles = filterArticles(combinedList, themeObj);
	});

	function themeClicked(clTheme) {
		selectedTheme = clTheme;
		$clickedTheme = selectedTheme;
		themeObj = $themes.filter((d) => d.name === $clickedTheme)[0];
		theme = themeObj.name;
		articles = filterArticles(combinedList, themeObj);
	}

	const searchItems = () => {
		articles = searchArticles(articles, searchTerm, $clickedTheme, combinedList);
		console.log('theme-searchItems: ', articles.length);
	};
	/** @type {string}*/
	const headingText = 'Theme: ';
	$: totalQuantity = articles.length;
	let sidebarTagHeading = 'Themes';
	articles = articles;
</script>

<RandomQuote />
<Breadcrumbs />

<div class="container">
	<div class="sidebar-container">
		<SidebarHeading
			sidebarLeadinText={'Select articles and resources from the categories below.'}
		/>
		<p class="tags">
			<CreateTags
				tags={$themes}
				tagClicked={themeClicked}
				tagType="theme"
				headingText={sidebarTagHeading}
			/>
		</p>
		<SidebarTags useCategories={'yes'} />
	</div>
	<div class="posts-list">
		<!-- <SectionHeadingBasic selectedTag={theme} {totalQuantity} headingTitle={headingText} /> -->
		<SectionHeadingBasic
			selectedTag={theme}
			{totalQuantity}
			headingTitle={headingText}
			bind:searchTerm
			{searchItems}
		/>
		{#key articles}
			<PaginationList {articles} category={theme} {totalQuantity} />
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
	.sidebar-container {
		float: left;
		margin: 10px 30px 00px 0px;
		flex-flow: column;
	}

	.tags {
		display: inline;
		line-height: 1.5;
		margin: 0 0 50px 0px;
		font-size: 1.2rem;
		font-weight: bold;
	}
	/* @media (max-width: 768px) {
		div.container {
			grid-template-columns: 1fr;
			
		}
		.sidebar-container {
			margin: 0;
		}
	} */
	@media (max-width: 900px) {
		/* main content container */
		div.container {
			/* display: grid; */
			grid-template-columns: 2fr 4fr;
			/* flex-direction: row; */
		}
	}

	@media (max-width: 600px) {
		div.container {
			/* display: grid; */
			grid-template-columns: 1fr;
			/* flex-direction: row; */
		}
	}
</style>
