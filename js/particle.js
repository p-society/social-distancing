class Particle {
    constructor(xpos,ypos,idin,otharray,movfactor,inf) {
        this.infected = inf ;
        this.curet = 0 ; 
        this.x = xpos ;
        this.y = ypos ;         
        if(movfactor == 0 ){
            this.xvel = 0 ; 
            this.yvel = 0 ;
            this.mass = 0 ; // should be infiintybut i used 0 as a indicator indicating infinity  
        }
        else{
            this.xvel = random(-1,1);
            this.yvel = random(-1,1);
            this.mass = 1 ; 
        }
        this.speedmag = Math.sqrt(this.xvel*this.xvel + this.yvel*this.yvel) ;
        this.d = 10 ; 
        this.id = idin ;
        this.others = otharray ;
    }

    show() {
        noStroke();
        if(this.infected){
            fill(255,0,0);
        }
        else if (this.infected && this.curet < 500 ){
            fill(255,255,0);
        }
        else{
            fill(0,255,0);
        }
        ellipse(this.x, this.y, this.d, this.d);
    }    

    move() {
        this.x += this.xvel ;
        this.y += this.yvel ; 
        if(this.x >= width || this.x <= 0 ){
            this.xvel *= -1 ;  
        }
        if(this.y >= height || this.y <= 0 ){
            this.yvel *= -1 ;  
        }
    }

    collide() {
        for (let i = this.id + 1; i < numP; i++) {
          let dx = this.others[i].x - this.x;
          let dy = this.others[i].y - this.y;
          let distance = sqrt(dx * dx + dy * dy);
          let minDist = this.others[i].d / 2 + this.d / 2;
          if (distance <= minDist) {
              let phi ; 
                if(dx == 0 ){
                    if(dy < 0 ) {phi = -PI/2 ;}
                    if(dy > 0) {phi = PI/2 ;}
                    if(dy == 0){
                        phi = 0 ; 
                    }
                }
                else {
                    phi = atan2(dy, dx);
                }
                let angle1 = atan2(this.yvel,this.xvel);
                let angle2 = atan2(this.others[i].yvel,this.others[i].xvel);

                if(this.others[i].infected || this.infected){
                    this.others[i].infected = true ;
                    this.infected = true ; 
                    this.curet = 500 ;
                    this.others[i].curet = 500 ; 
                }
           
                
                if(this.mass == 1 && this.others[i].mass == 1){ 
                    this.xvel = this.others[i].speedmag * cos(angle2 - phi) * cos(phi) + this.speedmag * sin(angle1 - phi) * cos( PI/2 + phi ); 
                    this.yvel = this.others[i].speedmag * cos(angle2 - phi) * sin(phi) + this.speedmag * sin(angle1 - phi) * sin( PI/2 + phi );
                    this.others[i].xvel = this.speedmag * cos(angle1 - phi) * cos(phi) + this.others[i].speedmag * sin(angle2 - phi) * cos( PI/2 + phi ); 
                    this.others[i].yvel = this.speedmag * cos(angle1 - phi) * sin(phi) + this.others[i].speedmag * sin(angle2 - phi) * sin( PI/2 + phi ); 
                }   
                else if(this.mass == 1 && this.others[i].mass == 0){
                    this.xvel = -this.speedmag * cos(angle1 - phi) * cos(phi) + this.speedmag * sin(angle1 - phi) * cos( PI/2 + phi ); 
                    this.yvel = -this.speedmag * cos(angle1 - phi) * sin(phi) + this.speedmag * sin(angle1 - phi) * sin( PI/2 + phi ); 
                    this.others[i].xvel = 0;
                    this.others[i].yvel = 0 ; 
                }
                else if(this.mass == 0 && this.others[i].mass == 1){
                    this.xvel = 0 ;
                    this.yvel = 0 ;
                    this.others[i].xvel = -this.others[i].speedmag * cos(angle2 - phi) * cos(phi) + this.others[i].speedmag * sin(angle2 - phi) * cos( PI/2 + phi ); 
                    this.others[i].xvel = -this.others[i].speedmag * cos(angle2 - phi) * sin(phi) + this.others[i].speedmag * sin(angle2 - phi) * sin( PI/2 + phi );  
                }
                else{
                    this.xvel = 0 ;
                    this.yvel = 0 ;
                    this.others[i].xvel = 0;
                    this.others[i].yvel = 0 ; 
                }

            }
        }
    }
}
