const boidSize = 4;
const maxSpeed = 2.5;
const boidsMinDistance = 30;
const maxForce = 10;
const mouseAffinityVal = 0; //should have decimal value

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

        this.xVel += this.xAcc;
        this.yVel += this.yAcc;

        this.angle = Math.atan(this.yVel/this.xVel);
        if (this.xVel < 0) this.angle += Math.PI;

        this.xVel = maxSpeed * Math.cos(this.angle);

        this.yVel = maxSpeed * Math.sin(this.angle);

        this.xPos += this.xVel;
        this.yPos += this.yVel;

        if (this.xPos < 0) this.xPos = window.innerWidth;
        if (this.yPos < 0) this.yPos = window.innerHeight;
        if (this.xPos > window.innerWidth) this.xPos = 0;
        if (this.yPos > window.innerHeight) this.yPos = 0;



    }

    alignment_and_cohesion(boids) {
        let xVelocities = [];
        let yVelocities = [];
        let xPositions = [];
        let yPositions = [];
        let xAvgVel = 0;
        let yAvgVel = 0;
        let xAvgPos = 0;
        let yAvgPos = 0;
        for (let other of boids) {
            if (other != this && Math.sqrt(Math.pow(this.xPos - other.xPos, 2) +  Math.pow(this.yPos - other.yPos, 2)) < boidsMinDistance) {
                xVelocities.push(other.xVel);
                yVelocities.push(other.yVel);
                xPositions.push(other.xPos);
                yPositions.push(other.yPos);
            }
        }
        let nBoids = xVelocities.length;
        for(var i = 0; i < nBoids; i++) {
            xAvgVel += xVelocities[i];
            yAvgVel += yVelocities[i];
            xAvgPos += xPositions[i];
            yAvgPos += yPositions[i];
        }
        if (nBoids != 0) {
            xAvgVel = xAvgVel / nBoids;
            yAvgVel = yAvgVel / nBoids;
            xAvgPos = xAvgPos / nBoids;
            yAvgPos = yAvgPos / nBoids;
            
            this.xAcc = xAvgVel - this.xVel + xAvgPos - this.xPos;
            this.yAcc = yAvgVel - this.yVel + yAvgPos - this.yPos;
        }
    }

    mouseAffinity(x, y) {
        let directionX = x - this.xPos;
        let directionY = y - this.yPos;
        this.xAcc += (directionX * mouseAffinityVal);
        //
        this.yAcc += (directionY * mouseAffinityVal);
    }

    get x() { return this.xPos; }
    get y() { return this.yPos; }
}