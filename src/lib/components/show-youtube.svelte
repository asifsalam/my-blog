<script>
	export let mediaType = 'youtube';
	export let mediaCaption = 'This is an image';
	export let mediaNumber = 1;
	export let mediaWidth = '90%';
	export let youtubeSrc = 'https://www.youtube.com/embed/pHSRHi17RKM?si=6bECW2UbA7i2i6Zz';
	const youtubeHeight = '190';
	const youtubeWidth = '350';

	console.log(mediaNumber);
	let hideNumber = false;
	if (mediaNumber === '') {
		hideNumber = true;
	}
	console.log(hideNumber);
</script>

<div class="media-container" style:width={mediaWidth}>
	<!-- <div class="youtube-container" style="height = {youtubeHeight}; width={youtubeWidth}"> -->
	<div class="youtube-container" style="height = {youtubeHeight}; width={youtubeWidth}">
		<iframe
			class="youtube-iframe"
			src={youtubeSrc}
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		/>
		<p class="caption">Youtube video. {mediaCaption}</p>
	</div>
</div>

<style>
	.media-container {
		margin: 0 auto;
		border: solid 3px hsla(var(--main-text-color), 0.3);
		float: right;
		margin: 5px;
	}

	.youtube-container {
		display: grid;
		padding: 10px;
		place-items: center;
	}

	.youtube-iframe {
		margin-bottom: 5px;
		aspect-ratio: 16 / 9;
	}

	.caption {
		margin: 0;
		padding-left: 5px;
		font-size: 0.9rem;
		text-decoration: none;
		text-align: left;
		/* width: 70%; */
	}

	/* @media (max-width: 1000px) {
		.youtube-container {
			width: 426px;
			height: 240px;
		}
	} */
</style>
