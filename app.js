let canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
let c = canvas.getContext("2d");
let colors = ["#2185C5", "#7ECEF0", "#FFF6E5", "#FF7F66"];
window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  // init()
});
addEventListener("click", () => {
  init();
});
function Ball(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;
  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
    c.fillStyle = this.color;
    c.stroke();
    c.closePath();
  };
  this.update = function () {
    let gravity = 1;
    let frction = 0.9;
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * frction;
    } else {
      this.dy += gravity;
    }
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}

function randomNumRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.round(Math.random() * colors.length)];
}
let ballArray;

function init() {
  ballArray = [];
  for (let i = 0; i < 200; i++) {
    let radius = randomNumRange(25, 40);

    let x = randomNumRange(0, canvas.width - radius);
    let y = randomNumRange(0, canvas.height - radius);
    let dx = randomNumRange(-2, 2);
    let dy = randomNumRange(-2, 2);
    let color = randomColor(colors);
    let ball = new Ball(x, y, dx, dy, radius, color);
    ballArray.push(ball);
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let j = 0; j < ballArray.length; j++) {
    ballArray[j].update();
  }
  // circle.update()
}
init();
animate();
