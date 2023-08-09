<script>
	export let category = 'all';
	export let size = 1;
	export let type = 'sidebar';
	let boxSize = 'size-' + size;

	// console.log("category: ",category, "displayQuantity")
</script>

<span class="topic-box {boxSize} {type}">{category}</span>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Pridi:wght@200;400&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Sanchez&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Crete+Round&display=swap');
	.topic-box {
		font-family: Pridi, Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
		display: inline-block;
		/* background-color: #eafaff; */
		background-color: hsla(196, 67%, 54%, 0.1);
		color: hsla(251, 100%, 15%, 0.6);
		text-decoration: none;
	}

	.size-1 {
		padding: 0px 5px;
		margin: 5px 10px 5px 0;
		font-weight: normal;
		border-radius: 5px;
		border: 0.1px solid hsla(251, 32%, 44%, 0.5);
	}

	.heading {
		font-size: 1.8rem;
	}
</style>
