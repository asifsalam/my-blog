<script>
	import TopicBox from './topic-box.svelte';
	import SearchBar from '$lib/components/search-bar.svelte';
	export let selectedTag = 'all';
	export let totalQuantity = 50;
	export let headingTitle = 'Resource category:';
	export let searchTerm = '';
	export let searchItems = () => {};
	// export let articles;
	// console.log(articles);
	const searchItems1 = () => {
		console.log('section-heading-basic-searchItems');
	};
	// console.log('section-heading', articles);
</script>

<div class="heading">
	<h1 class="heading-title">
		{headingTitle}
		<TopicBox category={selectedTag} size={1} type={'heading'} />
	</h1>
	<SearchBar bind:searchTerm {searchItems} />
	<h3 class="article-count large">{totalQuantity} <br /> items</h3>
	<h3 class="article-count medium">{totalQuantity} items</h3>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Pridi:wght@200;400&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Sanchez&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Crete+Round&display=swap');
	h1 {
		font-family: 'Sanchez';
		margin: 0;
	}
	.heading {
		/* background-image: url('/img/images/geometric-pattern-01.jpg'); */
		display: grid;
		grid-template-columns: 8fr 6fr 1.5fr;
		height: 4em;
		padding: 0px 0px 10px 0px;
		align-items: center;
		vertical-align: middle;
		font-family: Sanchez;
	}

	.heading-title {
		margin: 0;
		padding-left: 0px;
		padding-bottom: 0;
		font-size: xx-large;
		font-weight: 200;
		color: hsla(251, 100%, 20%, 1);
	}

	.article-count {
		font-family: 'Scope One', Roboto, Arial, Helvetica, sans-serif;
		font-size: large;
		font-weight: bold;
		text-align: right;
		color: hsla(251, 100%, 20%, 1);
		margin: 0 0 0 0;
	}

	.medium {
		display: none;
	}

	@media (max-width: 900px) {
		.heading {
			height: auto;
			width: auto;
			grid-template-columns: 1fr;
			justify-items: center;
			grid-gap: 10px 0;
		}
		.heading-title {
			font-size: x-large;
		}
	}
	@media (max-width: 768px) {
		.heading {
			height: auto;
			grid-template-columns: 1fr;
			justify-items: center;
			grid-row-gap: 10px;
			padding: 10px 0;
			border-top: dotted 2px gray;
		}

		.large {
			display: none;
		}
		.medium {
			display: contents;
		}
	}
</style>
