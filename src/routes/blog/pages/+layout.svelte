<script>
	import { page } from '$app/stores';
	import { postList } from '$lib/json/stores';
	import RandomQuote from '$lib/components/random-quote.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import SidebarTags from '$lib/components/sidebar-tags.svelte';
	import PostsListCard from '$lib/components/posts-list-card.svelte';
	const leadinText = 'Select articles and resources from the main themes below';
	let posts = $postList
		.filter((d) => d.link.split('/')[2] != $page.params.id)
		.map((d) => ({
			link: d.link,
			title: d.title
		}))
		.slice(0, 5);
	// console.log('Blog layout-posts: ', posts);
</script>

<RandomQuote callerId={'sub-site-layout'} />
<Breadcrumbs />

<div class="container">
	<slot />
</div>

<style>
	:root {
		--screen-tab: '900px';
	}

	div.container {
		display: grid;
		grid-template-columns: 2fr 5fr;
		margin: 0px 0px 5px 0px;
	}

	@media (max-width: 900px) {
		div.container {
			grid-template-columns: 2fr 4fr;
		}
	}

	@media (max-width: 600px) {
		div.container {
			grid-template-columns: 1fr;
		}
		p {
			font-size: 1em;
		}
	}

	/*	 @media (max-width: 1000px) {
		div.container {
			display: block;
			grid-template-columns: 1fr;

		}
	}
		div.sidebar {
			margin: 0px;
			padding-bottom: 20px;
			border-bottom: 2px dotted var(--main-color);
		}
	} */
</style>
