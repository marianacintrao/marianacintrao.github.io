const flock = [];
const boidCounter = 50;
function draw() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        
        for (var i = 0; i < boidCounter; i ++) {
            b = new Boid(Math.floor(Math.random()*canvas.width), Math.floor(Math.random()*canvas.height));
            flock.push(b);
        }

        function drawBoid(boid) { boid.draw(ctx); }
        
        let update = function() {
            requestAnimationFrame(update);
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < boidCounter; i ++) {
                console.log('! ' + i);
                flock[i].update(ctx);
                flock[i].align(flock);
            }
        }
        
        update();
    }
}