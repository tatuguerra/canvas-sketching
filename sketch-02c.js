const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
 
const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    const cx = width * 0;
    const cy = height * 0;
    const w = width * 0.01 ;
    const h = height * 0.1 ;
    let x, y;

    let num = random.range(120, 500) ;
    const radius = width * 0.3;
    const colors = ['#f5f5f5', '#ddd', '#eee', '#666','#999'];

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i; 
      x = cx + radius * Math.sin(angle) *2;
      y = cy + radius * Math.cos (angle) *2;
      
      // "clock"
      context.save();
      context.translate(x, y );
      context.rotate(-angle);
      context.scale( random.range(.1, .4), random.range(0, 7.5));
  
      context.fillStyle = colors[Math.round(random.range(2, 4))];
      context.beginPath();
      context.rect(-w * 0.5, random.range(0, -h * 0.75), w, h);
      context.fill();  
      context.restore();
      
      // arcs
      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);
      context.lineWidth = random.range(2, 25);
      
      context.strokeStyle = colors[Math.round(random.range(0,colors.length))];
      context.beginPath();
      context.arc(0, 0, radius * random.range(.5, 6), slice * random.range(1, -40), slice * random.range(1, 25));
      context.stroke();
      context.restore();


    }
  };
};

canvasSketch(sketch, settings);
