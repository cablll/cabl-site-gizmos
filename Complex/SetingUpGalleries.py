import os
import json

#####
#
#    This file Is best suted to be placed in the base directory of your site.
#       Provide the Local paths to the directory where the files you want to display are 
#
#    If you are using this script over the JSON editor, the filenames have to be 
#            [image Name`tag,tag2,No_spaces_in_tags`Description].png
#
#---FILE NAME FORMAT----------------------------------------------------------------------------------------------------------#
#
#    Other Valid file name formats:
#          OK - file``.png                  || Sections can be blank but there has to be 3 of them for the scrypt to work
#          OK - file`tag,tag2`.png     
#          OK - file``desc.png     
#          OK - `tag`.png     
#          OK - ``.png
#        !NO! - file`tag.png                || must have all 3 sections
#        !NO! - tag`desc.png                || must have all 3 sections

# ---TAG GROUP FORMAT---------------------------------------------------------------------------------------------------------#
#          OK - file`m-Tag_one`desc.png     || only use "-" for tag groups things

#          OK - file`Tag_one`desc.png     
#          OK - file`Tag-one`desc.png     
#        !NO! - file`m-Tag-one`desc.png     || if you are using group tags dont use "-" to seperate words in the tag itself
#
#####

# array of directorys that your going to update (you can do multiple of them in this array ^_^!)
        # dont put the first `/` it dosent like that
# the directorys that your going to upgerade
dirs = [ "Art"]


# dictonary of tag groups that tags can be organised in
    # Format= "GroupID":"GroupName"
    # when putting a tag into a group=
    #           "GroupID"-Tag
tagGroups =  {
  "c": "Character",
  "m": "Meta"
 }

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

    # Array that holds the dictonarys 
    FileArr = []

    # appending every img/mp4 file into a string
    for x in os.listdir(abs_file_path):
        if x.endswith(".png") or x.endswith(".jpg") or x.endswith(".gif") or x.endswith(".webp") or x.endswith(".mp4"):
            
            # marking the start of a file with X_ will exclude it from listing it
            if x.startswith("X_") or x.startswith("x_"):
                pass
            else:# appending the filename to the output file
                
                # spliting the file name into other
                parts = x.split("`")
                
                # will not add to file if it is not in the correct format : "file`tags`desc.png"
                if len(parts) == 3:
                    
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

                    # appending the dictonary to the array of dictonary 
                    FileArr.append(dic)

                    pass
    
    # saving the dictonary to the json file in the directory
    with open(abs_file_path+"\FILES.json","w") as fp:
        json.dump( {"data":FileArr,
                    "tagGroups":tagGroups} 
                ,fp)