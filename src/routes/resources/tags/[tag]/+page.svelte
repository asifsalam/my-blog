<script>
	export let data;
	// import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { articleList, tags, clickedTopic } from '$lib/json/stores';
	import { filterTag, filterTopic, searchArticles } from '$lib/modules/utility_functions';
	import RandomQuote from '$lib/components/random-quote.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import CreateTags from '$lib/components/create-tags.svelte';
	import SidebarHeading from '$lib/components/sidebar-heading.svelte';
	import SectionHeadingBasic from '$lib/components/section-heading-basic-v2.svelte';
	import PaginationList from '$lib/components/pagination-list.svelte';
	import SidebarTags from '$lib/components/sidebar-tags.svelte';

	$: topic = data.tag;
	$: searchTerm = '';
	$: $clickedTopic, (() => (searchTerm = ''))();
	$: articles = filterTag($articleList, topic);

	function topicClicked(clTopic) {
		$clickedTopic = clTopic;
		topic = clTopic;
		goto(`/resources/tags/${topic}`);
	}

	const searchItems = () => {
		articles = searchArticles(articles, searchTerm, $clickedTopic, $articleList);
	};

	/** @type {string}*/
	const headingText = 'Tag';
	$: totalQuantity = articles.length;
	let sidebarTagHeading = 'Other tags';
	topic = topic;
</script>

<RandomQuote />
<Breadcrumbs />

<div class="container">
	<div class="sidebar">
		<SidebarHeading sidebarLeadinText={'Select articles and resources from the tags below.'} />
		<SidebarTags useThemes={'no'} useCategories={'yes'} />
		<p class="topics">
			<CreateTags
				tags={$tags}
				tagClicked={topicClicked}
				tagType="tag"
				headingText={sidebarTagHeading}
			/>
		</p>
	</div>
	<div class="posts">
		<div class="posts-list">
			<!-- <SectionHeadingBasic selectedTag={topic} {totalQuantity} headingTitle={headingText} /> -->
			{#key articles}
				<SectionHeadingBasic
					selectedTag={topic}
					{totalQuantity}
					headingTitle={headingText}
					bind:searchTerm
					{searchItems}
				/>

				<PaginationList {articles} category={topic} {totalQuantity} />
			{/key}
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300&family=Roboto:wght@100;300&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Pridi:wght@200;400&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Sanchez&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Crete+Round&display=swap');

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
		margin: 0 0 0px 0px;
		font-size: 1.2rem;
		font-weight: bold;
	}

	@media (max-width: 768px) {
		div.container {
			/* display: grid; */
			grid-template-columns: 1fr;
			/* flex-direction: row; */
		}
		.sidebar {
			margin-right: 10px;
		}
		.resources-container {
			grid-template-columns: 1fr;
		}
	}
</style>
