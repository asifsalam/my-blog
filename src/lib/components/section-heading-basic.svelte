<script>
	import TopicBox from './topic-box.svelte';
	export let selectedTag = 'all';
	export let totalQuantity = 50;
	export let headingTitle = 'Resource category:';
</script>

<div class="heading">
	<h1 class="heading-title">{headingTitle} <TopicBox category={selectedTag} size={1} /></h1>
	<h3 class="article-count">{totalQuantity} items</h3>
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
		grid-template-columns: 4fr 1fr;
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
		margin: 1em 0 0 0;
	}
</style>
