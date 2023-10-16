<script>
	import '$lib/styles/global.css';
</script>

<div class="main-title-wrap">
	<div class="main-title">
		<p class="main-title-header">
			<!-- <span class="main-title-minor">the digital &nbsp </span> -->
			<span class="main-title-left">Normally unsupervised</span>
			<!-- <span class="main-title-minor">&nbsp of a&nbsp</span> -->
			<!-- <span class="main-title-right">data scribe</span> -->
		</p>

		<div class="title-name-wrap">
			<p class="sub-title-text">Mostly about data &#8212; and how to use it effectively.</p>
			<!-- <p class="sub-title-text">And how to use it effectively.</p> -->
			<p class="title-name">Asif Salam</p>
		</div>
	</div>

	<!-- <p class="my-quote">The data-driven life is not worth examining</p> -->
</div>
<div class="title-border" />

<style>
	@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap');
	:root {
		--heading-color: hsla(251, 100%, 21%, 1);
	}

	.main-title-wrap {
		width: 100%;
		/* height: 6em; */
		display: grid;
		/* grid-template-columns: 15fr 2fr; */
		grid-template-columns: 1fr;
		/* align-content: space-around; */
		align-content: center;
		justify-content: space-evenly;
		justify-items: center;
		padding: 20px 0 10px 0;
		margin: 0;
		/* background-color: beige; */
	}

	.main-title {
		margin: 0;
		padding: 0px 0;
	}
	.main-title-header {
		margin: 0;
		padding: 0;
	}

	.main-title-left {
		height: 100%;
		font-family: 'Dista Calista', cursive;
		/* font-family: 'Test 1'; */
		color: hsla(251, 100%, 25%);
		/* color: var(--heading-color); */
		font-size: 4em;
		text-align: center;
		margin: 0;
		padding: 0;
	}

	/* /* .main-title-right {
		font-family: 'IBM Plex Mono', Macondo, Righteous;
		font-family: 'Demora'; MuseoModerno,, Gugi, Iceland, 'Poiret One', Wellfleet,
		font-family: 'Demora', Gugi, Iceland, 'Poiret One', Wellfleet, Macondo, Gugi, Comfortaa, Iceland,
			MuseoModerno, 'Audiowide';
		color: var(--heading-color);
		font-size: 1.4em;
		font-weight: 100;
		text-align: left;
		letter-spacing: 0px;
		margin: 0;
		padding: 0;
	} */
	/* .sub-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0;
		padding: 0;
	} */

	.title-name-wrap {
		display: flex;
		/* justify-content: space-around; */
		/* justify-content: flex-start; */
		/* align-items: end; */
		justify-content: space-between;
		align-items: end;
		margin: -15px 0 10px 0;
	}
	.title-name {
		font-family: 'Great Vibes', MuseoModerno, 'Pacifico';
		font-size: 1.5em;
		margin: 0;
		/* color: hsla(251, 100%, 21%, 0.4); */
		/* margin-top: -30px; */
		text-align: right;
		padding: 3px 5px;
		/* color: hsla(54, 100%, 98%, 0.8); */
		color: hsla(250.78deg 100% 25.1% / 66%);
		/* text-align: right; */
		/* background-color: #ed143d75; */
		/* background-color: hsla(250.78deg 100% 25.1% / 66%); */
	}
	.sub-title-text {
		font-family: 'Comfortaa', 'Great Vibes', MuseoModerno, 'Pacifico';
		font-size: 1.5em;
		margin: 0;
		/* rotate: -34deg; */
		/* color: var(--heading-color); */
		color: hsla(251, 100%, 21%, 0.7);
		/* margin-top: -15px; */
	}

	.title-border {
		width: 100%;
		height: 15px;
		background-image: url('/img/borders/border-01.jpg');
		background-position: top;
		background-color: bisque;
	}

	@media (max-width: 1200px) {
		.main-title-wrap {
			grid-template-columns: 1fr;
			padding: 20px 0 10px 0;
		}
		.main-title {
			font-size: 1.3em;
			text-align: center;
		}
		.main-title-left {
			font-size: 2em;
			margin: 0;
			padding: 0;
			line-height: 1;
		}
		.title-name-wrap {
			display: flex;
			font-size: 1em;
			flex-direction: column;
			/* justify-content: space-around; */
			align-items: center;
		}
		.title-name {
			font-size: 1.1em;
			margin: -10px 0px;
		}
		.sub-title-text {
			font-size: 1em;
			margin: 15px 0px;
		}
	}
</style>
