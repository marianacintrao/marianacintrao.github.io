/*=======================================================
            night mode toggle function
=======================================================*/
const toggleSwitch = document.getElementById("toggle");

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById("imgAbout").src = "sketch0-02.svg";
        document.getElementById("imgXP").src = "sketch1-04.svg";
        canvasBackground = "black";
        strokeColor = "white";
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.getElementById("imgAbout").src = "sketch0-01.svg";
        document.getElementById("imgXP").src = "sketch1-03.svg";
        canvasBackground = "white";
        strokeColor = "black";
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

/*=======================================================
                    nav bar side slide
=======================================================*/
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-items');

function navSlide(e) {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
}
burger.addEventListener('click', navSlide, false);

/*=======================================================
                nav bar link scrolls
=======================================================*/
function buttons(id) {
    document.getElementById(id).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"}); 
}

/*=======================================================
                flocking info functions
=======================================================*/

function popup() {
    // var popup = document.getElementById("popup");
    // var popbtn = document.getElementById("ppbtn");
    var popupbox = document.getElementById("ppinfo");
    var arrow = document.getElementById("arrw");

    if (!popupbox.classList.contains("ppactive")) {
        popupbox.classList.toggle("ppactive");
        arrow.classList.toggle("downarrow");
    } else {
        popupbox.classList.remove("ppactive");
        arrow.classList.remove("downarrow");
    }
}
