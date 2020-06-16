const boidSize = 7;
const maxSpeed = 3;
const minSpeed = 1;
const boidsMinDistance = 50;
const maxForce = 2;

class Boid {
    constructor(xpos, ypos) {
        this.xPos = xpos;
        this.yPos = ypos;

        let speed = Math.random()*(maxSpeed - minSpeed) + minSpeed;
        //this.speed = speed;

        let angle = Math.random()*2*Math.PI;
        this.angle = angle;
        
        this.xVel = Math.cos(angle)*speed;
        this.yVel = Math.sin(angle)*speed;

        this.xAcc = 0;
        this.yAcc = 0;
    }

    draw(context) {
        context.strokeStyle = 'white';
        context.strokeRect(this.xPos, this.yPos, boidSize, boidSize);  
        context.stroke();
        /*
        ctx.rotate(angle);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
  */
        //pop();
    }

    update(context) {
        this.draw(context);
        console.log('xp ' + this.xPos + ' xv ' + this.xVel + ' yp ' + this.yPos + ' yv ' + this.yVel);
        
        //console.log('xv '+ this.xVel + ' xa '+ this.xAcc);
        this.xVel = this.xAcc + this.xVel;
        this.yVel = this.yAcc + this.yVel;
        this.angle = Math.atan(this.yVel/this.xVel);
        if (this.xVel / Math.cos(this.angle) > maxSpeed || -maxSpeed > this.xVel / Math.cos(this.angle)) {
            this.xVel = maxSpeed * Math.cos(this.angle);
            this.yVel = maxSpeed * Math.sin(this.angle);
            //console.log("----" + this.xVel + ' ' + this.yVel);
        }

        this.xPos += this.xVel;
        this.yPos += this.yVel;
        //this.xPos += this.xVel + this.xAcc;
        //this.yPos += this.yVel + this.yAcc;
        if (this.xPos < 0) this.xPos = window.innerWidth;
        if (this.yPos < 0) this.yPos = window.innerHeight;
        if (this.xPos > window.innerWidth) this.xPos = 0;
        if (this.yPos > window.innerHeight) this.yPos = 0;

        //console.log('xp ' + this.xPos + 'xv ' + this.xVel + 'yp ' + this.yPos + 'yv ' + this.yVel);
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
            this.xAcc = ((averageX - this.xVel )+ this.xAcc)/2;
            averageY = averageY / yVelocities.length;
            this.yAcc = ((averageY - this.yVel) + this.yAcc)/2;
        }
    }

    get x() { return this.xPos; }
    get y() { return this.yPos; }
}