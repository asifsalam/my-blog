<script>
	// import 'remixicon/fonts/remixicon.css';
	const swedishFlag = 'https://commons.wikimedia.org/wiki/File:Flag_of_Sweden.svg';
</script>

<div class="footer">
	<div class="personal-info">
		<p class="name">Asif Salam</p>
		<p class="location">Stockholm</p>
		<div class="flag">
			<p class="location" style="display:inline">Sweden</p>
		</div>
	</div>
	<img
		class="swedish-flag"
		src="/img/icons/sweden_flag_postage_stamp_2.jpg"
		alt="Flag of Sweden"
		srcset=""
	/>
	<a href="mailto:asif.salam@yahoo.com"
		><img src="/img/icons/email-retro-1.svg" alt="email icon" class="other-icon" />
	</a>
	<a href="http://twitter.com/asifsalam"
		><img class="other-icon" src="/img/icons/twitter-retro-1.svg" alt="Twitter Logo" />
	</a>
	<a href="https://www.linkedin.com/in/asifsalam/"
		><img src="/img/icons/linkedin-retro-1.svg" alt="linkedin icon" class="other-icon" />
	</a>
</div>
<div class="footer-bottom">
	<p><a href="/about">Technology & resource stack</a></p>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Allura&family=Delius&family=Great+Vibes&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
	/* i {
		display: block;
	} */
	.personal-info {
		display: grid;
		grid-row: auto;
		text-align: center;
	}
	.name {
		font-family: 'Great Vibes', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
		margin: 5px 0 2px 0;
		font-size: 1.7em;
		color: hsla(251, 100%, 20%, 1);
	}
	.location {
		margin: 0px 0 2px 0;
		font-family: Delius;
		font-weight: 100;
		font-size: 1.1em;
	}
	a {
		text-decoration: none;
	}
	/* .icon {
		margin-top: 0px;
		padding: 10px;
		background: hsla(193, 47%, 56%, 1);
		font-size: 2em;
		text-decoration: none;
		color: hsl(55deg 100% 98%);
		border: 2px dotted hsl(54, 35%, 79%);
	} */
	.swedish-flag {
		float: right;
		margin: 0;
		background-image: url('/img/icons/Flag_of_Sweden.svg.png');
		height: 90%;
		width: auto;
		text-decoration: none;
		color: hsl(55deg 100% 98%);
		background-size: cover;
	}
	.other-icon {
		float: right;
		margin: 0;
		background-image: url('/img/icons/Flag_of_Sweden.svg.png');
		height: 52px;
		width: auto;
		text-decoration: none;
		color: hsl(55deg 100% 98%);
		background-size: cover;
	}
	.footer {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		width: 100%;
		margin-top: 20px;
		padding: 5px 0px;
		border-bottom: 1px solid grey;
		border-top: 1px solid rgb(56, 56, 56);
		height: 100px;
	}
	.footer-bottom {
		font-size: 1em;
		font-weight: bolder;
	}
</style>
