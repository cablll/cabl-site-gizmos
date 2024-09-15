let Data = {}
let ready = false

let dir

let tags = []
// adding the funny images to the page
    // Example displayFiles('/GalleryFiles')

function displayFiles(dirr){
    // getting the FILES.txt from the directory if its not there then it simply will not 
    
    dir = dirr
    
    var a = dir + "/FILES1.json";

    fetch(a)
        .then((response) => response.json())
        .then((json) => {
            // saving the data
            Data = json["data"];
            // prints it
            console.log(Data)
            // geting the list of tags that all of the art curently has
            GetTagList();
            // loading all the stuff
            loadImgs();
        } )

/*   
    // Loading the file as text i think
    fetch(a)
        .then((res => res.text()))
        .then((text) => {

            // splitting the file into an array 
            var Files = text.split(',');

//  Actually doing the thing  //
            // getting the GridParent element in whereever it was been called from.
            var src = document.getElementById("pics");
            // getting rid of all of the elements that may have been there allready
            src.innerHTML = "";

            // Iterating threw all the 
            for(var i = 0; i <Object.keys(Files).length ;i+=1){
                
                // checking if the file is an image or not
                if (Files[i].endsWith(".png") || Files[i].endsWith(".jpeg") || Files[i].endsWith(".gif") || Files[i].endsWith(".webp")){
                    // Actually adding the element to the page
                        // Replace this bit with whatever you want to have the thing to do when you click on it
                        src.innerHTML += `<a href ="${dir}/${Files[i]}" target ="_Blank" > <img class= "grid-item"src="${dir}/${Files[i]}"> </a>`;
                }
                else if (Files[i].endsWith(".mp4")){ //if its like an mp4 or someting (can prob be expanded to other video files i dont know i think)
                    src.innerHTML += `<video  controls img class= "grid-item" > <source src= "${dir}/${Files[i]}" type="video/mp4">  </video>`;
               }
            }
        })
        .catch((e) => console.error(e));*/  
}


// actually putting the images on the Page
function loadImgs( ){
    // getting the GridParent element in whereever it was been called from.
    var src = document.getElementById("pics");
    // getting rid of all of the elements that may have been there allready
    src.innerHTML = "";
    
    // getting the tags the player might have inputed
    var tags = getTags(); 
    
    console.log(tags);

    for (let i = 0; i<Data.length;i++){

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
            if (dta["file"].endsWith(".png") || dta["file"].endsWith(".jpeg") || dta["file"].endsWith(".gif") || dta["file"].endsWith(".webp")){
                // Actually adding the element to the page
                    // Replace this bit with whatever you want to have the thing to do when you click on it
                    src.innerHTML += `<a href ="${dir}/${dta["file"]}" title="${dta["name"]}" target ="_Blank" > <img class= "grid-item"src="${dir}/${dta["file"]}"> </a>`;
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

// Just Adding the immages to the page
    // src.innerHTML += `<img class="grid-item"src="${dir}/${Files[i]}">`;
    
// Opening the clicked file in a new tab for bigger viewing
    //src.innerHTML += `<a href ="${dir}/${Files[i]}" target ="_Blank" > <img class= "grid-item"src="${dir}/${Files[i]}"> </a>`;

// Clicking it triggers some javascript thing
    // src.innerHTML += `<img OnClick="FunctionHere('${dir}/${Files[i]}')" class="grid-item"src="${dir}/${Files[i]}">`;



function GetTagList(){

    let tagList = []

    // Iterating therw all the tags 
    for (let i = 0; i<Data.length;i++){
        let tagArr = Data[i]["tags"]
        console.log(tagArr);

        // checking if tag is not allready in the tag list
        for( let ii = 0; ii<tagArr.length;ii++ ) {
            if(!tagList.includes(tagArr[ii])){
                tagList.push(tagArr[ii]);
            }
        }

    }

    let tagElem = document.getElementById("TagList");

    tagElem.innerHTML = "";

    for (let i = 0; i<tagList.length;i++){

        tagElem.innerHTML += `<span onclick="addTag('${tagList[i]}')" >- ${tagList[i]}</span><br>`;

    }

}

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