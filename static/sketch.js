let particles = [];
const num = 1000;
let img;
const noiseScale = 0.01;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-wrapper");

  for (let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
  }
}

function draw() {
  background(0, 10);

  push();
  // tint(255,50)
  // image(img,0,0,width, height)

  pop();
  for (let i = 0; i < num; i++) {
    let p = particles[i];
    stroke(255);
    strokeWeight(1);
    point(p.x, p.y);
    let n = noise(p.x * noiseScale, p.y * noiseScale);

    let a = TAU * n;
    p.x += -cos(a);
    p.y += sin(a);
    if (!onScreen(p)) {
      p.x = random(width);
      p.y = random(height);
    }
  }
}
function mouseReleased() {
  noiseSeed(random(1000));
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

var audio = new Audio("static/assets/eyes-closed.wav");
audio.loop = true;

audio.play();
console.log(audio);
