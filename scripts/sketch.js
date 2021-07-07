const flock = [];
const overlayPadding = 35;
var ptsPerBoid = 10000;
var boidCounter = 0;
var mouseX = 0;
var mouseY = 0;
var canvasBackground = "white";

/*  gets mouse position on canvas */
function updateCoords(e) {
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    mouseX = e.clientX;
    mouseY = e.clientY + top;
}


function draw() {
    var canvas = document.getElementById("canvas");
    
    document.querySelector("canvas").addEventListener("mousemove", updateCoords);

    /* add a new boid when canvas is clicked */
    canvas.onmousedown = function(e) {
        b = new Boid(mouseX, mouseY);
        boidCounter++;
        flock.push(b);
    }
    
    
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        resizeCanvas();
        
        /* get initian number of boids */
        boidCounter = Math.floor(canvas.height * canvas.width / ptsPerBoid);
        
        /* resize canvas if window is resized */
        window.addEventListener('resize', resizeCanvas, false);
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        /* create initial boids */
        for (var i = 0; i < boidCounter; i ++) {
            b = new Boid(Math.floor(Math.random()*canvas.width), Math.floor(Math.random()*canvas.height));
            flock.push(b);
        }
        //initialBoids = boidCounter;

        
        /* draw and update boids positions */
        function update() {
            requestAnimationFrame(update);
            ctx.fillStyle = canvasBackground;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (var i = 0; i < boidCounter; i ++) {
                flock[i].alignment_cohesion_separation(flock);
                flock[i].mouseAffinity(mouseX, mouseY);
                flock[i].update(ctx);
            }
        }
        update();
    }
}