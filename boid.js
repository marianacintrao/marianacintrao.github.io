const boidSize = 8;
const maxSpeed = 2.5;
const boidsViewRadius = 40;
const maxForce = 10;
const mouseAffinityVal = 0.1; //should have decimal value
const separationRatio = 50;
const alignmentRatio = 0.5;
const cohesionRatio = 0.1;

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
        context.fillStyle = this.color;
        context.translate(this.xPos, this.yPos);
        context.rotate(this.angle + (Math.PI/2));


        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(boidSize/2, boidSize*2 );
        context.lineTo(-boidSize/2, boidSize*2);
        context.closePath();
        context.fill();

        context.rotate(-this.angle - (Math.PI/2));
        context.translate(-this.xPos, -this.yPos);
    }

    update(context, x, y) {
        this.draw(context);

        this.xVel += this.xAcc;
        this.yVel += this.yAcc;
        
        this.angle = Math.atan(this.yVel/this.xVel);
        if (this.xVel < 0) this.angle += Math.PI;

        var d = Math.sqrt(Math.pow(this.xVel, 2) + Math.pow(this.yVel, 2));
        if (maxSpeed < d) {
            this.xVel = maxSpeed * Math.cos(this.angle);
            this.yVel = maxSpeed * Math.sin(this.angle);
        }
        
        this.xPos += this.xVel;
        this.yPos += this.yVel;

        if (this.xPos < 0) this.xPos = window.innerWidth;
        if (this.yPos < 0) this.yPos = window.innerHeight;
        if (this.xPos > window.innerWidth) this.xPos = 0;
        if (this.yPos > window.innerHeight) this.yPos = 0;
    }



    alignment_cohesion_separation(boids) {
        /* Alignment variables */
        let xVelocities = [];
        let yVelocities = [];
        let xAvgVel = 0;
        let yAvgVel = 0;
        /* Cohesion variables*/
        let xPositions = [];
        let yPositions = [];
        let xAvgPos = 0;
        let yAvgPos = 0;
        /* Separation variables */
        let xDistances = [];
        let yDistances = [];
        let xAvgDist = 0;
        let yAvgDist = 0;

        for (let other of boids) {
            let xDist = this.xPos - other.xPos;
            let yDist = this.yPos - other.yPos; 
            let distance = Math.sqrt(Math.pow(xDist, 2) +  Math.pow(yDist, 2));
            if (other != this && distance < boidsViewRadius) {

                xVelocities.push(other.xVel);
                yVelocities.push(other.yVel);

                
                xPositions.push(other.xPos);
                yPositions.push(other.yPos);
                
                xDistances.push(xDist);
                yDistances.push(yDist);
            }
        }
        let nBoids = xVelocities.length;
        for(var i = 0; i < nBoids; i++) {
            xAvgVel += xVelocities[i];
            yAvgVel += yVelocities[i];

            xAvgPos += xPositions[i];
            yAvgPos += yPositions[i];
            
            xAvgDist += 1 / xDistances[i] * separationRatio;
            yAvgDist += 1 / yDistances[i] * separationRatio;
        }
        if (nBoids != 0) {
            xAvgVel = ((xAvgVel / nBoids) - this.xVel) * alignmentRatio;
            yAvgVel = ((yAvgVel / nBoids) - this.yVel) * alignmentRatio;

            xAvgPos = ((xAvgPos / nBoids) - this.xPos) * cohesionRatio;
            yAvgPos = ((yAvgPos / nBoids) - this.yPos) * cohesionRatio;

            xAvgDist = xAvgDist / nBoids;
            yAvgDist = yAvgDist / nBoids;

            this.xAcc = xAvgVel + xAvgPos + xAvgDist;
            this.yAcc = yAvgVel + yAvgPos + yAvgDist;

        }
    }

    mouseAffinity(x, y) {
        if (x != 0 && y!= 0) {
            let directionX = this.xPos - x;
            let directionY = this.yPos - y;
            if (Math.sqrt(Math.pow(directionX, 2), Math.pow(directionY, 2)) < boidsViewRadius) {
                this.xAcc += (directionX * mouseAffinityVal);
                this.yAcc += (directionY * mouseAffinityVal);
            }
        }
    }

    get x() { return this.xPos; }
    get y() { return this.yPos; }
    get xV() { return this.xVel; }
    get yV() { return this.yVel; }
}