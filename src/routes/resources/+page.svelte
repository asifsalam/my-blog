<script>
	import { articleList, categories } from '$lib/json/stores';
	import { filterCategory } from '$lib/modules/utility_functions';
	import RandomQuote from '$lib/components/random-quote.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import SidebarHeading from '$lib/components/sidebar-heading.svelte';
	import SidebarTags from '$lib/components/sidebar-tags.svelte';
	import SectionHeading from '$lib/components/section-heading.svelte';
	import ResourcesCategoryCard from '$lib/components/resources-category-card.svelte';

	const headingTitle = 'Resource categories';
	const totalQuantity = $articleList.length;
	const articlesPerCategory = 3;
	const displayQuantity =
		articlesPerCategory * $categories.filter((d) => d.type === 'category').length;
	const sidebarTitle = '';
	const sidebarLeadinText =
		'Select items by category or tag. Categories are simply a set of tags.<br /> ';
	const sidebarBulletText = '';
	$: searchTerm = 'method';
	$: articles = $articleList;

	const searchItems = () => {
		// console.log('page-searchItems: ', searchTerm);
		if (searchTerm === '') {
			articles = $articleList;
		} else {
			articles = articles.filter((d) => {
				return d.tags.includes(searchTerm.toLowerCase());
			});
			// console.log('page-searchItems-2: ', searchTerm, articles);
		}
	};
</script>

<RandomQuote />
<Breadcrumbs />

<div class="container">
	<div class="sidebar-container">
		<SidebarHeading {sidebarTitle} {sidebarLeadinText} {sidebarBulletText} />
		<SidebarTags useThemes={'no'} useCategories={'yes'} useTags={'yes'} />
	</div>
	<div class="posts">
		<SectionHeading {headingTitle} {displayQuantity} {totalQuantity} />
		<div class="resources-container">
			{#each $categories as category}
				<div class="category-container-1">
					<ResourcesCategoryCard
						articles={filterCategory($articleList, category)}
						{category}
						displayArticles={articlesPerCategory}
					/>
				</div>
			{/each}
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

	div.sidebar-container {
		/* margin: 0;
		padding: 0; */
		float: left;
		margin: 10px 30px 00px 0px;
		flex-flow: column;
	}

	.resources-container {
		display: grid;
		/* gap: 40px; */
		gap: 3em;
		grid-template-columns: 1fr 1fr;
		padding-top: 5px;
		justify-content: center;
		border-top: 2px solid hsla(251, 100%, 21%, 0.5);
	}
	.category-container-1 {
		border-bottom: 8px;
		border-bottom-style: dotted;
		border-bottom-color: rgb(77, 2, 2);
	}

	@media (max-width: 900px) {
		div.container {
			/* display: grid; */
			grid-template-columns: 2fr 4fr;
			/* flex-direction: row; */
		}
		/* .sidebar-container {
			margin-right: 10px;
		} */
		.resources-container {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 600px) {
		div.container {
			grid-template-columns: 1fr;
		}
		div.sidebar-container {
			margin-right: 0;
		}
	}
</style>
