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

### Minor data prep

A bit of preparation is required for combining the box office revenue data with the films data.

```r
# Remove tv series
films <- clint_films %>% filter(!grepl("series",str_to_lower(additional_info)))
# Remove some films where the roles are uncredited - American Sniper, Casper, Breezy
films <- films[-which(films$key %in% c("americansniper","casper","breezy")),]

film_revenue <- left_join(films,box_office[,c("key","adjusted_gross")],by="key")
film_revenue$adjusted_gross[film_revenue$key=="crymacho"] <- 16510734
film_revenue$adjusted_gross[film_revenue$key=="themule"] <- 174800000
# clint_films_revenue$adjusted_gross[clint_films_revenue$key=="breezy"] <- 200000

film_revenue <- film_revenue %>% filter(!is.na(adjusted_gross)) %>% filter(adjusted_gross > 0) %>% arrange(desc(adjusted_gross))

```

<br/>

We are left with 60 films.
<ConsoleOutput consoleType='R Console' inputCode = {consoleOutput1} />
<br/>

## Create the PowerPoint Slide

We can now construct the slide. We begin by loading the necessary functions and setting up some parameters.

```r
actor_name <- "Clint Eastwood"

# Set up pywin
# Must install pywin32 through > pip install pywin32
# Use this if required
# pypath <- "C:/Program Files/Python310/"
use_python(pypath, required = T)
pywin <- import("win32com.client")

# Some prep. See Part 1.
# Create the RGB function
pp_rgb <- function(r,g,b) {
    return(r + g*256 + b*256^2)
}

# Load the Microsoft parameters
source("mso.txt")
# Some utility functions
source("utility_functions.R")
```

<br/>

### Create an blank slide

Start PowerPoint and create an empty slide, from R.

```r
# Create the PowerPoint slide
pp = pywin$Dispatch('Powerpoint.Application')
pp[["Visible"]] = 1
presentation <- pp[["Presentations"]]$Add()

#slide1 <- presentation[["Slides"]]$Add(1,ms$ppLayoutBlank)
slide1 <- presentation[["Slides"]]$Add(1,ms$ppLayoutTitleOnly)
# The slide dimensions will be needed to place objects
slide_width <- presentation[["PageSetup"]]$SlideWidth
slide_height <- presentation[["PageSetup"]]$SlideHeight

```

<br/>

### Set some slide properties

The [slide object][4] has a many attributes, but we'll just use a few. We can set the slide background and a few other properties, like the colour and font.

```r
# Set some slide attributes
slide_color <- slide1[["ColorScheme"]]$Colors(ms$ppBackground)
slide_color[["RGB"]] <- pp_rgb(0,0,0)

# Create a background for the slide
img_file <- gsub("/","\\\\",paste(getwd(),"/","posters/clint_background_1.png",sep=""))
bg_image <- slide1[["Shapes"]]$AddPicture(img_file,TRUE,FALSE,0,0,slide_width,slide_height)
bg_rect <- slide1[["Shapes"]]$AddShape(ms$msoShapeRectangle,0, 0,slide_width, slide_height)
bg_rect_fill <- bg_rect[["Fill"]]
bg_rect_fill[["ForeColor"]][["RGB"]] <- pp_rgb(102, 25, 13)
bg_rect_fill[["Transparency"]] <- 0.1
bg_rect_line <- bg_rect[["Line"]]
bg_rect_line[["ForeColor"]][["RGB"]] <- pp_rgb(102,25,13)

slide_title <- slide1[["Shapes"]][["Title"]]
slide_title_color <- slide1[["ColorScheme"]]$Colors(ms$ppTitle)
slide_title_color[["RGB"]] <- pp_rgb(243,211,129)
slide_title$ZOrder(ms$msoBringToFront)

```

<br/>

### Slide title

Let's give the slide a clever title: **Filmography: Clint Eastwood**

```r
# Add a title
# AutoSize: https://msdn.microsoft.com/EN-US/library/office/ff745311(v=office.15).aspx
slide_title_frame <- slide_title[["TextFrame"]]
slide_title_frame[["AutoSize"]] <- ms$ppAutoSizeNone
slide_title_frame[["AutoSize"]] <- ms$ppAutoSizeShapeToFitText

# Place the title on thhe edge
slide_title[["Top"]] <- 0
slide_title[["Left"]] <- 0
title_text <- slide_title[["TextFrame"]][["TextRange"]]
title_text[["Text"]] <- paste("Filmography: ",actor_name,sep="")
title_font <- title_text[["Font"]]
title_font[["Color"]][["RGB"]] <- pp_rgb(243,211,129)
title_font[["Size"]] <- 36
title_font[["Name"]] <- "Calibri"

```

<br/>

### Some decorative elements

Let's add line and a circle that shows Clint Eastwood's calculated total box office earnings (approximate, of course).

```r
diameter <- 100
# Add a line
line1 <- slide1[["Shapes"]]$AddLine(0,diameter/2,slide_width,diameter/2)
line1_attr <- line1[["Line"]]
line1_attr[["Weight"]] <- 1
line1_attr[["ForeColor"]][["RGB"]] <- pp_rgb(243,211,129)

# Add a circle, showing total box office earnings
circle1 <- slide1[["Shapes"]]$AddShape(ms$msoShapeOval,slide_width-diameter,0,diameter,diameter)
circle1[["Top"]] <- 0
circle1[["Left"]] <- slide_width - diameter
circle1[["Width"]] <- diameter
circle1[["Height"]] <- diameter
circle1_color <- circle1[["Fill"]]
circle1_color[["ForeColor"]][["RGB"]] <- pp_rgb(243,211,129)

# Calculate the total earnings of the movies from the data set
total_earnings <- format(sum(as.numeric(film_revenue$adjusted_gross))/1000000000,digits=3)
circle_frame <- circle1[["TextFrame"]]
circle_frame[["MarginTop"]] <- 0
circle_frame[["MarginLeft"]] <- 0
circle_frame[["MarginRight"]] <- 0
circle_frame[["MarginBottom"]] <- 0
circle_text <- circle1[["TextFrame"]][["TextRange"]]
circle_text[["Text"]] <- paste(total_earnings,"BUSD","")
circle_font <- circle_text[["Font"]]
circle_font[["Name"]] <- "Calibri"
circle_font[["Size"]] <- 24
circle_font[["Color"]][["RGB"]] <- pp_rgb(102,25,13)
circle_font[["Bold"]] <- 1
circle_line <- circle1[["Line"]]
circle_line[["Weight"]] <- 2
circle_line[["ForeColor"]][["RGB"]] <- pp_rgb(102,25,13)

earnings_text <- slide1[["Shapes"]]$AddTextbox(ms$msoTextOrientationHorizontal,
                                               slide_width-4*diameter,diameter/2-25,diameter*3+1,20)
earnings_range <- earnings_text[["TextFrame"]][["TextRange"]]
earnings_range[["Text"]] <- "Total Box Office Earnings"
earnings_font <- earnings_range[["Font"]]
earnings_font[["Color"]] <- pp_rgb(243,211,129)
earnings_font[["Size"]] <- 20

# When you are returning an object, you need to create a variable, and then set the properties
# This doesn't work
# earnings_range[["ParagraphFormat"]][["Alignment"]] <- ms$ppAlignRight
earnings_para <- earnings_range[["ParagraphFormat"]]
earnings_para[["Alignment"]] <- ms$ppAlignRight
```

### Insert the poster images

Placing the poster images manually would be really tedious, and doing it more than once, well, that would just not get done. With bit of math, we can create a pattern that can be repeated with little effort. To the images precisely on the slide, we need to set some parameters.

There are 60 images, so 20 images in three rows should work.

```r
num_cols <- 20
num_rows <- ceiling(nrow(films)/num_cols)

# Based on the number of rows and columns, calculate the image height and width
image_width=floor(slide_width/num_cols)

# We want to leave some space on the top for other things. The bottom half will contain the images.
image_offset <- 3
image_height=floor(slide_height/(num_rows+image_offset))

# We'll store a reference to the images in order to manipulate them later
images <- list()
image <- NULL

```

<br/>

With the necessary parameters set, let's see images look on the slide.

```r
for (i in 1:nrow(films)) {
    x = 0 + image_width * ((i-1) %% num_cols)
    y = image_height*image_offset + image_height * ((i-1) %/% num_cols)
	# Assuming that the poster folder is in the working directory are in the working directory
    image_file <- gsub("/","\\\\",paste(getwd(),"/",films$img_file[i],sep=""))
    images[[as.character(i)]] <- slide1[["Shapes"]]$AddPicture(image_file,TRUE,FALSE,x+1,y+1,image_width-2,image_height-2)
    image <- images[[as.character(i)]]

    line <- image[["Line"]]
    line[["Style"]] <- ms$msoLineSingle
    line[["Weight"]] <- 2
    line[["ForeColor"]][["RGB"]] <- pp_rgb(243,211,129)
}
```

<br/>

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
