---
title: Create amazing PowerPoint slides using R &#151 Part 3(3) &#151 Getting some data
preview_image: '/img/images/geometric-pattern-07.jpg'
author: Asif Salam
id: 'L02157'
published: true
post_date: '2023-09-15'
excerpt: 'Automate the creation of PowerPoint presentations with R, reticulate, python and pywin32. In this final post, we put evreything together and create a stellar slide.'
categories:
  - 'rstats'
  - 'method'
  - 'tutorial'
  - 'my-post'
---

<script>
  import ShowImage from "$lib/components/show-image.svelte"
  import ConsoleOutput from "$lib/components/console-output.svelte"
  const consoleOutput1 = ['> nrow(films)',
'[1] 60']
</script>

<br/>

Time to finally create the slide. [Part 1][1] was about understanding how to use `reticulate` & `pywin32` to manipulate _PowerPoint_, and the optional [Part 2][2] was about scraping some data about _Clint Eastwood's_ films from [IMDB][14].

Let's put it all together.

## Setup

We begin by loading the necessary libraries in your .

```r
library(reticulate)
library(tidyverse)
```

## Data and Images

We will, of course, use the data and images gathered in [Part 2][2]. To create the slide we need:

1. Clint Eastwood's filmography data, in the <html-attr>/data</html-attr> sub-folder
2. Box office return data, in the <html-attr>/data</html-attr> sub-folder
3. Poster images for all the films, in the <html-attr>/posters</html-attr> sub-folder

If you followed parts [1][1] & [2][2], the data we will use, <a href="https://raw.githubusercontent.com/asifsalam/r_and_powerpoint/main/data/clint_eastwood_films.tsv">Clint Eastwood's filmography (tsv)</a>, and <a href="https://raw.githubusercontent.com/asifsalam/r_and_powerpoint/main/data/clint_eastwood_box_office.csv">box office receipts (csv)</a> should be available in the **R** environment, and the film poster images stored in a folder in the working directory. If not, the data and the images are available on [Github][3]. Clone the repo, and copy the two folders into your working directory.

```R
# Download and read in the data files
# If downloading the files from the github repo
# download.file("https://raw.githubusercontent.com/asifsalam/r_and_powerpoint/main/data/clint_eastwood_films.tsv",
#              destfile = "clint_eastwood_films.tsv")
# download.file("https://raw.githubusercontent.com/asifsalam/r_and_powerpoint/main/data/clint_eastwood_box_office.csv",
#              destfile = "clint_eastwood_box_office.csv")

# Output directory and file to save the created PowerPoint presentation
# Requires some path gymnastics to get this to work. The R path strings don't seem to work.
output_dir <- file.path(getwd(),"output")
# Create the directory
dir.create(file.path(getwd(), output_dir))
output_file <- gsub("/","\\\\",file.path(output_dir,"clint_eastwood_filmogrpahy.pptx"))

clint_films <- read.table("./data/clint_eastwood_films.tsv",header=TRUE, stringsAsFactors=FALSE)
box_office <- read.table("./data/clint_eastwood_box_office.csv",header=TRUE, stringsAsFactors=FALSE)
```

<br/>

The `clint_films` data frame includes the title, year of release, name of the character played by <em>Clint Eastwood</em>, the <em>url</em> of the IMDB film page, and the local path to the poster image file. The `box_office` data frame has the box office receipts for most of the films.

The <html-attr>/posters</html-attr> folder, with the poster images, was created in [Part 2][2]. Make sure the folder and images exist in the project directory, either by going through [Part 2][2] or by cloning the [Github repo][3], and copying the folders to the working directory.

[1]: /blog/2023-08-05-r-and-powerpoint-part-1/ 'R and PowerPoint - P1 - The Basics'
[2]: /blog/2023-08-30-r-and-powerpoint-part-2 'R and PowerPoint - P2 - Scraping Data'
[3]: https://github.com/asifsalam/r_and_powerpoint 'R and PowerPoint - Github'
[4]: https://raw.githubusercontent.com/asifsalam/r_and_powerpoint/main/output/P1-Basics.pptx 'P1-Basics.pptx'
[5]: https://raw.githubusercontent.com/asifsalam/r_and_powerpoint/main/output/P3-A-Basic-Slide-Step-by-Step.pptx 'P3-A-Basic-Slide-Step-by-Step.pptx'
[6]: https://raw.githubusercontent.com/asifsalam/r_and_powerpoint/main/output/P3-B-Complete-Slide.pptx 'P3-B-Complete-Slide.pptx'
[7]: https://learn.microsoft.com/en-us/office/vba/api/powerpoint.slide 'Slide Object'
[8]: https://msdn.microsoft.com/EN-US/library/office/ff744153(v=office.15).aspx 'Property enumerations'
[9]: https://raw.githubusercontent.com/asifsalam/r_and_powerpoint/main/P1-The-Basics.R 'Part 1 - The Basics'
[10]: https://raw.githubusercontent.com/asifsalam/r_and_powerpoint/main/P2-Scraping-Data.R 'Part 2 - Scraping Data'
[11]: https://raw.githubusercontent.com/asifsalam/r_and_powerpoint/main/P3-A-Basic-Slide-Step-By-Step.R 'Part 3A - Basic Slide - Step by Step'
[12]: https://raw.githubusercontent.com/asifsalam/r_and_powerpoint/main/P3-B-Complete-Slide.R 'Part 3B - Complete Slide'
[13]: https://doi.org/10.1109/VL.1996.545307 'The eyes have it, by Ben Schneiderman'
[14]: http://www.imdb.org/ 'IMDB'
[15]: http://www.imdb.com/name/nm0000142/ 'Clint Eastwood'
[16]: https://www.tidyverse.org/ 'tidyverse'
[17]: https://rvest.tidyverse.org/ 'rvest'
[18]: https://stringr.tidyverse.org/ 'stringr'
[19]: https://dplyr.tidyverse.org/ 'dplyr'
[20]: http://xxx 'R code for the bar chart'
