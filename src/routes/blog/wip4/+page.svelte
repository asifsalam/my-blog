<script>
	export let data;

	import Layout from '../../+layout.svelte';
	import GeneralButton from './general-button.svelte';
	import { max, shuffle, shuffler, randomLcg } from 'd3';
	import '$lib/styles/blog.css';
	import { postList } from '$lib/json/stores';
	import PostsListCard from '$lib/components/posts-list-card.svelte';
	import SidebarTags from '$lib/components/sidebar-tags.svelte';
	import LetterBars from './letter-bars.svelte';
	import LetterDisplay from './letter-display.svelte';
	import LetterBoxes from './letter-boxes.svelte';
	import { calculateLetterFrequency } from '$lib/modules/utility_functions.js';
	import letterFrequencies from './letter-frequency';
	import TopicListCard from '$lib/components/topic-list-card.svelte';

	const postData = data.postData;
	const posts = $postList.slice(0, 5);

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
			// console.log('Message encrypted: ', this.messageEncrypted);
		};
	})();

	const cleanInput = function (input) {
		return input.replace(/[^a-zA-Z ]+/g, '').toUpperCase();
	};

	function createCipher() {
		console.log('creating cipher');
		cipherObj.cipherGenerated = true;
		cipherObj.cipher = shuffle(cipherObj.alphabet.slice());
		cipherObj.showTextKey = false;
		// console.log(cipherObj.cipher);
	}

	function encryptMessage() {
		console.log('Encrypting');
		cipherObj.plaintext = cleanInput(plaintextInput);
		cipherObj.messageEncrypted = true;
		cipherObj.ciphertext = encodeMessage(cipherObj.plaintext, cipherObj.alphabet, cipherObj.cipher);
		ciphertextFrequency = calculateLetterFrequency(cipherObj.ciphertext);
		cipherObj.decodeKey = createKey(ciphertextFrequency);
		cipherObj.textKey.forEach((d) => {
			let i = cipherObj.alphabet.indexOf(d);
			cipherKey.push(cipherObj.cipher[i]);
		});
		console.log(ciphertextFrequency, cipherObj.decodeKey, cipherKey);
	}

	function decryptMessage() {
		console.log('Decrypting');
		cipherObj.messageDecrypted = true;
		cipherObj.decryptedtext = encodeMessage(
			cipherObj.ciphertext,
			cipherObj.cipher,
			cipherObj.alphabet
		);
	}

	function decodeMessage() {
		console.log('Decoding');
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

	let plaintextInput =
		'First, you must import your data into R. This typically means that you take data stored in a file, database, or web application programming interface (API) and load it into a data frame in R. If you can’t get your data into R, you can’t do data science on it! Once you’ve imported your data, it is a good idea to tidy it. Tidying your data means storing it in a consistent form that matches the semantics of the dataset with how it is stored.';

	let sourceText = data.sourceText;
	plaintextInput = cleanInput(sourceText.join(' '));
	cipherObj.plaintext = plaintextInput;
	// $: console.log(plaintextInput);
	// cipherObj.encryptMessage();

	let plaintextFrequency = calculateLetterFrequency(cipherObj.plaintext);
	let ciphertextFrequency = [];
	let textFrequency = [];
	let cipherKey = [];

	// Create text key - sequence of letters sorted by frequency
	letterFrequencies.forEach((d) => {
		let x = { letter: d.letter, frequency: +String(d['words']).replace(',', '.') };
		textFrequency.push(x);
	});

	cipherObj.textKey = createKey(textFrequency);

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
</script>

<div class="sidebar">
	<PostsListCard {posts} />
	<p class="topics">
		<SidebarTags useThemes={'yes'} useCategories={'yes'} />
	</p>
</div>
<div class="content">
	<div class="section-container cipher">
		<h3 class="section-header">Create cipher key</h3>
		<LetterDisplay
			bind:letters={cipherObj.alphabet}
			bind:swapInfo
			draggable={false}
			letterHead={'Alphabet'}
			lettersType={'plaintext'}
		/>
		<button
			class="general-button"
			disabled={cipherObj.cipherGenerated}
			on:click={() => {
				createCipher();
			}}>Generate key<br />(random shuffle)</button
		>

		<LetterDisplay
			bind:letters={cipherObj.cipher}
			bind:swapInfo
			draggable={false}
			letterHead={'Cipher'}
			lettersType={'cipher'}
			showLetters={cipherObj.cipherGenerated}
		/>
	</div>
	<div class="text-container">
		<h3 class="section-header">Encrypt message</h3>
		<textarea
			name="plaintext-input"
			id="plaintext-textarea"
			cols="30"
			rows="50"
			maxlength="50000"
			class="plaintext-box"
			bind:value={plaintextInput}
			placeholder="Enter you message..."
		/>
		<GeneralButton
			disabledFlag={!cipherObj.cipherGenerated || cipherObj.messageEncrypted}
			buttonFunction={encryptMessage}
			heading="Encrypt<br /><small>Generate key to enable</small>"
		/>
		<div class="encrypt-container">
			<p class="plaintext-header header-text">Plaintext</p>
			{#if cipherObj.messageEncrypted}
				<p class="plaintext-message message-text">{cipherObj.plaintext.slice(0, 200)}</p>
			{:else}
				&nbsp;
			{/if}

			<p class="ciphertext-header header-text">Ciphertext</p>
			{#if cipherObj.messageEncrypted}
				<p class="ciphertext-message message-text">{cipherObj.ciphertext.slice(0, 200)}</p>
			{:else}
				&nbsp
			{/if}
		</div>
	</div>
	<div class="text-container">
		<h3 class="section-header">Decrypt Message</h3>
		<p>
			The encrypted message has been delivered. Our mole will easily decrypt it with the key. The
			subtle threat should provide the necessary sense of urgency.
		</p>
		<GeneralButton
			disabledFlag={!cipherObj.cipherGenerated || !cipherObj.messageEncrypted}
			buttonFunction={decryptMessage}
			heading="Decrypt<br /><small>Encrypt to enable</small>"
		/>
		<div class="encrypt-container">
			<p class="decrypted-header header-text">Decrypted message</p>
			{#if cipherObj.messageDecrypted}
				<p class="decrypted-message message-text">{cipherObj.decryptedtext.slice(0, 200)}</p>
			{:else}
				&nbsp
			{/if}
		</div>
	</div>

	<div class="text-container">
		<h3 class="section-header">Break cipher</h3>
		<div class="letter-charts">
			<div class="chart">
				<LetterBars letterData={textFrequency} chartOptions={{ title: 'Texts' }} />
			</div>
			<!-- <div class="chart">
				<LetterBars letterData={plaintextFrequency} chartOptions={{ title: 'Plaintext' }} />
			</div> -->
			{#if cipherObj.messageEncrypted}
				<div class="chart">
					<LetterBars letterData={ciphertextFrequency} chartOptions={{ title: 'Ciphertext' }} />
				</div>
			{/if}
		</div>

		<button
			class="general-button"
			disabled={!cipherObj.messageEncrypted}
			on:click={() => {
				decodeMessage();
			}}>Deccode (text frequency)<br /><small>Encrypt to enable</small></button
		>
		<div class="encrypt-container">
			<p class="decoded-header header-text">Decoded message</p>
			{#key cipherObj.decodeKey}
				{#if cipherObj.messageDecoded}
					<p class="decoded-message message-text">{cipherObj.decodedtext.slice(0, 750)}</p>
				{:else}
					&nbsp
				{/if}
			{/key}
		</div>
	</div>
	<div class="section-container cipher">
		<h3 class="section-header">Adjust key</h3>
		<LetterDisplay
			lettersType={'plaintext'}
			swapInfo={{}}
			letterHead="Text key"
			bind:letters={cipherObj.textKey}
			draggable={false}
			showLetters={cipherObj.messageDecoded}
		/>
		<LetterDisplay
			bind:letters={cipherKey}
			bind:swapInfo
			letterHead="Decode key (O)"
			lettersType="decode"
			draggable={true}
			showLetters={cipherObj.messageDecoded}
		/>

		<LetterBoxes
			bind:letters={cipherObj.decodeKey}
			bind:swapInfo
			letterHead="DecodeKey"
			lettersType="decode"
			draggable={true}
			showLetters={cipherObj.messageDecoded}
		/>
	</div>
</div>

<style>
	.section-header {
		align-self: self-start;
		margin-bottom: 10px;
	}
	.sidebar {
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
	.header-text {
		font-size: 1em;
		margin-bottom: 5px;
		width: 100%;
	}

	.plaintext-header {
		font-family: 'Scope One', Georgia, 'Times New Roman', Times, serif;
		color: rgb(89, 89, 89);
		border-bottom: 1px solid rgba(165, 165, 165, 0.5);
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
		width: 90%;
		resize: none;
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
</style>
