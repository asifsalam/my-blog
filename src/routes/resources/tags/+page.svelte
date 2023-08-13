<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { articleList, tags, clickedTopic } from '$lib/json/stores';
	import { filterTag, searchArticles } from '$lib/modules/utility_functions';
	import RandomQuote from '$lib/components/random-quote.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import CreateTags from '$lib/components/create-tags.svelte';
	import SidebarHeading from '$lib/components/sidebar-heading.svelte';
	import SectionHeadingBasic from '$lib/components/section-heading-basic-v2.svelte';
	import PaginationList from '$lib/components/pagination-list.svelte';
	import SidebarTags from '$lib/components/sidebar-tags.svelte';

	$: selectedTopic = '';
	$: searchTerm = '';
	// let topics = $allTopics;
	let tagObj = {};
	/** @type {Array} */
	let articles = [];

	onMount(() => {
		selectedTopic = $clickedTopic;
		articles = filterTag($articleList, selectedTopic, $tags);
		// console.log(selectedTopic);
	});

	function tagClicked(tag) {
		// @ts-ignore
		$clickedTopic = tag;

		goto(`/resources/tags/`);
	}

	function topicClicked(selectedTag) {
		$clickedTopic = selectedTag;
		// tagObj = $tags.filter((d) => d.name == selectedTag)[0];
		goto(`/resources/tags/${selectedTag}`);
	}

	const searchItems = () => {
		articles = searchArticles(articles, searchTerm, $clickedTopic, $articleList);
	};

	/** @type {string}*/
	const headingText = 'Tag: ';
	$: totalQuantity = articles.length;
	let sidebarTagHeading = 'Tags';
	articles = articles;
	selectedTopic = $clickedTopic;
</script>

<RandomQuote />
<Breadcrumbs />

<div class="container">
	<div class="sidebar">
		<SidebarHeading sidebarLeadinText={'Select articles and resources from the tags below.'} />
		<SidebarTags useCategories={'yes'} />
		<p class="topics">
			<CreateTags
				tags={$tags}
				tagClicked={topicClicked}
				tagType="tag"
				headingText={sidebarTagHeading}
			/>
		</p>
	</div>
	{#key $clickedTopic}
		<div class="posts">
			<div class="posts-list">
				<!-- <SectionHeadingBasic
					selectedTag={selectedTopic}
					{totalQuantity}
					headingTitle={headingText}
				/> -->
				<SectionHeadingBasic
					selectedTag={selectedTopic}
					{totalQuantity}
					headingTitle={headingText}
					bind:searchTerm
					{searchItems}
				/>
				{#key articles}
					<PaginationList {articles} category={selectedTopic} {totalQuantity} />
				{/key}
			</div>
		</div>
	{/key}
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
		margin: 10px 0px 10px 0px;
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

	/* .topic-box {
		display: inline-block;
		padding: 0px 5px;
		margin: 5px 10px 5px 0;
		background-color: #eafaff;
		font-family: Roboto, Arial, Helvetica, sans-serif;
		font-weight: normal;
		font-size: 1em;
		color: hsl(251, 100%, 15%);
		border-radius: 5px;
		text-decoration: none;
		border: 0.1px solid hsla(251, 32%, 44%, 0.2);
	} */
	/* .topic:hover {
		color: hsl(251, 95%, 33%);
		font-weight: bold;
		background-color: #bff0ff;
		cursor: pointer;
	} */

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
