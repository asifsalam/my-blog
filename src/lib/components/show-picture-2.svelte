<script>
	export let mediaType = 'image';
	export let mediaPath = '/img/images/geometric-pattern-01.jpg';
	export let mediaCaption = 'This is an image';
	export let mediaNumber = 1;
	export let mediaWidth = '100%';
</script>

<div class="media-container" style:width={mediaWidth}>
	<div class="content-container">
		{#if mediaType === 'image'}
			<img class="post-figure" width="100%" src={mediaPath} alt={mediaCaption} />
			<p class="caption">Figure {mediaNumber}. {mediaCaption}</p>
			<!-- <br /> -->
		{:else}
			<!-- svelte-ignore a11y-media-has-caption -->
			<video class="post-video" width="640" controls>
				<source src={mediaPath} type="video/mp4" />
			</video>
			<p class="caption">Video {mediaNumber}. {mediaCaption}</p>
		{/if}
	</div>
</div>

<style>
	.media-container {
		margin: 0 auto;
		text-align: center;
		border: solid 3px hsla(var(--main-text-color), 0.3);
		float: right;
		display: grid;
		justify-items: center;
		margin: 10px;
	}

	.content-container {
		padding: 10px;
		width: 90%;
		text-align: left;
		/* border: 2px solid var(--main-color); */
	}
	.content-container {
		padding: 10px;
		text-align: left;
		/* border: 2px solid var(--main-color); */
	}
	.post-figure {
		width: 100%;
		margin: 5px;
	}
	.caption {
		margin: 0;
		padding-left: 5px;
		font-size: 0.9rem;
		/* width: 70%; */
	}
</style>
