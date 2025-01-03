---
title: The data-driven enterprise &#151 Part 1(X) &#151 Why data & AI initiatives fail
preview_image: '/post_assets/0003/post-0003-image-02.png'
author: Asif Salam
id: 'L02157'
published: true
post_date: '2024-01-04'
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

I am using the _R Studio Desktop_, and we begin by loading the necessary packages.

```r
# install.packages(c("reticulate", "tidyverse"))
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
# use_python(pypath, required = T)
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

The [slide object][7] has a many attributes, but we'll just use a few. We can set the slide background and a few other properties, like the colour and font.

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

With the necessary parameters set, let's see how the images look on the slide.

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

<ShowImage
mediaType="image"
mediaPath={"/post_assets/0003/figure-1-static-slide.png"}
mediaNumber=1
mediaCaption="Slide with poster images"
/>

Looks good. We have created a slide with three rows of film poster images and some title elements, using code. But it's all very _static_. And lacks narrative. We can improve the slide with some interesting animation. And by some I mean, of course, a lot. But meaningful. And tasteful.

## Animation basics

PowerPoint has a number of animation types for shapes. Entrance, exit, emphasis and path are the main categories. Animation requires three things:

1. An object to animate, such as a shape
2. An effect to apply to the above mentioned shape
3. A timeline sequence in which the effect will be played. This dictates how and when the effect will be played.

With these, the following pattern can be used to create the animation effects:

1. Add an effect to the shape using the `Sequence.AddEffect` method of _Sequence_ object. An optional _trigger_ type can be included.
2. The `Effect` object can then be used to set the desired parameters of the effect, such as the duration, path, trigger, and trigger shape. The parameters available depend on the type of animation. Obviously.

In this exercise, we will use animations in two ways: _entrance_ animations in slideshow mode, and _interactive_ animations triggered by clicking on a shape. The _entrance_ animations go on the `MainSequence` of the animation timeline, and the _interactive_ animations are placed on a sequence defined using the `InteractiveSequences` property of the `TimeLine` object.

For the _interactive_ animations, including the ability sort the poster images by release date and film title should be interesting.

Let's create a couple functions for applying the different animation effects to the different shapes.

This first one applies motion effects to the major objects when the slideshow starts.

```r
animation_start <- function(seq,shape,effectID,trigger,from_x,from_y,to_x,to_y,duration,delay_time) {

    effect <- seq$AddEffect(Shape=shape,effectId=effectID,trigger=trigger)
    cat("EffectType: ",effect$EffectType)
    print(effect$EffectInformation)
    ani <- effect[["Behaviors"]]$Add(ms$msoAnimTypeMotion)
    # MotionEffect Object: https://msdn.microsoft.com/EN-US/library/office/ff745317(v=office.15).aspx
    aniMotionEffect <- ani[["MotionEffect"]]
    # https://msdn.microsoft.com/EN-US/library/office/ff745317.aspx
    aniMotionEffect[["FromX"]] <- from_x
    aniMotionEffect[["ToX"]] <- to_x
    aniMotionEffect[["FromY"]] <- from_y
    aniMotionEffect[["ToY"]] <- to_y
    effectTiming <- effect[["Timing"]]
    effectTiming[["Duration"]] <- duration
    effectTiming[["TriggerDelayTime"]] <- delay_time

}
```

<br/>

This function applies a trigger based path animation that moves an object along a path, when a trigger shape is clicked.

```r
animate_image <- function(seq,image,trigger,path,duration=1.5) {

    effect <- seq$AddEffect(Shape=image,effectID=ms$msoAnimEffectPathDown,
                            trigger=ms$msoAnimTriggerOnShapeClick)
    ani <- effect[["Behaviors"]]$Add(ms$msoAnimTypeMotion)
    aniMotionEffect <- ani[["MotionEffect"]]
    aniMotionEffect[["Path"]] <- path
    effectTiming <- effect[["Timing"]]
    effectTiming[["TriggerType"]] <- ms$msoAnimTriggerWithPrevious
    effectTiming[["TriggerShape"]] <- trigger
    effectTiming[["Duration"]] <- duration

}
```

<br/>

## Animating shapes - Entrance

Let's start with a basic _entrance_ animation, which should be familiar to most PowerPoint users. We need the `MainSequence` for these animations.

```r
# Get the main sequence of the slides timeline
seq_main <- slide1[["TimeLine"]][["MainSequence"]]

# Apply animation effects to the four title objects:
# Start off screen, descend from top (0 means original position)
animation_start(seq_main,slide_title,ms$msoAnimEffectDescend,ms$msoAnimTriggerWithPrevious,
                0, -20,0,0,1,0)
# Start off screen, slide to left
animation_start(seq_main,line1,ms$msoAnimEffectFly,ms$msoAnimTriggerAfterPrevious,
                100, diameter/slide_height,0,diameter/slide_height,1,0)
# Start off screen, fly in from left
animation_start(seq_main,circle1,ms$msoAnimEffectFly,ms$msoAnimTriggerWithPrevious,
                -100, diameter/slide_height,0,diameter/slide_height,1,0)
# Start off screen, fly in from the bottom
animation_start(seq_main,earnings_text,ms$msoAnimEffectFly,ms$msoAnimTriggerWithPrevious,
                0, 100,(slide_width-4*diameter)/slide_width,diameter/slide_height,1,0)
```

<br/>

Let's create the sort buttons - <html-attr>Title</html-attr> and <html-attr>Release Year</html-attr> and apply the _entrance_ animations to them. We will work on the path animations in the next section.

```r
# Add buttons which will sort the images by title or release year
# Some explanatory text
sort_text <- slide1[["Shapes"]]$AddShape(ms$msoShapeRectangle,slide_width - 400,10,100,40)
sort_range <- sort_text[["TextFrame"]][["TextRange"]]
sort_para <- sort_range[["ParagraphFormat"]]
sort_para[["Alignment"]] <- ms$ppAlignLeft
sort_range[["Text"]] <- "Sort posters by: "
sort_font <- sort_range[["Font"]]
sort_font[["Size"]] <- 14
sort_font[["Color"]] <- pp_rgb(233,174,27)
sort_text[["Width"]] <- 110
sort_text[["Height"]] <- 15
sort_text[["Top"]] <- image_height*image_offset - 20 - 3
#sort_text[["Left"]] <- slide_width - 205
sort_text[["Left"]] <- 0
sort_fill <- sort_text[["Fill"]]
sort_fill[["Visible"]] <- 0
sort_line <- sort_text[["Line"]]
sort_line[["Visible"]] <- 0

# Create buttons that will sort and animate the poster images - alphanumeric
button_alpha <- slide1[["Shapes"]]$AddShape(ms$msoShapeRectangle,slide_width - 300,10,100,40)
bta_fill <- button_alpha[["Fill"]]
bta_fill[["Visible"]] <- 1
bta_fill[["Transparency"]] <- 0.95
# bta_rgb <- bta_fill[["ForeColor"]][["RGB"]]

bta_line <- button_alpha[["Line"]]
bta_line[["ForeColor"]][["RGB"]] <- pp_rgb(243,211,129)

bta <- button_alpha[["TextFrame"]][["TextRange"]]
bta[["Text"]] <- "Title"
bta_font <- bta[["Font"]]
bta_font[["Size"]] <- 14
bta_font[["Color"]] <- pp_rgb(243,211,129)

button_alpha[["Width"]] <- 90
button_alpha[["Height"]] <- 15
button_alpha[["Top"]] <- image_height*image_offset - 20 - 3
button_alpha[["Left"]] <- sort_text[["Width"]] - 2

# Create buttons that will sort and animate the poster images - date
button_date <- slide1[["Shapes"]]$AddShape(ms$msoShapeRectangle,slide_width - 350+160,10,150,40)
btd <- button_date[["TextFrame"]][["TextRange"]]
btd[["Text"]] <- "Release Year"

btd_fill <- button_date[["Fill"]]
btd_fill[["Visible"]] <-1
btd_fill[["Transparency"]] <- 0.95
btd_line <- button_date[["Line"]]
btd_line[["ForeColor"]][["RGB"]] <- pp_rgb(243,211,129)

btd_font <- btd[["Font"]]
btd_font[["Size"]] <- 14
btd_font[["Color"]] <- pp_rgb(243,211,129)

button_date[["Width"]] <- 90
button_date[["Height"]] <- 15
button_date[["Top"]] <- image_height*image_offset - 20 - 3
button_date[["Left"]] <- sort_text[["Width"]] - 2 + button_alpha[["Width"]] + 20

```

<br/>

Animate the entrance of these elements as well:

```r
animation_start(seq_main,sort_text,ms$msoAnimEffectWipe,ms$msoAnimTriggerAfterPrevious,
                0, 0,0,0,1,0)
animation_start(seq_main,button_alpha,ms$msoAnimEffectDissolve,ms$msoAnimTriggerWithPrevious,
                0, 0,0,0,1,0)
animation_start(seq_main,button_date,ms$msoAnimEffectDissolve,ms$msoAnimTriggerWithPrevious,
                0, 0,0,0,1,0)
```

<br/>

## Animating shapes - trigger

We can now animate the poster images. Recall that the goal is to sort the images either by the title (alphanumeric) or the release year. When the appropriate sort button is clicked, the images should reorder themselves accordingly, and this movement should be animated. All the images moving at the same time to the new positions.

While we're at it, we can add a couple of enhancements. In data visualization, a tooltip can be used to to provide some [details on demand][13]. Let's create a tooltip with the film title, name of the character played by Clint Eastwood, and the release year. A hyperlink to the film's IMDB page could also be useful. Let's add that as well.

Since we want to sort in two different ways, we need two `InteractiveSequences`, one for the alphanumeric sort, and one for the release year sort.

```r
seq_alpha = slide1[["TimeLine"]][["InteractiveSequences"]]$Add()
seq_date = slide1[["TimeLine"]][["InteractiveSequences"]]$Add()
```

<br/>

The tricky bit is to get the paths right. The documentation on the motion animation refuses to help.

```r
for (i in 1:nrow(films)) {

    x = 1 + image_width * ((i-1) %% num_cols)
    y = image_height*image_offset + image_height * ((i-1) %/% num_cols)
    image <- images[[as.character(i)]]

    # The position of this title, when sorted alphanumerically. That will dictate the positioning, and therefore the path to follow
    index <- which(films$title[order(films$title)]==films$title[i]) - 1
        # Percentage of the slide_width the image must move in order to get to the new position
    l1 <- format((0 + image_width * (index %% num_cols) - x)/slide_width,digits=3)
    # Percentage of slide_height the image must move in order to get to the new position
    l2 <- format((image_height*image_offset + image_height * (index %/% num_cols) - y)/slide_height,digits=3)
    # Path - from current location (0,0) to new location (l1,l2)
    path <- paste0("M0,0 L",l1,",",l2)
    # cat("i: ",i," - index: ",index ," - path: ",path,"\n")

    # Set the motion path to new location on alphanumeric sort
    animate_image(seq_alpha,image,button_alpha,path,2.0)
    # Set the motion path back to original location on release year sort
    path <- paste0("M",l1,",",l2," L0,0")
    animate_image(seq_date,image,button_date,path,2.0)
    # All images must move at the same time
    trigger_seq <- ms$msoAnimTriggerWithPrevious
    # Except for the first one
    if (i == 1) trigger_seq <- ms$msoAnimTriggerAfterPrevious

    # Set the entrance animation
    animation_start(seq_main,image,ms$msoAnimEffectDissolve,trigger_seq,
                    0, 0,0,0,0.5,0.1*i)

    # Link to the film's site, and create a tooltip
    link <- image$ActionSettings(ms$ppMouseClick)[["Hyperlink"]]
    link[["Address"]] <- films$film_url[i]
    link[["ScreenTip"]] <- paste0(films$title[i],"\nCharacter: ",films$character[i],"\nRelease Year: ",films$release_year[i])
}
```

<br/>

<ShowImage
mediaType="image"
mediaPath={"/post_assets/0003/figure-2-sortable.png"}
mediaNumber=2
mediaCaption="Slide with poster images, and sort buttons"
/>

We now have a reasonable slide with some nice animations. The coordinated movement of the images on the click of a button is quite impressive. But there is one major flaw. If the wrong sort button is clicked, the images animate from the start of the path back to their current positions. Very tacky.

I fixed this is by removing the offending button and offering only the relevant sort button. So if the images are sorted by <html-attr>Title</html-attr>, only the <html-attr>Release Year</html-attr> is visible. The requires the addition of two more `InteractiveSequences` to move the buttons in and out.

```r
seq_alpha2 = slide1[["TimeLine"]][["InteractiveSequences"]]$Add()
seq_date2 = slide1[["TimeLine"]][["InteractiveSequences"]]$Add()
```

<br/>

Now we toggle the buttons. If a button is clicked, it disappears, the images sort themselves, and the other button appears. Both effects happen simultaneously. Problem solved. Or dissolved, since we use the _dissolve_ effect.

For the effect to work, we need to delete and recreate the buttons and the text, since they have some existing entrance animation, and we want the <html-attr>Release Year</html-attr> button to be hidden since the starting sort is by release year. It should appear after the <html-attr>Title</html-attr> button has been clicked. Also, the buttons should be positioned on top of each other, so they both appear and disappear at the same location.

```r
button_alpha$Delete()
button_date$Delete()
sort_text$Delete()

# Recreate the text and buttons, on the same location
sort_text <- slide1[["Shapes"]]$AddShape(ms$msoShapeRectangle,slide_width - 400,10,100,40)
sort_range <- sort_text[["TextFrame"]][["TextRange"]]
sort_para <- sort_range[["ParagraphFormat"]]
sort_para[["Alignment"]] <- ms$ppAlignLeft
sort_range[["Text"]] <- "Sort posters by: "
sort_font <- sort_range[["Font"]]
sort_font[["Size"]] <- 14
sort_font[["Color"]] <- pp_rgb(233,174,27)
sort_text[["Width"]] <- 110
sort_text[["Height"]] <- 15
sort_text[["Top"]] <- image_height*image_offset - 20 - 3
#sort_text[["Left"]] <- slide_width - 205
sort_text[["Left"]] <- 0
sort_fill <- sort_text[["Fill"]]
sort_fill[["Visible"]] <- 0
sort_line <- sort_text[["Line"]]
sort_line[["Visible"]] <- 0

button_alpha <- slide1[["Shapes"]]$AddShape(ms$msoShapeRectangle,120,150,120,30)
bta <- button_alpha[["TextFrame"]][["TextRange"]]
bta[["Text"]] <- "Title"

bta_line <- button_alpha[["Line"]]
bta_line[["ForeColor"]][["RGB"]] <- pp_rgb(243,211,129)

bta_fill <- button_alpha[["Fill"]]
bta_fill[["Visible"]] <- 1
bta_fill[["Transparency"]] <- 0.95
bta_rgb <- bta_fill[["ForeColor"]][["RGB"]]

bta_font <- bta[["Font"]]
bta_font[["Size"]] <- 14
bta_font[["Color"]] <- pp_rgb(243,211,129)

button_alpha[["Width"]] <- 90
button_alpha[["Height"]] <- 15
button_alpha[["Top"]] <- image_height*image_offset - 20 - 3
button_alpha[["Left"]] <- sort_text[["Width"]] - 2

button_date[["Width"]] <- 90
button_date[["Height"]] <- 15
button_date[["Top"]] <- image_height*image_offset - 20 - 3
#button_date[["Left"]] <- slide_width - button_date[["Width"]] - 10
button_date[["Left"]] <- sort_text[["Width"]] - 2

button_date <- slide1[["Shapes"]]$AddShape(ms$msoShapeRectangle,200+160,100,150,30)
btd <- button_date[["TextFrame"]][["TextRange"]]
btd[["Text"]] <- "Release Year"

btd_fill <- button_date[["Fill"]]
btd_fill[["Visible"]] <- 1
btd_fill[["Transparency"]] <- 0.95

btd_line <- button_date[["Line"]]
btd_line[["ForeColor"]][["RGB"]] <- pp_rgb(243,211,129)

btd_font <- btd[["Font"]]
btd_font[["Size"]] <- 14
btd_font[["Color"]] <- pp_rgb(243,211,129)

button_date[["Width"]] <- 90
button_date[["Height"]] <- 15
button_date[["Top"]] <- image_height*image_offset - 20 - 3
button_date[["Left"]] <- sort_text[["Width"]] - 2

# Entrance animation for the text and title button
animation_start(seq_main,sort_text,ms$msoAnimEffectWipe,ms$msoAnimTriggerAfterPrevious,
                0, 0,0,0,1,0)
animation_start(seq_main,button_alpha,ms$msoAnimEffectDissolve,ms$msoAnimTriggerWithPrevious,
                0, 0,0,0,1,0)

toggle_button <- function(seq,button1,button2,duration=1.5) {
    # Enable exit effect on button1 when it is clicked
    # https://learn.microsoft.com/en-us/office/vba/api/powerpoint.effect
    effect <- seq$AddEffect(Shape=button1,effectId=ms$msoAnimEffectDissolve,
                            trigger=ms$msoAnimTriggerOnShapeClick)
    # https://learn.microsoft.com/en-us/office/vba/api/powerpoint.effect.exit
    effect[["Exit"]] <- 1
    effectTiming <- effect[["Timing"]]
    effectTiming[["TriggerType"]] <- ms$msoAnimTriggerOnShapeClick
    effectTiming[["TriggerShape"]] <- button1
    effectTiming[["Duration"]] <- duration

    # Disable the exit effect on button2 when button1 is clicked
    effect <- seq$AddEffect(Shape=button2,effectId=ms$msoAnimEffectDissolve,
                            trigger=ms$msoAnimTriggerOnShapeClick)
    effect[["Exit"]] <- 0
    effectTiming <- effect[["Timing"]]
    effectTiming[["TriggerType"]] <- ms$msoAnimTriggerWithPrevious
    effectTiming[["TriggerShape"]] <- button1
    effectTiming[["Duration"]] <- duration
}

# Call the function for both buttons
toggle_button(seq_alpha2,button_alpha,button_date,1)
toggle_button(seq_date2,button_date,button_alpha,1)
```

<br/>

Since buttons had been deleted, the animations have to be applied again to the images.

```r
for (i in 1:nrow(films)) {

    x = 1 + image_width * ((i-1) %% num_cols)
    y = image_height*image_offset + image_height * ((i-1) %/% num_cols)
    image <- images[[as.character(i)]]

    # The position of this title, when sorted alphanumerically. That will dictate the positioning, and therefore the path to follow
    index <- which(films$title[order(films$title)]==films$title[i]) - 1
    # Percentage of the slide_width the image must move in order to get to the new position
    l1 <- format((0 + image_width * (index %% num_cols) - x)/slide_width,digits=3)
    # Percentage of slide_height the image must move in order to get to the new position
    l2 <- format((image_height*image_offset + image_height * (index %/% num_cols) - y)/slide_height,digits=3)
    # Path - from current location (0,0) to new location (l1,l2)
    path <- paste0("M0,0 L",l1,",",l2)
    cat("i: ",i," - index: ",index ," - path: ",path,"\n")
    # Set the motion path to new location on alphanumeric sort
    animate_image(seq_alpha,image,button_alpha,path,2.0)
    # Set the motion path back to original location on release year sort
    path <- paste0("M",l1,",",l2," L0,0")
    animate_image(seq_date,image,button_date,path,2.0)

}

# Save the PowerPoint file
presentation$SaveAs(output_file)
```

<br/>

The trigger buttons and animations now function as expected and the slide looks good. But it does have a rather noticeable space in the top half. I created an sortable bar chart of the box office earnings of the films there. The code to construct the bar chart is included in a the file that constructs the full slide, [here][12], but you now have the knowledge to create create it yourself. Give it a shot.

This is what the completed slide looks like.
<ShowImage
mediaType="image"
mediaPath={"/post_assets/0003/figure-3-complete-slide.png"}
mediaNumber=3
mediaCaption="Complete slide, with sortable earnings bar chart"
/>

<br/>

And this is a short video with the interactive elements and animations.
<ShowImage
mediaType="video"
mediaPath={"/post_assets/0003/P3-B-Complete-Slide.mp4"}
mediaNumber=1
mediaCaption="Interactvie elements and animations"
/>

Download the [R code for this part here][11], and the [resulting PowerPoint slide here][5].

The complete slide with the animated poster images and earnings bar chart is [available here][6].

[This Github repository][3] contains the R project with the code and persentations for each part.

Previous posts:

- [Part 1][1] - The basics
- [Part 2][2] - Getting some data

[1]: /blog/2023-08-05-r-and-powerpoint-part-1/ 'R and PowerPoint - P1 - The Basics'
[2]: /blog/2023-08-30-r-and-powerpoint-part-2 'R and PowerPoint - P2 - Getting the Data'
[3]: https://github.com/asifsalam/r_and_powerpoint 'R and PowerPoint - Github'
[4]: https://raw.githubusercontent.com/asifsalam/r_and_powerpoint/main/output/P1-Basics.pptx 'P1-Basics.pptx'
[5]: https://raw.githubusercontent.com/asifsalam/r_and_powerpoint/main/output/P3-A-Basic-Slide-Step-by-Step.pptx 'P3-A-Basic-Slide-Step-by-Step.pptx'
[6]: https://raw.githubusercontent.com/asifsalam/r_and_powerpoint/main/output/P3-B-Complete-Slide.pptx 'P3-B-Complete-Slide.pptx'
[7]: https://learn.microsoft.com/en-us/office/vba/api/powerpoint.slide 'Slide Object'
[11]: https://raw.githubusercontent.com/asifsalam/r_and_powerpoint/main/P3-A-Basic-Slide-Step-By-Step.R 'Part 3A - Basic Slide - Step by Step'
[12]: https://raw.githubusercontent.com/asifsalam/r_and_powerpoint/main/P3-B-Complete-Slide.R 'Part 3B - Complete Slide'
[13]: https://doi.org/10.1109/VL.1996.545307 'The eyes have it, by Ben Schneiderman'
[14]: http://www.imdb.org/ 'IMDB'
[15]: http://www.imdb.com/name/nm0000142/ 'Clint Eastwood'
[16]: https://www.tidyverse.org/ 'tidyverse'
[17]: https://rvest.tidyverse.org/ 'rvest'
[18]: https://stringr.tidyverse.org/ 'stringr'
[19]: https://dplyr.tidyverse.org/ 'dplyr'
