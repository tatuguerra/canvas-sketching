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

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01 ;
    const h = height * 0.1 ;
    let x, y;

    let num = 5000 ;
    const radius = width * 0.3;
    const colors = ['#f5f5f5', '#ddd', '#eee', '#666','#999'];

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i; 
      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos (angle);
      
      // "clock"
      // context.save();
      // context.translate(x, y );
      // context.rotate(-angle);
      // context.scale( random.range(.1, .4), random.range(.2, 1.8));
  
      // context.fillStyle = colors[Math.round(random.range(2, 4))];
      // context.beginPath();
      // context.rect(-w * 0.5, random.range(0, -h * 0.75), w, h);
      // context.fill();  
      // context.restore();
      
      // arcs
      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);
      context.lineWidth = random.range(1,2);
      
      context.strokeStyle = colors[Math.round(random.range(0,colors.length))];
      context.beginPath();
      context.arc(0, 0, radius * random.range(0.2, 1.6), slice * random.range(1, -400), slice * random.range(1, 500));
      context.stroke();
      context.restore();


    }
  };
};

canvasSketch(sketch, settings);
