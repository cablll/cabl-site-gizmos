extends Button

@export var FileName : String
@export var ImgName : String
@export var Tags : String
@export var Desc : String

var DIR : String

signal select(bttn)

func setup():
	
	if (FileName.ends_with(".png")or 
		FileName.ends_with(".webp")
		):
		loadImg()
		pass
	if (FileName.ends_with(".jpg")):
		icon = load("res://Jpeg.png")
		pass
	else:
		text = "Cannot Preview File"
		tooltip_text = "Cannot Preview File\n"
	
	tooltip_text+=FileName
	
	#print(DIR,FileName)
	
	pass

func loadImg():
	
	var loaded : Image = Image.new()
	
	loaded.load(DIR+"/"+FileName)
	
	var Textur := ImageTexture.new()
	Textur.set_image(loaded)
	
	icon = Textur
	
	pass




func _on_pressed() -> void:
	emit_signal("select",self)
	pass # Replace with function body.
