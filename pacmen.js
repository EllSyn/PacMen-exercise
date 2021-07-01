var pos = 0;

const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];
var direction = 0;
const pacMen = [];

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}
function makePac() {
  let velocity = setToRandom(10);
  let position = setToRandom(200);
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = pacArray[0][0];
  newimg.width = '100';
  newimg.style.left = position.x.toString();
  newimg.style.top = position.y.toString();
  newimg.id = pacMen.length.toString();
  let bite = 0;

  game.appendChild(newimg);
  return {
    position,
    velocity,
    newimg,
    bite,
  };
}

function update() {
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    document.getElementById(item.newimg.id).style.left =
      item.position.x.toString() + 'px';
    document.getElementById(item.newimg.id).style.top =
      item.position.y.toString() + 'px';
  });
  setTimeout(update, 20);
}

const bite = (item) => {
  pacMen.forEach((item) => {
    if (item.velocity.x > 0) {
      document.getElementById(item.newimg.id).src = pacArray[0][item.bite];
      item.bite === 0 ? (item.bite = 1) : (item.bite = 0);
    }
    if (item.velocity.x < 0) {
      document.getElementById(item.newimg.id).src = pacArray[1][item.bite];
      item.bite === 0 ? (item.bite = 1) : (item.bite = 0);
    }
  });
  setTimeout(bite, 500);
};

function checkCollisions(item) {
  if (
    item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  ) {
    item.velocity.x = -item.velocity.x;
    if (item.velocity.x < 0) {
      document.getElementById(item.newimg.id).src = pacArray[1][0];
    } else {
      document.getElementById(item.newimg.id).src = pacArray[0][0];
    }
  }
  if (
    item.position.y + item.velocity.y + item.newimg.height >
      window.innerHeight ||
    item.position.y + item.velocity.y < 0
  )
    item.velocity.y = -item.velocity.y;
}

function makeOne() {
  pacMen.push(makePac());
}
