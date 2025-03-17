<script>
	export let data;

	// import Layout from '../../+layout.svelte';
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
	import RandomQuote from '$lib/components/random-quote.svelte';

	const postData = data.postData;
	// const posts = $postList.slice(0, 5);
	// console.log('crytpography-postlist: ', $postList);
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
	// $: console.log(plaintextInput);
	// cipherObj.encryptMessage();

	// let plaintextFrequency = calculateLetterFrequency(cipherObj.plaintext);
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
					width="250;"
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
			<h2>Al-Kindi's method for deciphering cryptographic messages</h2>
			<p>
				The probability of correctly guessing the substitution cipher is effectively zero. But
				governments and other agents had a keen interest in the ability to decipher the content of
				these messages. Al-Kindi invented what is now called frequency analysis, a statistical
				method for breaking this type of encryption. In his book "A Manuscript on Deciphering
				Cryptographic Messages" (841 AD), Al-Kindi describes the method:
			</p>
			<p class="quote-block">
				<span
					class="ciphetext"
					style="margin-top:10px;display:block;font-family:Macondo;font-style:italic;font-weight:normal;font"
					>“One way to solve an encrypted message, if we know its [original] language, is to find a
					different plaintext of the same language long enough to fill one sheet or so, and then we
					count the occurrences of each letter. We call the most frequently occurring letter the
					‘first’, the next most occurring letter the ‘second’, the following most occurring the
					‘third’, and so on, until we account for all the different letters in the plaintext
					sample.”</span
				>
				<span
					style="margin-top:10px;display:block;font-family:Macondo;font-style:italic; font-weight:normal"
				>
					“Then we look at the cryptogram we want to solve and we also classify its symbols. We find
					the most occurring symbol and change it to the form of the ‘first’ letter of the plaintext
					sample, the next most common symbol is changed to the form of the ‘second’ letter, and so
					on, until we account for all symbols of the cryptogram we want to solve.(1, 2)”
				</span>
				<span
					style="margin-top:10px;display:block;font-family:Macondo;font-style:italic; font-weight:normal"
				>
					“It could happen sometimes that the cryptogram is too short to have all different letters.
					The high and low [frequency] counts will not be correct, for high and low counts are only
					correct in long enough messages to correspond to all places of frequent and rare
					occurrences so that if some letters are [too] few in one segment of the message, they will
					be [too] many in others. But if the cryptogram is too short, equivalence does not apply,
					letter ranks are not correct and [consequently] a second trick should be used to recover
					letters. Such a trick is qualitative which is ... [here al-Kindi wrote in detail on
					possible letter combinations in a language, like 'al' in Arabic...etc.] (1)."
				</span>
			</p>

			<p>
				A new field, cryptanalysis, and a new statistical technique, frequency analysis, invented in
				a few sentences. The technique is simple, elegant, and powerful, but there is much more to
				actually breaking a cipher than just frequency analysis, which Al-Kindi alludes to in the
				text above. In the book he provides a number of techniques and tables to help the
				codebreaker decode a cryptogram.
			</p>
			<p>
				While cryptology has advanced considerably over the centuries, this method can still break
				modern systems. Kamara & Naveed have shown how the method can be used to extract information
				from encrypted databases (3,5).
			</p>
			<h2>Further reading</h2>
			<p>
				Simon Singh's <i>The code book: the secret history of codes and codebreaking</i> provides a technically
				rigorous and rich, yet accessible history of the field, its role in war and revolution, impact
				on modern society and effect on personal privacy today (6).
			</p>
			<h2>Can you break this cipher?</h2>
			<p>
				This message was has been encrypted by a substitution cipher. As a codebreaker, your job is
				to decode the ciphertext. You have trained on the Al-Kindi texts. You know that the letter
				frequencies are only a starting point. You will have to use your statistical knowledge of
				the English language, its common letter combinations and sequences. Your toolkit consists of
				the following:
			</p>
			<ol>
				<li>Estimated letter frequencies for the language.</li>
				<li>Symbol frequencies from the ciphertext.</li>
				<li>
					A small tool that maps the symbols to the corresponding letters based on the frequencies.
					You can swap symbol positions by clicking on two symbols. The decrypted text updates based
					on the change.
				</li>
			</ol>

			<h3 class="section-header">View encrypted message</h3>

			{#if cipherObj.messageEncrypted}
				<p class="ciphertext-message message-text message-box {showFullText ? 'shown' : 'hidden'}">
					{cipherObj.ciphertext}
				</p>
			{/if}
			<GeneralButton
				disabledFlag={!cipherObj.cipherGenerated || !cipherObj.messageEncrypted}
				buttonFunction={() => (showFullText = !showFullText)}
				heading="Show {showFullText ? 'less' : 'more'}"
			/>
			<h3 class="section-header">Break encryption</h3>
			<p>
				The first step is to calculate the symbol frequencies in the ciphertext, and map the symbols
				to the letter frequencies in the language. This provides a starting point for the code
				breaking effort. The bar chart below shows this, with the letter frequency on the left and
				symbol frequency on the right.
			</p>
			<div class="letter-charts">
				<div class="chart">
					<LetterBars
						letterData={textFrequency}
						chartOptions={{ title: 'Letter Frequency (Language)', barType: 'letter' }}
					/>
				</div>
				<!-- <div class="chart">
				<LetterBars letterData={plaintextFrequency} chartOptions={{ title: 'Plaintext' }} />
			</div> -->

				{#if cipherObj.messageEncrypted}
					<div class="chart">
						<LetterBars
							letterData={ciphertextFrequency}
							chartOptions={{ title: 'Symbol Frequency (Ciphertext)', barType: 'cipher' }}
						/>
					</div>
				{/if}
			</div>

			<p>
				This forms the first estimate of the <strong>decryption key</strong>. The result of the
				decoding effort using this key is shown in the text box further down.
			</p>
			<p>
				To decode the ciphertext, you need to order the symbols in the right sequence. The key table
				below allows you to adjust the order of the symbols. The upper row in the key table below
				contains letters in descending order based on frequency of occurrence in the language, as
				shown in the chart above. The lower row contains symbols in descending order based on the
				frequency of occurrence in the ciphertext, as shown in the chart above.
			</p>
			<p>
				<strong
					>Symbols positions in the lower row can be swapped by clicking on the first symbol to
					select it and then the second symbol to swap the two. Symbols that have been swapped are
					coloured green.</strong
				>
			</p>
			<p>
				The key is applied to the ciphertext to decode it. This decoding is updated as the symbols
				are swapped in the key table above.
			</p>
			<p>If you run out of ideas, have a look at the hints below.</p>
			<p>
				If you manage to decode the ciphertext, send me a message on LinkedIn with some information
				about the text, like the author, location, date.
			</p>
			<p style="font-size:0.9em;margin-bottom:2px;">Use the hints if you get stuck.</p>
			<!-- <p style="height:30px;margin-top:2px;" class="hint">
			Hint 1 : <span class="hide"
				>The frequencies of the symbols in the ciphertext can often be off by on letter or so. Try
				to swap adjacent symbols.</span
			>
		</p>
		<p style="height:60px;" class="hint">
			Hint 2:
			<span class="hide"
				>The decoded second word "ANL" could be "AND" or "ANY". Let's explore "AND". This means that
				the positions in the Decode Key that correspond to the letters "L" and "D" may be incorrect.
				Swap these in the Decode Key by first clicking on the symbol in the Decode Key that maps to
				the letter "L" in the Text Key, and then the symbol that maps to the letter "D" in Text Key.</span
			>
		</p> -->
			<div class="hint">
				<span>Show hint 1</span>
				<input type="checkbox" name="hint1" id="hint1" bind:checked={showHint1} />
				<span class:visible={showHint1} class="isHint"
					>The frequencies of the symbols in the ciphertext can often be off by on letter or so. Try
					to swap adjacent symbols.</span
				>
			</div>
			<br />
			<div class="hint">
				<span>Show hint 1</span>
				<input type="checkbox" name="hint2" id="hint2" bind:checked={showHint2} />
				<span class:visible={showHint2} class="isHint"
					>The decoded second word "ANL" could be "AND" or "ANY". Let's explore "AND". This means
					that the positions in the Decode Key that correspond to the letters "L" and "D" may be
					incorrect. Swap these in the Decode Key by first clicking on the symbol in the Decode Key
					that maps to the letter "L" in the Text Key, and then the symbol that maps to the letter
					"D" in Text Key.</span
				>
			</div>

			<div class="text-container">
				<button
					class="general-button"
					disabled={!cipherObj.messageEncrypted}
					on:click={() => {
						decodeMessage();
					}}>Start decoding</button
				>
				<br />
				<LetterBoxes
					bind:letters={cipherObj.textKey}
					bind:swapInfo
					letterHead="Text key"
					lettersType="plaintext"
					draggable={false}
					showLetters={cipherObj.messageDecoded}
				/>
				<LetterBoxes
					bind:letters={cipherObj.decodeKey}
					swapInfo={{}}
					letterHead="Decode key"
					lettersType="decode"
					draggable={true}
					showLetters={cipherObj.messageDecoded}
				/>

				<div class="decoded-container" style="min-height:15em">
					<p class="decoded-header header-text">Decoded message</p>

					{#key cipherObj.decodeKey}
						{#if cipherObj.messageEncrypted}
							<p
								class="decoded-message message-text message-box {showFullDecodedText
									? 'decodedShown'
									: 'decodedHidden'}"
							>
								{cipherObj.decodedtext}
							</p>
						{/if}
					{/key}
					<GeneralButton
						disabledFlag={!cipherObj.messageDecoded}
						buttonFunction={() => (showFullDecodedText = !showFullDecodedText)}
						heading="Show {showFullDecodedText ? 'less' : 'more'}"
					/>
				</div>
			</div>

			<div class="references">
				<p>References:</p>
				<ol>
					<li>
						Al-Kadit, I. A. (n.d.). ORIGINS OF CRYPTOLOGY: THE ARAB CONTRIBUTIONS. <i
							>Cryptologia, 16(2),</i
						> 97–126. https://doi.org/10.1080/0161-119291866801.
					</li>
					<li>
						Al-Tayeb, T. (2003, June 9). <i>Al-Kindi, Cryptography, Code Breaking and Ciphers.</i> Muslim
						Heritage. Retrieved September 20, 2023, from https://muslimheritage.com/al-kindi-cryptography/
					</li>
					<li>
						Brewster, T. (2015, September 3). <i
							>How A 1200-Year-Old Hacking Technique Can Already Crack Tomorrow’s Encrypted Vaults.</i
						> Forbes. Retrieved October 5, 2023, from https://www.forbes.com/sites/thomasbrewster/2015/09/03/microsoft-dumb-attacks-cracks-next-gen-cryptography/?sh=55b84c1a5b55
					</li>
					<li>
						Maidment, J. (2000, October 5). <i>The man who cracked the Kama Sutra code.</i> The Telegraph.
						Retrieved September 24, 2023, from https://www.telegraph.co.uk/news/science/science-news/4754214/The-man-who-cracked-the-Kama-Sutra-code.html
					</li>
					<li>
						Naveed, M., Kamara, S., and Wright, C.V., (2015). Inference Attacks on
						Property-Preserving Encrypted Databases. In <i
							>Proceedings of the 22nd ACM SIGSAC Conference on Computer and Communications Security
							(CCS '15).</i
						> Association for Computing Machinery, New York, NY, USA, 644–655. https://doi-org.ezp.sub.su.se/10.1145/2810103.2813651
					</li>

					<li>
						Singh, S. (2000). <i>The code book : the secret history of codes and codebreaking.</i> http://ci.nii.ac.jp/ncid/BA51150503
					</li>
				</ol>
			</div>
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
	@media (max-width: 1000px) {
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
	}
</style>
