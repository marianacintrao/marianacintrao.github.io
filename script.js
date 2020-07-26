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

function popup() {
    document.getElementById("myPopup").classList.toggle("show");
}

function popout() {
    document.getElementById("myPopup").classList.remove("show");
}

