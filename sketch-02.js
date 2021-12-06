const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
// const num = random.range(120, 500);
const num = 100 ;
const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const sketch = ({ context, width, height }) => {
  const cx = width * 0.5;
  const cy = height * 0.5;
  const w = width * 0.01 ;
  const h = height * 0.1 ;
  let x, y;

  
  const radius = width * 0.3;
  const colors = ['#f5f5f5', '#ddd', '#eee', '#666','#999'];
  const clock = [];
  const arcs = [];
  const slice = math.degToRad(360 / num);
  for (let i = 0; i < num; i++) {
    const angle = slice * i; 
    x = cx + radius * Math.sin(angle);
    y = cy + radius * Math.cos (angle);
    // "clock"
    clock.push(new Line(x, y, w, h, angle, colors));
    // arcs
    arcs.push(new Arc(cx, cy, angle, colors, slice, radius));
  }
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    
    arcs.forEach( arc => {
      // console.log(arc);
      arc.update();
      arc.draw(context)
      // arcs.bounce(width, height);
    });
    // clock.forEach( line => {
    //   // arcs.update();
    //   line.draw(context)
    //   // arcs.bounce(width, height);
    // });

  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class VectorArc {
  constructor(cx, cy, angle, colors, slice, radius) {
    this.slice = slice;
  }
}

class Line {
  constructor(x, y, w, h, angle, colors) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.w = w;
    this.h = h;
    this.angle = angle;
    this.colors = colors;
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y );
    context.rotate(-this.angle);
    context.scale( random.range(.1, .4), random.range(.2, 2.25));

    context.fillStyle = this.colors[Math.round(random.range(2, 4))];
    context.beginPath();
    context.rect(-this.w * 0.5, random.range(0, -this.h * 0.75), this.w, this.h);
    context.fill();  
    context.restore();
  }
  
}

class Arc {
  constructor(cx, cy, angle, colors, slice, radius) {
    this.cx = cx;
    this.cy = cy;
    this.vel = random.range(-.01, .01);
    this.angle = angle;
    this.colors = colors[Math.round(random.range(0,colors.length))];
    this.slice = slice;
    this.iSlice = this.slice * random.range(1, -35);
    this.eSlice = this.slice * random.range(1, 25);
    this.radius = radius * random.range(.2, 1.8);
    this.lineWidth = random.range(2, 25);
  }

  update() {
    this.iSlice += this.vel;
    this.eSlice += this.vel;
  }
  
  draw(context) {
    // console.log(this.radius );
    context.save();
      context.translate(this.cx, this.cy);
      context.rotate(-this.angle);
      context.lineWidth = this.lineWidth;
      context.strokeStyle = this.colors;
      context.beginPath();
      context.arc(0, 0, this.radius , this.iSlice , this.eSlice);
      context.stroke();
      context.restore();
  }
}