<script>
	import {
		articleList,
		postList,
		themes,
		categories,
		tags,
		excerptLength
	} from '$lib/json/stores.js';
	import '$lib/styles/global.css';
	import MainTitle from '$lib/components/main-title-v2.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import Footer from '$lib/components/footer.svelte';

	export let data;
	// export let errors;
	// console.log('main-layout.s', data);
	let numArticles = data.articles.length;

	const articleData = data.articles.slice(0, numArticles);
	$articleList = articleData;
	$postList = data.posts;
	$themes = data.themes;
	$categories = data.categories;
	$tags = data.tags;
	$excerptLength = 100;
</script>

<svelte:head><title>asifsalam</title></svelte:head>
<section class="header">
	<MainTitle />
	<Navbar />
</section>

<main>
	<slot />
</main>

<Footer />

<style>
	/* .header {
		margin: 0 10px;
	}
	main {
		margin: 0 10px;
	} */
</style>
