

// adding the funny images to the page
    // Example displayFiles('/GalleryFiles')

function displayFiles(dir){
    // getting the FILES.txt from the directory if its not there then it simply will not 
    var a = dir + "/FILES.txt";

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
                if (Files[i].endsWith(".png") || Files[i].endsWith(".jpg") || Files[i].endsWith(".gif") || Files[i].endsWith(".webp")){
                    // Actually adding the element to the page
                        // Replace this bit with whatever you want to have the thing to do when you click on it
                    src.innerHTML += `<img class="grid-item"src="${dir}/${Files[i]}">`;
                }
                else if (Files[i].endsWith(".mp4")){ //if its like an mp4 or someting (can prob be expanded to other video files i dont know i think)
                    src.innerHTML += `<video  controls img class= "grid-item" > <source src= "${dir}/${Files[i]}" type="video/mp4">  </video>`;
               }
            }
        })
        .catch((e) => console.error(e));
}

// an example of a function that can be called to do someting with the Link or whatever
function FunctionHere(file){

    //console.log(file);

    alert(`YOU CLICK ME YAY: "${file}"`);

}


// Just Adding the immages to the page
    // src.innerHTML += `<img class="grid-item"src="${dir}/${Files[i]}">`;
    
// Opening the clicked file in a new tab for bigger viewing
    //src.innerHTML += `<a href ="${dir}/${Files[i]}" target ="_Blank" > <img class= "grid-item"src="${dir}/${Files[i]}"> </a>`;

// Clicking it triggers some javascript thing
    // src.innerHTML += `<img OnClick="FunctionHere('${dir}/${Files[i]}')" class="grid-item"src="${dir}/${Files[i]}">`;