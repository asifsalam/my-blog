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
const allThemes = ['all',
    'datadrivenenterprise',
    'dataliteracy',
    'dataviz',
    'method',
    'mypost',
    'pitfall',
    'inspiration',
    'process'];

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

export { allCategories, allThemes, allTopics }