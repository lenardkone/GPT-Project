
            var headingText = document.getElementsByClassName('heading')[0];
            var loader = document.getElementById('loader')
            var breathDiv = document.getElementsByClassName('breathDiv')[0];
            var replayButton = document.getElementsByClassName('replayBtn')[0];
            var promptField = document.getElementById("promptField");
            var previousQuestion = document.getElementById('question');
            var loadingVar;

            fadeIn(headingText);



            



            
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






         
          

          //Breathing Animation visibility functions

          function showBreath(){
              breathDiv.style.display = 'block';
            }
            function hideBreath(){
              breathDiv.style.display = 'none';

            }
              
              
          
                //EXECUTE ON SUBMIT

                $(document).ready(function() {
                  var currentSpeech = null;
                  $('form').on('submit', function(event, stopSpeech) {
                    event.preventDefault();
                    //Hide Breath Animation & Replay Button for Resubmit
                    hideBreath();
                    replayButton.style.opacity = 0;
                    replayButton.style.display = 'none'
                    
                    
                    
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

                        var timeout3 = setTimeout(function(){fadeOut(headingText);},19000)

                        var timeout4 = setTimeout(function(){
                          headingText.innerHTML = "Patience is a great virtue";
                          fadeIn(headingText);
                        },20000)

                        var timeout5 = setTimeout(function(){fadeOut(headingText);},31000)

                        var timeout6 = setTimeout(function(){
                          
                          headingText.innerHTML = "Hang tight, we're almost there";
                          fadeIn(headingText);
                        },32000)
                        
                  
                        


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

                                    setTimeout(function(){
                                    fadeIn(headingText);
                                    headingText.innerHTML = "Meditation Playing";
                                           

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
                                                  if (!speech.paused && speech.duration > 0) {
                                                    speech.pause();
                                                    speech.currentTime = 0;

                                                    //if it's pressed again start playing the sound
                                                  } else if(speech.paused || speech.ended) {
                                                    speech.play();
                                                  }
                                              }

                                              function stopSpeech(){
                                                if (!currentSpeech.paused && currentSpeech.duration > 0) {
                                                    currentSpeech.pause();
                                                    speech.pause();
                                                    currentSpeech.currentTime = 0;
                                                    speech.currentTime = 0;

                                                  }
                                              }

                                          }                            
                                        }); 

                                                },2000)
                                        })
                                
                                .catch(error => console.error(error));

                          }
                      });
                  });
                });

                          
