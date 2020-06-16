const boidSize = 4;
const maxSpeed = 3;
const boidsMinDistance = 30;
const maxForce = 10;
const mouseAffinity = 5;

class Boid {
    constructor(xpos, ypos) {
        this.color = 'rgb(' + Math.random()*255 + ', ' + Math.random()*255 + ', ' + Math.random()*255 + ')';
        this.angle = Math.random()*2*Math.PI;
        
        this.xPos = xpos;
        this.yPos = ypos;
        
        this.xVel = Math.cos(this.angle)*maxSpeed;
        this.yVel = Math.sin(this.angle)*maxSpeed;

        this.xAcc = 0;
        this.yAcc = 0;
    }

    draw(context) {
        context.strokeStyle = this.color;
        context.translate(this.xPos, this.yPos);
        context.rotate(this.angle + (Math.PI/2));

        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(boidSize/2, boidSize*2 );
        context.lineTo(-boidSize/2, boidSize*2);
        context.closePath();
        context.stroke();

        context.rotate(-this.angle - (Math.PI/2));
        context.translate(-this.xPos, -this.yPos);
    }

    update(context, x, y) {
        this.draw(context);
        //console.log('xp ' + this.xPos + ' xv ' + this.xVel + ' yp ' + this.yPos + ' yv ' + this.yVel);

        
        this.xVel += this.xAcc;
        this.yVel += this.yAcc;

        this.angle = Math.atan(this.yVel/this.xVel);
        this.xVel = maxSpeed * Math.cos(this.angle);
        this.yVel = maxSpeed * Math.sin(this.angle);


        this.xPos += this.xVel;
        this.yPos += this.yVel;

        if (this.xPos < 0) this.xPos = window.innerWidth;
        if (this.yPos < 0) this.yPos = window.innerHeight;
        if (this.xPos > window.innerWidth) this.xPos = 0;
        if (this.yPos > window.innerHeight) this.yPos = 0;

    }

    align(boids) {
        let xVelocities = [];
        let yVelocities = [];
        let averageX = 0;
        let averageY = 0;
        for (let other of boids) {
            if (other != this && Math.sqrt(Math.pow(this.xPos - other.yPos, 2) +  Math.pow(this.yPos - other.yPos, 2)) < boidsMinDistance) {
                xVelocities.push(other.xVel);
                yVelocities.push(other.yVel);
            }
        }
        for(var i = 0; i < xVelocities.length; i++) {

            averageX += xVelocities[i];
            averageY += yVelocities[i];
        }
        if (xVelocities.length != 0) {
            averageX = averageX / xVelocities.length;
            this.xAcc = averageX - this.xVel;
            averageY = averageY / yVelocities.length;
            this.yAcc = averageY - this.yVel;
        }

    }

    cohesion(x, y) {
        let directionX = x - this.xPos;
        let directionY = y - this.yPos;
        console.log(x + ' ' + y);
        this.xAcc += (directionX * mouseAffinity);
        this.yAcc += (directionY * mouseAffinity);
    }

    get x() { return this.xPos; }
    get y() { return this.yPos; }
}