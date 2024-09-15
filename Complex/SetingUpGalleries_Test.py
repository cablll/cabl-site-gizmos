import os
import json

#####
#
#    This file Is best suted to be placed in the base directory of your site.
#       Provide the Local paths to the directory where the files you want to display are 
#
#####

# array of directorys that your going to update (you can do multiple of them in this array ^_^!)
        # dont put the first `/` it dosent like that
# the directorys that your going to upgerade
dirs = [ "Art"]

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
    fileList = {}
    FileArr = []

    # appending every img/mp4 file into a string
    for x in os.listdir(abs_file_path):
        if x.endswith(".png") or x.endswith(".jpg") or x.endswith(".gif") or x.endswith(".webp") or x.endswith(".mp4"):
            
            # marking the start of a file with X_ will exclude it from listing it
            if x.startswith("X_") or x.startswith("x_"):
                pass
            else:# appending the filename to the output file
                #print(x)
                #fileList += x +","

                parts = x.split("`")
                

                
                # makes the tags lowercase
                lower=[]
                for ggg in parts[1].split(","):
                    lower.append(ggg.lower())

                dic = {
                    "file": x,
                    "name":parts[0],
                    "tags": lower,
                    "desc": parts[2]
                }

                #print(dic)

                FileArr.append(dic)

                pass
    
    #print(FileArr)

    fileList = {"data":FileArr}
    # gets rid of the last character [I forgot why i did this]
    #fileList = fileList[:-1]

    # creating the new array file to the Gallery directory
    #f = open(abs_file_path+"\FILES.txt","w")
    
    # Writing The array to the file
    #f.write( json.dump(fileList))

    # validation output
    #print("LIST: ",fileList)


    with open(abs_file_path+"\FILES.json","w") as fp:
        json.dump(fileList,fp)