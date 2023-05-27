const loadingTextElement = document.getElementById('loading-text');
            loadingTextElement.textContent = '';

            
            var headingText = document.getElementsByClassName('heading')[0];
            var loader = document.getElementById('loader');
            var breathDiv = document.getElementsByClassName('breathDiv')[0];
            var replayButton = document.getElementsByClassName('replayBtn')[0];
            var downloadButton = document.getElementsByClassName('downloadBtn')[0];
            var audioButton = document.getElementsByClassName('soundControl')[0];
            var colorPicker = document.getElementById('cPicker');
            var submitButton = document.getElementById('submitBtn');
            var generateButton = document.getElementById('generateBtn');
            var inputBox = document.getElementsByClassName('inputBox')[0]
            var promptField = document.getElementById("promptField");
            var previousQuestion = document.getElementById('question');
            var medCards = document.querySelectorAll('.meditationCard');
            var cardTexts = document.querySelectorAll('.cardText');
            var cardPlayButtons = document.querySelectorAll('.cardPlayBtn');
            var cardPlayButtonIcons = document.querySelectorAll('.cardPlayBtnIcon');
            var dragPill = document.getElementsByClassName('dragPill')[0];
            var library = document.getElementsByClassName('library')[0]


            var currentSpeech;
            var anger, affirmations, grief, sleep, overthink, frustration;


            //INITIALIZE VALUES FOR FADE IN
            downloadButton.style.opacity = '0';
            audioButton.style.opacity = '0';
            inputBox.style.opacity = '0'
            colorPicker.style.opacity = '0'
            // submitButton.style.opacity = '0';
            fadeIn(headingText);



            //
             document.getElementsByClassName('dragPill')[0].addEventListener('click', ()=>{

              
                  const y = library.getBoundingClientRect().top + window.scrollY;
                  window.scroll({
                    top: y - 72,
                    behavior: 'smooth'
                  });

                  if(window.scrollY > 0){
                    window.scroll({
                      top: 0,
                      behavior: 'smooth'
                    });
                  }
            })

            

            dragPill.addEventListener('mouseover', ()=>{   
              dragPill.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                  dragPill.style.transition = '200ms ease-in;'
                  
            })
            dragPill.addEventListener('mouseout', ()=>{

              dragPill.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
              dragPill.style.transition = '200ms ease-out'
            })

        


            colorPicker.addEventListener('input', () => {

              var cPick = colorPicker.value;

              headingText.style.color = cPick;
              headingText.style.filter = 'brightness(140%)';
              particleColor = cPick;



                  inputBox.addEventListener('mouseover', function(){
                    generateButton.style.backgroundColor = cPick;
                    generateButton.style.transition = '200ms';                    
                    generateButton.style.color = cPick;
                    document.querySelector('.arrowIcon').style.filter = 'brightness(40%)';

                  });


                  inputBox.addEventListener('mouseout', function(){
                    generateButton.style.backgroundColor = 'transparent';
                    generateButton.style.color = cPick;
                    document.querySelector('.arrowIcon').style.filter = 'none';

                  });


                  generateButton.addEventListener('mouseover',()=>{
                    generateButton.style.borderColor = cPick;
                  })

                  generateButton.addEventListener('mouseout',()=>{
                    generateButton.style.borderColor =  'rgba(255, 255, 255, 0.4)';
;
                  })
      
                   


                    for(var n = 0; n < medCards.length ; n++){
                      let medCard = medCards[n];
                      let cardText = cardTexts[n];
                      let cardPlayButton = cardPlayButtons[n];
                      // let cardPlayButtonIcon = cardPlayButtonIcons[n];


                          medCard.addEventListener('mouseover', function(){
                            
                            medCard.style.backgroundColor = cPick;
                            cardText.style.filter = 'brightness(30%)';
                            cardText.style.color = cPick;
                            cardPlayButton.style.filter = 'brightness(20%)';
                            cardPlayButton.style.borderColor = cPick;
                            // cardPlayButtonIcon.style.filter = 'brightness(40%)';
                            // cardPlayButtonIcon.style.color = cPick;

                          });
                          
                          
                          medCard.addEventListener('mouseout', function(){
                            medCard.style.backgroundColor = '#ccd1f203';
                            cardText.style.filter = 'none';
                            cardText.style.color = 'white';
                            cardPlayButton.style.filter = 'none';
                            cardPlayButton.style.borderColor = "rgba(255, 255, 255, 0.2)";
                            // cardPlayButtonIcon.style.filter = 'none';
                            // cardPlayButtonIcon.style.color = 'white';

                       


                            });
                          }
            })

            















            //ON PAGE LOAD ANIMATIONS


            var timeout9 = setTimeout(function(){fadeOut(headingText);},3000)

            var timeout10 = setTimeout(function(){
              fadeIn(headingText);
              // headingText.innerHTML = "Best Experienced with Headphones";
              headingText.innerHTML = "Put on your Headphones";
              
            },5000)
            var timeout11 = setTimeout(function(){fadeOut(headingText);},8000)

            var timeout12 = setTimeout(function(){
              fadeIn(headingText);
              // headingText.innerHTML = "Describe your Emotional State or Topic for a Meditation";
              // headingText.innerHTML = "Let's start meditating, shall we?";
              headingText.innerHTML = "Type the Topic for your Meditation Routine";


            },10000)
            var timeout13 = setTimeout(function(){fadeOut(headingText);},12000)

            var timeout14 = setTimeout(function(){
              fadeIn(headingText);
              // headingText.innerHTML = "Tell me what feelings you're experiencing";
              headingText.innerHTML = "How are you feeling today?";

            },14000)





            // fadeIn(inputBox);


            setTimeout(() =>{            
            fadeIn(inputBox);
            },10000)



            inputBox.addEventListener('keypress', inputBoxKey);

            function inputBoxKey(){
            
              fadeIn(downloadButton);
              fadeIn(audioButton);
              fadeIn(colorPicker);

              inputBox.removeEventListener('keypress',inputBoxKey);
          }
              inputBox.addEventListener('click', inputBoxClick);

              function inputBoxClick(){
              
                fadeIn(downloadButton);
                fadeIn(audioButton);
                fadeIn(colorPicker);

                inputBox.removeEventListener('click',inputBoxClick);
            }
          


            


            
           //call this function everytime content updates for OPACITY FADE IN ANIMATION

            function fadeIn(el){
              if(el.innerHTML === 'Welcome to The Meditation Realm'){
                el.classList.add('transitionDelay');

              }

              el.style.opacity = '0';
              setTimeout(function() {
              el.classList.add('transitionIn');
              el.style.opacity = '1';
            }, 10);
            
            setTimeout(function() {
              el.classList.remove('transitionIn');
            }, 3000);

            setTimeout(function() {
              el.classList.remove('transitionDelay');
            }, 4000);
          }

          

          //call this function everytime content updates for OPACITY FADE OUT ANIMATION

          function fadeOut(el){
            
              // el.style.opacity = '1';
              setTimeout(function() {
              el.classList.add('transitionOut');
              el.style.opacity = '0';
            }, 10);
            
            setTimeout(function() {
              el.classList.remove('transitionOut');
              
            }, 3000);
          }






          //Breathing Animation visibility control functions

          function showBreath(){
              breathDiv.style.display = 'block';
            }
            function hideBreath(){
              breathDiv.style.display = 'none';

            }
              







//---------------------------------------EXECUTE ON SUBMIT----------------------------------------------------------------

                $(document).ready(function() {
                  var currentSpeech = null;
                  $('form').on('submit', function(event) {
                    event.preventDefault();

                    clearTimeout(timeout10);
                    clearTimeout(timeout11);
                    clearTimeout(timeout12);
                    clearTimeout(timeout13);
                    clearTimeout(timeout14);

                    //Hide Breath Animation & Replay Button for Resubmit
                    hideBreath();
                    replayButton.style.opacity = 0;
                    replayButton.style.display = 'none'
                    
                    if (currentSpeech) {
                      currentSpeech.pause();
                      currentSpeech.currentTime = 0;
                    }
                    
                      
                    //LOADING SCREEN with switching 
                  
                        loader.style.display = 'block';
                        fadeIn(loader);

                        headingText.innerHTML = "Get in a comfortable position";
                        fadeIn(headingText);

                        var timeout1 = setTimeout(function(){fadeOut(headingText);},9000)

                        var timeout2 = setTimeout(function(){
                          fadeIn(headingText);
                          headingText.innerHTML = "Generating Meditation...";
                          
                        },10000)

                        var timeout3 = setTimeout(function(){fadeOut(headingText);},15000)

                        var timeout4 = setTimeout(function(){
                          fadeIn(headingText);
                          headingText.innerHTML = "About 30 seconds remaining";
                          
                        },16000)

                        var timeout5 = setTimeout(function(){fadeOut(headingText);},24000)

                        var timeout6 = setTimeout(function(){
                          headingText.innerHTML = "Patience is a great virtue";
                          fadeIn(headingText);
                        },25000)

                        var timeout7 = setTimeout(function(){fadeOut(headingText);},34000)

                        var timeout8 = setTimeout(function(){
                          
                          headingText.innerHTML = "Hang tight, we're almost there";
                          fadeIn(headingText);
                        },35000)
                        
                  
                        


                    // --------- AJAX Post Request for 'userPrompt' to Python Server ------
                      $.ajax({
                          type: 'POST',
                          url: '/submit',
                          data: $('form').serialize(),
                          success: function(response) {
                            fadeOut(loader);
                            loader.style.display = 'none';
                            fadeOut(headingText);
                            
                            
                            

                            console.log(response.userPrompt);
                            document.getElementsByClassName('textStyle')[0].innerHTML = response.userPrompt;
                            previousQuestion.style.opacity = 1;

                            
                            promptField.value = "";
                            
                            var resultJS = response.OutputGPT;
                            
                            // FETCH Post resultJS to Python Server for tts() function
                                fetch('/tts', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ resultJS: resultJS })
                                })
                                .then(response => response.text())
                                .then(result => console.log(result))
                              
                                .then(function speechStart(){
                                  

                                    clearTimeout(timeout1);
                                    clearTimeout(timeout2);
                                    clearTimeout(timeout3);
                                    clearTimeout(timeout4);
                                    clearTimeout(timeout5);
                                    clearTimeout(timeout6);
                                    clearTimeout(timeout7);
                                    clearTimeout(timeout8);

                                    setTimeout(function(){
                                    fadeIn(headingText);
                                    headingText.innerHTML = "Meditation Playing...";
                                    

                                    //AJAX request for Blob from speech.wav 
                                        $.ajax({
                                          url: 'static/assets/speech.wav',
                                          xhrFields: {
                                            responseType: 'blob'
                                          },
                                          success: function(blob) {
                                      
                                            if (currentSpeech) {
                                              currentSpeech.pause();
                                              currentSpeech.currentTime = 0;
                                            }
                                            
                                            
                                            //Create Audio Object from Blob
                                            var speech = new Audio();
                                                                                 
                                            speech.src = URL.createObjectURL(blob);

                                            currentSpeech = speech;
                                            
                                            speech.play();
                                            
                                            
                                            
                                            // Execute after speech.wav audio ends
                                            speech.onended = function(blob){
                                            fadeOut(headingText);
                                            
                                            showBreath();
                                            // fadeIn(breathDiv);
                                            replayButton.style.display = 'inline-block'
                                            fadeOut(replayButton)
                                            setTimeout(function(){fadeIn(replayButton);},1000)


                                                                                 
                                            }
                                            
                                            replayButton.addEventListener('click', toggleReplay);
                                            function toggleReplay() {

                                                  //if sound is playing and the button is pressed stop the audio
                                                  if (!currentSpeech.paused && currentSpeech.duration > 0) {
                                                    // speech.pause(); ---causes playback error!!
                                                  
                                                    currentSpeech.currentTime = 0;
                                                    

                                                    //if it's pressed again start playing the sound
                                                  } else if(currentSpeech.paused || currentSpeech.ended) {
                                                    currentSpeech.play();
                                                  }
                                              }

                                             

                                          }                            
                                        }); 

                                                },1000)
                                        })
                                
                                .catch(error => console.error(error));

                          }
                      });
                  });
                });










            // MEDITATION LIBRARY ---------------------AUDIO PLAYBACK FUNCTIONS
              
              anger =        new Audio("static/assets/anger.wav");
              sleep =        new Audio("static/assets/sleep.wav");
              overthink =    new Audio( "static/assets/overthink.wav");
              grief =        new Audio("static/assets/grief.wav");
              frustration =   new Audio("static/assets/frustration.wav");
              affirmations = new Audio("static/assets/affirmations.wav");


            function togglePlay(a, num) {
              a.onended =()=>{document.getElementsByClassName('cardPlayBtn')[num].innerHTML ="<i class='fa-solid fa-play fa-xs' style='color: #ffffff;'></i>";}

            
              //if sound is playing and the button is pressed change icon and stop the audio
              if (a.paused) {
                a.play();
                document.getElementsByClassName('cardPlayBtn')[num].innerHTML = "<i class='fa-solid fa-stop fa-xs' style='color: #fff;'></i>";

                //if it's pressed again start playing the sound and change button icon
              } else {
                a.pause();
                a.currentTime = 0;

                document.getElementsByClassName("cardPlayBtn")[num].innerHTML = "<i class='fa-solid fa-play fa-xs' style='color: #ffffff;'></i>";
              }
            
            }



                          
