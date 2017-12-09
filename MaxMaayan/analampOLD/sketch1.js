var Slider0, Slider1, Slider2;
var segLength = 100;
var x;
var y; 
var x2; 
var y2;
var x3;
var y3;
	var segmentControllerX;
	var segmentControllerY;
function setup() {
  // create canvas
  createCanvas(windowWidth, 600);
  segmentControllerX = width*0.5;
  segmentControllerY = height*0.3;
  textSize(15);
  stroke(255, 100);

  x = width/2;
  y = height/2;
  x2 = x;
  y2 = y;

  // create sliders
  Slider0 = createSlider(0, 180, 90);
  Slider0.position(20, 20);
  Slider1 = createSlider(0, 180, 120);
  Slider1.position(20, 50);
  Slider2 = createSlider(0, 180, 90);
  Slider2.position(20, 80);
}

function draw() {
var h = Slider0.value();
var h1 = Slider1.value();
var b = Slider2.value();
background(h, h1, b);


if (mouseIsPressed && mouseX<x+300 && mouseX>x-50){
	segmentControllerX = mouseX;
	segmentControllerY = mouseY;
	print(mouseIsPressed);
}
dragSegment(0, segmentControllerX, segmentControllerY);
for( var i=0; i<x.length-1; i++) {
    dragSegment(i+1, x[i], y[i]);
}
  text("head up - down", Slider0.x * 2 + Slider0.width, 35);
  text("head: right - left", Slider1.x * 2 + Slider1.width, 65);
  text("body: up - down", Slider2.x * 2 + Slider2.width, 95);


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
}

function dragSegment(i, xin, yin) {

  this.dx = xin - x;
  this.dy = yin - y;
  this.angle1 = atan2(dy, dx);

  this.tx = xin - cos(this.angle1) * segLength;
  this.ty = yin - sin(this.angle1) * segLength;
  this.dx = this.tx - x2;
  dy = ty - y2;
  angle2 = atan2(dy, dx);
  x = (x2 + cos(angle2) * segLength)*0.6+0.4*x;
  y = (y2 + sin(angle2) * segLength)*0.6+0.4*y;

  head(x, y, angle1);
  segment(x2, y2, angle2);
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
