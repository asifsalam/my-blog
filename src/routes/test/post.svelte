<script>
	import { page } from '$app/stores';

	import '$lib/styles/gruvbox-light-scribe.css';
	import '$lib/styles/blog.css';
	import { cleanTags } from '$lib/modules/utility_functions.js';

	export let data;
	export let title;
	export let author;
	export let date;
	console.log(title, author, date);
	let postData = data.postData;
	// const tags = postData.metadata.categories;
	const tags = cleanTags(data.posts.filter((d) => d.link_id === postData.metadata.id)[0].tags);
	// console.log('[id-page] ', $page.params.id, tags);
</script>

{#key $page.params.id}
	<p>Blog test</p>
{/key}

<style>
	.heading h1 {
		font-size: 2.5rem;
		color: hsl(251, 100%, 15%);
		margin-top: 10px;
		margin-bottom: 20px;
	}

	h2 {
		font-size: 2rem;
	}

	.meta-info {
		border-left: hsl(251, 100%, 15%) solid 4px;
		padding: 0 0 0 10px;
	}
</style>
