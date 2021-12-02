let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
ctx.fillStyle = 'blue';
// ctx.fillRect(100, 100, 400, 400);

ctx.lineWidth = 4;
// ctx.beginPath();
// ctx.rect(100, 100, 400, 400);
// ctx.stroke();

// ctx.beginPath();
// ctx.arc(300, 300, 100, 0, Math.PI*2);
// ctx.stroke();

const width = 60;
const height = 60;
const gap = 20;
let x , y = 100;

for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        x = 100 + (width + gap) * i;
        y = 100+ (height + gap) * j;
    
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.stroke();
        if (Math.random() > .5) {
            ctx.beginPath();
            ctx.rect(x + 8, y + 8, width - 16, height - 16);
            ctx.stroke();
        }
        
    }
}