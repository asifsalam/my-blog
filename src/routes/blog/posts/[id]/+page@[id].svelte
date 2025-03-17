<script>
	export let data;
	import { page } from '$app/stores';
	import '$lib/styles/blog.css';
	import { cleanTags } from '$lib/modules/utility_functions.js';
	import { postList } from '$lib/json/stores';
	import PostsListCard from '$lib/components/posts-list-card.svelte';
	import SidebarTags from '$lib/components/sidebar-tags.svelte';
	import RandomQuote from '$lib/components/random-quote.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';

	import TopicListCard from '$lib/components/topic-list-card.svelte';
	let postData = data.postData;
	// console.log(data, $postList, $page, postData.metadata);
	// const tags = cleanTags(data.posts.filter((d) => d.link_id === postData.metadata.id)[0].tags);
	const t1 = $postList.filter((d) => d.link_id === postData.metadata.id);
	const tags = cleanTags($postList.filter((d) => d.link_id === postData.metadata.id)[0].tags);
	let posts = $postList
		.filter((d) => d.link.split('/')[2] != $page.params.id)
		.map((d) => ({
			link: d.link,
			title: d.title
		}))
		.slice(0, 5);
	// console.log('tags: ', postData.metadata.categories, postData.metadata.id, t1);
</script>

<RandomQuote callerId={'blog-id-page@id'} />
<Breadcrumbs />

<div class="container">
	{#key $page.params.id}
		<div class="sidebar-container">
			<PostsListCard {posts} />
			<p class="topics">
				<SidebarTags useThemes={'yes'} useCategories={'yes'} />
			</p>
		</div>

		<div class="content">
			<div class="heading">
				{#if postData.metadata.pre_title}
					<br /><pre-title>{@html postData.metadata.pre_title}</pre-title>
				{/if}
				<h1>{@html postData.metadata.title}</h1>
			</div>
			<div class="meta-info">
				<p class="author">{postData.metadata.author}</p>
				<p class="date">Posted: {postData.metadata.post_date}</p>
				<TopicListCard {tags} size={3} tagType={'light-tag'} />
			</div>
			<br />
			<img class="preview-image" src={postData.metadata.preview_image} alt="" />
			<div class="main-content">
				<svelte:component this={postData.content} />
			</div>
		</div>
	{/key}
</div>

<style>
	div.container {
		display: grid;
		grid-template-columns: 2fr 5fr;
		margin: 0px 0px 5px 0px;
	}
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

	.sidebar-container {
		margin: 10px 30px 0px 0px;
	}

	.preview-image {
		width: 100%;
	}
	/* @media (max-width: 1000px) {
		div.container {
			display: block;
			grid-template-columns: 1fr;

		}

		div.sidebar {
			margin: 0px;
			padding-bottom: 20px;
			border-bottom: 2px dotted var(--main-color);
		}
	} */

	 	@media (max-width: 900px) {
		div.container {
			grid-template-columns: 2fr 4fr;
		}

		div.posts {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 600px) {
		div.container {
			grid-template-columns: 1fr;
		}
		div.sidebar-container {
			margin: 0px;
		}
	}
</style>
