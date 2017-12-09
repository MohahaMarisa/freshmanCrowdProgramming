//sends a different angle every 3rd of a second

//sleeping positoin controllers should be 0.639 of the width and height 0.57
// var Slider0, Slider1, Slider2;
var headRotation;
var segLength = 100;
var x;
var y; 
var x2; 
var y2;
var x3;
var y3;
var segmentControllerX;
var segmentControllerY;
var div;
var anotherDiv;
var rotationDiv;
var lamp;
var clicked = false;
var whichVariableToSend = 0;
var buttonRemote, buttonHand, buttonFace, buttonOccupancy, buttonNum, buttonSleep, modeQuote, mode;
var whichModeActivated = 0;

//background colors
  var h=20;
  var h1 = 180;
  var b = 170;

function setup() {
  // create canvas
  createCanvas(windowWidth, 600);
  frameRate(3);
  angleMode(DEGREES);
  //create Buttons and mode div
  buttonRemote = createButton('Web Control');
  buttonRemote.position(width/10,height/10);
  buttonRemote.mousePressed(tosay);
  
  buttonFace = createButton('Face Focus');
  buttonFace.position(2*width/10,height/10);
  buttonFace.mousePressed(tosay2);

  buttonHand = createButton('Work with Hands');
  buttonHand.position(4*width/10,height/10);
  buttonHand.mousePressed(tosay3);

  buttonNum = createButton('Occupancy Detection');
  buttonNum.position(6*width/10,height/10);
  buttonNum.mousePressed(tosay4)

  buttonSleep = createButton('Sleep');
  buttonSleep.position(8*width/10,height/10);
  buttonSleep.mousePressed(tosay5);

  modeQuote = createDiv('Current Mode...').size(500,30);
  mode = createDiv('22').size(50,30);
  mode.id('mode');

  div = createDiv('169').size(50,30);
  div.id('angle1');
  anotherDiv = createDiv('169').size(50,30);
  anotherDiv.id('angle2');
  rotationDiv = createDiv('90').size(50,30);
  rotationDiv.id('angle3');
  segmentControllerX = width*0.644;
  segmentControllerY = height* 0.57;
  lamp = new dragSegment(0,width*0.644,height* 0.57);
  textSize(15);
  stroke(255, 100);

  x = width/2;
  y = height/2
  x2 = x;
  y2 = y;

  // create sliders
  // Slider0 = createSlider(0, 180, 90);
  // Slider0.position(20, 20);
  // Slider1 = createSlider(0, 180, 120);
  // Slider1.position(20, 50);
  // Slider2 = createSlider(0, 180, 90);
  // Slider2.position(20, 80);
  headRotation = createSlider(0,180,90);
  headRotation.position(width/2,height*0.9);
}

function draw() {
  // var h = Slider0.value();
  // var h1 = Slider1.value();
  // var b = Slider2.value();
  background(h, h1, b);


  if ((whichModeActivated == 1) && clicked && mouseX<x+200 && mouseX>x-200 && mouseY<y+150){//if you click close enough to the lamp head...
	 segmentControllerX = mouseX;
	 segmentControllerY = mouseY;
   // var toprint =int(lamp.angle1*180/Math.PI);
   // var toprint2 = int(lamp.angle2*180/Math.PI);
   var toprint =int(map(lamp.angle1, -90,90,180,0));
   var toprint2 = int(map(lamp.angle2,-90,90,180,0));
   if((whichVariableToSend%3)!=0){
    if((whichVariableToSend%3)!=1){
      anotherDiv.html(toprint2);
      print(toprint2+" body sent")
    }else{
      rotationDiv.html(headRotation.value());
      print(headRotation.value()+" rotation sent");
    } 
   }else{
    div.html(toprint);
    print(toprint+" head angle sent");
   }
   whichVariableToSend++;
  }
  lamp.update(0, segmentControllerX, segmentControllerY);
  for( var i=0; i<x.length-1; i++) {
    lamp.update(i+1, x[i], y[i]);
  }
  push();
  noStroke();
  // text("head up - down", Slider0.x * 2 + Slider0.width, 35);
  // text("head: right - left", Slider1.x * 2 + Slider1.width, 65);
  // text("body: up - down", Slider2.x * 2 + Slider2.width, 95);
  // text("head rotation: right - left",headRotation.x,headRotation.y-20);
  // text("Red", Slider0.x * 2 + Slider0.width, 35);
  // text("Green", Slider1.x * 2 + Slider1.width, 65);
  // text("Blue", Slider2.x * 2 + Slider2.width, 95);
  text("Head Rotation: left-right",headRotation.x,headRotation.y-20);
  pop();
  //base
   push();
   strokeWeight(7);
   line(width/2+3,height/2,width/2+58,height/2+95);
   line(width/2-10,height/2,width/2+45,height/2+95);
   pop();
   push();
  	noStroke();
  	fill(h+90,h1+90,b+90);
	ellipse(width/2-5,height/2-5,20,20);
	ellipse(width/2+52,height/2+95,80,20);
   pop();


  if(whichModeActivated==55555){//if sleep button is pressed, bckground goes black and draws on top of everything
    background(0);
  }
}
function mousePressed(){
  clicked=!clicked;
}
function touchStarted(){
  
}
function dragSegment(i, xin, yin) {
  this.angle1;
  this.angle2;
  this.dx = xin - x;
  this.dy = yin - y;
  this.angle1 = atan2(this.dy, this.dx);

  this.tx = xin - cos(this.angle1) * segLength;
  this.ty = yin - sin(this.angle1) * segLength;
  this.dx = this.tx - x2;
  this.dy = this.ty - y2;
  this.angle2 = atan2(this.dy, this.dx);
  this.update = function(i, xin, yin){
    this.dx = xin - x;
    this.dy = yin - y;
    this.angle1 = atan2(this.dy, this.dx);

    this.tx = xin - cos(this.angle1) * segLength;
    this.ty = yin - sin(this.angle1) * segLength;
    this.dx = this.tx - x2;
    this.dy = this.ty - y2;
    this.angle2 = atan2(this.dy, this.dx);
    x = (x2 + cos(this.angle2) * segLength)*0.7+0.3*x;
    y = (y2 + sin(this.angle2) * segLength)*0.7+0.3*y;

    head(x, y, this.angle1);
    segment(x2, y2, this.angle2);
  }
}
function head(x,y,a){
	push();
	noStroke();
	fill(255,190);
  translate(x, y);
  rotate(a);
  beginShape();
  vertex(0,5);
  vertex(0,-15);
  vertex(25,-20);
  vertex(75,-50);
  vertex(75,40);
  vertex(25,10);
  endShape();
  pop();
}
function segment(x, y, a) {
  push();
  translate(x, y);
  strokeWeight(7);
  rotate(a);
  line(0,0,segLength-8,15);
  line(0,-10, segLength, 0);
  line(segLength-8,15,segLength,0);
  pop();
}
function tosay() {
  whichModeActivated = 1;
  var say = "Remote Control through the Web"
  modeQuote.html(say);
  mode.html(whichModeActivated);
}
function tosay2() {
  var say2 = "AnaLamp is friendly and wants to see your face";
  modeQuote.html(say2);
  whichModeActivated = 22;
  mode.html(whichModeActivated);
}
function tosay3() {
  whichModeActivated = 333;
  var say3 = "Your working so Analamp focuses on what's in your hands";
  modeQuote.html(say3);
  mode.html(whichModeActivated);
  h=150;
  h1=205;
  b=0;
}
function tosay4() {
  whichModeActivated = 4444;
  var say5 = "How many people are in the room?";
  modeQuote.html(say5);
  mode.html(whichModeActivated);
}
function tosay5() {
  whichModeActivated = 55555;
  var say5 = "Sleep";
  modeQuote.html(say5);
  mode.html(whichModeActivated);
}
