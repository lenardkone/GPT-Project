let particles = [];
const num = 20000;
let img;
const noiseScale = 0.004;

//sound -- variables
let sound, amplitude, button;
//sound -- variables

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-wrapper");

  for (let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
  }

  //sound -- create button & create amplitude object
  sound = loadSound("assets/splash.wav");
  button = createButton("play");
  button.mouseClicked(togglePlay);
  amplitude = new p5.Amplitude();
  //sound -- create button & create amplitude object
}

// sound -- toggle function for button callback
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
    amplitude = new p5.Amplitude();
    amplitude.setInput(sound);
  }
}
// sound -- toggle function for button callback

function draw() {
  background(0, 30);

  //sound -- getLevel variable
  let level = amplitude.getLevel();
  let waveFactor = map(level, 0, 1, 0, 400);
  console.log(waveFactor);
  //sound -- getLevel variable

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

//-----------NATIVE JAVASCRIPT CODE----------//

// var audio = new Audio("static/assets/splash.wav");
// audio.loop = true;

// audio.play();
// console.log(audio);
