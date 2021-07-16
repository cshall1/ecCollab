var myCapture, // camera
    myVida;    // VIDA
var synth = [];
let words = [];
let new_word = "";
var enter_button;
var zoneLocation = 0;
var resetTime = 0;

function initCaptureDevice() {
  try {
    myCapture = createCapture(VIDEO);
    myCapture.size(640, 480);
    myCapture.elt.setAttribute('playsinline', '');
    myCapture.hide();
    console.log(
      '[initCaptureDevice] capture ready. Resolution: ' +
      myCapture.width + ' ' + myCapture.height
    );
  } catch(_err) {
    console.log('[initCaptureDevice] capture error: ' + _err);
  }
}


function keyPressed() {
  if (keyCode === ENTER) {
    displayWords();
    input.elt.value = "";
  }
}


// handles a new word entered in text box
function displayWords() {  
    
    new_word = input.value();

    let numZoneLocations = words.length;

    zoneLocation = Math.floor(Math.random() * numZoneLocations); 

    words[zoneLocation].switchWord(new_word);
  
  //zoneLocation = zoneLocation + 1;
  
  //if (zoneLocation > words.length - 1) {
    //zoneLocation = 0; 
  //}
}

function clearInputField() {
    new_word = input.value('');
}

function WordZone(x, y) {
  //word in the slot
  this.wordCharString = "";
  this.x = x;
  this.y = y;

  this.draw = function() {
      text(this.wordCharString, this.x, this.y - 1);
  }
  
  this.switchWord = function(wordEntered) {
    this.wordCharString = wordEntered;
  }
}

function setup() {
  createCanvas(640, 480); // we need some space...
    
  input = createInput();
  input.position(255, 420);
    
  let inputElement = input.elt;
  inputElement.focus();
  
  //enter_button = createButton('enter');
  //enter_button.position(410, 375);
  //enter_button.mousePressed(displayWords);
  
  initCaptureDevice(); // and access to the camera

  myVida = new Vida(this); // create the object
  
  myVida.progressiveBackgroundFlag = true;
  
  myVida.imageFilterFeedback = 0.92;
  
  myVida.imageFilterThreshold = 0.15;
  
  myVida.mirror = myVida.MIRROR_HORIZONTAL;
  
  myVida.handleActiveZonesFlag = true;
  
  myVida.setActiveZonesNormFillThreshold(0.02);
  
  var padding = 0.07; var n = 15;
  var zoneWidth = 0.1; var zoneHeight = 0.1;
  var hOffset = (1.0 - (n * zoneWidth + (n - 1) * padding)) / 2.0;
  var vOffset = 0.5;
  
    
  myVida.addActiveZone(0, 0.1, 0.2, zoneWidth, zoneHeight);
  myVida.addActiveZone(1, 0.3, 0.2, zoneWidth, zoneHeight);
  myVida.addActiveZone(2, 0.5, 0.2, zoneWidth, zoneHeight);
  myVida.addActiveZone(3, 0.7, 0.2, zoneWidth, zoneHeight);
  myVida.addActiveZone(4, 0.9, 0.2, zoneWidth, zoneHeight);
  myVida.addActiveZone(5, 0.1, 0.5, zoneWidth, zoneHeight);
  myVida.addActiveZone(6, 0.3, 0.5, zoneWidth, zoneHeight);
  myVida.addActiveZone(7, 0.5, 0.5, zoneWidth, zoneHeight);
  myVida.addActiveZone(8, 0.7, 0.5, zoneWidth, zoneHeight);
  myVida.addActiveZone(9, 0.9, 0.5, zoneWidth, zoneHeight);
  myVida.addActiveZone(10, 0.1, 0.8, zoneWidth, zoneHeight);
  myVida.addActiveZone(11, 0.3, 0.8, zoneWidth, zoneHeight);
  myVida.addActiveZone(12, 0.5, 0.8, zoneWidth, zoneHeight);
  myVida.addActiveZone(13, 0.7, 0.8, zoneWidth, zoneHeight);
  myVida.addActiveZone(14, 0.9, 0.8, zoneWidth, zoneHeight);
    
  for(var i = 0; i < n; i++) {
    //var osc = new p5.Oscillator();
    //osc.setType('sine');
    //
    //osc.freq(220.0 * Math.pow(2.0, (60 + (i * 4) - 69.0) / 12.0));
    //osc.amp(0.0); osc.start();
    //synth[i] = osc;
    synth[i] = new SynthVoice();
    synth[i].freq(220.0 * Math.pow(2.0, (60 + (i * 4) - 69.0) / 12.0));
    synth[i].amp(0.1);
  }

  frameRate(30); // set framerate
  
  
  // Creates a word for each zone
  var temp_drawing_w = width;  var temp_drawing_h = height;
  var temp_x, temp_y, temp_w, temp_h;
  for(var z = 0; z < myVida.activeZones.length; z++) {
    temp_x = Math.floor(myVida.activeZones[z].normX * temp_drawing_w);
    temp_y = Math.floor(myVida.activeZones[z].normY * temp_drawing_h);
    words.push(new WordZone(temp_x, temp_y));
  }
}

function draw() {
  if(myCapture !== null && myCapture !== undefined) { // safety first
    background(0, 0, 255);
    
    myVida.update(myCapture);
    
    image(myVida.thresholdImage, 0, 0);
    
    var temp_drawing_w = width;  var temp_drawing_h = height; 

    var offset_x = 0; var offset_y = 0;
    // pixel-based zone's coords
    var temp_x, temp_y, temp_w, temp_h;
    push(); // store current drawing style and font
    translate(offset_x, offset_y); // translate coords
    // set text style and font
    textFont('Helvetica', 15); textAlign(CENTER); textStyle(NORMAL);
    // let's iterate over all active zones
    for(var i = 0; i < myVida.activeZones.length; i++) {
      
      // read and convert norm coords to pixel-based
      temp_x = Math.floor(myVida.activeZones[i].normX * temp_drawing_w);
      temp_y = Math.floor(myVida.activeZones[i].normY * temp_drawing_h);
      temp_w = Math.floor(myVida.activeZones[i].normW * temp_drawing_w);
      temp_h = Math.floor(myVida.activeZones[i].normH * temp_drawing_h);
      // draw zone rect (filled if movement detected)
      strokeWeight(1);
      if(myVida.activeZones[i].isEnabledFlag) {
        stroke(255, 0, 0);
        if(myVida.activeZones[i].isMovementDetectedFlag) {
          fill(255, 0, 0, 128);
          words[i].draw();
        }
        else noFill();
      }
      else {
        stroke(0, 0, 255);
        
        if(myVida.activeZones[i].isMovementDetectedFlag) fill(0, 0, 255, 128);
        else noFill();
      }
      //rect(temp_x, temp_y, temp_w, temp_h);
      // print id
      noStroke();
      if(myVida.activeZones[i].isEnabledFlag) fill(255, 0, 0);
      else fill(0, 0, 255);
      
      if(myVida.activeZones[i].isChangedFlag) {
    
        //synth[myVida.activeZones[i].id].amp(
        //  0.1 * myVida.activeZones[i].isMovementDetectedFlag
        //);
	
	if (myVida.activeZones[i].isMovementDetectedFlag) {
	  synth[myVida.activeZones[i].id].triggerAttackIfNotPlaying();
	} else {
	  synth[myVida.activeZones[i].id].triggerRelease();
	}
      }
    }
    pop(); // restore memorized drawing style and font
  }
  else {
    background(255, 0, 0);
  }
  
  fill(255);
  textSize(20);
  textAlign(CENTER);
  text("In one word, describe a feeling or sensation\nthat you are experiencing in your body right now", 315, 150);
  if (millis() > resetTime + 120000) {
    window.location.href = "stage3.html";
  }
}
