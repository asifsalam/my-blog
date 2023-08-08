const categories = [
    {
        id: "200",
        type: "category",
        name: "all",
        title: "all",
        img: "/img/icons/universe-svgrepo-com.svg",
        subCategory: ["all"],
        nArticles: 1093
    },
    {
        id: "240",
        type: "category",
        name: "book",
        title: "books",
        img: "/img/icons/book-svgrepo-com-2.svg",
        subCategory: ["book", "pdf"],
        nArticles: 81
    },
    {
        id: "235",
        type: "category",
        name: "cautionary-tale",
        title: "cautionary tale",
        img: "/img/icons/caution-svgrepo-com.svg",
        subCategory: ["dubious", "peril", "punditry", "mistake", "dystopian", "challenge", "speculation", "pitfall", "viztortion"],
        nArticles: 79
    },
    {
        id: "245",
        type: "category",
        name: "foundations",
        title: "foundations",
        img: "/img/icons/sprout-tree-svgrepo-com.svg",
        subCategory: ["standard", "principle", "theory", "practice", "concept", "explainer", "overview", "fundamentals"],
        nArticles: 174
    },
    {
        id: "250",
        type: "category",
        name: "inspiration",
        title: "inspiration",
        img: "/img/icons/inspiration-art-svgrepo-com.svg",
        subCategory: ["poetry", "art", "award", "digital-art", "data-art"],
        nArticles: 132
    },
    {
        id: "220",
        type: "category",
        name: "method",
        title: "methods",
        img: "/img/icons/method-chemistry-svgrepo-com.svg",
        subCategory: ["method", "technique", "design"],
        nArticles: 336
    },
    {
        id: "255",
        type: "category",
        name: "my-post",
        title: "my posts",
        img: "/img/logos/geometric-pattern-my-post.jpg",
        subCategory: ["my-post"],
        nArticles: 3
    },
    {
        id: "215",
        type: "category",
        name: "organization",
        title: "organization & process",
        img: "/img/icons/organization-people-group-public-svgrepo-com.svg",
        subCategory: ["process", "organization", "methodology", "workflow", "ecosystem"],
        nArticles: 83
    },
    {
        id: "210",
        type: "category",
        name: "python",
        title: "python",
        img: "/img/icons/python-svgrepo-com.svg",
        subCategory: ["python"],
        nArticles: 50
    },
    {
        id: "205",
        type: "category",
        name: "rstats",
        title: "rstats",
        img: "/img/icons/r-svgrepo-com.svg",
        subCategory: ["rstats"],
        nArticles: 257
    },
    {
        id: "230",
        type: "category",
        name: "technology",
        title: "technology",
        img: "/img/icons/industrial-robot-robot-svgrepo-com.svg",
        subCategory: ["javascript"],
        nArticles: 28
    },
    {
        id: "225",
        type: "category",
        name: "tools",
        title: "tools",
        img: "/img/icons/tools-svgrepo-com.svg",
        subCategory: ["toolbox", "tool", "framework", "toolkit", "package", "feature", "function", "component"],
        nArticles: 224
    }
];

const themes = [
    {
        id: "100",
        type: "theme",
        name: "all",
        title: "all",
        img: "/img/icons/universe-svgrepo-com.svg",
        nArticles: 1093
    },
    {
        id: "115",
        type: "theme",
        name: "data-analysis",
        title: "data-analysis",
        img: "/img/icons/analytics-graph-svgrepo-com.svg",
        nArticles: 52
    },
    {
        id: "130",
        type: "theme",
        name: "data-driven-enterprise",
        title: "data-driven-enterprise",
        img: "/img/icons/ai-svgrepo-com.svg",
        nArticles: 7
    },
    {
        id: "110",
        type: "theme",
        name: "data-literacy",
        title: "data-literacy",
        img: "/img/icons/analytics-marketing-svgrepo-com.svg",
        nArticles: 7
    },
    {
        id: "120",
        type: "theme",
        name: "data-science",
        title: "data-science",
        img: "/img/icons/data-science-probability-distribution.svg",
        nArticles: 106
    },
    {
        id: "105",
        type: "theme",
        name: "data-viz",
        title: "data-viz",
        img: "/img/icons/analytics-graph-svgrepo-com-3.svg",
        nArticles: 368
    },
    {
        id: "135",
        type: "theme",
        name: "inspiration",
        title: "inspiration",
        img: "/img/icons/inspiration-art-svgrepo-com.svg",
        nArticles: 91
    },
    {
        id: "125",
        type: "theme",
        name: "pitfall",
        title: "pitfall",
        img: "/img/icons/caution-svgrepo-com.svg",
        nArticles: 33
    }
];

const tags = [
    {
        type: "tag",
        name: "topic",
        title: "topic",
        tags: ["data", "technology", "technique", "tool", "method", "design", "process", "concept", "methodology", "feature", "workflow"],
        nArticles: ["574", "458", "230", "110", "65", "41", "40", "29", "27", "11", "10"]
    },
    {
        type: "tag",
        name: "area",
        title: "area",
        tags: ["stats", "ml", "ai", "geospatial", "analysis", "statistics", "development", "bi", "search", "graph", "colour", "chart", "animation", "dl", "data-preparation", "data-processing", "analytics", "nlp", "forecasting", "model", "network-graph", "data-driven", "3d"],
        nArticles: ["257", "153", "122", "58", "56", "53", "48", "42", "42", "33", "32", "31", "26", "23", "19", "14", "12", "12", "10", "10", "10", "10", "10"]
    },
    {
        type: "tag",
        name: "style",
        title: "style",
        tags: ["dubious", "cautionary-tale", "peril"],
        nArticles: ["23", "22", "13"]
    },
    {
        type: "tag",
        name: "technology",
        title: "technology",
        tags: ["rstats", "d3js", "python", "plot", "javascript", "tidyverse", "ggplot2", "powerbi"],
        nArticles: ["257", "67", "50", "36", "28", "24", "17", "11"]
    },
    {
        type: "tag",
        name: "other",
        title: "other",
        tags: ["art", "science", "inspiration", "free", "storytelling"],
        nArticles: ["125", "117", "91", "25", "14"]
    }
];

const allThemes =
    ['all',
        'datadrivenenterprise',
        'dataliteracy',
        'dataviz',
        'method',
        'mypost',
        'pitfall',
        'inspiration',
        'process'
    ];

const allCategories = [
    {
        id: 0,
        category: 'all',
        title: 'All',
        subCategory: ['all'],
        img: '/img/icons/book-svgrepo-com-2.svg',
        numArticles: 95,
        type: 'all'
    },
    {
        id: 1,
        category: 'mypost',
        title: 'My posts',
        subCategory: ['mypost'],
        img: '/img/icons/book-svgrepo-com-2.svg',
        numArticles: 0,
        type: 'mypost'
    },

    {
        id: 100,
        category: 'all',
        title: 'All',
        subCategory: ['all'],
        img: '/img/icons/book-svgrepo-com-2.svg',
        numArticles: 10,
        type: 'category'
    },
    {
        id: 102,
        category: 'guidedlearning',
        subCategory: ['learning', 'tutorial', 'course', 'contest'],
        title: 'Guided Learning',
        img: '/img/icons/tutorials-svgrepo-com.svg',
        numArticles: 15,
        type: 'category'
    },
    {
        id: 103,
        category: 'rstats',
        subCategory: ['rstats'],
        title: 'Rstats',
        img: '/img/icons/r-svgrepo-com.svg',
        numArticles: 17,
        type: 'category'
    },
    {
        id: 104,
        category: 'python',
        subCategory: ['python'],
        title: 'Python',
        img: '/img/icons/python-svgrepo-com.svg',
        numArticles: 23,
        type: 'category'
    },
    {
        id: 105,
        category: 'method',
        title: 'Methods',
        subCategory: ['method', 'model'],
        img: '/img/icons/method-chemistry-svgrepo-com.svg',
        numArticles: 19,
        type: 'category'
    },
    {
        id: 106,
        category: 'organization',
        title: 'Organization & Process',
        subCategory: ['organization', 'process'],
        img: '/img/icons/organization-people-group-public-svgrepo-com.svg',
        img2: '/img/icons/process-graph-svgrepo-com.svg',
        numArticles: 6,
        type: 'category'
    },
    {
        id: 107,
        category: 'inspiration',
        title: 'Inspiration',
        subCategory: ['newsletter', 'inspiration', 'example'],
        img: '/img/icons/inspiration-art-svgrepo-com.svg',
        numArticles: 7,
        type: 'category'
    },
    {
        id: 108,
        category: 'cautionarytale',
        title: 'Cautionary Tales',
        subCategory: ['cautionarytale', 'pitfall'],
        img: '/img/icons/caution-svgrepo-com.svg',
        numArticles: 5,
        type: 'category'
    },
    {
        id: 201,
        category: 'dataviz',
        title: 'dataviz',
        subCategory: ['dataviz', 'chart', 'graph', 'visualization', 'visual'],
        img: '/img/icons/caution-svgrepo-com.svg',
        numArticles: 15,
        type: 'theme'
    },
    {
        id: 202,
        category: 'technique',
        title: 'Technique',
        subCategory: ['technique', 'method'],
        img: '/img/icons/caution-svgrepo-com.svg',
        numArticles: 5,
        type: 'theme'
    },
    {
        id: 203,
        category: 'pitfall',
        title: 'Pitfall',
        subCategory: ['cautionarytale', 'pitfall'],
        img: '/img/icons/caution-svgrepo-com.svg',
        numArticles: 5,
        type: 'theme'
    },
    {
        id: 204,
        category: 'datadrivenenterprise',
        title: 'Data Driven Enterprise',
        subCategory: ['datadrivenenterprise'],
        img: '/img/icons/caution-svgrepo-com.svg',
        numArticles: 10,
        type: 'theme'
    },
    {
        id: 205,
        category: 'dataliteracy',
        title: 'Data Literacy',
        subCategory: ['dataliteracy'],
        img: '/img/icons/caution-svgrepo-com.svg',
        numArticles: 13,
        type: 'theme'
    },
    {
        id: 206,
        category: 'inspiration',
        title: 'Inspiration',
        subCategory: ['art', 'literature', 'poetry', 'music', 'newsletter', 'example'],
        img: '/img/icons/caution-svgrepo-com.svg',
        numArticles: 5,
        type: 'theme'
    },
    {
        id: 207,
        category: 'process',
        title: 'Process',
        subCategory: ['workflow', 'process'],
        img: '/img/icons/caution-svgrepo-com.svg',
        numArticles: 5,
        type: 'theme'
    }

];

const allTopics = [
    'all',
    'mypost',
    'datadrivenenterprise',
    'rstats',
    'python',
    'tutorial',
    'book',
    'machinelearning',
    'datascience',
    'statistics',
    'dataliteracy',
    'art',
    'dataviz',
    'method',
    'process',
    'workflow',
    'tool',
    'technology',
    'literature',
    'poetry',
    'music',
    'newsletter',
    'example'
]

export { themes, categories, tags, allCategories, allThemes, allTopics }