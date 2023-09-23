<script>
	export let data;
	import '$lib/styles/blog.css';
	import { page } from '$app/stores';
	import { postList } from '$lib/json/stores';
	import PostsListCard from '$lib/components/posts-list-card.svelte';
	import SidebarTags from '$lib/components/sidebar-tags.svelte';
	import { cleanTags } from '$lib/modules/utility_functions.js';

	import TopicListCard from '$lib/components/topic-list-card.svelte';
	let postData = data.postData;
	console.log('page.js:', data, 'page:', $page.route, $page.data, $page.params);
	// const tags = postData.metadata.categories;
	const tags = cleanTags(data.posts.filter((d) => d.link_id === postData.metadata.id)[0].tags);
	// const tags = ['a', 'b', 'c'];
	// console.log('[id-page] ', $page.params.id, tags);

	let posts = $postList
		.filter((d) => d.link.split('/')[2] != $page.params.id)
		.map((d) => ({
			link: d.link,
			title: d.title
		}))
		.slice(0, 5);
	console.log('', posts);
</script>

{#key $page.params.id}
	<div class="sidebar">
		<PostsListCard {posts} />
		<p class="topics">
			<SidebarTags useThemes={'yes'} useCategories={'yes'} />
		</p>
	</div>

	<div class="content">
		<div class="heading">
			<h1>{@html postData.metadata.title}</h1>
		</div>
		<div class="meta-info">
			<p class="author">{postData.metadata.author}</p>
			<p class="date">Posted: {postData.metadata.post_date}</p>
			<TopicListCard {tags} size={3} tagType={'light-tag'} />
		</div>
		<div class="main-content">
			<svelte:component this={postData.content} />
		</div>
	</div>
{/key}

<style>
	.heading h1 {
		margin-top: 10px;
		margin-bottom: 20px;
	}

	.meta-info {
		border-left: hsl(251, 100%, 15%) solid 4px;
		padding: 0 0 0 10px;
	}

	.meta-info .author,
	.date {
		font-family: Roboto, Verdana, Geneva, Tahoma, sans-serif;
		font-style: oblique;
		margin: 5px;
	}

	.main-content {
		width: auto;
	}

	.sidebar {
		margin: 10px 30px 0px 0px;
	}
	@media (max-width: 1000px) {
		div.sidebar {
			margin: 0px;
			padding-bottom: 20px;
			border-bottom: 2px dotted var(--main-color);
		}
	}
</style>
