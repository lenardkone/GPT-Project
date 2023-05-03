let particles = [];
const num = 20000;
let img;
const noiseScale = 0.004;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-wrapper");

  for (let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
  }
}

function draw() {
  background(0, 30);

  for (let i = 0; i < num; i++) {
    let p = particles[i];
    stroke(204, 198, 242);
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

var audio = new Audio("static/assets/splash.wav");
audio.loop = true;

audio.play();
console.log(audio);
