<script>
	export let data;
	import '$lib/styles/blog.css';
	import { page } from '$app/stores';
	import { postList } from '$lib/json/stores';
	import PostsListCard from '$lib/components/posts-list-card.svelte';
	import SidebarTags from '$lib/components/sidebar-tags.svelte';
	import LetterBars from './letter-bars.svelte';
	import Modal from '$lib/components/modal-1.svelte';
	import { shuffle } from 'd3-array';
	import { cleanTags } from '$lib/modules/utility_functions.js';
	import letterFrequencies from './letter-frequency';

	let showModal = false;

	import TopicListCard from '$lib/components/topic-list-card.svelte';
	let postData = data.postData;

	let posts = $postList.slice(0, 5);

	const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
	let cipher = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
	let textFrequency = [...'JKLMNOPQRSTUVWXYZABCDEFGHI'];
	let dictFrequency = [...'ABCDEFGHSTUVWXYZIJKLMNOPQR'];
	let cipherGenerated = false;
	let messageEncrypted = false;
	let messageDecrypted = false;
	let messageDictDecoded = false;
	let messageTextDecoded = false;
	// console.log('page.js, alphabet: ', alphabet);
	// $: console.log(cipher);
	// const yPos = 50;
	// const letterSpacing = 25;
	// const boxHeight = letterSpacing * 1.5;
	// const alphabetOffset = 100;
	let encryptedMessage = '';
	let decryptedMessage = '';
	let decodedMessage = '';
	let dictDecodedMessage = '';
	let textDecodedMessage = '';
	let plaintextMessage = '';
	$: plaintextInput =
		'You have heretofore been completely ineffectual. It is time to prove your worth. Telltale signs indicate a grand plot to hinder the visit of the Premier with a march of freedom. Find the when, where, and culprits. Fail me and the consequences will be dire.';

	// 'It pains me to say that you have been completely ineffectual. It is time to prove your worth. There are telltale signs that a grand scheme is afoot to impede the visit of the Premier by staging a large freedom march. Your task is to ascertain the time, place and the manner of implementation. And, of course, the traitorous masterminds behind this insidious intrigue. Should you falter, the repurcussions will be correspondingly dire.';
	// console.log(letterFrequencies);
	$: console.log('string length: ', plaintextInput.length);

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
		messageDictDecoded = true;
		dictDecodedMessage = encodeMessage(encryptedMessage, cipher, dictFrequency);
		// console.log('dict decode: ', dictDecodedMessage);
	}

	function decodeTextMessage() {
		messageTextDecoded = true;
		textDecodedMessage = encodeMessage(encryptedMessage, cipher, textFrequency);
		// console.log('text decode: ', textDecodedMessage);
	}

	// function encryptMessage() {
	// 	encryptedMessage = '';
	// 	messageEncrypted = true;
	// 	plaintextMessage = plaintextInput.replace(/[^a-zA-Z ]+/g, '').toUpperCase();
	// 	plaintextMessage.split('').forEach((d) => {
	// 		let index = alphabet.indexOf(d);
	// 		if (index === -1) encryptedMessage = encryptedMessage + ' ';
	// 		else encryptedMessage = encryptedMessage + cipher[index];
	// 	});
	// 	console.log(plaintextMessage, '\n', encryptedMessage);
	// }

	// function decryptMessage() {
	// 	decryptedMessage = '';
	// 	encryptedMessage.split('').forEach((d) => {
	// 		let index = cipher.indexOf(d);
	// 		if (index === -1) decryptedMessage = decryptedMessage + ' ';
	// 		else decryptedMessage = decryptedMessage + alphabet[index];
	// 	});
	// 	console.log('decryptedMessage:\n ', decryptedMessage);
	// 	messageDecrypted = true;
	// }

	// function decodeMessage() {
	// 	decodedMessage = '';
	// 	encryptedMessage.split('').forEach((d) => {
	// 		let index = cipher.indexOf(d);
	// 		if (index === -1) decryptedMessage = decryptedMessage + ' ';
	// 		else decryptedMessage = decryptedMessage + alphabet[index];
	// 	});
	// 	console.log('decryptedMessage:\n ', decryptedMessage);
	// 	messageDecrypted = true;
	// }
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
				created from a set of texts, and one from a dictionary. We can call this effort to break the
				encryption, deciphering or decoding.
			</p>
			<div class="letter-charts">
				<div class="chart">
					<LetterBars letterData={letterFrequencies} yKey="texts" />
				</div>
				<div class="chart">
					<LetterBars letterData={letterFrequencies} yKey="dictionaries" />
				</div>
			</div>
			<button
				class="general-button"
				disabled={!messageEncrypted || !messageDecrypted}
				on:click={() => {
					decodeDictMessage();
				}}>Deccode (dictionary frequency)<br /><small>Encrypt to enable</small></button
			>
			<div class="encrypt-container">
				<p class="decoded-header header-text">Decoded message</p>
				{#if messageDecrypted}
					<p class="decoded-message message-text">{dictDecodedMessage}</p>
				{:else}
					&nbsp
				{/if}
			</div>

			<button
				class="general-button"
				disabled={!messageEncrypted || !messageDecrypted}
				on:click={() => {
					decodeTextMessage();
				}}>Deccode (text frequency)<br /><small>Encrypt to enable</small></button
			>
			<div class="encrypt-container">
				<p class="decoded-header header-text">Decoded message</p>
				{#if messageDecrypted}
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
		width: 90%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	textarea {
		padding: 5px;
	}

	.letter-charts {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
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
		width: 90%;
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
		font-family: 'Marck Script', Macondo, Georgia, 'Times New Roman', Times, serif;
		color: rgba(1, 115, 156, 0.8);
	}

	.decoded-header {
		border-bottom: 1px solid rgba(156, 1, 102, 0.8);
		font-family: 'Marck Script', Macondo, Georgia, 'Times New Roman', Times, serif;
		color: rgba(1, 115, 156, 0.8);
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
		font-family: Lancelot, Georgia, 'Times New Roman', Times, serif;
		color: rgba(1, 156, 138, 1);
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
