<script>
	export let data;

	// import Layout from '../../+layout.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import '$lib/styles/blog.css';
	import { postList } from '$lib/json/stores';
	import PostsListCard from '$lib/components/posts-list-card.svelte';
	import SidebarTags from '$lib/components/sidebar-tags.svelte';
	import TopicListCard from '$lib/components/topic-list-card.svelte';
	import ShowPicture from '$lib/components/show-picture.svelte';
	import TimeBox from '$lib/components/time-box.svelte';

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

	const tags = ['my-post', 'data-literacy', 'AI-literacy', 'AI'];
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
			<pre-title>What is Artificial Intelligence?</pre-title>
			<h1>1. The Origins of the Term</h1>
		</div>
		<div class="meta-info">
			<p class="author">Asif Salam</p>
			<p class="date">Posted: 2023-11-15</p>
			<TopicListCard {tags} size={3} tagType={'light-tag'} />
		</div>
		<br />
		<div class="main-content">
			<p>
				<a href="https://arxiv.org/abs/2110.12773">
					<ShowPicture
						mediaType="image"
						mediaPath="/post_assets/0006/1-ai_framing_1.jpg"
						mediaCaption="Thiyagalingam et al. Scientific Machine Learning Benchmarks."
						mediaNumber="1"
						mediaWidth="50%"
					/></a
				>
				ChatGPT has catapulted Artificial Intelligence (AI) into the mainstream. However, the term "AI"
				is a loaded one, with a rich and complex history. The typical explanation provided when speaking about AI to a general audience, a couple of years ago, would involve a superficial review of machine learning in terms of supervised,
				unsupervised and reinforcement learning, moving on to the rise of deep learning, and then a discussion around applications such as churn prediction or predictive maintenance. There would be little formal discussion about AI itself, beyond the conceptual framing shown in the figures 1<sup
					id="ref-link-1"><a href="#ref1">[1]</a></sup
				>
				& 2<sup id="ref-link-2"><a href="#ref2">[2]</a></sup> below.
			</p>

			<p>
				<a href="https://www.nasa.gov/what-is-artificial-intelligence/">
					<ShowPicture
						mediaType="image"
						mediaPath="/post_assets/0006/2-ai_framing_2.png"
						mediaCaption="From the NASA website"
						mediaNumber="2"
						mediaWidth="60%"
					/></a
				>
				That simplistic view is no longer tenable. Managers and leaders should invest in learning about the capabilities of AI and the impact it will have on their organizations and competitiveness. But so should everyone else, as this will permeate all facets of our modern lives. The somewhat warranted hype is fueling a great influx of money into the field, with increasingly sophisticated models and capabilities being released almost every day. The race for market capture is on, with heavy investment, rapid development, and constant hype.  
				</p>
				<p>
				The genesis of the field, however, was characterized by a quest for fundamental understanding of the human mind. It was led by visionaries who, along with their technical brilliance, had thoughtful philosophical perspectives on these pursuits. This makes for fascinating history, with strong characters responsible for creating many of the building blocks of the digital world we live in today. We can start creating a richer, more detailed picture of AI, starting with its interesting modern origins with two distinct schools of thought. In subsequent posts we will look at other aspects.
			</p>

			<p>
				<ShowPicture
					mediaType="image"
					mediaPath="/post_assets/0006/2b-al-jazari_elephant_clock.png"
					mediaCaption="Al-Jazari Elephant Clock"
					mediaNumber="3"
					mediaWidth="50%"
				/>
				The desire to create artificial beings comes to us from antiquity, envisioned by the likes of
				Aristotle,<sup id="ref-link-3"><a href="#ref3">[3]</a></sup> al-Jazari,<sup id="ref-link-4"
					><a href="#ref4">[4]</a></sup
				> Leonardo Da Vinci,<sup id="ref-link-5"><a href="#ref5">[5]</a></sup> Thomas Hobbes<sup
					id="ref-link-6"><a href="#ref6">[6]</a></sup
				> among many, many others. Whether as amusement, plaything, curiosity, servant or tool extending
				human capabilities or providing some impossible power, the desire to play god, bringing to life
				inanimate objects, or to explore the limits of technology, we seem to be on the way to creating
				the thing we have long imagined. For better and for worse. That, though, is a digression for
				another time. For now, we will focus on its more recent origins and development as a discipline, and in  <a href="/blog/pages/2024-02-10-ai-p2-multifaceted-ai">the next part</a>, an overview of the various components that are part of the modern AI toolkit. 
			</p>

			<p>
				Let's start with some history for a perspective on the two main tracks along which
				artificial intelligence has developed.
			</p>
			<h2>The origins of AI</h2>
			<TimeBox year="1936">
				<ShowPicture
					mediaType="image"
					mediaPath="/post_assets/0006/1936-alan_turing_on_computable_numbers.png"
					mediaCaption="Alan Turing's On Computable Numbers"
					mediaNumber="4"
					mediaWidth="55%"
				/>

				<p>
					Alan Turing’s groundbreaking 1936 paper<sup id="ref-link-7"><a href="#ref7">[7]</a></sup>,
					which laid the foundations for modern computer science and paved the way for the digital
					age, is a good starting point. Turing, then at King’s College, University of Cambridge,
					developed the notion of “computability,” in the context of decimal numbers whose digits
					can be calculated using some kind of structured procedure
					<a href="https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf">(Figure 4)</a>.
				</p>
				<ShowPicture
					mediaType="image"
					mediaPath="/post_assets/0006/1936-alan_turing.png"
					mediaCaption="Alan Turing"
					mediaNumber="5"
					mediaWidth="30%"
				/>
				<p>
					Turing formalized this idea with the invention of the “automatic machine,” later known as
					a ”Turing machine” — a theoretical device that reads and writes symbols on an infinite
					tape according to a fixed set of rules. This device is theoretically able to implement any
					algorithm. All modern computers are considered “Turing complete”, which essentially means
					that they are Turing machines without the unlimited resources required by the theoretical
					device.
				</p>
			</TimeBox>
			<TimeBox year="1943">
				<ShowPicture
					mediaType="image"
					mediaPath="/post_assets/0006/1943-mcculloch_pitts.png"
					mediaCaption="Warren McCullogh and Walter Pitts"
					mediaNumber="6"
					mediaWidth="40%"
				/>
				<ShowPicture
					mediaType="image"
					mediaPath="/post_assets/0006/1943-mculloch-pitts-paper-intro.png"
					mediaCaption="McCullogh and Pitts - Paper extract"
					mediaNumber="7"
					mediaWidth="70%"
				/>

				<p>
					In 1943, Warren McCullogh, neurophysiologist and cybernetician at the University of
					Illinois at Chicago, and vagabond self-educated cognitive psychologist Walter Pitts
					published “A Logical Calculus of the Ideas Immanent in Nervous Activity.”<sup
						id="ref-link-8"><a href="#ref8">[8]</a></sup
					> In this paper, McCullogh and Pitts created the first mathematical model of the biological
					neural network.
				</p>

				<p>
					In 1939, Alan Hodgkin & Andrew Huxley inserted microelectrodes in squid nerve fiber and
					recorded action potential and neuronal firing. Santiago Ramón y Cajal had shown in 1888
					that neurons were discrete cells which communicate through synapses. This provided
					evidence of what was called “neuron theory”, the basis of modern neuroscience. McCullogh
					and Pitts combined ongoing work on neurons with earlier work on logic and boolean algebra,
					and Turing’s ideas on computation to create their model, showing that simple units of the
					neural network could produce computationally complex results.
				</p>
				<div class="grid-container">
					<div class="right-tall">
						<ShowPicture
							mediaType="image"
							mediaPath="/post_assets/0006/1943-mcculloch-pitts-paper-neuron-diagram.jpg"
							mediaCaption="Various types of neural nets"
							mediaNumber="10"
							mediaWidth="90%"
						/>
					</div>
					<div class="top-left">
						<ShowPicture
							mediaType="image"
							mediaPath="/post_assets/0006/1943-neuron3-wikipedia.svg"
							mediaCaption="Neuron and myelinated axon, with signal flow from inputs at dendrites to outputs at axon terminals"
							mediaNumber="8"
							mediaWidth="90%"
						/>
					</div>
					<div class="bottom-right">
						<ShowPicture
							mediaType="image"
							mediaPath="/post_assets/0006/1943-mcculloch-pitts-paper-truth-table.jpg"
							mediaCaption="Example truth table of a set of connections"
							mediaNumber="9"
							mediaWidth="90%"
						/>
					</div>
				</div>
				<div class="grid-container">
					<div class="grid-left">
						<ShowPicture
							mediaType="video"
							mediaPath="/post_assets/0006/warren_mcculloch_interview_1.mp4"
							mediaCaption="Warren McCullogh interviewed at home"
							mediaNumber=""
							mediaWidth="90%"
						/>
					</div>
					<div class="grid-right">
						<ShowPicture
							mediaType="video"
							mediaPath="/post_assets/0006/warren_mcculloch_interview_2.mp4"
							mediaCaption="Warren McCullogh interview on the Canadian Broadcasting Corporation (1969)"
							mediaNumber=""
							mediaWidth="90%"
						/>
					</div>
				</div>
			</TimeBox>
			<TimeBox year="1950">
				<ShowPicture
					mediaType="image"
					mediaPath="/post_assets/0006/1950-alan-turing-computing-machinery-and-intelligence.png"
					mediaCaption="Alan Turing"
					mediaNumber="11"
					mediaWidth="95%"
				/>
				<p>
					Alan Turing continued to develop his thinking on computing machinery, and in 1950,
					published the landmark paper “Computing Machinery and Intelligence”.<sup id="ref-link-9"
						><a href="#ref9">[9]</a></sup
					>
					In it he asked “Can machines think?” and reframed the question into a test he called the “imitation
					game.” This was later named the “Turing test” by his advisor. In the scenario Turing developed,
					an interrogator questions two responders in different rooms to determine which responder is
					a human and which is a machine. Turing was confident that machines would pass this test, and
					realized that machines would need the ability to learn rather than be programmed. He was generally
					optimistic about progress in this area, but he did seem to recognize the potential for harm
					as well.
				</p>
				<div />

				<ShowPicture
					mediaType="image"
					mediaPath="/post_assets/0006/1950b-intelligent_machinery_turing.png"
					mediaCaption="Alan Turing - Lecture notes, 1950"
					mediaNumber="12"
					mediaWidth="90%"
				/>
				<ShowPicture
					mediaType="image"
					mediaPath="/post_assets/0006/1950c-intelligent_machinery_turing.png"
					mediaCaption="Alan Turing - Lecture notes, 1950"
					mediaNumber="13"
					mediaWidth="90%"
				/>
				<ShowPicture
					mediaType="image"
					mediaPath="/post_assets/0006/1950d-intelligent_machinery_turing.png"
					mediaCaption="Alan Turing - Lecture notes, 1950"
					mediaNumber="14"
					mediaWidth="90%"
				/>
				<ShowPicture
					mediaType="image"
					mediaPath="/post_assets/0006/1950e-intelligent_machinery_turing.png"
					mediaCaption="Alan Turing - Lecture notes, 1950"
					mediaNumber="15"
					mediaWidth="90%"
				/>
				<p><br /></p>
				<p>
					Around the same time, Claude Shannon published "Programming a Computer for Playing Chess."<sup
						id="ref-link-11"><a href="#ref11">[11]</a></sup
					>
					The paper does not have any code. It is rather a theoretical exploration of what would be required
					to program a computer to play chess - scoring, functions, logic and so on. “The thesis we will
					develop is that modern general purpose computers can be used to play a tolerably good game
					of chess by the use of suitable computing routine or program’. While the approach given here
					is believed fundamentally sound, it will be evident that much further experimental and theoretical
					work remains to be done,” said Shannon.<sup id="ref-link-11"
						><a href="#ref11">[11]</a></sup
					> The paper inspired early development in game theory and AI research.
				</p>

				<ShowPicture
					mediaType="youtube"
					mediaWidth="95%"
					mediaCaption="Short documentary on Claude Shannon"
					youtubeSrc="https://www.youtube.com/embed/pHSRHi17RKM?si=6bECW2UbA7i2i6Zz"
				/>

				<p>
					The Shannon's work on Information Theory laid the foundations for the information age. He
					created a mathematical model of information which would be the basis for the modern
					information theory, defined information entropy as a measure of information content, and
					the term "bit", a shortening of "binary digit," as the smallest unit of information,
					representing a choice between two equally likely outcomes.
				</p>
			</TimeBox>
			<TimeBox year="1951">
				<a href="https://achievement.org/achiever/marvin-minsky-ph-d/">
					<ShowPicture
						mediaType="image"
						mediaPath="/post_assets/0006/1970-marvin-minsky-blocks-vision-robot-mit.jpg"
						mediaCaption="Marvin Minsky at MIT, 1968"
						mediaNumber="16"
						mediaWidth="90%"
					/></a
				>
				<ShowPicture
					mediaType="video"
					mediaPath="/post_assets/0006/marvin_minsky_interview_clip2.mp4"
					mediaCaption="Marvin Minsky interview in February 2008"
					mediaNumber=""
					mediaWidth="90%"
				/>

				<p>
					Inspired by the McCulloch & Pitt artificial neuron, Marvin Minsky and Dean Edmonds created
					the first artificial neural network machine in 1951. They used vacuum tubes to simulate a
					rat learning to navigate a maze. This was called the Stochastic Neural Analog
					Reinforcement Calculator, or SNARC.<sup id="ref-link-12"><a href="#ref12">[12]</a></sup>
					In an interview with Jeremy Bernstein<sup id="ref-link-13"><a href="#ref13">[13]</a></sup
					>, Minsky said, “I thought that if I could ever build such a machine I might get it to
					learn to run mazes through its electronics—like rats or something. I didn’t think that it
					would be very intelligent. I thought it would work pretty well with about forty neurons.
					Edmonds and I worked out some circuits so that—in principle, at least—we could realize
					each of these neurons with just six vacuum tubes and a motor.” The article explains that a
					“rat” would be created at some point in the network and would then set out to learn a path
					to some specified end point. First, it would proceed randomly, and then correct choices
					would be reinforced by making it easier for the machine to make this choice again—to
					increase the probability of its doing so. There was an arrangement of lights that allowed
					observers to follow the progress of the rat—or rats.
				</p>

				<ShowPicture
					mediaType="image"
					mediaPath="/post_assets/0006/1951-minsky-snarc.png"
					mediaCaption="SNARC - 1951, Marvin Minsky & Dean Edmonds"
					mediaNumber="17"
					mediaWidth="90%"
				/>
				<p class="quote-block">
					“The rats actually interacted with one another. If one of them found a good path, the
					others would tend to follow it.” <br />
					Marvin Minsky
				</p>
			</TimeBox>
			<TimeBox year="1956"
				><p>
					The Dartmouth Summer Research Project on Artificial Intelligence, organized in 1956 by
					John McCarthy, Claude Shannon, Nathaniel Rochester and Marvin Minsky, was a landmark event
					in the field.<sup id="ref-link-15"><a href="#ref15">[15]</a></sup> The workshop coined the
					term “Artificial Intelligence” bringing together most, but not all, of the major names
					associated with the area. As we have seen, there was already significant activity in the
					field. It has been suggested that a new name, “Artificial Intelligence” was chosen in
					order to exclude some practitioners, possibly Norbert Wiener, the assertive guru of
					cybernetics.
					<a href="https://www.klondike.ai/en/ai-history-the-dartmouth-conference/">
						<ShowPicture
							mediaType="image"
							mediaPath="/post_assets/0006/1956-dartmouth-conference-participants-1.png"
							mediaCaption="Participants of the Dartmouth Summer Research Project on Artificial Intelligence, 1956. Left to right: Oliver Selfridge, Nathaniel Rochester, Ray Solomonoff, Marvin Minsky, Trenchard More, John McCarthy, Claude Shannon"
							mediaNumber="18"
							mediaWidth="90%"
						/></a
					>
				</p>

				<p class="quote-block">
					The study is to proceed on the basis of the conjecture that every aspect of learning or
					any other feature of intelligence can in principle be so precisely described that a
					machine can be made to simulate it. <br />
				</p>
				<div class="grid-container">
					<div class="wide">
						<a href="http://jmc.stanford.edu/articles/dartmouth/dartmouth.pdf">
							<ShowPicture
								mediaType="image"
								mediaPath="/post_assets/0006/1956-proposal-paper-heading.png"
								mediaCaption="Proposal title"
								mediaNumber="19"
								mediaWidth="95%"
							/></a
						>
					</div>
					<div class="wide">
						<a href="http://jmc.stanford.edu/articles/dartmouth/dartmouth.pdf">
							<ShowPicture
								mediaType="image"
								mediaPath="/post_assets/0006/1956-proposal-idea.png"
								mediaCaption="Proposal title"
								mediaNumber="20"
								mediaWidth="95%"
							/></a
						>
					</div>
				</div>
				<div class="grid-container">
					<div class="top-left">
						<a href="http://jmc.stanford.edu/articles/dartmouth/dartmouth.pdf">
							<ShowPicture
								mediaType="image"
								mediaPath="/post_assets/0006/1956-proposal-authors.png"
								mediaCaption="Proposal title"
								mediaNumber="21"
								mediaWidth="90%"
							/></a
						>
					</div>

					<div class="top-right">
						<a href="http://jmc.stanford.edu/articles/dartmouth/dartmouth.pdf">
							<ShowPicture
								mediaType="image"
								mediaPath="/post_assets/0006/1956-workshop-expense-estimate.png"
								mediaCaption="Proposal title"
								mediaNumber="22"
								mediaWidth="90%"
							/></a
						>
					</div>
				</div>

				<p>This conjecture is still quite a good description of Artificial intelligence.</p>
				<p style="margin:0">Among the topics covered in the workshop were:</p>
				<ul>
					<li>Programming a computer to use language, or NLP</li>
					<li>Neuron nets, or neural networks</li>
					<li>Theory of the size of a calculation, or theory of computation</li>
					<li>Self-improvement, or machine learning</li>
					<li>Abstraction</li>
					<li>Randomness & creativity</li>
				</ul>
				<p>
					Nothing major was achieved during the workshop, but it was the event that launched
					Artificial Intelligence as a distinct discipline. And the topics are key capabilities for
					AI today.
				</p>
				<p>
					During the workshop, Allen Newell, Herbert Simon and Cliff Shaw had presented “The Logic
					Theory Machine - A Complex Information Processing System,”<sup id="ref-link-16"
						><a href="#ref16">[16]</a></sup
					>
					something they had been working on for some time. Herbert Simon had told a group students that
					he and Newell had “invented a thinking machine”. This “machine”, actually a program, used propositional
					logic to prove theorems. "LT was based on the system of Principia mathematica,<sup
						id="ref-link-20"><a href="#ref20">[20]</a></sup
					>
					largely because a copy of that work happened to sit in my bookshelf. There was no intention
					of making a contribution to symbolic logic, and the system of Principia was sufficiently outmoded
					by that time as to be inappropriate for that purpose. For us, the important consideration was
					not the precise task, but its suitability for demonstrating that a computer could discover
					problem solutions in a complex nonnumerical domain by heuristic search that used humanoid heuristics"
					<sup id="ref-link-17"><a href="#ref17">[17]</a></sup>. Their program managed to solve 38
					of the 52 theorems in Chapter 2 of <i>Principia Mathematica</i>, including a proof that
					was more elegant than created by Russell. Russell was apparently delighted when informed.
				</p>

				<a href="http://shelf1.library.cmu.edu/IMLS/MindModels/humanandmachine.html">
					<ShowPicture
						mediaType="image"
						mediaPath="/post_assets/0006/1956-simon-newell-1964.jpg"
						mediaCaption="Allen Newell (left) andHerbert Simon, c. 1964"
						mediaNumber="23"
						mediaWidth="40%"
					/></a
				>

				<p>
					According to Pamela McCorduk, the Logic theorist was “proof positive that a machine could
					perform tasks heretofore considered intelligent, creative and uniquely human.”<sup
						id="ref-link-18"><a href="#ref18">[18]</a></sup
					>
					But their presentation at the workshop did not arouse much interest. According to Simon, “They
					didn't want to hear from us, and we sure didn't want to hear from them: we had something to
					show them! ... In a way it was ironic because we already had done the first example of what
					they were after; and second, they didn't pay much attention to it."<sup id="ref-link-19"
						><a href="#ref19">[19]</a></sup
					>
					<a href="1956-russell-whitehead-principia-mathematica.jpg">
						<ShowPicture
							mediaType="image"
							mediaPath="/post_assets/0006/1956-russell-whitehead-principia-mathematica.jpg"
							mediaCaption="Cover of Principia Mathematica, 1956 (by Nick Dillinger)"
							mediaNumber="24"
							mediaWidth="40%"
						/></a
					>
				</p>
				<a href="https://en.wikipedia.org/wiki/Symbolic_artificial_intelligence" />
				<p>
					The Principia Mathematica,<sup id="ref-link-20"><a href="#ref20">[20]</a></sup> a
					foundational text by Alfred Whitehead and Bertrand Russell, uses symbolic logic to create
					a framework to establish mathematical concepts and prove theorems. The Logic Theorist was
					one of the first artificial intelligence programs to use symbolic logic, pioneering the
					<a href="https://en.wikipedia.org/wiki/Symbolic_artificial_intelligence"
						><strong>Symbolic approach to AI,</strong></a
					>
					the idea that human intelligence is based on the explicit manipulation of symbols and rules
					that represent objects, concepts and relationships in the real world. Thinking and reasoning
					involve combining symbols and rules in novel ways to develop complex ideas.
				</p>
				<br />
				<p>Herber Simon explains his theories and symbol manipulation in the video below.</p>
				<div class="grid-container">
					<div class="grid-left">
						<ShowPicture
							mediaType="video"
							mediaPath="/post_assets/0006/john_mccarthy_ai_thinking_aloud_clip.mp4"
							mediaCaption="John McCarthy interview by John Mishlove"
							mediaNumber=""
							mediaWidth="90%"
						/>
					</div>
					<div class="grid-right">
						<ShowPicture
							mediaType="video"
							mediaPath="/post_assets/0006/herbert_simon_gustavus_adolphus_college.mp4"
							mediaCaption="Herbert Simon lecture at Gustavus Adolphus College "
							mediaNumber=""
							mediaWidth="90%"
						/>
					</div>
				</div>
			</TimeBox>
			<TimeBox year="1958">
				<p>
					<ShowPicture
						mediaType="image"
						mediaPath="/post_assets/0006/1958-frank-rosenblatt.jpg"
						mediaCaption="Frank Rosenblatt, c. 1956"
						mediaNumber="25"
						mediaWidth="30%"
					/>

					The other
					<a href="https://en.wikipedia.org/wiki/Connectionism"
						><strong>“connectionist” approach to artificial intelligence</strong></a
					>, is based on Donald Hebb’s theory from his 1949 paper “The Organization of Behaviour,”
					which postulated that when neurons repeatedly fire together their synaptic strength
					increases, or perhaps a little more memorably, “neurons that fire together wire together.”
					The idea is that the information is in the synaptic connections. Based on this theory,
					ongoing research on the brain and theories about memory and recall, Frank Rosenblatt
					invented what he called “the Perceptron”<sup id="ref-link-21"
						><a href="#ref21">[21]</a></sup
					> in 1958. He used the McCulloch-Pitts model of the neuron as the basis of his implementation
					of “a hypothetical nervous system.”
				</p>
				<div class="grid-container">
					<div class="wide">
						<ShowPicture
							mediaType="image"
							mediaPath="/post_assets/0006/1958-the-perceptron-paper.png"
							mediaCaption="The Perceptron paper, 1958, Frank Rosenblatt"
							mediaNumber="26"
							mediaWidth="90%"
						/>
					</div>
				</div>
				<p>
					Frank Rosenblatt invented what he called the Perceptron, “a hypothetical nervous system”
					that could learn from experience, in 1958, based on this concept. He used the McCulloch &
					Pitts model of the neuron as the basis of his design.
				</p>
				<div class="grid-container">
					<div class="top-left">
						<ShowPicture
							mediaType="image"
							mediaPath="/post_assets/0006/1958-perceptron-connectionist-position.png"
							mediaCaption="The connectionist position in the Perceptron paper"
							mediaNumber="27"
							mediaWidth="90%"
						/>
					</div>
					<div class="top-right">
						<ShowPicture
							mediaType="image"
							mediaPath="/post_assets/0006/1958-the-perceptron.png"
							mediaCaption="The Perceptron - definition"
							mediaNumber="28"
							mediaWidth="90%"
						/>
					</div>
				</div>
				<p class="quote-block">
					“Stories about the creation of machines having human qualities have long been a
					fascinating province in the realm of science fiction. Yet we are about to witness the
					birth of such a machine – a machine capable of perceiving, recognizing and identifying its
					surroundings without any human training or control.” <br />
					<cite>Frank Rosenblatt, 1958.<sup id="ref-link-22"><a href="#ref22">[22]</a></sup></cite>
				</p>
				<div class="grid-container">
					<div class="grid-left">
						<a
							href="https://news.cornell.edu/stories/2019/09/professors-perceptron-paved-way-ai-60-years-too-soon"
						>
							<ShowPicture
								mediaType="image"
								mediaPath="/post_assets/0006/1958-rosenblatt-perceptron-setup.png"
								mediaCaption="The Perceptron - design"
								mediaNumber="29"
								mediaWidth="90%"
							/></a
						>
					</div>
					<div class="grid-right">
						<a
							href="https://news.cornell.edu/stories/2019/09/professors-perceptron-paved-way-ai-60-years-too-soon"
						>
							<ShowPicture
								mediaType="image"
								mediaPath="/post_assets/0006/1958-rosenblatt-perceptron-machine.jpg"
								mediaCaption="The Perceptron Machine"
								mediaNumber="30"
								mediaWidth="90%"
							/></a
						>
					</div>

					<div class="grid-left">
						<a
							href="https://news.cornell.edu/stories/2019/09/professors-perceptron-paved-way-ai-60-years-too-soon"
						>
							<ShowPicture
								mediaType="image"
								mediaPath="/post_assets/0006/1958-rosenblatt-perceptron-adjustment.png"
								mediaCaption="The Perceptron - adjusting the sensors"
								mediaNumber="31"
								mediaWidth="90%"
							/></a
						>
					</div>

					<div class="grid-right">
						<a
							href="https://news.cornell.edu/stories/2019/09/professors-perceptron-paved-way-ai-60-years-too-soon"
						>
							<ShowPicture
								mediaType="image"
								mediaPath="/post_assets/0006/1958-rosenblatt-perceptron-viewing.png"
								mediaCaption="The Perceptron - admiring the construction"
								mediaNumber="32"
								mediaWidth="90%"
							/></a
						>
					</div>
					<div class="wide">
						<a
							href="https://news.cornell.edu/stories/2019/09/professors-perceptron-paved-way-ai-60-years-too-soon"
						>
							<ShowPicture
								mediaType="image"
								mediaPath="/post_assets/0006/1958-rosenblatt-perceptron-adjustment-2.jpg"
								mediaCaption="The Perceptron - troubleshooting"
								mediaNumber="33"
								mediaWidth="95%"
							/></a
						>
					</div>
				</div>
				<p>
					The Perceptron simulated the human visual system, using a model for how the brain
					processes visual input. It was designed to identify visual patterns. The sensory units
					(S-units) received light from a photoelectric cell, which were converted to binary signals
					sent to the Association Units, or A-units based on the McCulloch-Pitts neurons. If the
					input signal passed a threshold, it would send a signal to the Response Units (R-units),
					which were lights that an operator could check for correctness. The operator would adjust
					weights based on the accuracy of the response. Over time, the machine would learn to
					correctly identify a given pattern. This type of “supervised” training forms the basis of
					much of modern artificial intelligence.
				</p>
				<p class="quote-block">
					Mr. Rosenblatt said in principle it would be possible to build brains that could reproduce
					themselves on an assembly line and which would be conscious of their existence.<br />
					<cite
						>New York Times article, July 13, 1958.<sup id="ref-link-24"
							><a href="#ref24">[24]</a></sup
						></cite
					>
				</p>

				<p>
					Rosenblatt was not averse to making a name for himself. He give interviews and wrote about
					his great invention and made bold claims about the potential of his inventions. However,
					various perceived limitations of the design, and rather underwhelming results led to a
					backlash, causing funding for neural network research to dry up for many years, causing
					what is known as the "AI winter."
				</p>
				<div class="grid-container">
					<div class="grid-left">
						<a
							href="https://www.nytimes.com/1958/07/13/archives/electronic-brain-teaches-itself.html"
						>
							<ShowPicture
								mediaType="image"
								mediaPath="/post_assets/0006/1958-perceptron-nyt-article.png"
								mediaCaption="New York Times article on the Perceptron"
								mediaNumber="34"
								mediaWidth="90%"
							/></a
						>
					</div>
					<div class="grid-right">
						<aflatpak install flathub org.mozilla.firefox
							href="https://news.cornell.edu/stories/2019/09/professors-perceptron-paved-way-ai-60-years-too-soon"
						>
							<ShowPicture
								mediaType="image"
								mediaPath="/post_assets/0006/1958-perceptron-rosenblatt-article.jpg"
								mediaCaption="The Perceptron Machine"
								mediaNumber="35"
								mediaWidth="90%"
							/></aflatpak
						>
					</div>
				</div>
				<ShowPicture
					mediaType="youtube"
					mediaWidth="95%"
					mediaCaption="Short documentary on the Perceptron"
					youtubeSrc="https://www.youtube.com/embed/Suevq-kZdIw?si=yTjO09bwHQK3y3PN&amp;start=90"
				/>
				<!-- 				
				<iframe
					width="560"
					height="315"
					src="https://www.youtube.com/embed/Suevq-kZdIw?si=yTjO09bwHQK3y3PN&amp;start=90"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				/> -->
			</TimeBox>
			<p>This was a period of excitement, and the possibilities seemed endless, success guaranteed, although there was unease about the consequence of this success.</p>

			<p class="quote-block">The old idea that Man invented tools is...a misleading half-truth; it would be more accurate to say that tools <em>invented Man.</em> They wre primitive tools... yet they led to us-and tho the eventual extinction of the apeman who first wielded then...The tools the apeman invented caused them to evolve into their successor, <em>Homo Sapiens.</em> The tool we have invented is our successor. Biological evolution has given way to a far more rapid process-technological evolution. To put it bluntly and brutally, the machine is going to take over.<br />
					<cite
						>Forbes, April 01, 2028.<sup id="ref-link-25"
							><a href="#ref25">[25]</a></sup
						></cite
					></p>
			<h2>More than Symbolic and Connectionist</h2>
			<p>
				We thus have two approaches to the development of AI, based on two somewhat opposing
				theories of human intelligence. The symbolic approach, in which intelligence is the
				manipulation of abstract symbols and rules. This means that we have to be able to represent
				knowledge, before we can start learning from experience, and this ability must be innate to
				us. In the connectionist approach, intelligence is the development of the synaptic
				connections in the brain and their strengths, which we develop as we experience the world.
				In other words, we build general purpose AI either through encoding an large set of rules
				that help it make sense of the world, or let the AI learn the rules from large volumes of
				data.
			</p>

			<p>
				The two approaches to AI have evolved at a rapid pace, along with other techniques, over the
				last 70 years. However, the work done during these early years established the vision,
				foundations and trajectory along which along which AI and computer science has developed.
			</p>
			<p>
				At the moment, the Connectionists appear to be racing ahead, while the Symbolists seem to be
				receding into the distance. But there is growing recognition of the limitations of a purely
				Connectionist approach. While deep learning has achieved remarkable success, the lack of
				explainability, the need for massive amounts of data and computing power point to the need
				for an approach that incorporates the structured knowledge and logical reasoning of Symbolic
				AI. 
			</p>
			<h2>Next in this series</h2>
			<p>
				In Part 2 <del>(coming soon)</del> we take a cursory look at the broad range of components and techniques that
				are part of the modern AI landscape, and attempt to organize these into a coherent framework around Symbolic AI, Connectionist AI, and a supplementary "Other" category.
				</p>
				<p>While progress transcends definitions, they are useful for context and framing, so Part 3 will be a list of the various definitions of the term AI from a broad range of sources. The debate around the definitions of AGI, AI, intelligence, and reasoning will continue, but it is still useful to see how the definitions evolve as new capabilities are developed and the impacts of the benefits and risks become visible.
			</p>

			<div class="references">
				<p>References:</p>
				<ol class="references-1">
					<li id="ref1">
						Thiyagalingam, J., Shankar, M., Fox, G. C., &amp; Hey, T. (2021). <em
							>Scientific machine learning benchmarks</em
						>
						[Preprint]. arXiv.
						<a href="https://doi.org/10.48550/arXiv.2110.12773"
							>https://doi.org/10.48550/arXiv.2110.12773</a
						>
					</li>

					<li id="ref2">
						NASA. (n.d.). <i>What is artificial intelligence?</i>,
						<a href="https://www.nasa.gov/what-is-artificial-intelligence" target="_blank"
							>https://www.nasa.gov/what-is-artificial-intelligence</a
						>
					</li>

					<li id="ref3">
						Aristotle. (350 B.C.E./1998). <em>Politics</em> (C. D. C. Reeve, Trans.) [Book 1].
						Hackett Publishing Company. (Original work published ca. 350 B.C.E.), from
						<a href="http://classics.mit.edu/Aristotle/politics.1.one.html" target="_blank"
							>http://classics.mit.edu/Aristotle/politics.1.one.html</a
						>
					</li>
					<li id="ref3">
						Manual, M. (2019, October 15). <em
							>Leonardo da Vinci's robots and their modern day influence</em
						>. Art Publika Mag. from
						<a
							href="https://www.artpublikamag.com/post/leonardo-da-vincis-robots-and-their-modern-day-influence"
							>Article</a
						>
					</li>
					<li id="ref5">
						Vučković, A. (2020, December 13). <em
							>Ismail al-Jazari: Medieval Muslim Inventor and "Father of Robotics"</em
						>. Ancient Origins. from
						<a href="https://www.ancient-origins.net/history-famous-people/ismail-al-jazari-0014667"
							>Article</a
						>
					</li>

					<li id="ref6">
						Bush, R. (2023).. <em
							>Sir Francis Bacon and Thomas Hobbes: Science, politics, and artificial intelligence"</em
						>. Ancient Origins. from
						<a href="https://doi.org/10.13140/RG.2.2.32734.61767"
							>https://doi.org/10.13140/RG.2.2.32734.61767</a
						>
					</li>

					<li id="ref7">
						Turing, A. M. (1936). An computable numbers, with an application to the
						Entscheidungsproblem. <i>Proceedings of the London Mathematical Society</i>(42),
						230-265.
						<a href="https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf" target="_blank"
							>PDF</a
						>
					</li>
					<li id="ref8">
						McCulloch, W. S., & Pitts, W. (1943). A logical calculus of the ideas immanent in
						nervous activity. <i>Bulletin of Mathematical Biophysics, 5</i>(4), 115–133.
						<a
							href="https://home.csulb.edu/~cwallis/382/readings/482/mccolloch.logical.calculus.ideas.1943.pdf"
							target="_blank">PDF</a
						>
					</li>

					<li id="ref9">
						Turing, A. M. (1950). Computing machinery and intelligence. <i>Mind, 59</i>(236),
						433–460.
						<a
							href="https://www.cs.mcgill.ca/~dprecup/courses/AI/Materials/turing1950.pdf"
							target="_blank">PDF</a
						>
					</li>

					<li id="ref10">
						Turing, A. M. (1951). Intelligent machinery, a heretical theory [Lecture notes].
						<i>Turing Archive.</i>
						<a
							href="https://turingarchive.kings.cam.ac.uk/publications-lectures-and-talks-amtb/amt-b-4"
							target="_blank"
							>https://turingarchive.kings.cam.ac.uk/publications-lectures-and-talks-amtb/amt-b-4</a
						>
					</li>

					<li id="ref11">
						Shannon, C. E. (1950). Programming a computer for playing chess. <i
							>Philosophical Magazine, 41</i
						>(314), 256–275.
						<a
							href="https://vision.unipv.it/IA1/ProgrammingaComputerforPlayingChess.pdf"
							target="_blank">PDF</a
						>
					</li>

					<!-- <li id="ref12">
						Turing, A. M. (1936). On computable numbers with an application to the
						Entscheidungsproblem. <i>Proceedings of the London Mathematical Society, s2-42</i>(1),
						230–265.
						<a href="https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf" target="_blank"
							>PDF</a
						>
					</li> -->

					<li id="ref12">
						Stochastic neural analog reinforcement calculator. (n.d.). In Wikipedia. Retrieved
						December 27, 2023, from
						<a
							href="https://en.wikipedia.org/wiki/Stochastic_Neural_Analog_Reinforcement_Calculator"
							target="_blank"
							>https://en.wikipedia.org/wiki/Stochastic_Neural_Analog_Reinforcement_Calculator</a
						>
					</li>

					<li id="ref13">
						Hertzberg, H. (1981, December 14). A.I. <i>The New Yorker</i>.
						<a href="https://www.newyorker.com/magazine/1981/12/14/a-i" target="_blank"
							>https://www.newyorker.com/magazine/1981/12/14/a-i</a
						>
					</li>

					<li id="ref14">
						Samuel, A. L. (1959). Some studies in machine learning using the game of checkers. <i
							>IBM Journal of Research and Development, 3</i
						>(3), 210–229.
						<a href="https://people.csail.mit.edu/brooks/idocs/Samuel.pdf" target="_blank">PDF</a>
					</li>

					<li id="ref15">
						McCarthy, J., Minsky, M. L., Rochester, N., & Shannon, C. E. (1955, August 31). <i
							>A proposal for the Dartmouth Summer Research Project on Artificial Intelligence</i
						>.
						<a href="https://archive.computerhistory.org/resources/access/text/2023/06/102720392-05-01-acc.pdf" target="_blank">PDF</a>
						
					</li>

					<li id="ref16">
						Newell, A., & Simon, H. A. (1956). The logic theory machine. <i
							>IRE Transactions on Information Theory, 2</i
						>(3), 61–79.
						<a
							href="http://shelf1.library.cmu.edu/IMLS/MindModels/logictheorymachine.pdf"
							target="_blank">PDF</a
						>
					</li>

					<li id="ref17">
						Allen Newell: 1927-1992. (1998). Annals of the History of Computing 20.
						<i>Annals of the History of Computing</i> (20) p68.
						<a
							href="https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=667311"
							target="_blank">PDF</a
						>
					</li>

					<li id="ref18">
						Logic theorist. (n.d.). In Wikipedia. Retrieved December 27, 2023, from
						<a href="https://en.wikipedia.org/wiki/Logic_Theorist" target="_blank"
							>https://en.wikipedia.org/wiki/Logic_Theorist</a
						>
					</li>

					<li id="ref19">
						Sloat, S. (2023, October 3). The first AI started a 70-year debate. <i
							>Popular Science</i
						>.
					</li>

					<li id="ref20">
						Wikipedia contributors. (n.d.). <em>Principia Mathematica</em>. In
						<em>Wikipedia, The Free Encyclopedia</em>. Retrieved March 8, 2025, from
						<a href="https://en.wikipedia.org/wiki/Principia_Mathematica"
							>https://en.wikipedia.org/wiki/Principia_Mathematica</a
						>
					</li>

					<li id="ref21">
						Rosenblatt, F. (1958). The perceptron: A probabilistic model for information storage and
						organization in the brain. <i>Psychological Review, 65</i>(6), 386–408.
						<a href="https://www.ling.upenn.edu/courses/cogs501/Rosenblatt1958.pdf" target="_blank"
							>PDF</a
						>
					</li>

					<li id="ref22">
						Lefkowitz, M. (2019, September 25). Professor’s perceptron paved the way for AI – 60
						years too soon. <i>Cornell Chronicle</i>.
						<a
							href="https://news.cornell.edu/stories/2019/09/professors-perceptron-paved-way-ai-60-years-too-soon"
							target="_blank"
							>https://news.cornell.edu/stories/2019/09/professors-perceptron-paved-way-ai-60-years-too-soon</a
						>
					</li>

					<li id="ref23">
						Serious Science. (2019, October 22). <i
							>The man who forever changed artificial intelligence</i
						>
						[Video]. YouTube.
						<a href="https://www.youtube.com/watch?v=Suevq-kZdIw" target="_blank"
							>https://www.youtube.com/watch?v=Suevq-kZdIw</a
						>
					</li>
					<li id="ref24">
						The New York Times. (1958, July 13). Electronic brain teaches itself. <i
							>The New York Times.</i
						>
						Retrieved from
						<a
							href="https://www.nytimes.com/1958/07/13/archives/electronic-brain-teaches-itself.html"
							>https://www.nytimes.com/1958/07/13/archives/electronic-brain-teaches-itself.html</a
						>
					</li>
					<li id="ref25">
						Gil Press (2018, April 1). Killer AI Defeated, Celebrated For Half A Century<i
							>Forbes.</i
						>
						Retrieved from
						<a
							href="https://www.nytimes.com/1958/07/13/archives/electronic-brain-teaches-itself.html"
							>https://www.nytimes.com/1958/07/13/archives/electronic-brain-teaches-itself.html</a
						>
					</li>
				</ol>
			</div>
		</div>
	</div>
{/key}

<style>
	.grid-container {
		display: grid;
		/* Two columns, two rows */
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto auto;
		/* No padding, margins, borders, or colors */
	}

	/* Top-left image */
	.top-left {
		grid-column: 1;
		grid-row: 1;
	}
	.top-right {
		grid-column: 2;
		grid-row: 1;
	}
	.grid-left {
		grid-column: 1;
	}
	.grid-right {
		grid-column: 2;
	}

	/* Tall image spanning both rows in the right column */
	.right-tall {
		grid-column: 2;
		grid-row: 1 / 3; /* from row 1 through row 2 */
	}
	.wide {
		grid-column: 1 / 3;
		display: grid;
		place-items: center;
	}

	/* Bottom-left image */
	.bottom-left {
		grid-column: 1;
		grid-row: 2;
	}

	/* Make images fill their cells (optional) */
	.grid-container img {
		width: 100%;
		height: auto;
		display: block;
	}

	.caption {
		margin: 0;
		padding-left: 5px;
		font-size: 0.9rem;
		text-decoration: none;
		/* width: 70%; */
	}
	.heading {
		margin-top: 20px;
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

	sup {
		font-family: 'DM sans', Arial, Helvetica, sans-serif;
		font-style: normal;
	}
	sup :is(a) {
		font-size: 0.9em;
	}
	text {
		font-family: Arial, sans-serif;
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

	p.quote-block {
		font-family: 'KoHO','Crete Round', 'Lancelot', 'Cherry Swash', 'Noto Serif Thai', 'Delius', Georgia,
			'Times New Roman', Times, serif;
		padding: 5px 0 15px 0;
		border-top: 3px solid rgba(177, 37, 177, 0.2);
		border-bottom: 3px solid rgb(177, 37, 177, 0.2);
		font-size: 1.1em;
		display: inline-block;
		font-style:normal;
	}
	
	em {
		font-family: 'KoHo';
		
		font-style: italic;
	}
	figure {
		margin: 0; /* Removes default margin */
		text-align: center; /* Centers the image and caption */
	}

	figcaption {
		font-style: italic;
		color: #555;
		margin-top: 8px; /* Adds space between the image and caption */
	}
	.references {
		border-top: 2px #8aa9a9 dashed;
	}

	.references :is(p, li) {
		font-size: 1.1em;
	}

	.references :is(a) {
		font-size: 0.9em;
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


	}

</style>
