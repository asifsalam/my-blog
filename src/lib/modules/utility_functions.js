import * as d3 from 'd3';

function calculateLetterFrequency(message, alphabet) {
    let textFrequency = [];
    let frequency = [...message].reduce((acc, chr) => {
        acc[chr] = (acc[chr] || 0) + 1;
        return acc;
    }, {});
    Object.keys(frequency).forEach((d) => {
        let x = { letter: d, frequency: frequency[d] };
        if (d != ' ') textFrequency.push(x);
    });
    let sum = textFrequency.reduce((acc, curr) => {
        return acc + curr.frequency;
    }, 0);
    textFrequency.forEach((d) => {
        let x = (d.frequency * 100) / sum;
        d.frequency = x.toFixed(2);
    });
    textFrequency.sort((a, b) => b.frequency - a.frequency);
    let missingLetters = alphabet.filter((el) => !textFrequency.some(obj => obj.letter === el));
    missingLetters.forEach((el) => {
        textFrequency.push({ "letter": el, "frequency": '0' })
    })
    // console.log('text-frequency', missingLetters, textFrequency);
    return textFrequency;
}

function convertStringToFrequency(textMessage) {
    const cleanMessage = textMessage.replace(/[^a-zA-Z ]+/g, '').toUpperCase();
    let result = [...cleanMessage].reduce((a, e) => {
        a[e] = a[e] ? a[e] + 1 : 1;
        return a;
    }, {});
    console.log('convertStringToFrequency: ', result);
    return result;
}

function getImageUrl(article) {
    //grab a random image if img_type is "rep"lace
    const baseImageUrl = '/img/images/geometric-pattern-';
    const minImg = 1;
    const maxImg = 72; //max number of images in /img/images folder
    let img_url;
    if (article.img_type === "rep") {
        img_url = baseImageUrl.concat(paddedRandomIntFromInterval(minImg, maxImg), '.jpg');
    } else {
        img_url = article.img_url;
    }
    return (img_url)
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * @param {number} min
 * @param {number} max
 */
function paddedRandomIntFromInterval(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    let paddedRandomNumber = randomNumber > 9 ? String(randomNumber) : String('0' + randomNumber);
    return paddedRandomNumber;
}

function loadPosts(postApi = '/api/posts.json') {
    const load = async ({ fetch }) => {
        const posts = await fetch(postApi);
        const allPosts = await posts.json();
        return {
            allPosts
        }
    };
    let myPosts = load()
    myPosts = parsePosts(myPosts)
    return {
        myPosts
    }

};

/** @type {Array}*/
function searchArticles(articles, searchTerm, selection, articleList) {
    // console.log(articles, searchTerm, selection);
    const searchTermArray = searchTerm.split(" ");
    console.log("SearchArticles: ", searchTermArray);

    if (typeof articles === "undefined") {
        return "undefined error"
    }
    if (searchTerm === '') {
        if (selection === 'all') {
            articles = articleList;
            return articles
            // console.log('page-searchItems-0: ', searchTerm, $clickedCategory, articles);
        } else {
            articles = articleList.filter((d) => {
                return d.tags.includes(selection);
            });
        }
        // console.log('page-searchItems-1: ', searchTerm, $clickedCategory, articles);
    } else {
        if (selection === "all") {
            articles = articleList
        } else {
            articles = articleList.filter((d) => {
                return d.tags.includes(selection)
            })
        }
        articles = articles.filter((d) => {
            let termMatch = true;
            searchTermArray.forEach((term) => {
                if (!d.search_text.includes(term)) termMatch = false;

            })
            return termMatch;
        })
        // articles = articles.filter((d) => {
        //     return d.tags.includes(searchTerm.toLowerCase());
        // });
        // console.log('page-searchItems-2: ', searchTerm, articles);
    }
    return articles;
}

/** @type {Array}*/
function searchArticles2(articles, searchTerm, selection, articleList) {
    // console.log(articles, searchTerm, selection);

    if (typeof articles === "undefined") {
        return "undefined error"
    }
    if (searchTerm === '') {
        if (selection === 'all') {
            articles = articleList;
            return articles
            // console.log('page-searchItems-0: ', searchTerm, $clickedCategory, articles);
        } else {
            articles = articleList.filter((d) => {
                return d.tags.includes(selection);
            });
        }
        // console.log('page-searchItems-1: ', searchTerm, $clickedCategory, articles);
    } else {
        articles = articles.filter((d) => {
            return d.tags.includes(searchTerm.toLowerCase());
        });
        // console.log('page-searchItems-2: ', searchTerm, articles);
    }
    return articles;
}




/** @type {Array}*/
function cleanTags(articleTags) {
    const tagsToRemove = ["post", "article", "pitfall"]
    // console.log("CleanTags: ", articleTags)
    let tags = articleTags;
    let index;
    if (articleTags.length > 0) {
        for (let i = 0; i < tagsToRemove.length; i++) {
            index = tags.indexOf(tagsToRemove[i])
            if (index > -1) {
                tags.splice(index, 1)
            }
        }
        if (tags.length > 7) {
            tags = tags.slice(0, 6);
        }
        if (tags.length < 1) {
            tags = ['all'];
        }
        // console.log("clean tags: ",articletags)
        return tags;
    } else {
        return -1;
    }
}

/**
 * @param {any[] | Promise<{ allPosts: any; }>} posts
 */
function parsePosts(posts) {

    posts.forEach((d) => {
        (d.author = d.meta.author),
            (d.excerpt = d.meta.excerpt),
            (d.img_url = d.meta.preview_image),
            (d.link = d.path),
            (d.post_date = d.meta.post_date),
            (d.tags = d.meta.categories),
            (d.title = d.meta.title);
        delete d.meta;
        delete d.path;
        return d;
    });
    return posts
}

function loadArticles(numArticles = 0, dataFile = "/static/data/processed_links-small.csv", sep = ";") {
    let articleData;
    async function load() {
        let data = await d3.dsv(sep, dataFile, (d) => {
            return parseArticle(d);
        });
        if (numArticles > 0) {
            return data.slice(0, numArticles);
        } else {
            return data;
        }
    }
    articleData = load();
    return articleData;
}


/**
 * @param {object} d - row from the data file
 * @returns {object} - an article object with the following properties:
 *   - link_id: id of the link
 *   - link: link to the article
 *   - title: title of the article
 *   - author: author of the article
 *   - post_date: date of the article
 *   - excerpt: excerpt from the article
 *   - tags: tags for the article
 *   - site: site where the article was posted
 *   - link_type: type of link (e.g. article, video, etc.)
 *   - img_type: type of image (e.g. 'article', 'video', etc.)
 *   - img_url: url of the image
 *   - author_image: url of the author's image
 *   - author_url: url of the author's web site
 */
function parseArticle(d) {
    const titles = d.article_title.split("-n-")
    let preTitle, mainTitle;
    if (titles.length === 2) {
        preTitle = titles[0]
        mainTitle = titles[1]
    } else {
        preTitle = ""
        mainTitle = titles[0]
    }
    return {
        // id: d.id,
        // sequence: d.sequence,
        link_id: d.link_id,
        link: d.link,
        // title: d.article_title,
        title: mainTitle,
        pre_title: preTitle,
        author: d.article_author,
        post_date: d.post_date,
        excerpt: d.article_excerpt,
        tags: d.concatenate.split(';'),
        site: d.site_manual,
        link_type: d.link_type,
        img_type: d.img_type,
        img_url: d.img_url,
        author_image: d.author_image,
        author_url: d.author_url,

        // img_file: d.img_file,        
        // media_type: d.media_type,
        // processed_date: d.processed_date,
        // status: d.status,        
    };
}

function capitalizeFirstLetter(word) {
    const capitalized =
        word.charAt(0).toUpperCase()
        + word.slice(1)
    return capitalized
}

function filterCategory(articles, category) {
    // console.log("filterCategory: ", articles, category);
    let result;
    if (category.name === "all") {
        result = articles;
    } else {
        result = articles.filter((x) => {
            let includesCategory = false;
            x.tags.forEach((element) => {
                if (category.subCategory.includes(element)) {
                    includesCategory = true;
                }
            });
            if (includesCategory) {
                return x;
            }
        });
    }
    return result;
}

function filterArticles(articles, selection) {
    let result;
    // console.log("filterArticles: ", articles, selection);
    if (selection.type === "theme") {
        if (selection.name == "all") {
            result = articles;
        } else {
            result = articles.filter((x) => {
                let includesSelection = false;
                if (x.tags.includes(selection.name)) {
                    return x
                }
            });
        }

    } else
        if (selection.type === "category") {
            if (selection.name === "all") {
                result = articles;
            } else {
                result = articles.slice(1, 7);
            }
        }
    // console.log("filterArticles: ", result);
    return result;
}

function filterTheme(articles, theme) {
    console.log("filterTheme: ", articles, theme)
    let result;
    if (theme === "all") {
        result = articles;
        // console.log("FilterTheme: ", theme);
        // console.log("FilterTheme: result ", result.length);
    } else {
        result = articles.filter(x => {
            console.log('tags: ', x.tags);
            let includesTheme = false;
            x.tags.forEach(element => {
                if (theme == element) {
                    includesTheme = true;
                }
            });
            if (includesTheme) {
                console.log('filtered: ', x.tags);
                return x;
            }
        });
    }
    // filteredArticles = result;
    // let numArticles = result.length;
    return result;
}

function filterTag(articles, tag, tags) {
    // console.log(tag)
    let result;
    if (tag === "all") {
        result = articles;
    } else {
        result = articles.filter((x) => {
            // console.log(x);
            return (x.tags.includes(tag));
        });
    }
    return result;
}


function filterTopic(articles, topic) {
    let result;
    if (topic === "all") {
        result = articles;
    } else {
        result = articles.filter((x) => {
            if (x.tags.includes(topic)) {
                return x;
            }
        });
    }
    return result;
}

function filterTopic1(articles, topic) {
    let result;
    if (topic === "all") {
        result = articles;
    } else {
        result = articles.filter((x) => {
            console.log('tags: ', x.tags);
            if (x.tags.includes(topic)) {
                return x;
            }

        });
    }
    return result;
}

export {
    randomIntFromInterval, paddedRandomIntFromInterval, parsePosts, parseArticle, capitalizeFirstLetter, loadArticles, loadPosts,
    filterCategory, filterTheme, filterTag, filterTopic, filterArticles, cleanTags, getImageUrl, searchArticles, convertStringToFrequency, calculateLetterFrequency
} 