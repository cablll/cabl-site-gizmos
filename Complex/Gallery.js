// the array of images in the json file
let Data = {}
// the tag groups from the json file
let tagGoups = {}

// the directory being serviced
let dir

// the type of interaction that clicking on the images will do
let style = 0
    // default values

let tags = []
// adding the funny images to the page
    // Example displayFiles('/GalleryFiles')


//////////// lOADING IMAGES

function displayFiles(dirr , sty = 0){
    // getting the FILES.txt from the directory if its not there then it simply will not 
    
    style = sty;

    dir = dirr
    
    var a = dir + "/FILES.json";

    fetch(a)
        .then((response) => response.json())
        .then((json) => {
            // saving the data
            Data = json["data"];
            tagGoups = json["tagGroups"];
            // prints it
            console.log(Data)
            // geting the list of tags that all of the art curently has
            GetTagList();
            // loading all the stuff
            loadImgs();
        } )
  
}


// actually putting the images on the Page
function loadImgs( ){
    // getting the GridParent element in whereever it was been called from.
    var src = document.getElementById("ImgDisplayer");
    // getting rid of all of the elements that may have been there allready
    src.innerHTML = "";
    
    // getting the tags the player might have inputed
    var tags = getTags(); 
    
    console.log(tags);

    for (let i = 0; i<Data.length;i++){

        console.log(i)

        let dta = Data[i]
        //console.log(`Name:${dta["name"]}\nTags:${dta["tags"]}\nDesc:${dta["desc"]}\n\nFiles:${dta["file"]}`);
        
        // if the image should be added to the page
        let display = false;

        // checking all the files if they include any of the tags :)
        for (let ii = 0; ii<dta["tags"].length;ii++){ // Iterating threw the tags the art has

            if (tags.includes(dta["tags"][ii])){ // checking if the arts tags are in the array the user inputed

                console.log("YEAH");

                display = true;
            }

        }

        // if the user has simply not entered any tags
        if (tags === undefined || tags.length == 0){
            display = true;
        }

        if (display){



            // checking if the file is an image or not
            if (dta["file"].endsWith(".png") || dta["file"].endsWith(".jpg") || dta["file"].endsWith(".gif") || dta["file"].endsWith(".webp")){
                // Actually adding the element to the page
                switch (style) {
                    default: // just adds the image to the page
                        src.innerHTML += `<img title="${dta["name"]}" class= "grid-item"src="${dir}/${dta["file"]}">`;
                        break;  

                    case 1:// Opens Image in new tab on click
                        src.innerHTML += `<a href = "${dir}/${dta["file"]}" target = "_Blank" ><img title="${dta["name"]}" class= "grid-item"src="${dir}/${dta["file"]}"></a>`;

                        break;
                    case 2:// Opens in the viewer thing on click
                        src.innerHTML += `<img onclick="showViewer(${i})" title="${dta["name"]}" class= "grid-item"src="${dir}/${dta["file"]}">`;
                        break;
                    
                    case 3:// Runs a function on click
                        src.innerHTML += `<img onclick="FunctionHere('${dir}/${dta["file"]}')" title="${dta["name"]}" class= "grid-item"src="${dir}/${dta["file"]}">`;
                        break;
                }

            }
            else if (dta["file"].endsWith(".mp4")){ //if its like an mp4 or someting (can prob be expanded to other video dta i dont know i think)
                src.innerHTML += `<video  controls img class= "grid-item" > <source src= "${dir}/${dta["file"]}" type="video/mp4">  </video>`;
            }
        }

    }
}


// an example of a function that can be called to do someting with the Link or whatever
function FunctionHere(file){

    //console.log(file);

    alert(`YOU CLICK ME YAY: "${file}"`);

}

//////////////// TAGS STUFF

// getting the list of tags that the player has inputed
function getTags(){


    // getting the input element
    var box = document.getElementById("tags");

    // getting the value and setting it to lowecase
    var val = box.value.toLowerCase();

    // if there is just nothing in the input box
    if (val == ""){
        return [];
    }
    else{
        // returning the value
        return box.value.split(" ");
    }
}


// getting rid of the tags and refreshing the list
function ClearTags(){

    var box = document.getElementById("tags");

    console.log("clear")
    // clearing it
    box.value = "";

    loadImgs();

}

function GetTagList(){

    let tagList = []

    console.log(tagGoups)

    // Iterating therw all the tags 
    for (let i = 0; i<Data.length;i++){
        let tagArr = Data[i]["tags"]
        console.log(tagArr);

        // checking if tag is not allready in the tag list
        for( let ii = 0; ii<tagArr.length;ii++ ) {
            if(!tagList.includes(tagArr[ii])){
                // adding the new tag to the tag list
                tagList.push(tagArr[ii]);
            }
        }

    }

    // adding the tags to the side bar
    let tagElem = document.getElementById("TagList");
    // eracing all the new tags
    tagElem.innerHTML = "";

//// creating the Tag Group holders ////
    // creating the group with Notags on them
    tagElem.innerHTML= `
    <span style="text-decoration: underline overline;" class="NoGroup" >Tags</span> 
        <div id="NoGroup" class="NoGroup">

        </div><br>
    `;
    // Creating the custom tag group holders
    for (const [key, value] of Object.entries(tagGoups)) {
        //console.log(key, value);
        tagElem.innerHTML+= `
            <span style="text-decoration: underline overline;" class="${value}">${value}</span> 
            <div id="${value}" class="${value}">

        </div><br>
    `;
      }

    // actually adding the tags
    for (let i = 0; i<tagList.length;i++){
        //console.log(tagList[i])

        splitTag = tagList[i].split("-");

        // if it has no group in the front
        if (splitTag.length == 1){
            tagGroup = document.getElementById("NoGroup")
            tagGroup.innerHTML += `<span class="tag" onclick="addTag('${tagList[i]}')" >- ${tagList[i]}</span><br>`;
        }
        // if its in a tag group
        else{

//            console.log("hai ", splitTag)
            
            for (const [key, value] of Object.entries(tagGoups)) {

                if( splitTag[0] == key ){

  //                  console.log("MATCH");

                    tagGroup = document.getElementById(value)
                    tagGroup.innerHTML += `<span class="tag" onclick="addTag('${tagList[i]}')" >- ${splitTag[1]}</span><br>`;

                }
                else{


                }

              }

        }
    }

}

// Adding a tag to the search box
function addTag(newTag){

    //console.log(newTag);

    var box = document.getElementById("tags");

    var arr = box.value.toLowerCase().split(" ");

    // checking if its not allready in the array
    if (!arr.includes(newTag)){
            box.value += ` ${newTag}`;
    }
    else{ // getting rid of the tag if its allready on the bar

        const index = arr.indexOf(newTag);

        arr[index] = "";

        box.value = ``;

        for(let i = 0; i<arr.length;i++){

            if (arr[i] != ""){
                box.value += ` ${arr[i]}`;
                }
        }

    }

    loadImgs();

}

//////////    IMAGE VIEWER

// loading all the stuff on the bigger viewer if u dont want the 
function showViewer(index){

    // showing the viewer thing
    document.getElementById("displayer").style.display = "";

    // getting the data of the selected image
    var dta = Data[index];

    // loading the image
    document.getElementById("Image").src = `${dir}/${dta["file"]}`;
    // loading the name
    document.getElementById("Name").innerText = `${dta["name"]}`;
    // loading the description
    document.getElementById("Desc").innerText = `${dta["desc"]}`;
    // loading the tags
        // deleting the allready there tags
    document.getElementById("Tags").innerHTML = "Tags: ";
    
    for (let i = 0; i<dta["tags"].length;i++){ // Iterating threw the tags the art has

        document.getElementById("Tags").innerHTML +=`<span class="tag" onclick="addTag('${dta["tags"][i]}')" >${dta["tags"][i]}</span>, `;
    }

    console.log(dta);
}

// closing the viewer thing
function closeViewer(){
    document.getElementById("displayer").style.display = "none";
}