
//NOISE -- variables
let particles = [];
const num = 4000;
let particleColor = '198, 192, 244';

//higher value forms more dense waves
const noiseScale = 0.004;

//SOUND -- variables
let speechOutput;
let button;
let amplitude;
let soundFactor;
let micFactor;
let volume;
let micInput;




function setup() {
  sound = loadSound("static/assets/music.wav");
  speech = loadSound("static/assets/speech.wav");
 
  var canvas = createCanvas(windowWidth, windowHeight,);
  canvas.parent("canvas-wrapper");

  

  for (let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
  }

  //SOUND -- create amplitude object & mic input
  amplitude = new p5.Amplitude();
  // micInput = new p5.AudioIn();
  // micInput.start();

}


function draw() {
  background(3, 3, 14, 20);

//SOUND -- get the volume level of the audio and map it to a variable  

  // let micLevel = micInput.getLevel();
  let soundLevel = amplitude.getLevel();
  soundFactor = map(soundLevel, 0, 0.4, 1, 5);
  // micFactor = map((micLevel * 100), 0, 1.2, 0.2, 1);

  // console.log("sound: " + soundFactor);
  // console.log("mic " + micFactor);


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

  //if the audio Sound is higher than 2 the flow field changes directions
  if(soundFactor >= 3 && soundFactor <= 3.01){
    noiseSeed(random(1000));
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

var promptField = document.getElementById('promptField');


  promptField.addEventListener('keypress', startAudio);

function startAudio() {

  
  if(sound.isLoaded()){
      sound.loop();
      document.getElementsByClassName("audioBtn")[0].innerHTML = "<i class='fa-solid fa-volume-high fa-xs' style='color: #ffffff;'></i>";
      }
      promptField.removeEventListener('keypress', startAudio);

  }



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

document.getElementById('saveCanvasBtn').addEventListener('click', downloadImg);


document.getElementById('saveCanvasBtn').addEventListener('click', function(event) {
  event.stopPropagation();
}
)


function downloadImg(){

saveCanvas('Meditationscape', '.png');

}
















