<script>
	export let data;
	import { max, shuffle } from 'd3';
	import '$lib/styles/blog.css';
	import { page } from '$app/stores';
	import { postList } from '$lib/json/stores';
	import PostsListCard from '$lib/components/posts-list-card.svelte';
	import SidebarTags from '$lib/components/sidebar-tags.svelte';
	import LetterBars from './letter-bars.svelte';
	import Modal from '$lib/components/modal-1.svelte';
	// import { shuffle } from 'd3-array';
	import { cleanTags } from '$lib/modules/utility_functions.js';
	import letterFrequencies from './letter-frequency';
	// console.log('data: ', data);
	let showModal = false;

	import TopicListCard from '$lib/components/topic-list-card.svelte';
	let postData = data.postData;
	const sourceText = data.sourceText;

	let posts = $postList.slice(0, 5);

	const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
	let cipher = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
	let textKey = [];
	let dictKey = [];
	let decodeKey = [];

	let plaintextFrequency = [];
	let ciphertextFrequency = [];
	let sourceFrequency = [];
	let textFrequency = [];
	let dictFrequency = [];
	let frequency = [];

	let cipherGenerated = false;
	let messageEncrypted = false;
	let messageDecrypted = false;
	let messageDictDecoded = false;
	let messageTextDecoded = false;

	let encryptedMessage = '';
	let decryptedMessage = '';
	let decodedMessage = '';
	let dictDecodedMessage = '';
	let textDecodedMessage = '';

	const cleanInput = function (input) {
		return input.replace(/[^a-zA-Z ]+/g, '').toUpperCase();
	};

	function calculateFrequency(message) {
		let textFrequency = [];
		let frequency = [...message].reduce((acc, chr) => {
			acc[chr] = (acc[chr] || 0) + 1;
			return acc;
		}, {});
		Object.keys(frequency).forEach((d) => {
			let x = { letter: d, frequency: frequency[d] };
			if (d != ' ') textFrequency.push(x);
		});
		console.log('calculate-text-frequency: ', textFrequency);
		let sum = textFrequency.reduce((acc, curr) => {
			console.log('calculate-acc: ', acc);
			return acc + curr.frequency;
		}, 0);
		textFrequency.forEach((d) => {
			d.frequency = (d.frequency * 100) / sum;
		});
		textFrequency.sort((a, b) => b.frequency - a.frequency);
		return textFrequency;
	}

	let plaintextInput =
		"I must convey to you my profound concern regarding your recent performance, which has left much to be desired. It is now of utmost importance that you demonstrate your competence in a substantial and effective manner. Recent developments have given rise to compelling evidence, which strongly suggests that a significant operation is currently underway, with the clear intent to disrupt the upcoming visit of the Premier by organizing a large-scale demonstration under the banner of 'freedom.' 	Your primary mission, given the gravity of the situation, is to engage in a meticulous and comprehensive gathering of critical intelligence.";

	// let plaintextMessage = plaintextInput.replace(/[^a-zA-Z ]+/g, '').toUpperCase();
	let plaintextMessage = cleanInput(plaintextInput);
	$: console.log('Input length: ', plaintextMessage.length);

	// Calculate character frequency of input message

	frequency = [...plaintextMessage].reduce((acc, chr) => {
		acc[chr] = (acc[chr] || 0) + 1;
		return acc;
	}, {});

	Object.keys(frequency).forEach((d) => {
		let x = { letter: d, frequency: frequency[d] };
		if (d != ' ') plaintextFrequency.push(x);
	});

	let sum = plaintextFrequency.reduce((acc, curr) => {
		return acc + curr.frequency;
	}, 0);
	plaintextFrequency.forEach((d) => {
		d.frequency = (d.frequency * 100) / sum;
	});
	plaintextFrequency.sort((a, b) => b.frequency - a.frequency);
	// console.log('plaintextFrequency: ', plaintextFrequency, 'sum: ', sum);

	let testFrequency = calculateFrequency(plaintextMessage);
	console.log('test-frequency', testFrequency);
	console.log('plaintext-frequency', plaintextFrequency);

	letterFrequencies.forEach((d) => {
		let x = { letter: d.letter, frequency: +String(d['texts']).replace(',', '.') };
		let y = { letter: d.letter, frequency: +String(d['dictionaries']).replace(',', '.') };
		// console.log('chartdata-', typeof y);
		textFrequency.push(x);
		dictFrequency.push(y);
	});

	textFrequency
		.sort((a, b) => b.frequency - a.frequency)
		.forEach((d) => {
			textKey.push(d.letter);
		});
	dictFrequency
		.sort((a, b) => b.frequency - a.frequency)
		.forEach((d) => {
			dictKey.push(d.letter);
		});

	// console.log('textFrequency: ', textFrequency, 'dictFrequency: ', dictFrequency);

	function convertStringToFrequency(textMessage) {
		const cleanMessage = textMessage.replace(/[^a-zA-Z ]+/g, '').toUpperCase();
		let result = [...cleanMessage].reduce((a, e) => {
			a[e] = a[e] ? a[e] + 1 : 1;
			return a;
		}, {});
		console.log('convertStringToFrequency: ', result);
		return result;
	}

	function createCipher() {
		cipherGenerated = true;
		cipher = shuffle(cipher.slice());
	}

	function encodeMessage(inputMessage, inputLetters, decodeKey) {
		let outputMessage = '';
		// console.log('Encode Message ', decodeKey, '\n', inputMessage);
		inputMessage.split('').forEach((d) => {
			let index = inputLetters.indexOf(d);
			// console.log(d, index);
			if (index === -1) outputMessage = outputMessage + ' ';
			else outputMessage = outputMessage + decodeKey[index];
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
		// console.log(decryptedMessage);
	}

	function decodeDictMessage() {
		dictFrequency.forEach((d) => {
			dictKey.push(d.letter);
		});
		messageDictDecoded = true;
		dictDecodedMessage = encodeMessage(encryptedMessage, decodeKey, dictKey);
		// console.log('dict decode: ', dictDecodedMessage);
	}

	function decodeTextMessage() {
		messageTextDecoded = true;
		textDecodedMessage = encodeMessage(encryptedMessage, decodeKey, textKey);
		// console.log('text decode: ', textDecodedMessage);
	}

	$: {
		if (messageEncrypted) {
			frequency = [...encryptedMessage].reduce((acc, chr) => {
				//accumulator (acc), and current value (chr)
				//add 1 to the chr array element, if chr
				acc[chr] = (acc[chr] || 0) + 1;
				return acc;
			}, {});

			Object.keys(frequency).forEach((d, i) => {
				if (d != ' ') {
					let x = { letter: d, frequency: frequency[d] / 2 };
					ciphertextFrequency.push(x);
				}
			});
			ciphertextFrequency
				.sort((a, b) => {
					return b.frequency - a.frequency;
				})
				.forEach((d) => decodeKey.push(d.letter));

			// ciphertextFrequency.forEach((d, i) => {
			// 	decodeKey[i] = d.letter;
			// });
			console.log('CipherText: ', ciphertextFrequency);
			console.log('decodeKey: ', decodeKey);
		}
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
		<p>
			The natives are restless. You are responible for collecting intelligence on their activities.
			The local staff have recruited an asset who is close to the resistence movement. You will meet
			with him on your next visit to the wretched place. You will give him a cipher key and explain
			to him how use it so your communicaitons remain secure.
		</p>
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
			<p>
				Now that the key has been provided to the asset, messages can be exchanged without fear of
				discovery. The upcoming visit of the Premier to the territory is a prime candidate for
				disruption. Let's squeeze our mole for information. In the text box below, create a new
				message, (maximum of 256 characters) or use the existing one, and click the button to
				encrypt it.
			</p>
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
					<p class="plaintext-message message-text">{plaintextMessage}</p>
				{:else}
					&nbsp;
				{/if}

				<p class="ciphertext-header header-text">Ciphertext</p>
				{#if messageEncrypted}
					<p class="ciphertext-message message-text">{encryptedMessage}</p>
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
					<p class="decrypted-message message-text">{decryptedMessage}</p>
				{:else}
					&nbsp
				{/if}
			</div>
		</div>
		<div class="text-container">
			<h3 class="section-header">Break cipher</h3>
			<p>
				The discarded ciphertext has found its way to the resistence. Their codebreaker has read
				Al-Kindi, and immediately goes to work. She takes out two letter frequency tables, one
				created from a set of texts, and one from a dictionary. Then she creates a frequency table
				from the ciphertext, and begins to decode the message. The process of codebreaking is part
				of crytpanalysis, the field of encryption, cipher and code analysis.
			</p>
			<div class="letter-charts">
				<div class="chart">
					<LetterBars letterData={textFrequency} chartOptions={{ title: 'Texts' }} />
				</div>
				<div class="chart">
					<LetterBars letterData={dictFrequency} chartOptions={{ title: 'Dictionary' }} />
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
					decodeDictMessage();
				}}>Deccode (dictionary frequency)<br /><small>Encrypt to enable</small></button
			>
			<div class="encrypt-container">
				<p class="decoded-header header-text">Decoded message</p>
				{#if messageEncrypted}
					<p class="decoded-message message-text">{dictDecodedMessage}</p>
				{:else}
					&nbsp
				{/if}
			</div>

			<button
				class="general-button"
				disabled={!messageEncrypted}
				on:click={() => {
					decodeTextMessage();
				}}>Deccode (text frequency)<br /><small>Encrypt to enable</small></button
			>
			<div class="encrypt-container">
				<p class="decoded-header header-text">Decoded message</p>
				{#if messageEncrypted}
					<p class="decoded-message message-text">{textDecodedMessage}</p>
				{:else}
					&nbsp
				{/if}
			</div>
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
