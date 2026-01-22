const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const options = ["Prize 1", "Prize 2", "Prize 3", "Prize 4", "Prize 5", "Prize 6"];
const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];

const center = canvas.width / 2;
const radius = center;
const arc = (2 * Math.PI) / options.length;

let rotation = 0;
let spinning = false;

// Draw wheel
function drawWheel() {
  for (let i = 0; i < options.length; i++) {
    const angle = rotation + i * arc;

    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.moveTo(center, center);
    ctx.arc(center, center, radius, angle, angle + arc);
    ctx.fill();

    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.fillText(options[i], radius - 10, 5);
    ctx.restore();
  }
}

// Spin logic
function spin() {
  if (spinning) return;
  spinning = true;

  let spinAngle = Math.random() * 3000 + 2000;
  let start = null;

  function animate(timestamp) {
    if (!start) start = timestamp;
    let progress = timestamp - start;

    rotation += spinAngle / 1000;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWheel();

    if (progress < 3000) {
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      showResult();
    }
  }

  requestAnimationFrame(animate);
}

function showResult() {
  const degrees = (rotation * 180) / Math.PI + 90;
  const index = Math.floor(
    (360 - (degrees % 360)) / (360 / options.length)
  ) % options.length;

  document.getElementById("result").innerText =
    "Result: " + options[index];
}

// Initial draw
drawWheel();
