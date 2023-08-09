<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { articleList, themes, clickedTheme } from '$lib/json/stores';
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

	onMount(() => {
		themeObj = $themes.filter((d) => d.name === $clickedTheme)[0];
		theme = themeObj.name;
		articles = filterArticles($articleList, themeObj);
	});

	function themeClicked(clTheme) {
		selectedTheme = clTheme;
		$clickedTheme = selectedTheme;
		themeObj = $themes.filter((d) => d.name === $clickedTheme)[0];
		theme = themeObj.name;
		articles = filterArticles($articleList, themeObj);
	}

	const searchItems = () => {
		articles = searchArticles(articles, searchTerm, $clickedTheme, $articleList);
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
	<div class="sidebar">
		<SidebarHeading
			sidebarLeadinText={'Select articles and resources from the categories below.'}
		/>
		<p class="topics">
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
	.sidebar {
		float: left;
		margin: 10px 30px 00px 0px;
		flex-flow: column;
	}

	.topics {
		display: inline;
		line-height: 1.5;
		margin: 0 0 50px 0px;
		font-size: 1.2rem;
		font-weight: bold;
	}
</style>
