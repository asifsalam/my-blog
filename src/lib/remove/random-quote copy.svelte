<script>
	// import '/src/styles/global.css';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { quotes } from '$lib/json/quotes';
	import { randomIntFromInterval } from '$lib/modules/utility_functions.js';
	export let quoteIndex = randomIntFromInterval(0, 29);

	let quoteToUse = quotes[quoteIndex];
	let quote = quoteToUse.quotation.replaceAll('\n', '<br>');
	let transitionParams = {
		// delay: 250,
		duration: 3000,
		x: -1500,
		// y: 500,
		opacity: 0.1,
		easing: quintOut
	};
</script>

<div class="quote-tag">
	<div out:fade={{ duration: 300 }} in:fade={{ duration: 750 }} class="for-animation">
		<blockquote class={quoteToUse.type}>
			<!-- <p class="main-quote">{@html quote}</p> -->
			<q class="main-quote">{@html quote}</q>
		</blockquote>
		<div class="attribution-container">
			<p class="attribution">
				{quoteToUse.attributedTo}
				{#if quoteToUse.sourceTitle.length > 0}
					, {quoteToUse.sourceTitle}
				{/if}
				<br />
			</p>
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Delius&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Cherry+Swash&family=Lancelot&family=Scope+One&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
	.main-quote {
		margin: 0px 0px 0px 0px;
		font-family: 'Lancelot', 'Cherry Swash', 'Noto Serif Thai', 'Delius', Georgia, 'Times New Roman',
			Times, serif;
		font-size: 1.4rem;
		font-weight: 100;
		letter-spacing: 0ch;
		line-height: 110%;
		color: rgb(102, 89, 158);
	}

	/* .forget-this {
		text-decoration: rgba(0, 0, 255, 0.7) line-through;
		text-decoration-style: solid;
		text-decoration-thickness: 1px;
		color: rgba(255, 0, 0, 0);
	} */

	/* .tag-container {
		display: flex;
		margin: 5px 0 0 3px;
		overflow: hidden;
		border-bottom: 2px solid royalblue;
	} */

	.quote-tag {
		display: block;
		overflow: hidden;
		width: inherit;
		padding: 0px;
		margin: 0px 0px 0px 0px;
		border-bottom: 0px solid hsla(0, 2%, 73%, 0.9);
		border-top: 0px solid hsla(0, 2%, 73%, 0.9);
	}

	blockquote {
		/* display: block; */
		font-family: 'Marck Script', cursive;
		font-size: 1.2rem;
		color: var(--heading-color);
		margin: 7px 0px;
	}

	.poem {
		text-align: center;
	}
	.quote {
		text-align: left;
	}

	.attribution-container {
		display: flex;
		background-color: hsla(250, 13%, 91%, 0);
		height: 23px;
		/* vertical-align: middle; */
		align-items: center;
		/* text-align: center; */
		justify-content: right;
		border-top: dashed 0.25px hsla(250, 58%, 75%, 0.4);
	}

	.attribution {
		/* font-style: italic; */
		/* text-align: right; */
		font-family: 'Scope One', 'Noto Sans', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
		font-weight: 500;
		color: rgb(0, 0, 0);
		margin: 0px 0px 0px 0px;
		/* background-color: rgb(255 208 0);  */
	}
</style>
