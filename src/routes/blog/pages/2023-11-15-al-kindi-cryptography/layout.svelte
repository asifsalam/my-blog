<script>
	import { page } from '$app/stores';
	import { postList } from '$lib/json/stores';
	import RandomQuote from '$lib/components/random-quote.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import SidebarTags from '$lib/components/sidebar-tags.svelte';
	import PostsListCard from '$lib/components/posts-list-card.svelte';
	const leadinText = 'Select articles and resources from the main themes below';
	let posts = $postList.slice(0, 5);
	// console.log(posts.length);
</script>

<RandomQuote />
<Breadcrumbs />
<!-- <main> -->
{#key $page.params.id}
	<div class="container">
		<slot />
	</div>
{/key}

<!-- </main> -->
<style>
	div.container {
		display: grid;
		grid-template-columns: 2fr 5fr;
		margin: 0px 0px 5px 0px;
	}

	@media (max-width: 1000px) {
		div.container {
			display: block;
			grid-template-columns: 1fr;
			/* min-width: 300px; */
		}
	}
</style>
