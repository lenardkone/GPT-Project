//This sketch.js file renders the flow field as an HTML5 Canvas & controls Audio interaction

//NOISE -- variables
let particles = [];
const num = 10000;
let particleColor ='rgb(0, 0, 0)';

//higher value forms more dense waves
const noiseScale = 0.0017;

//SOUND -- variables
let speechOutput;
let button;
let speechRec;





function setup() {
  sound = loadSound("static/assets/beneath-waves.wav");
  speech = loadSound("static/assets/speech.wav");


 
  var canvas = createCanvas(windowWidth, windowHeight,);
  canvas.parent("canvas-wrapper");


  for (let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
  }

  

}


function draw() {
  background(255, 255, 255, 120);


//NOISE -- add particles and flow field
  for (let i = 0; i < num; i++) {
    let p = particles[i];
    stroke(particleColor);
    strokeWeight(1);
    point(p.x, p.y);
    let noiseVar = noise(p.x * noiseScale, p.y * noiseScale);

    let a = TAU * noiseVar;
    p.x += cos(a) ;
    p.y += -sin(a) ;
  
  //if the particles go off screen assign random position on canvas
    if (!onScreen(p)) {
      p.x = random( width);
      p.y = random( height);
    }
  }

  
  }


//NOISE mouse action for background
function mouseReleased() {
  noiseSeed(random(1000));
}


//requirements for particles being on screen
function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


//keypress starts playback of background sound
var promptField = document.getElementById('promptField');

  promptField.addEventListener('keypress', startAudio);
  promptField.addEventListener('click', startAudio);

function startAudio() {
  
  if(sound.isLoaded()){
      sound.loop();
      document.getElementsByClassName("audioBtn")[0].innerHTML = "<i class='fa-solid fa-volume-high fa-xs' style='color: #ffffff;'></i>";
      }
      promptField.removeEventListener('keypress', startAudio);
      promptField.removeEventListener('click', startAudio);

  }


//On button click background audio turns on/off
document.getElementsByClassName('audioBtn')[0].addEventListener('click', toggleMusic);


// SOUND -- toggle function for button
function toggleMusic() {

  //if sound is playing and the button is pressed change icon and stop the audio
  if (sound.isPlaying()) {
    document.getElementsByClassName("audioBtn")[0].innerHTML = "<i class='fa-solid fa-volume-xmark fa-xs' style='color: #fff;'></i>";
    sound.pause();

    //if it's pressed again start playing the sound in a loop and change button icon
  } else if(!sound.isPlaying()) {
    sound.loop();

    amplitude = new p5.Amplitude();
    amplitude.setInput(sound);
    document.getElementsByClassName("audioBtn")[0].innerHTML = "<i class='fa-solid fa-volume-high fa-xs' style='color: #ffffff;'></i>";
  }

}

//Background Image Download button functionality

document.getElementById('saveCanvasBtn').addEventListener('click', downloadImg);


document.getElementById('saveCanvasBtn').addEventListener('click', function(event) {
  event.stopPropagation();
}
)

function downloadImg(){

saveCanvas('Meditationscape', '.png');

}
















