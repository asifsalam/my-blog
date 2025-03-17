<script>
	let sortColumn = 'source';
	let sortDirection = 'asc';

	let aiDefinitions = [
		{
			source: 'John McCarthy et al.',
			date: '1956',
			definition:
				'The conjecture that every aspect of learning or any other feature of intelligence can in principle be so precisely described that a machine can be made to simulate it.',
			category: 'Academia',
			link: 'https://archive.computerhistory.org/resources/access/text/2023/06/102720392-05-01-acc.pdf',
			checked: 'yes'
		},

		{
			source: 'MIT (CSAIL)',
			date: 'Undated',
			definition:
				'Artificial intelligence is the ability for computers to imitate cognitive human functions such as learning and problem-solving.',
			category: 'Academic',
			link: 'https://professionalprograms.mit.edu/blog/technology/machine-learning-vs-artificial-intelligence/#:~:text=What%20is%20Artificial%20Intelligence%3F',
			checked: 'yes'
		},
		{
			source: 'Stanford University',
			date: '2017',
			definition:
				'The science of making machines capable of performing tasks that typically require human intelligence, including visual perception, speech recognition, and language translation.',
			category: 'Academic',
			link: 'https://www-formal.stanford.edu/jmc/whatisai.pdf#:~:text=1%20Basic%20Questions%20Q,methods%20that%20are%20biologically%20observable',
			checked: 'yes'
		},
		{
			source: 'University of Oxford',
			date: 'Undated',
			definition:
				'The capacity of computers or other machines to exhibit or simulate intelligent behaviour; the field of study concerned with this. ',
			category: 'Academic',
			link: 'https://www.conted.ox.ac.uk/courses/introduction-to-artificial-intelligence-online#:~:text=artificial%20intelligence%2C%C2%A0n',
			checked: 'yes'
		},
		{
			source: 'Harvard University',
			date: '2023',
			definition:
				'Artificial Intelligence (AI) An umbrella term for any theory, computer system, or software that is developed to allow machines to perform tasks that normally require human intelligence. The virtual assistant software on your smartphone is an example of artificial intelligence.',
			category: 'Academic',
			link: 'https://www.harvardonline.harvard.edu/blog/benefits-limitations-generative-ai#:~:text=generating%20text%2C%20images%2C%20or%20other,ChatGPT%20is%20a%20chatbot%20developed',
			checked: 'yes'
		},
		{
			source: 'Carnegie Mellon University',
			date: '2023',
			definition:
				'AI refers to the ability of machines and computers to perform tasks that would normally require human intelligence. These tasks include things like recognizing patterns and making predictions. Ultimately, that’s not magic; it’s math.',
			category: 'Academic',
			link: 'https://www.heinz.cmu.edu/media/2023/July/artificial-intelligence-explained#:~:text=AI%20refers%20to%20the%20ability,that%E2%80%99s%20not%20magic%3B%20it%E2%80%99s%20math',
			checked: 'yes'
		},
		{
			source: 'Google',
			date: 'Undated',
			definition:
				'Artificial intelligence (AI) is a set of technologies that enable computers to perform a variety of advanced functions, including the ability to see, understand and translate spoken and written language, analyze data, make recommendations, and more.',
			category: 'Technology Company',
			link: 'https://cloud.google.com/learn/what-is-artificial-intelligence?hl=en',
			checked: 'yes'
		},
		{
			source: 'Microsoft',
			date: 'Undated',
			definition:
				'It’s the capability of a computer system to mimic human-like cognitive functions such as learning and problem-solving.',
			category: 'Technology Company',
			link: 'hhttps://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-artificial-intelligence#:~:text=What%20is%20artificial%20intelligence%3F',
			checked: 'yes'
		},
		{
			source: 'Amazon',
			date: 'Undated',
			definition:
				'Artificial intelligence (AI) is a technology with human-like problem-solving capabilities. AI in action appears to simulate human intelligence—it can recognize images, write poems, and make data-based predictions.',
			category: 'Technology Company',
			link: 'https://aws.amazon.com/what-is/artificial-intelligence/',
			checked: 'yes'
		},
		{
			source: 'IBM',
			date: '2024',
			definition:
				'Artificial intelligence (AI) is technology that enables computers and machines to simulate human learning, comprehension, problem solving, decision making, creativity and autonomy.',
			category: 'Technology Company',
			link: 'https://www.ibm.com/think/topics/artificial-intelligence#:~:text=What%20is%20AI%3F',
			checked: 'yes'
		},
		{
			source: 'DeepMind',
			date: '2023',
			definition:
				'AI has the potential to be one of the most important and beneficial technologies ever invented. - Demis Hassbis',
			category: 'Technology Company',
			link: 'https://deepmind.google/about/',
			checked: 'no'
		},
		{
			source: 'McKinsey & Company',
			date: '2024',
			definition:
				'AI is a machine’s ability to perform the cognitive functions we associate with human minds, such as perceiving, reasoning, learning, interacting with the environment, problem-solving, and even exercising creativity. ',
			category: 'Consulting Firm',
			link: 'https://www.mckinsey.com/featured-insights/mckinsey-explainers/what-is-ai',
			checked: 'yes'
		},
		{
			source: 'Boston Consulting Group (BCG)',
			date: '2021',
			definition:
				'Tools that transform business operations by combining data, algorithms, and computational power to drive insights and autonomy.',
			category: 'Consulting Firm',
			link: 'https://www.bcg.com/',
			checked: 'no'
		},
		{
			source: 'Accenture',
			date: '2025',
			definition:
				'Artificial intelligence (AI) encompasses various technologies that enable machines to perform tasks typically requiring human intelligence, such as sensing, comprehending, acting and learning.',
			category: 'Consulting Firm',
			link: 'https://www.accenture.com/us-en/insights/generative-ai',
			checked: 'no'
		},
		{
			source: 'Gartner',
			date: '2021',
			definition:
				'Applying advanced analysis and logic-based techniques, including machine learning (ML), to interpret events, support and automate decisions, and take actions. ',
			category: 'Consulting Firm',
			link: 'https://www.gartner.com/en/topics/artificial-intelligence#:~:text=Gartner%20defines%20artificial%20intelligence%20,combining',
			checked: 'yes'
		},
		{
			source: 'Deloitte',
			date: '2022',
			definition:
				'A useful definition of artificial intelligence is the theory and development of computer systems able to perform tasks that normally require human intelligence.',
			category: 'Consulting Firm',
			link: 'https://www2.deloitte.com/content/dam/insights/us/articles/what-is-cognitive-technology/DUP_1030-Cognitive-Technologies_MASTER.pdf#:~:text=A%20useful%20definition%20of%20artificial,that%20normally%20require%20human%20intelligence',
			checked: 'yes'
		},
		{
			source: 'European Union (EU AI Act)',
			date: '2023',
			definition:
				'‘Artificial intelligence system’ (AI system) means software that is developed with one or more of the techniques and approaches listed in Annex I and can, for a given set of human-defined objectives, generate outputs such as content, predictions, recommendations, or decisions influencing the environments they interact with;',
			category: 'Government',
			link: 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:52021PC0206#:~:text=,the%20environments%20they%20interact%20with',
			checked: 'yes'
		},
		{
			source: 'U.S. National AI Initiative Act',
			date: '2021',
			definition:
				'The term “artificial intelligence” includes the following: Any artificial system that performs tasks under varying and unpredictable circumstances without significant human oversight, or that can learn from experience and improve performance when exposed to data sets; An artificial system developed in computer software, physical hardware, or other context that solves tasks requiring human-like perception, cognition, planning, learning, communication, or physical action; An artificial system designed to think or act like a human, including cognitive architectures and neural networks; A set of techniques, including machine learning, that is designed to approximate a cognitive task; An artificial system designed to act rationally, including an intelligent software agent or embodied robot that achieves goals using perception, planning, reasoning, learning, communicating, decision making, and acting.',
			category: 'Government',
			link: 'https://coe.gsa.gov/coe/ai-guide-for-government/print-all/index.html#:~:text=The%20term%20%E2%80%9Cartificial%20intelligence%E2%80%9D%20includes,the%20following',
			checked: 'yes'
		},
		{
			source: 'UK Government',
			date: '2021',
			definition:
				' The theory and development of computer systems able to perform tasks normally requiring human intelligence, such as visual perception, speech recognition, decision-making, and translation between languages.',
			category: 'Government',
			link: 'https://www.gov.uk/government/publications/ai-safety-institute-overview/introducing-the-ai-safety-institute#definitions#:~:text=,field%20of%20AI',
			checked: 'yes'
		},
		{
			source: 'OECD',
			date: '2019',
			definition:
				'AI systems operate with varying degrees of autonomy by analyzing data to infer goals, make predictions, or recommend decisions.',
			category: 'Government',
			link: 'https://www.oecd.org/',
			checked: 'no'
		},
		{
			source: 'NIST (U.S.)',
			date: '2023',
			definition:
				'Systems that perceive environments through data, reason to interpret information, and act to achieve specified objectives.',
			category: 'Government',
			link: 'https://www.nist.gov/',
			checked: 'no'
		},
		{
			source: 'Russell & Norvig',
			date: '2003',
			definition:
				'We define AI as the study of agents that receive percepts from the environment and perform actions. Each such agent implements a function that maps percept sequences to actions.',
			category: 'Book',
			link: 'https://aima.cs.berkeley.edu/2nd-ed/preface.html#:~:text=The%20main%20unifying%20theme%20is,these%20functions%2C%20such%20as%20production',
			checked: 'yes'
		},
		{
			source: 'Pedro Domingos',
			date: '2015',
			definition:
				'The goal of artificial intelligence is to get computers to do things that in the past required human intelligence.',
			category: 'Book',
			link: 'https://www.washington.edu/news/2015/09/17/a-q-a-with-pedro-domingos-author-of-the-master-algorithm/#:~:text=PD%3A%20The%20goal%20of%20artificial,intelligence%2C%20but%20these%20days%20it%E2%80%99s',
			checked: 'yes'
		},
		{
			source: 'Melanie Mitchell',
			date: '2019',
			definition:
				'The quest to create machines that can adapt, learn, and exhibit behaviors indistinguishable from human intelligence. (From Artificial Intelligence: A Guide for Thinking Humans)',
			category: 'Book',
			link: 'http://melaniemitchell.me/',
			checked: 'no'
		},
		{
			source: 'Judea Pearl',
			date: '2018',
			definition:
				'Systems that understand causality, reason probabilistically, and make decisions under uncertainty. (From The Book of Why)',
			category: 'Book',
			link: 'https://bayes.cs.ucla.edu/why/',
			checked: 'no'
		},
		{
			source: 'Nick Bostrom',
			date: '2014',
			definition:
				'Machines with intellect surpassing human cognitive performance across all domains of interest. (From Superintelligence)',
			category: 'Book',
			link: 'https://nickbostrom.com/superintelligence/',
			checked: 'no'
		}
	];

	const rows = aiDefinitions.filter((d) => d.checked === 'yes');
	console.log(rows);

	// Compute sorted data based on sortColumn and sortDirection
	$: sortedRows = [...rows].sort((a, b) => {
		let aVal = a[sortColumn];
		let bVal = b[sortColumn];
		// Ensure case-insensitive comparison for strings
		if (typeof aVal === 'string') aVal = aVal.toLowerCase();
		if (typeof bVal === 'string') bVal = bVal.toLowerCase();

		if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
		if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
		return 0;
	});

	function sortTable(column) {
		if (sortColumn === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortColumn = column;
			sortDirection = 'asc';
		}
	}
</script>

<table class="ai-table">
	<thead>
		<tr>
			<th on:click={() => sortTable('Id')}>Id</th>
			<th on:click={() => sortTable('source')}>Source</th>
			<th on:click={() => sortTable('date')}>Date</th>
			<th on:click={() => sortTable('definition')}>Definition</th>
			<th on:click={() => sortTable('category')}>Category</th>
		</tr>
	</thead>
	<tbody>
		{#each sortedRows as row, i}
			<tr>
				<td>{i + 1}</td>
				<td>{row.source}</td>
				<td>{row.date}</td>
				<td>
					<a href={row.link} target="_blank" rel="noopener noreferrer">
						<p class="quote-block">{row.definition}</p>
					</a>
				</td>
				<td>{row.category}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.ai-table {
		width: 100%;
		border-collapse: collapse;
		margin: 20px 0;
		font-family: Arial, sans-serif;
	}
	.ai-table th,
	.ai-table td {
		border: 1px solid #ddd;
		padding: 10px 5px;
		text-align: left;
	}
	.ai-table th {
		cursor: pointer;
	}

	.ai-table thead {
		background-color: hsl(249, 78%, 86%);
		color: white;
	}

	.ai-table tr {
		vertical-align: top;
	}
	.ai-table tr:hover {
		background-color: rgba(0, 0, 255, 0.1);
	}
	.ai-table p:hover {
		text-decoration: wavy;
	}
	.quote-block {
		font-family: 'Scope One', 'Libre Baskerville', 'Roboto Slab', Georgia, 'Times New Roman', Times,
			serif;
		padding: 0;
		margin: 0;
		font-size: 0.8em;
		font-style: normal;
	}
	a {
		text-decoration: none;
	}
</style>
