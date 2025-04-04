<script>
	export let AIData;
	// Sample data - replace with your actual table data
	const aiData = [
		{
			id: 1,
			ai_category: 'symbolic',
			name: 'Logic Programming',
			type: 'methodology',
			description: 'Programming paradigm based on formal logic',
			date: '1970s',
			link: 'https://en.wikipedia.org/wiki/Logic_programming'
		},
		{
			id: 2,
			ai_category: 'symbolic',
			name: 'Expert Systems',
			type: 'application',
			description: 'Computer system emulating decision-making of a human expert',
			date: '1970s',
			link: 'https://en.wikipedia.org/wiki/Expert_system'
		},
		{
			id: 3,
			ai_category: 'symbolic',
			name: 'Rule-based Systems',
			type: 'method',
			description: 'System that uses rules to make decisions or classifications',
			date: '1980s',
			link: 'https://en.wikipedia.org/wiki/Rule-based_system'
		},
		{
			id: 4,
			ai_category: 'connectionist',
			name: 'Neural Networks',
			type: 'methodology',
			description: 'Computing systems inspired by biological neural networks',
			date: '1950s',
			link: 'https://en.wikipedia.org/wiki/Neural_network'
		},
		{
			id: 5,
			ai_category: 'connectionist',
			name: 'Deep Learning',
			type: 'method',
			description: 'Class of machine learning algorithms using multiple layers',
			date: '2000s',
			link: 'https://en.wikipedia.org/wiki/Deep_learning'
		},
		{
			id: 6,
			ai_category: 'connectionist',
			name: 'Image Recognition',
			type: 'application-type',
			description: 'Technology to identify objects, places, people in images',
			date: '2010s',
			link: 'https://en.wikipedia.org/wiki/Computer_vision'
		},
		{
			id: 7,
			ai_category: 'connectionist',
			name: 'Chatbots',
			type: 'application',
			description: 'Software applications that conduct conversations',
			date: '2010s',
			link: 'https://en.wikipedia.org/wiki/Chatbot'
		},
		{
			id: 8,
			ai_category: 'other',
			name: 'Genetic Algorithms',
			type: 'methodology',
			description: 'Search heuristic inspired by natural selection',
			date: '1970s',
			link: 'https://en.wikipedia.org/wiki/Genetic_algorithm'
		},
		{
			id: 9,
			ai_category: 'other',
			name: 'Fuzzy Logic',
			type: 'method',
			description: 'Form of many-valued logic for approximate reasoning',
			date: '1960s',
			link: 'https://en.wikipedia.org/wiki/Fuzzy_logic'
		},
		{
			id: 10,
			ai_category: 'other',
			name: 'Robotics',
			type: 'application-type',
			description: 'Interdisciplinary branch of engineering and science',
			date: '1980s',
			link: 'https://en.wikipedia.org/wiki/Robotics'
		},
		{
			id: 11,
			ai_category: 'symbolic',
			name: 'Automated Theorem Proving',
			type: 'application',
			description: 'Proving mathematical theorems by computer programs',
			date: '1950s',
			link: 'https://en.wikipedia.org/wiki/Automated_theorem_proving'
		},
		{
			id: 12,
			ai_category: 'connectionist',
			name: 'Backpropagation',
			type: 'method',
			description: 'Algorithm for training feedforward neural networks',
			date: '1980s',
			link: 'https://en.wikipedia.org/wiki/Backpropagation'
		}
	];

	// Function to populate the sections with data
	function populateSections() {
		aiData.forEach((item) => {
			const typeId = item.type.toLowerCase().replace(' ', '-');
			const containerId = `${item.ai_category}-${typeId}`;
			const container = document.getElementById(containerId);

			if (container) {
				const itemElement = document.createElement('a');
				itemElement.href = item.link;
				itemElement.target = '_blank';
				itemElement.className = 'item';
				itemElement.textContent = item.name;
				itemElement.setAttribute('data-description', `${item.description}\n\nDate: ${item.date}`);

				container.appendChild(itemElement);
			}
		});
	}

	// Call the function when the page loads
	$: populateSections();
</script>

<h1>AI Aspects Overview</h1>

<div class="container">
	<!-- Symbolic Column -->
	<div class="category-column symbolic">
		<h2 class="category-title">Symbolic</h2>

		<div class="section">
			<div class="section-title">Representative methodologies</div>
			<div class="item-container" id="symbolic-methodology">
				<!-- Items will be added by JavaScript -->
			</div>
		</div>

		<div class="section">
			<div class="section-title">Notable methods</div>
			<div class="item-container" id="symbolic-method">
				<!-- Items will be added by JavaScript -->
			</div>
		</div>

		<div class="section">
			<div class="section-title">Application types</div>
			<div class="item-container" id="symbolic-application-type">
				<!-- Items will be added by JavaScript -->
			</div>
		</div>

		<div class="section">
			<div class="section-title">Applications</div>
			<div class="item-container" id="symbolic-application">
				<!-- Items will be added by JavaScript -->
			</div>
		</div>
	</div>

	<!-- Other Column -->
	<div class="category-column other">
		<h2 class="category-title">Other</h2>

		<div class="section">
			<div class="section-title">Representative methodologies</div>
			<div class="item-container" id="other-methodology">
				<!-- Items will be added by JavaScript -->
			</div>
		</div>

		<div class="section">
			<div class="section-title">Notable methods</div>
			<div class="item-container" id="other-method">
				<!-- Items will be added by JavaScript -->
			</div>
		</div>

		<div class="section">
			<div class="section-title">Application types</div>
			<div class="item-container" id="other-application-type">
				<!-- Items will be added by JavaScript -->
			</div>
		</div>

		<div class="section">
			<div class="section-title">Applications</div>
			<div class="item-container" id="other-application">
				<!-- Items will be added by JavaScript -->
			</div>
		</div>
	</div>

	<!-- Connectionist Column -->
	<div class="category-column connectionist">
		<h2 class="category-title">Connectionist</h2>

		<div class="section">
			<div class="section-title">Representative methodologies</div>
			<div class="item-container" id="connectionist-methodology">
				<!-- Items will be added by JavaScript -->
			</div>
		</div>

		<div class="section">
			<div class="section-title">Notable methods</div>
			<div class="item-container" id="connectionist-method">
				<!-- Items will be added by JavaScript -->
			</div>
		</div>

		<div class="section">
			<div class="section-title">Application types</div>
			<div class="item-container" id="connectionist-application-type">
				<!-- Items will be added by JavaScript -->
			</div>
		</div>

		<div class="section">
			<div class="section-title">Applications</div>
			<div class="item-container" id="connectionist-application">
				<!-- Items will be added by JavaScript -->
			</div>
		</div>
	</div>
</div>

<style>
	body {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		margin: 0;
		padding: 20px;
		background-color: #f5f7fa;
		color: #333;
	}

	h1 {
		text-align: center;
		color: #4a6fa5;
		margin-bottom: 30px;
	}

	.container {
		display: flex;
		gap: 15px;
		margin-bottom: 30px;
	}

	.category-column {
		flex: 1;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.category-title {
		background-color: #e8f4f8;
		padding: 12px;
		text-align: center;
		font-weight: bold;
		font-size: 18px;
		border-radius: 5px 5px 0 0;
		margin-bottom: 0;
		color: #4a6fa5;
	}

	.section {
		margin-bottom: 20px;
		position: relative;
	}

	.section-title {
		background-color: #f0f4f8;
		padding: 8px;
		text-align: center;
		font-weight: bold;
		font-size: 14px;
		margin-bottom: 5px;
		border-radius: 3px;
	}

	.item-container {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		padding: 5px;
	}

	.item {
		padding: 6px 10px;
		border-radius: 4px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		cursor: pointer;
		font-size: 13px;
		position: relative;
		transition: all 0.2s ease;
	}

	.item:hover {
		transform: translateY(-2px);
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
	}

	.item::after {
		content: attr(data-description);
		position: absolute;
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		background-color: #fff;
		padding: 8px;
		border-radius: 4px;
		border: 1px solid #ddd;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		width: 200px;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.2s ease;
		font-size: 12px;
		z-index: 10;
	}

	.item:hover::after {
		opacity: 1;
	}

	/* Category-specific colors */
	.symbolic .item {
		background-color: #ffd6e0;
	}
	.other .item {
		background-color: #d6f3ff;
	}
	.connectionist .item {
		background-color: #d6ffdf;
	}

	/* Vertical dividers with squares */
	.category-column:not(:last-child)::after {
		content: '';
		position: absolute;
		top: 0;
		right: -8px;
		height: 100%;
		width: 1px;
		background-color: #ccc;
	}

	.category-column:not(:last-child)::before {
		content: '';
		position: absolute;
		top: -5px;
		right: -11px;
		width: 10px;
		height: 10px;
		background-color: #ccc;
		transform: rotate(45deg);
	}

	.category-column:not(:last-child)::after {
		content: '';
		position: absolute;
		bottom: -5px;
		right: -11px;
		width: 10px;
		height: 10px;
		background-color: #ccc;
		transform: rotate(45deg);
	}

	a {
		text-decoration: none;
		color: inherit;
	}
</style>
