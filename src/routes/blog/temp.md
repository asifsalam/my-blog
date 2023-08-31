---
title: Create amazing PowerPoint slides using R - Part 2(3) - Getting data
preview_image: '/img/images/geometric-pattern-07.jpg'
author: Asif Salam
id: 'L02146'
---

<script>
    let urlMain = "/blog"
</script>

## Introduction

Now that we have a few basic tools for manipulating PowerPoint slides (<a href="/blog/2023-08-05-R-and-PowerPoint-Part-1/">Part 1</a>), let's scrape the data we need to create Mr. Eastwood's filmography slide. We'll get the data from [IMDB][2]. In [Part 3][13], we will use this data for constructing a PowerPoint slide with lots (needless, but educational) animation, and interaction.

Let's get started.

## Setup

We'll use the same R/RStudio setup and the packages we loaded in <a href="/blog/2023-08-05-R-and-PowerPoint-Part-1/">Part 1</a>.

We will need some Hadley Wickham voodoo for web scraping and data manipulation.  
1 - [`rvest`][6] Web scraping simplified.  
2 - [`stringr`][7] String manipulation simplified.  
3 - [`plyr`][8] Apply simplified.  
4 - [`dlyr`][11] Data manipulation simplified.

## Scraping data using rvest

We will do two things in this post:  
1 - Get a list of films that Mr. Eastwood has acted in.  
2 - Get the poster images for each of the films.

We want to put Clint Eastwood's filmography as an actor on a PowerPoint slide, using R, without as much as a point or a click. But we will have to click through to [IMDB][2] to get the lowdown on all the movies Mr. Eastwood has starred in. Searching for Mr. Eastwood's name get us to [his filmography page][3]. We want to create a data frame with the following data from this page:

- Film Title.
- Release Year.
- URL to the film's page on IMDB (we'll need this to get the film's poster image).

We will work on a locally saved copy of the page. In Chrome, go the `menu > Save page as... ` and save to an appropriate location. To understand the elements we need to extract, we need the [`SelectorGadget`][4]. This nifty little tool help's identify the CSS selectors we can use to get the data we want from a web-site. And [`rvest`][6] makes great use of the output. You can get the [Chrome extension][5], or a [bookmarklet][4].

Navigate to [Mr. Eastwood's IMDB page][3]. The filmography includes movies and programs where Mr. Eastwood has participated in, not necessarily as an actor. Since we want to be able to select films in which Mr. Eastwood has performed as an actor, we need to open up one of the other sections of the filmography to be able to deselect the other sections. <img style="float:right;max-width:45%;" class="centre_image" src="/images/film_selector1.png" alt="Selections">

I used the `Archive footage` section. Now start `SelectorGadget`. Let's select the films from the `Actor` section. This selects alternate films. Click again on an unhighted film to select the other entries. This of course selects all the films the Mr. Eastwood was involved, not only those as an actor. Scroll down to the `Archive footage` section and select one of the programs. This will deselect all the items in that section, leaving us with just the elements from the `Actor` section. We can copy the identified CSS selectors, and paste in the R code.
