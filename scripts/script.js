/*=======================================================
            night mode toggle function
=======================================================*/
const toggleSwitch = document.getElementById("toggle");

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById("imgAbout").src = "img/sketch0-1.svg";
        document.getElementById("imgXP").src = "img/sketch1-1.svg";
        document.getElementById("imgEV").src = "img/sketch2-1.svg";
        canvasBackground = "black";
        strokeColor = "white";
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.getElementById("imgAbout").src = "img/sketch0-0.svg";
        document.getElementById("imgXP").src = "img/sketch1-0.svg";
        document.getElementById("imgEV").src = "img/sketch2-0.svg";
        canvasBackground = "white";
        strokeColor = "black";
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

/*=======================================================
                    nav bar side slide
=======================================================*/
const burger = document.querySelector('.burger');
const pagelinks = Array.from(document.querySelectorAll('.pagelink'));
const nav = document.querySelector('.nav-items');
var navActive = false;

function navSlide(e) {
    var clickedInsideNav = nav.contains(e.target);
    var clickedBurger = burger.contains(e.target);
    var clickedPL = pagelinks.filter(el => el.contains(e.target)).length > 0;
    if (
        (!clickedInsideNav && navActive)
        || clickedBurger
        || clickedPL
       ) {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
        navActive = !navActive;
    }

}

document.addEventListener('click', navSlide, false);

/*=======================================================
                flocking info functions
=======================================================*/

function popup() {
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
