<script>
	import { page } from '$app/stores';
	import { postList } from '$lib/json/stores';
	// import RandomQuote from '$lib/components/random-quote.svelte';
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
	// console.log(posts);
</script>

<!-- <RandomQuote /> -->
<Breadcrumbs />
<!-- <main> -->
{#key $page.params.id}
	<div class="container">
		<div class="sidebar">
			<!-- <p>this is a test</p> -->
			<PostsListCard {posts} />
			<!-- <SidebarThemeHeading /> -->
			<!-- <SidebarHeading sidebarLeadinText={leadinText} /> -->
			<p class="topics">
				<SidebarTags useThemes={'yes'} useCategories={'yes'} />
			</p>
		</div>
		<div>
			<slot />
		</div>
	</div>
{/key}

<!-- </main> -->
<style>
	div.container {
		/* width: 100%; */
		display: grid;
		/* grid-template-columns: 300px 900px; */
		grid-template-columns: 3fr 5fr;
		margin: 0px 0px 5px 0px;
	}
	.sidebar {
		/* position: fixed; */
		/* float: left; */
		margin: 10px 30px 00px 0px;
		/* flex-flow: column; */
		/* overflow-y: visible; */
	}
</style>
