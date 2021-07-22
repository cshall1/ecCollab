var mode = 0
var resetTime = 0;

function setup() {
  createCanvas(640, 480);
}

function draw() {
  background(0);
  //concent question yes/no
  if (mode == 0) {
    screen1();
    //yes 

    if ((keyIsPressed == true) && (key == 'y')) {
      mode = 1;
      //window.location.href = "stage2A.html";
    }
    //no
    if ((keyIsPressed == true) && (key == 'n')) {
      mode = 2;
    }
  } 
  //yes
  if (mode == 1) {
    screen2();
    
    if ((keyIsPressed == true) && (key == 'c')) {
      window.location.href = "stage2A.html";
    }
  }
  
  //no
  if (mode == 2) {
    screen3();
    if (millis() > resetTime + 10000) {
      mode = 0;
      resetTime = millis();
    }
  }
}

function screen1() {
  fill(255);
  textSize(30);
  textAlign(CENTER);
  text("Do you consent to being confronted\nwith a prompt regarding racism?", 350, 120);
  
  textSize(20);
  text("(Select 'y' on the keyboard)", 200, 330)
  
  textSize(40);
  text("yes", 200, 300);
  
  textSize(20);
  text("(Select 'n' on the keyboard)", 510, 330)
  
  textSize(40);
  text("no", 520, 300);
}

function screen2() {
  fill(255);
  textSize(30);
  textAlign(CENTER);
  text("How to Interact with this Installation:", 315, 50);

  fill(255);
  textSize(20);
  textAlign(CENTER);
  text("Enter as many words as you'd like into the text input bar\n\nMove your body around the space to\nactivate sounds and words on the screen", 315, 150);

  fill(255);
  textSize(20);
  textAlign(CENTER);
  text("Press 'c' on the keyboard when you are done\nreading the instructions and ready to continue", 315, 350);
}

function screen3() {
  fill(255);
  textSize(30);
  text("Thank you for visiting this installation", 350, 200);
}
