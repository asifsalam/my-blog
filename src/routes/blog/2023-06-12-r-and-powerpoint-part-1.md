---
title: Create amazing PowerPoint slides using R - Part 1(3) - The basics
preview_image: '/img/images/geometric-pattern-07.jpg'
author: Asif Salam
id: 'L02141'
published: true
post_date: '2023-06-22'
excerpt: 'Automate the creation of PowerPoint presentations with R, reticulate, python and pywin32. This post, the first of three, introduces the basics.'
categories:
  - 'rstats'
  - 'method'
  - 'tutorial'
  - 'my-post'
---

<script>
  import ShowImage from "$lib/components/show-image.svelte"
  // import CodeHighlight from "$lib/components/code-highlight.svelte"
</script>

## Introduction

Companies talk about "data-driven decision making", but a slick PowerPoint deck is how decisions are really made. A good slide can find its way into all kinds of decision material, and be viewed by many more decision-makers than any dashboard. Even if you use **R** (or **Python**) for data analysis, PowerPoint is how you distribute and communicate results, so learning to to create those decks as part of the analysis workflow can be worthwhile. Recreating and customizing slides based on scenarios or updates to the analysis becomes fairly straightforward, with effective version control and reproducibility. Beyond efficiency and repeatability, programmatic access enables you to do things that just would not be possible with point and click.

The [**Windows COM**][2] is an interface standard that allows applications such as **Excel**, **PowerPoint** and **Word** to expose functionality to other applications, such as **Python** or **R**. The [**pywin**][3] package enables **Python** to communicate to other applications through _COM_. [In this talk][1], S Anand uses **Python** to create some impressive effects in a **PowerPoint** slide using **Python**, scraping data from [_IMDB_][10] and creating a PowerPoint slide using the data. [**RDCOMClient**][4] by Duncan Temple Lang provided similar functionality for **R**. Unfortunately that project is not maintained regularly, and is not part of the CRAN distribution. It can also be somewhat challenging to load, and there is no support available.

The [**`reticulate`**][5] package, however, provides an alternative way of accessing the [`COM`][2]. It provides **R** with an interface to **Python**, which means that the [**`pywin`**][3] package can be used with **R**.

In this series of 3 posts, we will use these tools to create a **PowerPoint** slide with **R**. We will try to recreate some of the elements of [S Anand's talk][1], and add a few things, with a focus on interaction and animation. We will go through the basics of accessing methods and properties of **PowerPoint VBA** objects ([Part 1][30]), scrape data on Clint Eastwood's movies from [IMDB][13] ([Part 2][31]), and use it to create a slide ([Part 3][32]). The end result should be a fairly complex, and fun, **PowerPoint** slide with Clint Eastwood's filmography.

The goal here is to learn and explore a bit so there will be code and animation that's not strictly necessary.

([Here's a short video of what we're aiming for][16], [how it was created][15] and [the R code.][17])

(Clearly **PowerPoint VBA** has a powerful animation engine, and the [object model][12] allows you to programmatically manipulate almost everything. The [Microsoft documentation][11], however, seems to be organized as a mystery.)

In this first part, we look at the basics of manipulating **PowerPoint VBA** with **R**.

Let's get started.

## Setup

I am using:

- Windows 10 Version 22H2 (64bit)
- Microsoft PowerPoint Version 2304 (64bit)
- R Version 4.3.0
- RStudio Version 2023.06.0

We also need:

- `Python`
- pywin32

If you don't have `Python`, there are a few ways of installing it, but I think the [official site][15] is simple enough. If everything goes well, both `Python` and `pip` should be in the Windows `PATH`. The [pywin32 documentation][3] recommends installation via `pip`, so open a terminal (`Powershell`, or the `Command Prompt`), and type the following:

```console
> pip install --upgrade pywin32
```

I am using:

- Python 3.10.6

For now we just need one R package:

- [`reticulate`][5]

There is more information on the `reticulate` package [here](https://rstudio.github.io/reticulate/), but we only need the `import()` function that allows us to import the `pywin32` module for the `COM` client.

Load the package (I use RStudio):

```R
install.packages("reticulate")
library(reticulate)
```

You may need to specify the path to the _Python_ directory, if it is not in the windows **_PATH_**.

```R
# Use this if necessary
# pypath <- "C:/path_to_python_dir/"
# use_python(pypath, required = T)
pywin <- import("win32com.client")
```

For the purposes of this post, we only need to understand how to do three things:

- Starting a new instance of an application, `PowerPoint` in this case: `pywin$Dispatch('PowerPoint.Application')` <br>
  This provides access to the objects, methods and properties exposed by the application API:
- Executing methods, which takes the form: `myObj$methodName(arg1,arg2,arg3,...)`
- Setting properties, which takes the form: `myObj[["Property"]] = TRUE`

With these basic capabilities, we can access and manipulate the objects exposed by the PowerPoint API. (More in-depth information is provided [here][16] and [here][17].)

Let's create a new `PowerPoint` presentation from `R`.

Execute the following commands in `R`.

```r
# Start up PowerPoint
pp <- pywin$Dispatch("Powerpoint.Application")

# Make the application visible
pp[["Visible"]] = 1

# Add a new presentation
presentation <- pp[["Presentations"]]$Add()

# The presentation is empty.  Add a slide to it.
# We'll get to the enumerated constants defined by Microsoft.
# For now, let's use the value (12) that results in a blank layout.
# slide1 <- presentation[["Slides"]]$Add(1,ms$ppLayoutBlank)
slide1 <- presentation[["Slides"]]$Add(1,12)
```

This will create a presentation with a blank slide. We will use this slide in the next sections.

The critical part is, of course, knowing what methods and properties are available. This is where the [PowerPoint Developer Reference][5] is a handy, but not terribly user-friendly, resource. (You can also get this information from the `Object Browser` in the VBA editor, as shown in figure 1. below).

<ShowImage
mediaType = "image"
mediaPath={"/post_assets/0001/vba_object_browser.png"}
mediaNumber=1
mediaCaption="VBA Object Browser"
/>
<br />

## Using VBA to create and animate shapes

To understand how to go from VBA to R, let's recreate one of the basic examples in some of the older, and somewhat better, PowerPoint documentation, [Applying Animations to Shapes in Office 2010][7], which works with the latest MS Office versions as well. Let's walk through the VBA code, implement it in `PowerPoint` and see what it does. We will then implement the same code in `R`.

The VBA code:

```vb
Sub TestPickupAnimation()
  With ActivePresentation.Slides(1)
    Dim shp1, shp2, shp3 As Shape
    Set shp1 = .Shapes.AddShape(msoShape12pointStar, 20, 20, 100, 100)
    .TimeLine.MainSequence.AddEffect shp1, msoAnimEffectFadedSwivel, ,
    msoAnimTriggerAfterPrevious
    .TimeLine.MainSequence.AddEffect shp1, msoAnimEffectPathBounceRight, ,
    msoAnimTriggerAfterPrevious
  End With
End Sub
```

<br/>

Let's go through the code in this module.

- `ActivePresentation.Slides(1)` [(documentation)][22] selects the first slide in the current presentation
- Three variables of the type `Shape` [(documentation)][19] are defined. The `Shape` object represents a single shape on a slide, and has a set of associated methods and properties.
- `shp1` is created using a method on the `Shapes` (documentation)[20] object, which represents all the `Shape` objects on the specified slide. The `AddObjects` method adds a shape and returns a `Shape` object. In this case a 12 pointed star is added, positioned 20 points to the left, 20 points from the top, with a width and height of 100 points.
- The `TimeLine` object [(documentation)][21] is a key component for animation sequences on a slide. The object is used to add an effect to `shp1` on the main animation sequence of the slide. Which implies that additional animation sequences can be added to a slide. Three animation effects are added to `shp1`, _swivel, bounce, and spin,_ each triggered after the previous one.
- The `PickupAnimation` [(documentation)][18] method of the `Shape` object picks up the animation from the `shp1` object.
- Finally, `shp2` and `shp3`, an hexagon and a cloud, are created, shifted along the x-axis, and the animation sequence from `shp1` is applied to each.

In summary, three objects are created, and the same animation sequence is applied to each. In presentation mode, the three animation effects will be auto-triggered in sequence which they were added, for each object, also in sequence.

[This Microsoft article][13] has the step-by-step instructions, on creating a standard VBA module, inserting the code and running it. We can use the deck created earlier to execute the code and we get these shapes and animation (Video 1).

<ShowImage
mediaType="video"
mediaPath={"/post_assets/0001/animation_1.mp4"}
mediaNumber=2
mediaCaption="This is a video"
/>

## Using R to create and animate shapes

Now let's do the same thing with `R`.

The VBA code above has constants that Microsoft has defined for each element of the presentation, such as shape, animation, trigger, and so on. [This site][23] has the enumerations listed. I created [a file][24], which we can use to load the enumerations into `R`. (You can also download it to your working directory and load it from there.)

Assuming that the statements in the earlier `R` script was successfully executed, and the presentation exists, delete the shapes created with the VBA code so `slide1` is empty. The script below is the `R` equivalent of the statements in the VBA code above. Execute the script, preferably one statement at a time in order to see what each statement accomplishes.

```r
# Read in the enumerations into the "ms" variable
mso_url <- "https://raw.githubusercontent.com/asifsalam/PowerPoint_from_R/master/mso.txt"

# If you want to download the file, uncomment the following code:
# download(mso_url)
# source("mso.txt")
source(mso_url)

# Add the first to slide 1
shp1 <- slide1[["Shapes"]]$AddShape(ms$msoShape12pointStar,20,20,100,100)
# Add the swivel effect to the shape, on the main timeline
slide1[["TimeLine"]][["MainSequence"]]$AddEffect(shp1,ms$msoAnimEffectFadedSwivel,
                                                        trigger=ms$msoAnimTriggerAfterPrevious)
# Add the bounce effect
slide1[["TimeLine"]][["MainSequence"]]$AddEffect(shp1,ms$msoAnimEffectPathBounceRight,
                                                        trigger=ms$msoAnimTriggerAfterPrevious)
# Add the spin effect
slide1[["TimeLine"]][["MainSequence"]]$AddEffect(shp1,ms$msoAnimEffectSpin,
                                                        trigger=ms$msoAnimTriggerAfterPrevious)
# Pickup the animation
shp1$PickupAnimation()

# Add the second shape to slide 1
shp2 <- slide1[["Shapes"]]$AddShape(ms$msoShapeHexagon,100,20,100,100)
# Apply the sequence of animations to shape 2
shp2$ApplyAnimation()

# Add the third shape to slide 1
shp3 <- slide1[["Shapes"]]$AddShape(ms$msoShapeCloud,180,20,100,200)
# Apply the sequence of animation to shape 3
shp3$ApplyAnimation()

```

This should create, as previously, a slide with the three shapes. Again, if you go into animation mode, the shapes should appear, with the animations triggered.

Let's try a few more things. The [`shape` object comes with a long list of properties and methods][19]. Let's see how to use some of them. We'll add text, and change colors.

Each [`shape` object][19] has an associated [`TextFrame property`][25], which returns an object containing all the text related elements of the shape.

```r
# Add text to the shapes.  While this works, R files a complaint
shp1[["TextFrame"]][["TextRange"]][["Text"]] <- "Shp1"

# This way seems to function better
shp1_tr <- shp1[["TextFrame"]][["TextRange"]]
shp1_tr[["Text"]] <- "ONE"
```

Let's set some shape attributes.  
The [`Fill`][26] property is used for the colors, and the [`Line`][27] property for the border.

```r
shp1_color <- shp1[["Fill"]]
shp1_color[["ForeColor"]][["RGB"]] <- (0+170*256+170*256^2)
# That's how the RGB value is calculated: r +  g*256 + b*256*256

# Remove the line
shp1_line <- shp1[["Line"]]
shp1_line[["Visible"]] <- 0
```

Now, let's do it for the other shapes as well. We can create a function to handle the color encoding:

```r
# Create function for the rgb calculation
pp_rgb <- function(r,g,b) {
    return(r + g*256 + b*256^2)
}

shp2_tr <- shp2[["TextFrame"]][["TextRange"]]
shp2_tr[["Text"]] <- "TWO"
shp2_color <- shp2[["Fill"]]
shp2_color[["ForeColor"]][["RGB"]] <- pp_rgb(170,170,0)
shp2_line <- shp2[["Line"]]
shp2_line[["Visible"]] <- 0

shp3_tr <- shp3[["TextFrame"]][["TextRange"]]
shp3_tr[["Text"]] <- "THREE"
shp3_color <- shp3[["Fill"]]
shp3_color[["ForeColor"]][["RGB"]] <- pp_rgb(170,0,170)
shp3_line <- shp3[["Line"]]
shp3_line[["Visible"]] <- 0

# Finally, save the file in the working directory
presentation$SaveAs(paste0(getwd(),"/PowerPoint_R_Part_1.pptx"))
```

The video below shows the result of this sequence of commands.

<ShowImage
mediaType="video"
mediaPath="/post_assets/0001/animation_2.mp4"
mediaNumber=2
mediaCaption="Animated shapes in R"
/>

<br/>

The code and the PowerPoint file created are available from [GitHub](https://github.com/asifsalam/PowerPoint_from_R).

Coming up:<br>
In <a href="/blog/2023-06-16-R-and-PowerPoint-Part-2/">Part 2</a>, we scrape some data using [`rvest`][4] and create a dataset of Clint Eastwood's movies.

[Part 3][14] - Then some fun! We'll use the data to play around with more advanced animation and interaction in PowerPoint.

[1]: https://www.youtube.com/watch?v=aKCXj1DyEhM 'S Anand'
[2]: https://learn.microsoft.com/en-us/windows/win32/com/com-technical-overview 'COM Overview'
[3]: https://pypi.org/project/pywin32/ 'pywin32'
[4]: http://www.omegahat.org/RDCOMClient/ 'RCDOMClient'
[5]: https://rstudio.github.io/reticulate/ 'reticulate'
[6]: https://cran.r-project.org/web/views/WebTechnologies.html 'CRAN Task View: Web Technologies and Services'
[7]: mailto:tomasz@rstudio.com
[8]: https://posit.co/ 'Posit'
[9]: http://www.omegahat.org/RSXML/ 'XML Package for R'
[10]: http://www.imdb.org/ 'IMDB'
[11]: https://learn.microsoft.com/en-us/office/client-developer/powerpoint-home 'PowerPoint Developer Reference'
[12]: https://learn.microsoft.com/en-us/office/vba/api/overview/powerpoint/object-model 'PowerPoint Object Model'
[13]: https://msdn.microsoft.com/en-us/library/office/gg190747(v=office.14).aspx 'Applying Animations to Shapes in Office 2010'
[14]: https://msdn.microsoft.com/en-us/library/office/aa211626(v=office.11).aspx 'AddEffect Method'
[15]: https://www.python.org/ 'Python'
[16]: https://pbpython.com/windows-com.html 'Automating Windows Applications Using COM'
[17]: http://timgolden.me.uk/python/index.html "Tim Golden's Python Stuff"
[18]: https://learn.microsoft.com/en-us/office/vba/api/powerpoint.shape.pickupanimation 'PickupAnimation'
[19]: https://learn.microsoft.com/en-us/office/vba/api/powerpoint.shape 'Shape Object'
[20]: https://learn.microsoft.com/en-us/office/vba/api/powerpoint.shapes 'Shapes Object'
[21]: https://learn.microsoft.com/en-us/office/vba/api/powerpoint.timeline 'TimeLine Object'
[22]: https://learn.microsoft.com/en-us/office/vba/api/powerpoint.application.activepresentation 'ActivePresentation'
[23]: https://bettersolutions.com/powerpoint/macros/enumerations-complete-list.htm 'PowerPoint Enumerations'
[24]: https://raw.githubusercontent.com/asifsalam/PowerPoint_from_R/master/mso.txt 'mso.txt'
[25]: https://learn.microsoft.com/en-us/office/vba/api/powerpoint.shape.textframe 'TextFrame property'
[26]: https://learn.microsoft.com/en-us/office/vba/api/powerpoint.shape.fill 'Fill property'
[27]: https://learn.microsoft.com/en-us/office/vba/api/powerpoint.shape.line 'Line property'
[30]: /blog/23-06-12-R-and-PowerPoint-Part-1 'R and PowerPoint - Part 1 - The basics'
[31]: /blog/23-06-12-R-and-PowerPoint-Part-2 'R and PowerPoint - Part 2 - Getting data'
[32]: /blog/23-06-12-R-and-PowerPoint-Part-3 'R and PowerPoint - Part 3 - Creating an stellar slide'
