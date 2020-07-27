/*=======================================================
            night mode toggle function
=======================================================*/
const toggleSwitch = document.getElementById("toggle");

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById("imgAbout").src = "sketch1-04.svg";
        canvasBackground = "black";
        strokeColor = "white";
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.getElementById("imgAbout").src = "sketch1-03.svg";
        canvasBackground = "white";
        strokeColor = "black";
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

/*=======================================================
                nav bar side slide
=======================================================*/
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

function navSlide(e) {
    nav.classList.toggle('nav-active');
}

burger.addEventListener('click', navSlide, false);

/*=======================================================
                flocking info functions
=======================================================*/
function popup() {
    document.getElementById("myPopup").classList.toggle("show");
}

function popout() {
    document.getElementById("myPopup").classList.remove("show");
}

