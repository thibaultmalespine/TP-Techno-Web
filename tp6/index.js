const WIDTH = 800;
const HEIGHT = 600;
const SIZE = 2;
const SPEED = 1;
const PARTICLE_COUNT = 0;
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");


canvas.width = WIDTH;
canvas.height = HEIGHT;

class Particule{
    constructor(x, y, dx, dy, color){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
    }
    
    update(){
        this.x += this.dx;
        this.y += this.dy;
        this.x > 800 ? this.dx *= -1 : null
        this.x < 0 ? this.dx *= -1 : null
        this.y > 600 ? this.dy *= -1 : null
        this.y < 0 ? this.dy *= -1 : null
        
    }
    
    draw(ctx){
        ctx.fillStyle =  this.color; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, SIZE, 0,360);
        ctx.fill();
    }
    
}

function randomColor() {
    return `hsl(${Math.random() * 360}, ${50 + Math.random() * 50}%, ${50 + Math.random() * 50}%)`;
}

let particules = Array.from({ length : PARTICLE_COUNT}, ()=> new Particule((Math.random()*WIDTH), 
(Math.random()*HEIGHT), 
(Math.random()*SPEED)-SPEED/2,
(Math.random()*SPEED)-SPEED/2,
randomColor() ));

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
    for (let i = 0; i < 10; i++) {
        particules.push(new Particule(x,y,(Math.random()*SPEED)-SPEED/2,(Math.random()*SPEED)-SPEED/2,randomColor()));        
    }
}

// ajouter un evenement qui repousse les cercle en fonction de l'endroit ou est la souris

const rayon = 10;
canvas.addEventListener('mousemove',(event)=>{
    
})