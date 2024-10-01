// this updates the theme when the page is loaded
window.onload = checkTheme();

// called when the user picks a theme
function pickTheme(value) {
        // getting the link thing that actually controlls the theme
    var sheet = document.getElementsByClassName('theme')[0];

    //console.log(sheet)

        // sets it to the new value
    sheet.href = value;

        // storing the new selected theme in local storage
    localStorage.setItem("theme", value);
   
//Uncomment if the user has opted out of out of local storage stuff
   /* 
    if(localStorage.getItem("agree") == "true"){
        localStorage.setItem("theme", value);
    }*/

}

function checkTheme() {

// Comment all this out if the u are implementing the disagree local storage thing    
        // getting the link thing that actually controlls the theme
    var sheet = document.getElementsByClassName('theme')[0];
    
        // retreving the stored theme
    let localTheme = localStorage.getItem("theme"); 

        // setting the theme 
    sheet.href = localTheme;

        // if theres nothing stored then set it to the default thing  
    if (localTheme == null) {
            sheet.href = "/ThemeSwitching/CSS/theme1.css";
    }


// Uncomment all this if u are implementeting the disagree local storage thing
        // checking if the user has agreed to use local storage
    // console.log(localStorage.getItem("agree"));

    /* 
    if(localStorage.getItem("agree") == "true"){

    
        let localTheme = localStorage.getItem("theme");  
        sheet.href = localTheme;  
        if (localTheme == null) {
                sheet.href = "/assets/StyleSheets/Style_DefaultStyle.css";
        }
    }
    else{

        sheet.href = "/assets/StyleSheets/Style_DefaultStyle.css";

    }
    */
}