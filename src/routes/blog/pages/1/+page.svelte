<script>
	export let data;

	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import GeneralButton from './general-button.svelte';
	import { shuffle } from 'd3';
	import '$lib/styles/blog.css';
	import { postList } from '$lib/json/stores';
	import PostsListCard from '$lib/components/posts-list-card.svelte';
	import SidebarTags from '$lib/components/sidebar-tags.svelte';
	import LetterBars from './letter-bars.svelte';
	import LetterBoxes from './letter-boxes.svelte';
	import { calculateLetterFrequency } from '$lib/modules/utility_functions.js';
	import letterFrequencies from './letter-frequency';
	import TopicListCard from '$lib/components/topic-list-card.svelte';

	const postData = data.postData;
	let pageId = $page.route.id;

	onMount(() => {
		pageId = $page.route.id;
	});

	const posts = $postList
		.filter((d) => d.link != $page.route.id)
		.map((d) => ({
			link: d.link,
			title: d.title
		}))
		.slice(0, 5);

	function encodeMessage(inputMessage, letterKey, decodeKey) {
		let outputMessage = '';
		inputMessage.split('').forEach((d) => {
			let index = letterKey.indexOf(d);
			if (index === -1) outputMessage = outputMessage + ' ';
			else outputMessage = outputMessage + decodeKey[index];
		});
		return outputMessage;
	}

	let cipherObj = new (function (/** @type {string} */ message) {
		this.cipherGenerated = false;
		this.messageEncrypted = false;
		this.messageDecrypted = false;
		this.messageDecoded = false;
		this.plaintext = '';
		this.ciphertext = '';
		this.decryptedtext = '';
		this.decodedtext = '';
		this.alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
		this.cipher = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
		this.textKey = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
		this.decodeKey = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
		this.showTextKey = false;
		this.showDecodeKey = false;

		this.encryptMessage = function () {
			this.messageEncrypted = true;
			this.ciphertext = encodeMessage(this.plaintext, this.alphabet, this.cipher);
		};
	})();

	const cleanInput = function (input) {
		return input.replace(/[^a-zA-Z ]+/g, '').toUpperCase();
	};

	function createCipher() {
		cipherObj.cipherGenerated = true;
		cipherObj.cipher = shuffle(cipherObj.alphabet.slice());
		cipherObj.showTextKey = false;
	}

	function encryptMessage() {
		cipherObj.plaintext = cleanInput(plaintextInput);
		cipherObj.messageEncrypted = true;
		cipherObj.ciphertext = encodeMessage(cipherObj.plaintext, cipherObj.alphabet, cipherObj.cipher);
		ciphertextFrequency = calculateLetterFrequency(cipherObj.ciphertext, cipherObj.alphabet);
		cipherObj.decodeKey = createKey(ciphertextFrequency);

		cipherObj.textKey.forEach((d) => {
			let i = cipherObj.alphabet.indexOf(d);
			cipherKey.push(cipherObj.cipher[i]);
		});
	}

	function decryptMessage() {
		cipherObj.messageDecrypted = true;
		cipherObj.decryptedtext = encodeMessage(
			cipherObj.ciphertext,
			cipherObj.cipher,
			cipherObj.alphabet
		);
	}

	function decodeMessage() {
		cipherObj.showDecodeKey = true;
		cipherObj.messageDecoded = true;
		cipherObj.decodedtext = encodeMessage(
			cipherObj.ciphertext,
			cipherObj.decodeKey,
			cipherObj.textKey
		);
	}

	function createKey(xFrequency) {
		let xKey = [];
		xFrequency
			.sort((a, b) => b.frequency - a.frequency)
			.forEach((d) => {
				xKey.push(d.letter);
			});
		return xKey;
	}

	// Create the plaintext - (remove punctuation, numbers etc.)
	let plaintextInput =
		'First, you must import your data into R. This typically means that you take data stored in a file, database, or web application programming interface (API) and load it into a data frame in R. If you can’t get your data into R, you can’t do data science on it! Once you’ve imported your data, it is a good idea to tidy it. Tidying your data means storing it in a consistent form that matches the semantics of the dataset with how it is stored.';

	let sourceText = data.sourceText;
	plaintextInput = cleanInput(sourceText.join(' '));
	cipherObj.plaintext = plaintextInput;

	let ciphertextFrequency = [];
	let textFrequency = [];
	let cipherKey = [];

	// Create text key from the text frequencies - sequence of letters sorted by frequency
	letterFrequencies.forEach((d) => {
		let x = { letter: d.letter, frequency: +String(d['words']).replace(',', '.') };
		textFrequency.push(x);
	});
	cipherObj.textKey = createKey(textFrequency);

	let keywordCipher = 'EQUATION'.split('');
	cipherObj.alphabet.forEach((d) => {
		if (keywordCipher.indexOf(d) < 0) {
			keywordCipher.push(d);
		}
	});

	// Create a random cipher
	createCipher();

	// Encrypt the plaintext
	encryptMessage();

	$: swapInfo = { sId: '', tId: '', sInd: 0, tInd: 0 };
	$: {
		if (cipherObj.messageEncrypted) {
		}
	}
	$: {
		if (cipherObj.messageDecoded) {
			decodeMessage();
		}
		plaintextInput = cleanInput(plaintextInput);
	}

	const tags = [
		'post',
		'data-science',
		'data-literacy',
		'technique',
		'statistics',
		'cryptograpy',
		'encryption',
		'my-post'
	];

	let showFullText = false;
	let showFullDecodedText = false;
	let showHint1 = false;
	let showHint2 = false;
</script>

<!-- <RandomQuote /> -->

<div class="sidebar-container">
	<PostsListCard {posts} />
	<p class="topics">
		<SidebarTags useThemes={'yes'} useCategories={'yes'} />
	</p>
</div>
{#key $page}
	<div class="content">
		<div class="heading">
			<h1>Al-Kindi and the birth of Statistics</h1>
		</div>
		<div class="meta-info">
			<p class="author">Asif Salam</p>
			<p class="date">Posted: 2023-11-15</p>
			<TopicListCard {tags} size={3} tagType={'light-tag'} />
		</div>
		<br />
		<div class="main-content">
			<p>
				<img
					src="/img/article_images/img-l02207.jpg"
					alt="Iraqi stamp commemorating Al-Kindi"
					srcset=""
					style="float:right;margin-left:10px"
					width="30%;"
				/>
				Contemporary texts and books on statistics and statistical inference date its origin to the seventeenth
				century, around the time of the "Enlightenment," when Western Europeans introduced the world
				to the value of knowledge and reason. The reality, however, is that statistical techniques were
				being developed centuries even millennia earlier. Progress in these fields, indeed all fields,
				is accumulative and builds on the foundational work of scholars of previous generations. One
				such scholar was the 9th century polymath and philosopher Abu Yusuf Ya’qub ibn Ishaq Al-Kindi,
				a prominent member of the then newly established Bayt Al-Hikmat (House of Wisdom) in Baghdad.
				Al-Kindi made numerous contributions to many fields including optics, philosophy, mathematics,
				physics and, of course, statistics. He is considered the father of cryptology for his work in
				the field of cryptanalysis, and is the first person known to have used statistics for inference.
			</p>
			<p>
				Cryptography has a long history. Important military, diplomatic, commercial and other
				government communcation between far flung locations required secrecy and was often
				encrypted. The ancient Spartans (~7 BC) used the scytale transposition cipher to encrypt
				messages during military campaigns, and Romans used the "substitution cipher". Documents in
				India recommended the use of a cipher to conceal the content of communications between
				lovers. This secrecy was even more important for those plotting against this state, since
				discovery would, well, lead to some rather unpleasant consequences.
			</p>
			<h2>The substitution cipher</h2>
			<p>
				The substitution cipher was a common method of encryption, where words in a message were
				substituted by other "code" words, or letters substituted by other symbols or letters. A
				simple way of doing this is for the sender and recipient to agree on a "keyword", which is
				placed at the start of the alphabet sequence, with the remaining letters following in the
				usual sequence. An alternative would be to shift the letters by an agreed number. Or create
				a key using random placement of the letters. There are other, more sophisticated techniques,
				but these simpler ones are convenient for illustrating the concept.
			</p>
			<p>
				In the "keyword" system, a keyword such as "equation" would result in the following
				letter-cipher pairing:
			</p>
			<LetterBoxes
				letters={cipherObj.alphabet}
				swapInfo
				draggable={false}
				letterHead={'Alphabet'}
				lettersType={'plaintext'}
			/>
			<LetterBoxes
				letters={keywordCipher}
				swapInfo
				draggable={false}
				letterHead={'Keyword Cipher'}
				lettersType={'cipher'}
			/>
			<p>
				The plaintext message:
				<span class="plaintext">"war is peace freedom is slavery ignorance is strength"</span>
				would result in the following ciphertext:
				<span class="ciphertext">"wem bp kteut imttag bp pfevtmy bohjmehut bp prmthorn"</span>
			</p>
			<p>
				The keyword cipher has a known problem. The last few letters are mapped to the same postions
				in the cipher. But with a little care, this type of encryption was unbreakable because of
				the possible number of combinations.
			</p>
			<p>Until Al-Kindi, in around 841 AD.</p>
		</div>
	</div>
{/key}

<style>
	.message-box {
		font-size: 1em;
		transition: height 2s ease;
	}

	.hidden {
		height: 5rem;
		overflow: hidden;
	}

	.shown {
		height: 30rem;
		overflow: auto;
	}

	.decodedHidden {
		height: 6rem;
		overflow: hidden;
	}

	.decodedShown {
		height: 50rem;
		overflow: auto;
	}

	.isHint {
		opacity: 0;
		transition: opacity 5s ease;
		color: rgb(158, 43, 43);
	}
	.isHint.visible {
		opacity: 1;
	}

	.heading h1 {
		margin-top: 10px;
		margin-bottom: 20px;
	}

	.meta-info {
		border-left: hsl(251, 100%, 15%) solid 4px;
		padding: 0 0 0 10px;
	}

	.meta-info .author,
	.date {
		font-family: Roboto, Verdana, Geneva, Tahoma, sans-serif;
		font-style: oblique;
		margin: 5px;
	}

	.main-content {
		width: auto;
	}
	.section-header {
		align-self: self-start;
		margin-bottom: 10px;
	}
	.sidebar-container {
		margin: 10px 30px 0px 0px;
	}
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.section-container {
		display: grid;
		grid-template-columns: 1fr;
	}

	.general-button {
		/* border: none; */
		background-color: hsl(80deg 100% 92.35%);
		cursor: pointer;
		color: hsl(220deg 81% 47%);
		/* color: cornflowerblue; */
		width: 30%;
		margin-left: 3em;
		justify-self: center;
		border: 0.5px solid lightgray;
		margin-top: 1em;
		border-radius: 7px;
	}
	.general-button:disabled {
		background-color: grey;
	}

	.text-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		justify-self: center;
	}
	#plaintext-textarea {
		width: 90%;
		height: 20em;
		resize: none;
	}

	.plaintext-header {
		font-family: 'Scope One', Georgia, 'Times New Roman', Times, serif;
		color: rgb(89, 89, 89);
		border-bottom: 1px solid rgba(165, 165, 165, 0.5);
	}

	.encrypt-container {
		width: 90%;
		justify-self: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.decoded-container {
		width: 90%;
		justify-self: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.header-text {
		font-size: 1em;
		margin-bottom: 5px;
		width: 100%;
	}

	.plaintext {
		font-family: 'Scope One', Georgia, 'Times New Roman', Times, serif;
		display: block;
		font-weight: bold;
	}

	.plaintext-header {
		font-family: 'Scope One', Georgia, 'Times New Roman', Times, serif;
		color: rgb(89, 89, 89);
		border-bottom: 1px solid rgba(165, 165, 165, 0.5);
	}

	.ciphertext {
		display: block;
		font-family: Macondo, Georgia, 'Times New Roman', Times, serif;
		font-weight: bold;
		/* color: rgb(194, 55, 253); */
		/* fill: rgb(177, 37, 177); */
		color: rgb(177, 37, 177);
	}
	.ciphertext-header {
		border-bottom: 1px solid rgba(194, 55, 253, 0.5);
		font-family: Macondo, Georgia, 'Times New Roman', Times, serif;
		color: rgb(194, 55, 253);
	}

	.decrypted-header {
		border-bottom: 1px solid rgba(1, 115, 156, 0.8);
		font-family: 'Flamenco', 'Georgia', Macondo, Georgia, 'Times New Roman', Times, serif;
		color: rgba(1, 115, 156, 0.8);
	}

	.decoded-header {
		border-bottom: 1px solid rgba(193, 84, 1, 0.8);
		font-family: Delius, 'Crete Round', Macondo, Georgia, 'Times New Roman', Times, serif;
		color: rgba(193, 84, 1, 1);
	}

	.plaintext-message {
		font-family: 'Scope One', Allura, Macondo, Georgia, 'Times New Roman', Times, serif;
		border: 0.5px solid rgba(233, 233, 233, 0);
		/* background-color: rgba(233, 233, 233, 0); */
	}

	.message-text {
		width: 95%;
		/* resize: none; */
		justify-self: center;
		margin-top: 5px;
	}
	.ciphertext-message {
		font-family: Macondo, Georgia, 'Times New Roman', Times, serif;
		color: rgb(194, 55, 253);
		/* border: 0.5px solid rgba(117, 37, 177, 0); */
	}

	.decrypted-message {
		font-family: 'Flamenco', Georgia, 'Times New Roman', Times, serif;
		color: rgb(1, 115, 156);
		/* border: 0.5px solid rgba(117, 37, 177, 0); */
	}
	.decoded-message {
		font-family: Delius, Lancelot, Georgia, 'Times New Roman', Times, serif;
		color: rgb(193, 84, 1);
		/* border: 0.5px solid rgba(1, 156, 138, 0.8); */
	}

	.letter-charts {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.quote-block {
		padding: 5px 0 15px 0;
		border-top: 3px solid rgba(177, 37, 177, 0.2);
		border-bottom: 3px solid rgb(177, 37, 177, 0.2);
	}
	.hint {
		font-size: 1rem;
	}

	.hint:hover > .hide {
		/* display: block; */
		color: rgb(201, 31, 85);
	}

	.hide {
		/* display: block; */
		/* display: none; */
		color: var(--bg);
	}

	.references {
		border-top: 2px #8aa9a9 dashed;
	}

	.references :is(p, li) {
		font-size: 1.1em;
	}
	@media (max-width: 900px) {
		div.sidebar-container {
			margin: 0px 20px 0 0;
			padding-bottom: 20px;
			border-bottom: 2px dotted var(--main-color);
		}
	}
	@media (max-width: 600px) {
		div.sidebar-container {
			margin: 0px 0px 0 0;
		}
		a {
			font-size: 0.8rem;
		}
	}
</style>
