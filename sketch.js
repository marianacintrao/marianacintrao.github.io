const flock = [];
const boidCounter = 100;
var x = 0;
var y = 0;

let updateCoords = function(e) {
    x = e.clientX;
    y = e.clientY;
}

function draw() {
    var canvas = document.getElementById("canvas");
    document.querySelector("canvas").addEventListener("mousemove", updateCoords);
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.lineWidth = 2;
        
        for (var i = 0; i < boidCounter; i ++) {
            b = new Boid(Math.floor(Math.random()*canvas.width), Math.floor(Math.random()*canvas.height));
            flock.push(b);
        }

        //function drawBoid(boid) { boid.draw(ctx); }
        
        let update = function() {
            requestAnimationFrame(update);
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (var i = 0; i < boidCounter; i ++) {
                flock[i].alignment_and_cohesion(flock);
                flock[i].mouseAffinity(x, y);
                flock[i].update(ctx);

            }
        }
        
        update();
    }
}