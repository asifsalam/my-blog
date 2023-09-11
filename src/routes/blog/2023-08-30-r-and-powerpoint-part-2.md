---
title: Create amazing PowerPoint slides using R &#151 Part 2(3) &#151 Getting some data
preview_image: '/img/images/geometric-pattern-07.jpg'
author: Asif Salam
id: 'L02146'
published: true
post_date: '2023-08-30'
excerpt: 'Automate the creation of PowerPoint presentations with R, reticulate, python and pywin32. In this post, the second of three, we scrape data and create a dataset of movies starring Clint Eastwood.'
categories:
  - 'rstats'
  - 'method'
  - 'tutorial'
  - 'my-post'
---

<script>
  import ShowImage from "$lib/components/show-image.svelte"
  import ConsoleOutput from "$lib/components/console-output.svelte"
  const consoleOutput1 = ['> filmography_div %>% html_children()', 
  '{xml_nodeset (1)}',
  '[1] <div class="ipc-accordion__item__content_inner accordion-content" role="presentation">\n <ul class="ipc-metadata-list ipc-metadata-list--dividers-between ipc...']
// const consoleOutput1 = ["This is ","an attempt","to provide"];
const consoleOutput2 = ['> length(poster_list)',
'[1] 72', '> poster_list[[2]]',
'{html_node}',
'<img alt="Clint Eastwood in The Mule (2018)" class="ipc-image" loading="lazy" src="Clint%20Eastwood%20-%20IMDb_files/MV5BMTc1OTc5NzA4OF5BMl5BanBnXkFtZTgwOTAzMzE2NjM@._V1_QL7_002.jpg" srcset="Clint%20Eastwood%20-%20IMDb_files/MV5BMTc1OTc5NzA4OF5BMl5BanBnXkFtZTgwOTAzMzE2NjM@._V1_QL7_002.jpg 90w, Clint%20Eastwood%20-%20IMDb_files/MV5BMTc1OTc5NzA4OF5BMl5BanBnXkFtZTgwOTAzMzE2NjM@._V1_QL7_003.jpg 135w, Clint%20Eastwood%20-%20IMDb_files/MV5BMTc1OTc5NzA4OF5BMl5BanBnXkFtZTgwOTAzMzE2NjM@._V1_QL75_UX.jpg 180w" sizes="50vw, (min-width: 480px) 34vw, (min-width: 600px) 26vw, (min-width: 1024px) 16vw, (min-width: 1280px) 16vw" width="90">']
const consoleOutput3 =['> film_titles[1:3]',
'[1] "Cry Macho"       "The Mule"        "American Sniper"',
'> film_urls[1:3]',
'[1] "https://www.imdb.com/title/tt1924245/?ref_=nm_flmg_t_1_act" "https://www.imdb.com/title/tt7959026/?ref_=nm_flmg_t_2_act"',
'[3] "https://www.imdb.com/title/tt2179136/?ref_=nm_flmg_t_3_act"',
'> characters[1:3]',
'[1] "Mike Milo"   "Earl Stone"  "Church Goer"',
'> film_years[1:3]',
'[1] "2021" "2018" "2014"',
'> poster_urls[1:3]',
'[1] "Clint%20Eastwood%20-%20IMDb_files/MV5BOGQ5OTBkNzAtYWQxYy00YjIxLWJkNTAtNTM2NDMxYzdkZDVmXkEyXkFq.jpg"',
'[2] "Clint%20Eastwood%20-%20IMDb_files/MV5BMTc1OTc5NzA4OF5BMl5BanBnXkFtZTgwOTAzMzE2NjM@._V1_QL7_002.jpg"',
'[3] "Clint%20Eastwood%20-%20IMDb_files/MV5BMTkxNzI3ODI4Nl5BMl5BanBnXkFtZTgwMjkwMjY4MjE@._V1_QL75_UX.jpg"]',
'> additional_info_text[1:3]',
'[1] "Cry Macho;Mike Milo"                      "The Mule;Earl Stone"                      "American Sniper;Church Goer (uncredited)"'];
</script>

## Introduction

Now that we have a few basic tools for manipulating PowerPoint slides ([Part 1][1]), let's scrape some data on films starring [Clint Eastwood][3]. Most of the good stuff on [IMDB][2] is paywalled since Amazon took over, but it will do for our purposes. In [Part 3][1], we will use this data to construct a PowerPoint slide with lots of (needless, but instructive) animation, and interaction.

## Setup

We will use three additional packages, from Hadley Wickham's [`tidyverse`][5], to do the heavy lifting:  
1 - [`rvest`][6] for web scraping  
2 - [`stringr`][7] for string manipulation  
3 - [`dlyr`][11] for data manipulation

## Scraping data using rvest

Searching for "Clint Eastwood" on [IMBD][2] brings us to [this page][3].

<ShowImage
mediaType="image"
mediaPath="/post_assets/0002/clint_webpage_1.png"
mediaNumber=1
mediaCaption="Clint Eastwood's page on IMDB"
/>

We can create a data frame with the following fields from this page:

- Film title
- Release year
- Character name
- URL to the film's page on IMDB
- Poster image

The `See all` text highlighted must be clicked to expand the list of films. This technique makes scraping a little harder in general, and a larger project would require other methods, but for this exercise, just click the link to expand the list to show all the films.

Working with a local copy of the reduces the number of requests to the website, a somewhat polite thing to do. In Firefox (or Edge or Chrome), go to `menu > Save page as... ` and save to an appropriate location (I have it saved in a project sub-directory called `imdb-clint`).

To extract the data we need, we identify the HTML elements on the page with the information and use `rvest` functions to parse the HTML page. We can use the HTML tags and CSS classes to select the appropriate elements and extract the attributes.

<ShowImage
mediaType="image"
mediaPath="/post_assets/0002/clint_webpage_table_selection.png"
mediaNumber=2
mediaCaption="Selecting HTML elements from the DOM for scraping"
/>

The keyboard shortcut <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd> opens up the **Web Developer Tools** in _Firefox_. _Figure 2_ highlights some of the parts:

1. Web developer tools panel
2. The <i>element</i> selector
3. Highlighted <i>HTML element</i>
4. Corresponding <i>HTML code</i>

The _element selector_ (&#10103) can be used to highlight different parts of the HTML page. Click on it to activate it, then try to find the point at which the complete table with the films is highlighted (&#10104). Clicking on it will highlight the corresponding _HTML_ in the inspector (&#10105).

<ShowImage
mediaType="image"
mediaPath="/post_assets/0002/main_div_selection.png"
mediaNumber=3
mediaCaption="HTML element attributes"
/>

The <html-el>div</html-el> highlighted in the _Firefox inspector_ (Figure 3), which contains the data we need, has an <html-attr>id</html-attr> of <html-attr>accordion-item-actor-previous-projects</html-attr> and a <html-attr>class</html-attr> of
<html-attr>ipc-accordion_item_content</html-attr>. The <html-attr>id</html-attr> attribute is useful, since it identifies a unique element on the page, allowing us to easily select the element and extract what we need. The <html-el>div</html-el> and <html-el>ul</html-el> elements below could also be used, but would require a little more work. The <html-el>li</html-el> elements within the <html-el>ul</html-el> element wrap the data per film that we are really interested in. Once we grab the <html-el>div</html-el> with the <html-attr>id</html-attr> selector, elements nested within can be selected, and text and other attributes of interest extracted.

<ShowImage
mediaType="image"
mediaPath="/post_assets/0002/li_elements.png"
mediaNumber=4
mediaCaption="&lt;li&gt content"
/>

With 72 films, there must be 72 <html-el>li</html-el> elements, one per film. A look at the different elements that make up the <html-el>li</html-el> (Figure 4) shows that the poster image is contained in an <html-el>img</html-el> element, from which we can get the link to the image. Similarly, we can find the elements that contain the other information.

## Extract the information

Let's do it in `R`.

```r
# Load packages
library(tidyverse)
library(rvest)

# Set some useful variables
data_dir <- "./data"
poster_dir <- "./posters"
clint_eastwood_films_file <- file.path(data_dir,"clint_eastwood_films.tsv")
actor_name <- "Clint Eastwood"

# Clint Eastwood's IMDB page
actor_url <- "http://www.imdb.com/name/nm0000142/"

# Locally saved HTML page
local_file <- ".//imdb-clint//Clint Eastwood - IMDb.htm"

# Read in locally stored page
local_page <- read_html(local_file)

# The same could be done with the online webpage, with a few minor modifications
# html_page <- read_html(actor_url)

# Select the div containing the filmography information
filmography_div_selector <- "#accordion-item-actor-previous-projects"
filmography_div <- local_page %>% html_nodes(filmography_div_selector)
```

<br/>

A look at the selected <html-el>div</html-el> indicates that we have the correct one, with the appropriate child elements.

<ConsoleOutput consoleType='R Console' inputCode = {consoleOutput1} />
<br/>

To get the <html-el>li</html-el> elements from the <html-el>div</html-el>, we can use the class <html-attr>ipc-metadata-list-summary-item</html-attr> (Figure 4), from which poster image links and the other information can be extracted.

### Extract poster image links

The poster images are contained in the <html-el>img</html-el> element within the <html-el>li</html-el> elements. Let's grab the <html-el>li</html-el> elements, and then the <html-el>img</html-el> elements to get the poster _urls_ (or _paths_ in this case).

```r
# Get all the li elements
filmography_list <- filmography_div %>% html_elements("li.ipc-metadata-list-summary-item")

# Extract the img elements
poster_list <- filmography_list %>% html_element("img")
# Extract the paths to the poster images
poster_urls <- poster_list %>% html_attr("src")
```

<br/>

The number of items in the `poster_list` is **72** as expected, and the second item in the list is the <html-el>img</html-el> for **The Mule**, also as expected.
<ConsoleOutput consoleType='R Console' inputCode = {consoleOutput2} />
<br/>

Also worth noting is that the <html-attr>src</html-attr> attribute provides the local _path_ to the image, rather than the _url_. This is because we are working with a locally saved file.

### Extract the other attributes

Now that we have the poster image paths, we are left with the film title, the character name, the year of release and link to the film's page on [IMDB][2].

<ShowImage
mediaType="image"
mediaPath="/post_assets/0002/additional_attributes.png"
mediaNumber=5
mediaCaption="Additional attributes"
/>
<br/>

Figure 5 highlights the HTML elements which contain the information:

1. The film's title and link to its page on IMDB
2. The name of the character played by Clint Eastwood
3. The year of release

The film's _title_ and _link_ to the page can be obtained from the <html-el>a</html-el> element with a _class_ of <html-attr>ipc-metadata-list-summary-item\_\_t</html-attr> within the <html-el>div</html-el> elements with a _class_ of <html-attr>ipc-metadata-list-summary-item\_\_t</html-attr> (&#10103).
The _character name_ is in a <html-el>span</html-el> element within an <html-el>li</html-el> element with _class_ of <html-attr>ipc-inline-list\_\_item</html-attr>.
The _release year_ is also in a <html-el>span</html-el> within an <html-el>li</html-el> element with a _class_ of <html-attr>ipc-inline-list\_\_item</html-attr>. However the parent <html-el>div</html-el> element is not the same.
The extraction steps in `R`:

```r
film_title_list <- filmography_list %>%
    html_element("div.ipc-metadata-list-summary-item__tc") %>%
    html_element("a.ipc-metadata-list-summary-item__t")
film_titles <- film_title_list %>% html_text2()
film_urls <- film_title_list %>% html_attr("href")

character_list <- filmography_list %>%
    html_element("div.ipc-metadata-list-summary-item__tc") %>%
    html_element("li.ipc-inline-list__item") %>%
    html_element("span")
characters <- character_list %>% html_text2()

# rvest supports XPath, so this is also possible
# characters <- filmography_list
#   %>% html_elements(xpath="//div[@class='ipc-metadata-list-summary-item__tc']/ul/li/span")
#   %>% html_text2()

film_year_list <- filmography_list %>%
    html_element("div.ipc-metadata-list-summary-item__cc") %>%
    html_element("li.ipc-inline-list__item") %>%
    html_element("span")
film_years <- film_year_list %>% html_text2()

# Some additional information that can be used for filtering and selection
additional_info_list <- filmography_list %>% html_element("div.ipc-metadata-list-summary-item__tc")
additional_info_text <- additional_info_list %>% html_text2() %>% str_replace_all("\\n",";")

```

<br/>

A quick check shows that we have the data we need.
<ConsoleOutput consoleType='R Console' inputCode = {consoleOutput3} />
<br/>

We will need a few supporting fields for later use: an _id_, a _key_ for each film, and a _file name_ for each poster image, which we will use to download the poster images to a local folder.

```r
film_id = paste0("CE",str_pad(seq(1,length(film_titles)),2,side="left",pad="0"))
film_key = str_to_lower(gsub("[[:punct:] ]+","",film_titles))
# poster_file = paste0("posters//poster",film_id,".jpg"))
poster_file = file.path(poster.dir,paste0("poster",film_id,".jpg"))

# Save the poster images to a local folder
# For downloading a file from the web
# download.file(poster_list_url[1],poster_file[1], mode="wb")

# Since the file is local, file.copy
file.copy(paste0("imdb-clint/",str_replace_all(poster_urls,"%20"," ")),poster_file)
```

<br/>

Let's bring together all the elements in a data frame for use when creating our PowerPoint slide.

```r
clint_eastwood_filmography <- tibble(key=film_key,id=film_id,title=film_titles,film_url = film_urls,
             character = characters, release_year = film_years, poster_url = poster_urls,
             poster_file = poster_file, additional_info = additional_info_text)

# Save the data frame. I created the data folder in the project directory
write.table(clint_eastwood_filmography,file="./data/clint_eastwood_films.tsv",append=FALSE,quote=TRUE,sep="\t",row.names=FALSE)
```

<br/>

## Some more data

When [Box Office Mojo][9] was not owned by Amazon, it provided some interesting film related data sets, which I had downloaded. Now most of it behind a paywall. The [Movies Dataset on Kaggle][17] is an alternative. I used a combination of sources to create a small dataset of box office returns for most of the films. For this exercise, the accuracy of the numbers is not a significant concern. The data is stored in the _data_ folder along with the filmography.

The code and resulting data frame is available on [Github][12]

That was a bit of work! It does provide a glimpse into the effort it sometimes takes to create even a small bespoke dataset. In a real project, getting the right dataset with the right quality often constitutes the bulk of work required. But that's a discussion for another day. For now we have some basic data for creating a slide on _Clint Eastwood_. On to the slide.

Next up:

- [Part 3][4] - About time! We'll use the data to create a PowerPoint slide with some advanced animation and interaction.

Previously:

- [Part 1][1] - The basics of using R to create PowerPoint slides.

[1]: /blog/2023-08-05-r-and-powerpoint-part-1/ 'R and PowerPoint - P1 - The Basics'
[2]: http://www.imdb.org/ 'IMDB'
[3]: http://www.imdb.com/name/nm0000142/ 'Clint Eastwood'
[4]: /blog/2023-09-15-r-and-powerpoint-part-3/ 'R and PowerPoint - P3 - Creating a stellar slide'
[5]: https://www.tidyverse.org/ 'tidyverse'
[6]: https://rvest.tidyverse.org/ 'rvest'
[7]: https://stringr.tidyverse.org/ 'stringr'
[8]: https://github.com/hadley/plyr 'plyr'
[9]: https://github.com/asifsalam/r_and_powerpoint 'R and PowerPoint Github'
[11]: https://dplyr.tidyverse.org/ 'dplyr'
[12]: https://github.com/asifsalam/r_and_powerpoint 'R and PowerPoint - Github'
[15]: https://youtu.be/kCxBTPDiN08 'How to create amazing PowerPoint slides - video'
[16]: https://youtu.be/XoAanIO8zbM 'PowerPoint Slide created using R - video'
[17]: https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset 'The Movies Dataset'
