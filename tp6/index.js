let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
const SIZE = 1;
const SPEED = 5;
const MINSPEED = 2;
const PARTICLE_COUNT = 0;
const PARTICLE_CREATE = 100;
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
let radius = 0;
let mouseCoordX;
let mouseCoordY;

canvas.width = WIDTH;
canvas.height = HEIGHT;

class Particule{
    constructor(x, y, speed, color){
        this.x = x;
        this.y = y;
        this.dx = speed[0];
        this.dy = speed[1];
        this.color = color;
        this.isOut = false;
    }
    
    update(){
        this.x += this.dx;
        this.y += this.dy;
        this.x > WIDTH ? this.dx *= -1 : null
        this.x < 0 ? this.dx *= -1 : null
        this.y > HEIGHT ? this.dy *= -1 : null
        this.y < 0 ? this.dy *= -1 : null
        
    }
    
    draw(ctx){
        ctx.fillStyle =  this.color; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, SIZE, 0,2*Math.PI);
        ctx.fill();
    }
    
}

function randomColor() {
    return `hsl(${Math.random() * 360}, ${50 + Math.random() * 50}%, ${50 + Math.random() * 50}%)`;
}

function randomSpeed() {
    let speed = []
    speed.push((Math.random()*2*SPEED)-SPEED);
    speed.push((Math.random()*2*SPEED)-SPEED);
    if (Math.sqrt(Math.pow(speed[0],2) + Math.pow(speed[1],2)) < Math.sqrt(Math.pow(MINSPEED,2) + Math.pow(MINSPEED,2))
        ||  Math.sqrt(Math.pow(speed[0],2) + Math.pow(speed[1],2)) > Math.sqrt(Math.pow(SPEED,2) + Math.pow(SPEED,2)) ){
        return randomSpeed();
    }
    else{
        return speed;
    }
}

let particules = Array.from({ length : PARTICLE_COUNT}, ()=>
    new Particule((Math.random()*WIDTH), 
                (Math.random()*HEIGHT), 
                randomSpeed(),
                randomColor())
);
function renderParticles() {
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    particules.forEach( particule => {
        particule.draw(ctx);
        particule.update();
    })
    window.requestAnimationFrame(renderParticles);
}

renderParticles();

canvas.addEventListener("click",(event)=>{
    explode(event.offsetX,event.offsetY);
})

function explode(x,y){
    for (let i = 0; i < PARTICLE_CREATE; i++) {
        particules.push(new Particule(x,y,randomSpeed(),randomColor()));        
    }
}

// ajouter un evenement qui repousse les cercle en fonction de l'endroit ou est la souris


canvas.addEventListener('mousemove',(event)=>{
    mouseCoordX = event.offsetX;
    mouseCoordY = event.offsetY;
})

function repulse() {

    particules.forEach(particule => {  
        let distanceX = mouseCoordX - particule.x;
        let distanceY = mouseCoordY - particule.y;
        let distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
        if (distance < radius){
            if (particule.isOut) {
                // coeficient directeur de la droite  
                m = Math.abs(distanceX)/Math.abs(distanceY)
                // ordonnée à l'origine 
                b = particule.y - (m * particule.x)
    
                // angle alpha
                angle = Math.atan(m)
    
                //vitesse initiale
                vi = Math.sqrt(Math.pow(particule.dx,2)+Math.pow(particule.dy,2));
                //nouvelle composante 
                vx = vi * Math.cos(angle);
                vy = vi * Math.sin(angle);
                
                distanceX > 0 ? particule.dx = -vx : particule.dx = vx;
                distanceY > 0 ? particule.dy = -vy : particule.dy = vy;
            }
        }
        else{
            particule.isOut = true;
        }
    });
    window.requestAnimationFrame(repulse);
}

repulse();

// agrandir ou rétrécir le cercle de répulsion de la souris lorsque l'on utilise la molette
canvas.addEventListener("wheel",(event)=>{
        if (event.deltaY > 0){
            radius > 0 ? radius -= 10 : null;
        } else {
            radius += 10;
        }
})

// resize le canvas en même temps que la fenêtre
window.addEventListener('resize', function() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
});