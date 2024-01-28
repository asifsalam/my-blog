<script>
	import { filterCategory } from '$lib/modules/utility_functions';
	import RandomQuote from '$lib/components/random-quote.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import SidebarHeading from '$lib/components/sidebar-heading.svelte';
	import SidebarTags from '$lib/components/sidebar-tags.svelte';
	import TopicBox from '$lib/components/topic-box.svelte';

	const headingText =
		'a little prose, some poetry <br/>a bit of art, some history<br />to touch the soul, spark the imagination';
</script>

<RandomQuote />
<Breadcrumbs />

<div class="container">
	<div class="sidebar">
		<SidebarHeading
			sidebarLeadinText={'Data has its place, but the soul craves a more substantial kindling.'}
		/>
		<SidebarTags useThemes={'yes'} />
	</div>
	<div class="posts-list">
		<h1 class="heading-title">{@html headingText}</h1>
		<TopicBox category={'(Coming eventually)'} type={'heading'} />
		<section class="image-panel">
			<img class="image-grid" src="/img/misc/danish-mahal-lucknow.png" alt="" />
			<img class="image-grid" src="/img/misc/alberto-pasini-03.jpg" alt="" />
			<img class="image-grid" src="/img/misc/al-jazari-peacock-fountain.jpg" alt="" />
			<img class="image-grid" src="/img/misc/danish-manzil-post-box.png" alt="" />
			<img class="image-grid" src="/img/misc/book-market-baghdad.jpg" alt="" />
			<img class="image-grid" src="/img/misc/madam-with-hookah.jpg" alt="" />
			<img class="image-grid" src="/img/misc/rumi-quote-01.jpg" alt="" />
			<img class="image-grid" src="/img/misc/taj-mahal-sunset.jpg" alt="" />
		</section>
	</div>
</div>

<style>
	div.container {
		width: 100%;
		display: grid;
		grid-template-columns: 2fr 5fr;
		margin: 10px 0px 5px 0px;
	}
	.sidebar {
		float: left;
		margin: 10px 30px 0px 0px;
		flex-flow: column;
	}
	.posts-list {
		text-align: center;
	}
	.heading-title {
		margin: 0;
		padding: 0;
		font-size: xx-large;
		font-weight: 200;
		color: hsla(251, 100%, 20%, 1);
	}
	.image-panel {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin: 20px 0 10px 0;
		justify-content: space-around;
	}
	.image-grid {
		width: 40%;
		margin: 10px;
		object-fit: cover;
		border: 10px solid transparent;
		border-image: url('/img/misc/mughal-search-instrument.jpg') 30 10 round;
	}
</style>
