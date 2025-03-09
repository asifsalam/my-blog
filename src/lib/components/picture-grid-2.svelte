<script>
	export let images = [];
	console.log('picture-grid', images);
</script>

<!-- <div class="media-container" style:width={mediaWidth}>
	<div class="content-container">
		{#if mediaType === 'image'}
			<img class="post-figure" width="100%" src={mediaPath} alt={mediaCaption} />
			<p class="caption">Figure {mediaNumber}. {mediaCaption}</p>
			
		{:else}
			
			<video class="post-video" width="640" controls>
				<source src={mediaPath} type="video/mp4" />
			</video>
			<p class="caption">Video {mediaNumber}. {mediaCaption}</p>
		{/if}
	</div>
</div> -->

<div class="grid-container">
	{#each images as image}
		<div class="grid-item" style="grid-column-end: span {image.colSpan}">
			<img src={image.mediaPath} alt={image.mediaPath} />
			<p class="caption">Figure {image.mediaNumber}. {image.mediaCaption}</p>
		</div>
	{/each}
</div>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: repeat(4, 1fr); /* 4 columns */
		grid-gap: 20px;
		padding: 20px;
		direction: rtl; /* Right-to-left direction */
	}

	.grid-item {
		border: 1px solid #ddd;
		padding: 10px;
		text-align: center;
	}

	.grid-item img {
		max-width: 100%;
		height: auto;
	}
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
