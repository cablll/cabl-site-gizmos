import os

#####
#
#    This file Is best suted to be placed in the base directory of your site.
#       Provide the Local paths to the directory where the files you want to display are 
#
#####

# array of directorys that your going to update (you can do multiple of them in this array ^_^!)
        # dont put the first `/` it dosent like that
dirs = [ "GalleryFiles"]

# getting the scripts location in the pc
scriptDir = os.path.dirname(__file__)

# relitave path
relPath = ""

# absolute file path
abs_file_path = ""

# for every directory check the files
for xx in dirs:

    # getting the absolute path the the directory
    abs_file_path = os.path.join(scriptDir,xx)

    # removing the old filelist
    fileList = ""

    # appending every img/mp4 file into a string
    for x in os.listdir(abs_file_path):
        if x.endswith(".png") or x.endswith(".jpg") or x.endswith(".gif") or x.endswith(".webp") or x.endswith(".mp4"):
            
            # marking the start of a file with X_ will exclude it from listing it
            if x.startswith("X_") or x.startswith("x_"):
                pass
            else:# appending the filename to the output file
                print(x)
                fileList += x +","
                pass
    
    
    # gets rid of the last character [I forgot why i did this]
    fileList = fileList[:-1]

    # creating the new array file to the Gallery directory
    f = open(abs_file_path+"\FILES.txt","w")
    
    # Writing The array to the file
    f.write(fileList)

    # validation output
    print("LIST: ",fileList)

