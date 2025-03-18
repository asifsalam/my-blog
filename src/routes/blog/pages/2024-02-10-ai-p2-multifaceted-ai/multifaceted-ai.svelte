<section>
	<h2>Symbolic AI</h2>
	<p>
		Symbolic AI uses explicit rules, logic, and symbolic structures to replicate human reasoning and
		knowledge representation.
	</p>
	<h3>Representative techniques</h3>
	<ul>
		<li>
			<strong>Logic Programming:</strong> Encodes knowledge and inferences using formal logic.
		</li>
		<li>
			<strong>Expert Systems:</strong> Rule-based systems that mimic domain-specific human expertise.
		</li>
		<li>
			<strong>Ontologies:</strong> Organizes knowledge hierarchically with defined relationships (e.g.,
			taxonomies).
		</li>
		<li>
			<strong>Semantic Networks:</strong> Represents knowledge as nodes (concepts) and edges (relationships).
		</li>
		<li>
			<strong>Production Systems:</strong> Uses "if-then" rules to derive actions from conditions.
		</li>
	</ul>
	<h3>Notable algorithms</h3>
	<ul>
		<li>
			<strong>A* Search:</strong> An optimization algorithm for graph traversal, using heuristics to
			guide the search.
		</li>
		<li>
			<strong>Depth-first / Best-first Search:</strong> Algorithms for systematically traversing or searching
			through tree or graph data structures, each employing a distinct strategy to explore nodes.
		</li>
		<li>
			<strong>Backward Chaining:</strong> Goal-driven reasoning that traces backward through logical
			rules.
		</li>
		<li>
			<strong>Forward Chaining:</strong> Data-driven reasoning that applies rules to derive conclusions.
		</li>
		<li>
			<strong>Resolution Theorem Proving:</strong> Deduces new clauses by resolving contradictions in
			logic.
		</li>
		<li>
			<strong>Constraint Satisfaction Algorithms:</strong> Problem-solving methods that look for solutions
			meeting all specified constraints within a given problem space.
		</li>
		<li>
			<strong>Minimax Algorithm:</strong> Decision-making for adversarial games by minimizing loss and
			maximizing gain.
		</li>
	</ul>
	<h3>Example applications</h3>
	<ul>
		<li>
			<strong>Expert Systems:</strong> Programs that use rule-based reasoning to simulate human decision-making
			in specialized domains.
		</li>
		<li>
			<strong>Symbolic Mathematics:</strong> The use of AI techniques to manipulate mathematical expressions
			symbolically rather than numerically.
		</li>
		<li>
			<strong>Ontologies:</strong> Structured representations of knowledge that define relationships
			between concepts in a domain.
		</li>
		<li>
			<strong>Automated Theorem Provers:</strong> Systems that use formal logic to automatically prove
			mathematical and logical theorems.
		</li>
		<li>
			<strong>Semantic Web:</strong> An extension of the World Wide Web that enables machines to interpret
			and process data with semantic meaning.
		</li>
		<li>
			<strong>Knowledge Graphs:</strong> Graph-based data structures that represent entities and their
			relationships to enable reasoning and inference.
		</li>
		<li>
			<strong>Reasoning Systems:</strong> Designed to infer new knowledge and make logical deductions
			based on given facts.
		</li>
	</ul>
</section>

<section>
	<h2>Connectionist AI</h2>
	<p>
		Connectionist AI uses artificial neural networks to learn patterns from data, using inspiration
		from our understanding of how the human brain works.
	</p>
	<h3>Representative techniques</h3>
	<ul>
		<li>
			<strong>Artificial Neural Networks (ANNs):</strong> Interconnected layers of nodes that learn hierarchical
			features.
		</li>
		<li>
			<strong>Deep Learning:</strong> Neural networks with multiple layers, typically with non-linear
			activation functions.
		</li>
		<li>
			<strong>Convolutional Neural Networks (CNNs):</strong> Processes grid-like data (e.g., images)
			with convolutional layers.
		</li>
		<li>
			<strong>Recurrent Neural Networks (RNNs):</strong> Handles sequential data via feedback loops.
		</li>
		<li>
			<strong>Generative adversarial Networks (GANs):</strong> Neural networks that compete, a generator
			and a discriminator, iteratively refining generated data to match real data distributions.
		</li>
		<li>
			<strong>Variatioinal Autoencoders (VAEs):</strong> Learn probabilistic latent representations of
			data, enabling generation by sampling and decoding from the latent space.
		</li>

		<li>
			<strong>Transformers:</strong> Uses self-attention mechanisms for parallelized sequence processing.
		</li>
		<li>
			<strong>Supervised and Unsupervised Learning:</strong> Uses labeled data to train models and discover
			hidden patterns in unlabeled data.
		</li>
	</ul>
	<h3>Notable algorithms</h3>
	<ul>
		<li>
			<strong>Backpropagation:</strong> Adjusts network weights by propagating errors backward.
		</li>
		<li>
			<strong>Stochastic Gradient Descent (SGD):</strong> Optimizes models by iteratively updating parameters.
		</li>
		<li>
			<strong>Dropout:</strong> Regularization technique to prevent overfitting by randomly deactivating
			neurons.
		</li>
		<li>
			<strong>Adam Optimizer:</strong> Adaptive learning-rate algorithm combining RMSprop and momentum.
		</li>
		<li>
			<strong>Attention Mechanism:</strong> Enables models to focus on relevant parts of the input.
		</li>
	</ul>
	<h3>Example applications</h3>
	<ul>
		<li>
			<strong>Text Generation:</strong> Generate natural language text based on input prompts. LLMs ar
			examples of models that generate natural language text and code based on user prompts.
		</li>
		<li>
			<strong>Image Generation:</strong> Generate images based on input prompts.
		</li>
		<li>
			<strong>Video Generation:</strong> Generate videos from text descriptions.
		</li>
		<li><strong>Video to Text:</strong> Transcribe videos into text.</li>
		<li><strong>Reasoning Models:</strong> Mimic thinking and solve complex tasks.</li>
		<li>
			<strong>Image Classification:</strong> Assign one or more predefined labels to an image based on
			its visual content.
		</li>
		<li>
			<strong>Text Classification:</strong> Classify text into predefined categories.
		</li>
		<li>
			<strong>Object Detection:</strong> Identify and locale objects within images or video frames.
		</li>
		<li><strong>Speech Recognition:</strong> Convert spoken language into written text.</li>
		<li>
			<strong>Anomaly Detection:</strong> Identify patterns in data that deviate significantly from expected
			behavior.
		</li>
		<li><strong>Forecasting:</strong> Predict future outcomes based on historical data.</li>
		<li>
			<strong>Recommendation Systems:</strong> Predict user preferences to suggest relevant items or
			content.
		</li>
	</ul>
</section>

<section>
	<h2>Everything in between &amp; outside</h2>
	<p>
		Other components of the AI Toolbox. Things that are part of machine learning and statistics, but
		do not fit into either the Symbolic AI or Connectionist AI categories. There is a lot of overlap
		in the tasks, but the techniques, algorithms, and scale are different.
	</p>
	<h3>Representative Techniques</h3>
	<ul>
		<li>
			<strong>Probability Theory:</strong> The broad foundational mathematical tools used in machine
			learning to model uncertainty and analyze data distributions.
		</li>
		<li>
			<strong>Statistical Inference:</strong> Using sample data to estimate population parameters and
			make predictions.
		</li>
		<li>
			<strong>Markov Models:</strong> Models that assume the future state depends only on the current
			state, commonly used for sequential data analysis.
		</li>
		<li>
			<strong>Bayesian Networks:</strong> Graphical models that represent probabilistic relationships
			among variables, enabling inference under uncertainty.
		</li>
		<li>
			<strong>Evolutionary Algorithms:</strong> Optimization techniques inspired by natural selection,
			iteratively evolving solutions to improve performance on a given task.
		</li>
		<li>
			<strong>Reinforcement Learning:</strong> A learning paradigm where an agent interacts with an environment,
			receiving rewards or penalties to guide its actions.
		</li>
		<li>
			<strong>Supervised Learning:</strong> A training approach using labeled data to teach models how
			to predict outputs for new, unseen inputs.
		</li>
		<li>
			<strong>Unsupervised Learning:</strong> A training approach that discovers hidden patterns or structures
			in unlabeled data without predefined output labels.
		</li>
	</ul>
	<h3>Representative Algorithms</h3>
	<ul>
		<li>
			<strong>Q-Learning:</strong> A way for a computer to learn the best actions through trial and error,
			without needing a detailed model of its surroundings.
		</li>
		<li>
			<strong>Policy Gradient Methods:</strong> Approaches that teach a computer to pick actions by directly
			adjusting how it decides, aiming to maximize rewards.
		</li>
		<li>
			<strong>Expectation Maximization Algorithm:</strong> A process to refine guesses about hidden parts
			of a problem so they best match the data.
		</li>
		<li>
			<strong>Belief Propagation:</strong> A method for updating how likely different possibilities are
			in a network of related ideas or events.
		</li>
		<li>
			<strong>Hidden Markov Model:</strong> A way to describe something that changes over time, even
			when parts of it can't be directly seen.
		</li>
		<li>
			<strong>Hypothesis Test:</strong> A procedure to decide if observed data strongly supports or contradicts
			an initial idea.
		</li>
		<li>
			<strong>Genetic Programming:</strong> A technique that uses “survival of the fittest” to automatically
			evolve computer programs to solve problems.
		</li>
		<li>
			<strong>K-means Clustering:</strong> Groups data points into a chosen number of clusters by finding
			the best “centers” for each group.
		</li>
		<li>
			<strong>Hierarchical Clustering:</strong> Organizes data into groups step by step, either by combining
			smaller groups or splitting larger ones.
		</li>
		<li>
			<strong>Principal Component Analysis:</strong> Identifies the main patterns in data to retain only
			the most important information.
		</li>
		<li>
			<strong>Linear Regression:</strong> Predicts a number (like a price) based on how it changes with
			other factors.
		</li>
		<li>
			<strong>Logistic Regression:</strong> Predicts yes-or-no outcomes by calculating probabilities
			from given inputs.
		</li>
		<li>
			<strong>Support Vector Machines:</strong> Searches for the best boundary to separate data into
			distinct categories.
		</li>
		<li>
			<strong>Random Forest:</strong> A collection of decision trees that work together for more accurate
			predictions.
		</li>
	</ul>
	<h3>Traditional ML tasks</h3>
	<ul>
		<li>
			Image classification: assigning one or more predefined labels to an image based on its visual
			content.
		</li>
		<li>
			<strong>Natural language processing:</strong> analyzing and understanding human language data to
			extract meaningful information.
		</li>
		<li><strong>Machine translation:</strong> converting text from one language into another.</li>
		<li>
			<strong> Sentiment analysis:</strong> determining the emotional tone or subjective opinion expressed
			in text.
		</li>
		<li>
			<strong>Object detection:</strong> identifying and localizing objects within images or video frames.
		</li>
		<li><strong>Text classification:</strong> classifying text into predefined categories.</li>
		<li>
			<strong> Churn prediction:</strong> predicting which customers are likely to discontinue using
			a service or product.
		</li>
		<li>
			<strong> Anomaly detection:</strong> identifying patterns in data that deviate significantly from
			expected behavior.
		</li>
		<li>
			<strong> Recommendation systems:</strong> predicting user preferences to suggest relevant items
			or content.
		</li>
	</ul>
	<h3>Other examples, with other techniques</h3>
	<ul>
		<li>
			<strong>Game Playing:</strong> Reinforcement learning algorithms like Q-learning and policy gradients
			train AI agents to master board games, video games, and multi-agent environments.
		</li>
		<li>
			<strong>Robotics:</strong> Reinforcement learning and evolutionary algorithms enable robots to
			learn tasks (e.g., navigation or object manipulation) through trial-and-error interactions.
		</li>
		<li>
			<strong>Feature Reduction:</strong> Probability and statistics methods (e.g., principal component
			analysis) condense high-dimensional data into more manageable, informative features.
		</li>
		<li>
			<strong>Speech Recognition:</strong> Hidden Markov Models and Bayesian networks model and decode
			acoustic signals to transform spoken language into text.
		</li>
		<li>
			<strong>Medical Diagnosis:</strong> Bayesian networks integrate uncertain factors to support disease
			diagnosis and predict patient outcomes.
		</li>
		<li>
			<strong>Anomaly Detection:</strong> Statistical hypothesis testing identifies unusual events or
			behaviors in large datasets, such as fraud detection.
		</li>
		<li>
			<strong>Genetic Programming for Circuit Design:</strong> Evolving programs can search for optimal
			or near-optimal electronic circuit configurations.
		</li>
		<li>
			<strong>Self-Driving Vehicles:</strong> Reinforcement learning helps autonomous cars learn optimal
			driving policies from simulated or real-world experience.
		</li>
		<li>
			<strong>Recommendation Systems:</strong> Markov decision processes and Bayesian methods adaptively
			recommend personalized content to users.
		</li>
		<li>
			<strong>Natural Language Processing:</strong> Expectation-maximization algorithms underlie unsupervised
			models for tasks like machine translation or word alignment.
		</li>
	</ul>
</section>

<style>
	li::marker {
		list-style-type: '\27BD';
		line-height: 1.2em;
		content: '\27A0';
		color: hsla(var(--main-text-color), 0.15);
	}

	@media (max-width: 600px) {
		p {
			font-size: 1.3rem;
		}

		h2 {
			font-size: 1.5rem;
		}
		h3 {
			font-size: 1.4rem;
		}
		li {
			font-size: 1.3rem;
		}
	}
</style>
