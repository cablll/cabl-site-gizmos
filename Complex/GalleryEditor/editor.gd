extends Control

var Directory : String 

const IMAGE_BUTTON = preload("res://ImageButton.tscn")

var currentlySelected : Button

var outputFileName = "/FILES.json"

func OpenDirectory(dir):
	$ColorRect.hide()
	Directory = dir
	# loading the json file if it exists
	var a := FileAccess.open(Directory+outputFileName,FileAccess.READ_WRITE)
	var parcedDict :Dictionary = JSON.parse_string( a.get_as_text())
	
	#deleting old Files Displayed
	for i in %ArtList.get_children():
		i.queue_free()
	
	print(DirAccess.get_files_at(Directory))
	
	for i in DirAccess.get_files_at(Directory):
		
		# if its not a json file continue
		if !i.ends_with(".json"):
			var inst = IMAGE_BUTTON.instantiate()
			%ArtList.add_child(inst)
			inst.DIR = Directory
			
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
		"data":arr
	}
	
	SaveFile.store_string(JSON.stringify(finalDict," "))
	
	SaveFile.close()
	
	## tweenting the funny message
	%TextSavedTo.text = 'FILE.json saved to: ' + Directory + outputFileName
	
	var tween := get_tree().create_tween()
	tween.set_ease(Tween.EASE_IN_OUT).set_trans(Tween.TRANS_QUART)
	##679
	tween.tween_property(%TextSavedTo,"global_position",Vector2(2,621),.5) # on screen
	tween.tween_property(%TextSavedTo,"global_position",Vector2(2,621),1.5) # waiting
	tween.tween_property(%TextSavedTo,"global_position",Vector2(2,679),.2) # off screen
	#%TextSavedTo.global_position.y
	pass # Replace with function body.


func TextChanged():
	
	if currentlySelected:
		currentlySelected.ImgName = %NameEdit.text
		currentlySelected.Tags = %TagsEdit.text
		currentlySelected.Desc = %DescEdit.text
		pass
	
	pass
