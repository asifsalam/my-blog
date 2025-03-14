<script>
	import RandomQuote from '$lib/components/random-quote.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import SidebarHeading from '$lib/components/sidebar-heading.svelte';
	import SidebarTags from '$lib/components/sidebar-tags.svelte';
	import TopicBox from '$lib/components/topic-box.svelte';

	const headingText = 'Why this site exists';
</script>

<RandomQuote />
<Breadcrumbs />

<div class="container">
	<div class="sidebar">
		<SidebarHeading
			sidebarLeadinText={'A little about myself, and this site'}
		/>
		<p>Asif Salam</p>
		<p>Husband to a gifted educator</p>
		<p>Father of two amazing boys</p>
		<p>Brother, uncle</p>
	</div>
	<div class="posts-list">
		<h1 class="heading-title">Why this site exists</h1>
		<p>To do</p>
		<h1 class="heading-title">A little about myself</h1>
		<p>To do</p>
		<h1 class="heading-title">Technology stack</h1>
		<p>To do</p>
	</div>
</div>

<style>
	div.container {
		width: 100%;
		display: grid;
		grid-template-columns: 2fr 7fr;
		margin: 10px 0px 5px 0px;
	}
	.sidebar {
		float: left;
		margin: 10px 30px 0px 0px;
		flex-flow: column;
	}
	.posts-list {
		text-align: left;
		margin: 15px;
	}
	.heading-title {
		margin: 0px;
		padding-left: 0px;
		font-size: xx-large;
		font-weight: 200;
		color: hsla(251, 100%, 20%, 1);
		content: '\27A0';
	}
	li::marker {
		list-style-type: '\27BD';
		line-height: 1.2em;
		content: '\27A0';
		color: hsla(var(--main-text-color), 0.15);
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
