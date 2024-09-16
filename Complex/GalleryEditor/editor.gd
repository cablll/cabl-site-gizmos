extends Control

#region Actually Editing all the stuff
var Directory : String 

const IMAGE_BUTTON = preload("res://ImageButton.tscn")

var currentlySelected : Button

var outputFileName = "/FILES.json"

func _ready() -> void:
	$Settings.hide()
	pass

func OpenDirectory(dir):
	$ColorRect.hide()
	Directory = dir
	
	var newJson = false
	
	# checking if anything is there
	if !FileAccess.file_exists(Directory+outputFileName):
		newJson = true
	# loading the json file if it exists
	var a := FileAccess.open(Directory+outputFileName,FileAccess.READ_WRITE)
	
	var parcedDict :Dictionary
	
	if !newJson:
		var b = a.get_as_text()
		parcedDict = JSON.parse_string( b )
	
	#deleting old Files Displayed
	for i in %ArtList.get_children():
		i.queue_free()
	
	print(DirAccess.get_files_at(Directory))
	
	# loading the images into the list thing
	for i in DirAccess.get_files_at(Directory):
		
		# if its not a json file continue
		if !i.ends_with(".json"):
			var inst = IMAGE_BUTTON.instantiate()
			%ArtList.add_child(inst)
			inst.DIR = Directory
			
			if !newJson:
				# checking if the file was allready in the json file
				for ii in parcedDict["data"]:
					if i == ii["file"]:
						print(i,"  ",ii["file"])
						inst.FileName = ii["file"]
						inst.ImgName = ii["name"]
						inst.Tags = ",".join(ii["tags"])
						inst.Desc = ii["desc"]
						pass
			# checking if the file name hasent allready been assigned IG
			if !inst.ImgName:
				#adding the filename to the instance thing
				inst.FileName = i
				pass
			inst.setup()
			
			# connecting the thing
			inst.connect("select",SelectImg)
			
			pass
	
	if !newJson:
		# setting tag presets
		tagGroups = parcedDict.tagGroups
		if parcedDict.has("tagPresets"):
			tagPresets = parcedDict.tagPresets
		loadSettings()
	
	pass

func SelectImg(Bttn : Button):
	
	currentlySelected = Bttn
	
	%FileNameDisplayer.text = currentlySelected.FileName
	%NameEdit.text = currentlySelected.ImgName
	%TagsEdit.text = currentlySelected.Tags
	%DescEdit.text = currentlySelected.Desc
	
	pass

## opening the file in the os-es native image viewer or whatever
func OPENFILE() -> void:
	if currentlySelected:
		OS.shell_open(Directory+"/"+currentlySelected.FileName)
		pass
	pass # Replace with function body.

func _on_select_directory_pressed() -> void:
	
	$ColorRect.visible = true
	$ColorRect/FileDialog.visible = true
	
	pass # Replace with function body.

## saving the output to file
func _on_save_pressed() -> void:
	# if a directory is Chosen
	if !Directory:
		return
	
	# openeing the file u will be wrighting to
	var SaveFile := FileAccess.open(Directory+outputFileName,FileAccess.WRITE_READ)
	# the array the data will be stored in
	var arr := []
	
	for i in %ArtList.get_children():
		
		var g
		
		if i.Tags == "":
			g = {
			"file":i.FileName,
			"name":i.ImgName,
			"tags":[],
			"desc":i.Desc
		}
		else:
			g = {
				"file":i.FileName,
				"name":i.ImgName,
				"tags":i.Tags.split(","),
				"desc":i.Desc
			}
		
		arr.append(g)
		
		pass
	
	var finalDict := {
		"data":arr,
		"tagPresets" : tagPresets,
		"tagGroups" : tagGroups
	}
	
	SaveFile.store_string(JSON.stringify(finalDict," "))
	
	SaveFile.close()
	
	showMsg('FILE.json saved to: ' + Directory + outputFileName)
	
	#%TextSavedTo.global_position.y
	pass # Replace with function body.

func showMsg(msg):
		## tweenting the funny message
	%TextSavedTo.text = msg
	
	var tween := get_tree().create_tween()
	tween.set_ease(Tween.EASE_IN_OUT).set_trans(Tween.TRANS_QUART)
	##679
	tween.tween_property(%TextSavedTo,"global_position",Vector2(2,621),.5) # on screen
	tween.tween_property(%TextSavedTo,"global_position",Vector2(2,621),1.5) # waiting
	tween.tween_property(%TextSavedTo,"global_position",Vector2(2,679),.2) # off screen

func TextChanged():

	
	if currentlySelected:
		currentlySelected.ImgName = %NameEdit.text
		currentlySelected.Tags = %TagsEdit.text
		currentlySelected.Desc = %DescEdit.text
		pass
	
	pass
#endregion


var SelectedTagPreset : String = ""

func setUpPresetUI(dict : Dictionary):
	
	# getting rid of the allready there items
	%TagsPresetSelector.clear()
	
	for i in dict:
		%TagsPresetSelector.add_item(i)
	
	%TagsPresetSelector.select(-1)
	
	pass

func selectPreset(index):
	
	var a = %TagsPresetSelector.get_item_text(index)
	
	SelectedTagPreset = tagPresets[a]
	
	print(SelectedTagPreset)
	
	pass

func appendTags():
	
	if SelectedTagPreset == "":
		return
		pass
	
	if %TagsEdit.text == "":
		%TagsEdit.text += SelectedTagPreset
	else:
		%TagsEdit.text += ","+SelectedTagPreset
		
	
	
	
	pass

func replaceTags():
	
	if SelectedTagPreset == "":
		return
		pass
		
	%TagsEdit.text = SelectedTagPreset
	pass

#region TheSettings Menu

@onready var settings: ColorRect = $Settings

func openSettings():
	settings.show()
	pass

## dictonary of tag presets
var tagPresets := {}
## dictonary of valid tag groups
var tagGroups :={}
func hideSettings():
	
	processSettings()
	
	
	pass

func loadSettings():
	
	setUpPresetUI(tagPresets)
	
	%TagPresets.text = ""
	# setting up tag presets
	for i in tagPresets:
		%TagPresets.text += i + ":" + tagPresets[i]+"\n"
		pass
	
	%TagGroups.text = ""
	for i in tagGroups:
		%TagGroups.text += tagGroups[i] + ":" + i+"\n"
	
	pass

func processSettings():
	# if everything went good
	var close = true
	# saving the old ones if it dosent work goodly
	var oldPreset = tagPresets
	var oldGroup = tagGroups
	
	# checking if tagPresets box is not empty
	if %TagPresets.text != "":
		tagPresets = {}
		# getting the indivisual lines
		for lines in %TagPresets.text.split("\n"):
			
			# spliting the lines to the name and the tags
			var sides = lines.split(":")
			
			# checking for duplacate tag names
			if tagPresets.has(sides[0]):
				showMsg("duplacate tagPreset name: \""+sides[0]+"\". Presets not saved.")
				tagPresets = oldPreset
				close = false
				break
			
			# if theres actuall someting in the line Ig
			if lines != "":
				# setting the tag
				tagPresets[sides[0]] = sides[1]
				#Dictionary


			pass
		pass
		
	# checking if TagGroups box is not empty
	if %TagGroups.text != "" and close:
		tagGroups = {}
		for lines in %TagGroups.text.split("\n"):
			var sides = lines.split(":")
			
			# checking for duplacate group names
			if tagGroups.has(sides[0]):
				showMsg("duplacate tagGroup name: \""+sides[0]+"\". Groups not saved.")
				tagGroups = oldGroup
				close = false
				break
			
			# if theres actuall someting in the line Ig
			if lines != "":
				# id : Name of group
				tagGroups[sides[1]] = sides[0]
			pass
		
		var fails = -1
		
		# checking for duplicate group tags
		for i in tagGroups:
			fails = -1
			for ii in tagGroups:
				#print(tagGroups[i]," ",tagGroups[ii])
				
				if tagGroups[i] == tagGroups[ii]:
					fails+=1
					pass
				
				pass
				
			if fails > 0 :
				print("epic fail!")
				showMsg("duplacate tagGroup GroupLabel: \""+tagGroups[i]+"\". Groups not saved.")
				tagGroups = oldGroup
				close = false
				break
		
	
	if close:
		settings.hide()
		setUpPresetUI(tagPresets)
		



#endregion
