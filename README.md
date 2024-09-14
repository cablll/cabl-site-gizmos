# Simple-Html-Image-Gallery

This repo is just A simple way to setup a simple image gallery on a personal website or someting.   
[example](https://cabl.rodeo/Real/R_Art)


# Setting up the Gallery Directory
I Found it easier to put `SettingUpGalleries.py` in the base directory of the site so inputting the filepath is the easiest.
- open `SettingUpGalleries.py` and add the path relative from `SettingUpGalleries.py` to the directory that you want to display as a gallery, to the `dirs` Array on line 12.   
![image](https://github.com/user-attachments/assets/9b691d68-1fe7-43e3-b483-34943293d8d3)


When `SettingUpGalleries.py` is run, it will iterate threw all of the directories and files in the directories adding them to a list and writing that list to a txt file named `FILES.txt`, 
FILES.txt will be writen to the given directory.   
![Example Gallery file directory](https://github.com/user-attachments/assets/da4ebe01-9243-4bf6-89e4-e686f694c4e6)   
- If you do not want a file to be added to the list simply rename the file to have a `X_` or `x_` infront of it.
       

# Setup in the html page   
1) Put Gallery.css and Gallery.js wherever you want to put them for your particular website
2) In the page you want to put the Gallery, put `<link href="[Path to Gallery.css]" rel="stylesheet" type="text/css" media="all">` in the header section of the page and put `<script type = "text/javascript" src="[Path to Gallery.js]" ></script>` in the script section of the header.
3) put ```<div class="grid-container"  id="pics"> </div>   
        <script> displayFiles('[Filepath to a directory with a FILES.txt file in it]') </script>``` Where ever  you want the gallery to display
![image](https://github.com/user-attachments/assets/67dbe7be-4e62-488a-8f89-a522f8a9adb2)


### Contents  
Gallery.css : The simple stylesheet setup to display the images in a grid.  
Gallery.js : The code that will add the files to the display grid.   
SettingUpGalleries.py : File that will generate a list of filenames in a given directory.   
index.html : Simple example setup for a gallery page.   
GalleryFiles : Directory containing several dummy files for the example gallery page.
