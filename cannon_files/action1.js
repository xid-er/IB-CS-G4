var ctx = myCanvas.getContext("2d"); // Get the drawing context for the canvas
function MySprite (img_url, bounce) {
  this.x = 0;
  this.y = 0;
  this.visible = true;
  this.velocity_x = 0;
  this.velocity_y = 0;
  this.bounciness = bounce;
  this.MyImg = new Image();
  this.MyImg.src = img_url;
}
var gravity = 0.25;
var FPS = 60; // How many frames per second

MySprite.prototype.Do_Frame_Things = function() {
  if (this.visible) ctx.drawImage(this.MyImg, this.x, this.y); // draw potato
  this.x = this.x + this.velocity_x;
  this.y = this.y + this.velocity_y; // move potato
  if (this.x < 0) {this.velocity_x= -this.velocity_x}; // bounce off the sides
  if (this.x + this.MyImg.width > myCanvas.width) {this.velocity_x= -this.velocity_x};
  if (this.y + this.MyImg.height > myCanvas.height) {
    var overrun = this.y + this.MyImg.height - myCanvas.height; // calculate overrun
    this.velocity_y = this.velocity_y - (overrun / this.velocity_y * gravity); //adjust
    this.y = this.y - overrun; // be exactly at the bottom
    this.velocity_y= -this.velocity_y * this.bounciness; // bounce off the bottom
    this.velocity_x= this.velocity_x * this.bounciness; // also slow horizontally
  }
  else{
  // accelerate by gravity, but only if we're not actually bouncing at this moment
  this.velocity_y = this.velocity_y + gravity;
  }
}

var MyBall= new MySprite(document.getElementById("potato").src, 0.3);

MyBall.y = myCanvas.height-120;
MyBall.x = 120;
function Do_a_Frame(){
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  MyBall.Do_Frame_Things();
}
   // set my frame renderer
function init(){
  var mass = document.getElementById("masa").value;
  console.log(mass);
  if(mass<=10 && mass>=0.001){
    var distance = -72.995*mass + 730;
    document.getElementById("result").innerHTML = "Result: " + Math.round(distance) + " cm";
    var coeff = 10.1 - mass;
    MyBall.velocity_x = coeff;
    MyBall.velocity_y = -1.18 * coeff;
    document.getElementById("start").disabled = true;
    setInterval(Do_a_Frame, 1000 / FPS);
  }
  else{
      document.getElementById("result").innerHTML = "Please choose a number between 0.001 and 10";
  }
}
