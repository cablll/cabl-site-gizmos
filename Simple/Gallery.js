

// adding the funny images to the page
    // Example displayFiles('/GalleryFiles',[divID],type)

    function displayFiles(dir,id,type = 0){
        // getting the FILES.txt from the directory if its not there then it simply will not 
        var a = dir + "/FILES.txt";
    
        console.log(id)
    
        // Loading the file as text i think
        fetch(a)
            .then((res => res.text()))
            .then((text) => {
    
                // splitting the file into an array 
                var Files = text.split(',');
    
    //  Actually doing the thing  //
                // getting the GridParent element in whereever it was been called from.
                
                var src = document.getElementById(id);
                // getting rid of all of the elements that may have been there allready
                src.innerHTML = "";
    
                // Iterating threw all the 
                for(var i = 0; i <Object.keys(Files).length ;i+=1){
                    
                    // checking if the file is an image or not
                    if (Files[i].endsWith(".png") || Files[i].endsWith(".jpeg") || Files[i].endsWith(".gif") || Files[i].endsWith(".webp")){
                        // Actually adding the element to the page
                            // Replace this bit with whatever you want to have the thing to do when you click on it
                            switch (type) {
                                 default:// just adding the images to the page [DEFAULT]
                                    src.innerHTML += `<img class= "grid-item"src="${dir}/${Files[i]}">`;
                                    break;
                                case 1: // Opening the clicked image in another tab
                                    src.innerHTML += `<a href ="${dir}/${Files[i]}" target ="_Blank" > <img class= "grid-item"src="${dir}/${Files[i]}"> </a>`;
                                    break;
                                case 2: // Running a functions or whatever 
                                    src.innerHTML += `<img onclick="FunctionHere(${dir}/${Files[i]})" class= "grid-item"src="${dir}/${Files[i]}">`;
                                    break;
                               
                            }
                            
                            
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
    