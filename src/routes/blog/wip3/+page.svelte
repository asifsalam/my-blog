<script>
	export let data;
	import { max, shuffle, shuffler, randomLcg } from 'd3';
	import '$lib/styles/blog.css';
	import { page } from '$app/stores';
	import { postList } from '$lib/json/stores';
	import PostsListCard from '$lib/components/posts-list-card.svelte';
	import SidebarTags from '$lib/components/sidebar-tags.svelte';
	import LetterBars from './letter-bars.svelte';
	import LetterDisplay from './letter-display.svelte';
	import Modal from '$lib/components/modal-1.svelte';
	import { cleanTags, calculateLetterFrequency } from '$lib/modules/utility_functions.js';
	import letterFrequencies from './letter-frequency';
	import TopicListCard from '$lib/components/topic-list-card.svelte';

	let showModal = false;
	let postData = data.postData;
	const sourceText = data.sourceText;

	let posts = $postList.slice(0, 5);

	const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
	let cipher = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
	let textKey = [];
	$: decodeKey = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

	let plaintextFrequency = [];
	let ciphertextFrequency = [];
	let sourceFrequency = [];
	let textFrequency = [];
	let frequency = [];

	let cipherGenerated = false;
	let messageEncrypted = false;
	let messageDecrypted = false;
	let messageDecoded = false;

	let encryptedMessage = '';
	let decryptedMessage = '';
	$: decodedMessage = '';

	const cleanInput = function (input) {
		return input.replace(/[^a-zA-Z ]+/g, '').toUpperCase();
	};

	let plaintextInput =
		'First, you must import your data into R. This typically means that you take data stored in a file, database, or web application programming interface (API) and load it into a data frame in R. If you can’t get your data into R, you can’t do data science on it! Once you’ve imported your data, it is a good idea to tidy it. Tidying your data means storing it in a consistent form that matches the semantics of the dataset with how it is stored.';

	plaintextInput = sourceText.join(' ');

	// Calculate character frequency of input message
	// const sourceCleanText = cleanInput(sourceText.join(' '));
	// sourceFrequency = calculateLetterFrequency(cleanInput(sourceText.join(' ')));
	// console.log('source-frequency: ', sourceFrequency);

	let plaintextMessage = cleanInput(plaintextInput);
	plaintextFrequency = calculateLetterFrequency(plaintextMessage);
	// $: console.log('Input length: ', plaintextMessage.length, plaintextFrequency);

	letterFrequencies.forEach((d) => {
		let x = { letter: d.letter, frequency: +String(d['texts']).replace(',', '.') };
		textFrequency.push(x);
	});

	textFrequency
		.sort((a, b) => b.frequency - a.frequency)
		.forEach((d) => {
			textKey.push(d.letter);
		});

	function createCipher() {
		cipherGenerated = true;
		cipher = shuffle(cipher.slice());
		// cipher = shuffler(randomLcg(cipher));
	}

	function encodeMessage(inputMessage, letterFrequency, decodeFrequency) {
		let outputMessage = '';
		inputMessage.split('').forEach((d) => {
			let index = letterFrequency.indexOf(d);
			if (index === -1) outputMessage = outputMessage + ' ';
			else outputMessage = outputMessage + decodeFrequency[index];
		});
		// console.log('Encode Message', inputMessage, '\n', outputMessage);
		return outputMessage;
	}

	function encryptMessage() {
		messageEncrypted = true;
		plaintextMessage = plaintextInput.replace(/[^a-zA-Z ]+/g, '').toUpperCase();
		encryptedMessage = encodeMessage(plaintextMessage, alphabet, cipher);
		// console.log(plaintextMessage, '\n', encryptedMessage);
	}

	function decryptMessage() {
		messageDecrypted = true;
		decryptedMessage = encodeMessage(encryptedMessage, cipher, alphabet);
	}

	function decodeMessage() {
		messageDecoded = true;
		decodedMessage = encodeMessage(encryptedMessage, decodeKey, textKey);
	}

	let sourceId = '';
	let sourceIndex = '';
	let sourceLetter = '';
	let targetId = '';
	let targetIndex = 0;
	let targetLetter = '';
	let dropped = false;
	function handleDrop(e) {
		dropped = true;
		targetId = e.target.id;
		console.log('Drag entered at: ', e, e.target.id);
		sourceLetter = sourceId.split('-')[1];
		targetLetter = targetId.split('-')[1];
		sourceIndex = letters.indexOf(sourceLetter);
		targetIndex = letters.indexOf(targetLetter);
		letters[sourceIndex] = targetLetter;
		letters[targetIndex] = sourceLetter;
		letters = letters;
		console.log(
			'letter-display: handle-drop: ',
			sourceIndex,
			sourceLetter,
			targetIndex,
			targetLetter,
			letters[sourceIndex],
			letters[targetIndex]
		);
	}

	$: {
		if (messageEncrypted) {
			decodeKey = [];
			ciphertextFrequency = calculateLetterFrequency(encryptedMessage);
			ciphertextFrequency
				.sort((a, b) => {
					return b.frequency - a.frequency;
				})
				.forEach((d) => decodeKey.push(d.letter));
			// console.log('CipherText: ', ciphertextFrequency);
		}
		console.log('decodeKey: ', decodeKey);
	}
</script>

{#key $page.params.id}
	<div class="sidebar">
		<PostsListCard {posts} />
		<p class="topics">
			<SidebarTags useThemes={'yes'} useCategories={'yes'} />
		</p>
	</div>

	<div class="content">
		<div class="cipher-container">
			<h3 class="section-header">Create cipher key</h3>
			<div class="letters-list">
				<p class="letter-head">Letters</p>
				<div class="letters-table">
					{#each alphabet as letter}
						<span class="letter-box letter">{letter}</span>
					{/each}
				</div>
			</div>
			<button
				class="general-button"
				disabled={cipherGenerated}
				on:click={() => {
					createCipher();
				}}>Generate key<br />(random shuffle)</button
			>
			<div class="letters-list">
				<p class="cipher-head">Cipher key</p>
				<div class="letters-table">
					{#each alphabet as letter, i}
						<span class="letter-box cipher">
							{#if cipherGenerated}
								{cipher[i]}
							{:else}
								-
							{/if}
						</span>
					{/each}
				</div>
			</div>
		</div>
		<div class="text-container">
			<h3 class="section-header">Encrypt message</h3>
			<textarea
				name="plaintext-input"
				id="plaintext-textarea"
				cols="30"
				rows="10"
				maxlength="500"
				class="plaintext-box"
				bind:value={plaintextInput}
				placeholder="Enter you message..."
			/>
			<button
				class="general-button"
				disabled={!cipherGenerated || messageEncrypted}
				on:click={() => {
					encryptMessage();
				}}>Encrypt<br /><small>Generate key to enable</small></button
			>
			<div class="encrypt-container">
				<p class="plaintext-header header-text">Plaintext</p>
				{#if messageEncrypted}
					<!-- <textarea name="plaintext-message" id="plaintext-message" cols="30" rows="10" readonly
						>{plaintextMessage}</textarea> -->
					<p class="plaintext-message message-text">{plaintextMessage.slice(0, 200)}</p>
				{:else}
					&nbsp;
				{/if}

				<p class="ciphertext-header header-text">Ciphertext</p>
				{#if messageEncrypted}
					<p class="ciphertext-message message-text">{encryptedMessage.slice(0, 200)}</p>
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
			<button
				class="general-button"
				disabled={!cipherGenerated || !messageEncrypted}
				on:click={() => {
					decryptMessage();
				}}>Decrypt<br /><small>Encrypt to enable</small></button
			>
			<div class="encrypt-container">
				<p class="decrypted-header header-text">Decrypted message</p>
				{#if messageDecrypted}
					<p class="decrypted-message message-text">{decryptedMessage.slice(0, 200)}</p>
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
				<div class="chart">
					<LetterBars letterData={plaintextFrequency} chartOptions={{ title: 'Plaintext' }} />
				</div>
				{#if messageEncrypted}
					<div class="chart">
						<LetterBars letterData={ciphertextFrequency} chartOptions={{ title: 'Ciphertext' }} />
					</div>
				{/if}
			</div>

			<button
				class="general-button"
				disabled={!messageEncrypted}
				on:click={() => {
					decodeMessage();
				}}>Deccode (text frequency)<br /><small>Encrypt to enable</small></button
			>
			<div class="encrypt-container">
				<p class="decoded-header header-text">Decoded message</p>
				{#if messageEncrypted}
					<p class="decoded-message message-text">{decodedMessage.slice(0, 200)}</p>
				{:else}
					&nbsp
				{/if}
			</div>
		</div>
		<div class="cipher-container">
			<h3 class="section-header">Adjust key</h3>

			<LetterDisplay
				lettersType={'plaintext'}
				letterHead="Text key"
				bind:letters={textKey}
				draggable={false}
				{messageDecoded}
			/>
			<LetterDisplay
				lettersType={'decode'}
				letterHead="Decode key"
				bind:letters={decodeKey}
				draggable={true}
				{messageDecoded}
				{handleDrop}
			/>
		</div>
	</div>
{/key}

<style>
	.section-header {
		align-self: self-start;
		margin-bottom: 10px;
	}
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	textarea {
		padding: 5px;
	}

	.letter-charts {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}

	#plaintext-textarea {
		width: 90%;
		height: 7em;
		resize: none;
	}
	.text-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		justify-self: center;
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
		font-family: 'Georgia', Macondo, Georgia, 'Times New Roman', Times, serif;
		color: rgba(1, 115, 156, 0.8);
	}

	.decoded-header {
		border-bottom: 1px solid rgba(193, 84, 1, 0.8);
		font-family: Delius, 'Crete Round', Macondo, Georgia, 'Times New Roman', Times, serif;
		color: rgba(193, 84, 1, 1);
	}

	.plaintext-box {
		margin-bottom: 10px;
	}

	.message-text {
		width: 90%;
		resize: none;
		justify-self: center;
		margin-top: 5px;
	}
	.plaintext-message {
		font-family: 'Scope One', Allura, Macondo, Georgia, 'Times New Roman', Times, serif;
		border: 0.5px solid rgba(233, 233, 233, 0);
		/* background-color: rgba(233, 233, 233, 0); */
	}

	.ciphertext-message {
		font-family: Macondo, Georgia, 'Times New Roman', Times, serif;
		color: rgb(194, 55, 253);
		/* border: 0.5px solid rgba(117, 37, 177, 0); */
	}

	.decrypted-message {
		font-family: Georgia, 'Times New Roman', Times, serif;
		color: rgb(1, 115, 156);
		/* border: 0.5px solid rgba(117, 37, 177, 0); */
	}
	.decoded-message {
		font-family: Delius, Lancelot, Georgia, 'Times New Roman', Times, serif;
		color: rgb(193, 84, 1);
		/* border: 0.5px solid rgba(1, 156, 138, 0.8); */
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
	.letters-list {
		margin: 10px 0 10px 0;
		display: grid;
		grid-template-columns: 1fr 8fr;
	}

	.letter {
		font-family: 'Scope One', Georgia, 'Times New Roman', Times, serif;
		fill: rgb(89, 89, 89);
		text-anchor: middle;
		font-size: 1em;
		color: rgb(89, 89, 89);
	}

	.letter-head {
		font-family: 'Scope One', Georgia, 'Times New Roman', Times, serif;
		text-anchor: end;
		/* display: inline-block; */
		/* margin: 1em 0.5em 0 1em; */
		margin: auto 0;
		/* width: 3em; */
		justify-self: right;
		padding-right: 10px;
	}

	.letter-box {
		stroke: lightgray;
		fill: none;
		margin: auto;
		padding: 0.25em;
		border: 0.5px lightgray solid;
		width: 15px;
		float: left;
	}

	.cipher-head {
		font-family: 'Macondo', Georgia, 'Times New Roman', Times, serif;
		text-anchor: end;
		/* display: inline-block; */
		/* margin: 1em 0.5em 0 1em; */
		margin: auto 0;
		/* width: 3em; */
		justify-self: right;
		padding-right: 10px;
		color: rgb(177, 37, 177);
	}
	.cipher {
		font-family: Macondo, Georgia, 'Times New Roman', Times, serif;
		fill: rgb(177, 37, 177);
		text-anchor: middle;
		color: rgb(177, 37, 177);
	}

	.cipher-container {
		display: grid;
		grid-template-columns: 1fr;
	}

	.sidebar {
		margin: 10px 30px 0px 0px;
	}
	@media (max-width: 1000px) {
		div.sidebar {
			margin: 0px;
			padding-bottom: 20px;
			border-bottom: 2px dotted var(--main-color);
		}
	}

	.plaintext {
		font-family: 'Scope One', Georgia, 'Times New Roman', Times, serif;
		font-size: 1em;
		color: rgb(89, 89, 89);
	}
	.decrypt-container {
		width: 90%;
		justify-self: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
