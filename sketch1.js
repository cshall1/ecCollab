var mode = 0
var resetTime = 0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  //concent question yes/no
  if (mode == 0) {
    screen1();
    //yes 
    if ((keyIsPressed == true) && (key == 'y')) {
      mode = 1;
    }
    //no
    if ((keyIsPressed == true) && (key == 'n')) {
      mode = 2;
    }
  } 
  //yes
  if (mode == 1) {
    screen2();
    if (millis() > resetTime + 10000) {
      mode = 0;
      resetTime = millis();
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
  text("Do you consent to being confronted\nwith a prompt regarding racism?", 300, 120);
  
  textSize(20);
  text("(Select 'y' on the keyboard)", 150, 330)
  
  textSize(40);
  text("yes", 150, 300);
  
  textSize(20);
  text("(Select 'n' on the keyboard)", 460, 330)
  
  textSize(40);
  text("no", 470, 300);
}

function screen2() {
  fill(255);
  textSize(30);
  text("You are invited to enter this structure", 300, 200);
}

function screen3() {
  fill(255);
  textSize(30);
  text("Thank you for visiting this installation", 300, 200);
}
