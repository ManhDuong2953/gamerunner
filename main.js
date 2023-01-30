const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = 700;
canvas.height = 400;
const ctx = canvas.getContext("2d");
let fps = 20;
const bg = new Image();
const fg = new Image();
const fence = new Image();
const fenceFg = new Image();
const heroImg = new Image();
bg.src = "./asset/istockphoto-1257225648-612x612.jpg";
fg.src = "./asset/fg.jpg";
fence.src = "./asset/rao.png";
fenceFg.src = "./asset/chuongngaivat.png";
heroImg.src = "./asset/PngItem_5588889.png";
const footer = {
  x: 0,
  y: canvas.height - fg.height,
  cellsFG: [
    {
      x: 0,
      y: canvas.height - fg.height,
    },
    {
      x: canvas.width,
      y: canvas.height - fg.height,
    },
  ],
};
const hero = {
  x: 30,
  y: canvas.height - fg.height - heroImg.height / 2,
  jump: 150,
};

const fenceFooter = {
  x: canvas.width,
  y: canvas.height - fg.height - fenceFg.height,
  cellsfenceFG: [
    { x: canvas.width, y: canvas.height - fg.height - fenceFg.height },
  ],
};

const dxHeroImg = 78;
let frameXImg = 0;
let frameYImg = 0;
let score = 0;

const loop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setTimeout(loop, 1000 / fps);
  //kiểm tra tốc độ nhân vật chuyển ảnh
  ctx.drawImage(bg, 0, 0);

  //vẽ footer
  footer.cellsFG.forEach((cell, index) => {
    cell.x -= fps;
    if (footer.cellsFG[footer.cellsFG.length - 1].x === 0) {
      footer.cellsFG.push({ x: canvas.width, y: footer.y });
      footer.cellsFG.shift();
    }
    ctx.drawImage(fg, cell.x, cell.y);
  });
  hero.y += fps / 2;
  if (hero.y >= canvas.height - fg.height - heroImg.height / 2) {
    hero.y = canvas.height - fg.height - heroImg.height / 2;
    heroImg.src = "./asset/PngItem_5588889.png";
  }

  //vẽ nhân vật
  ctx.drawImage(
    heroImg, //ảnh
    dxHeroImg * frameXImg, // tọa độ cắt X
    (heroImg.height / 2) * frameYImg, // tọa độ cắt Y
    dxHeroImg, // Width cắt
    heroImg.height / 2, // Height cắt
    hero.x, // Toạ độ đặt ảnh canvas X
    hero.y, // Toạ độ đặt ảnh canvas Y
    dxHeroImg, // Width ảnh trong canvas
    heroImg.height / 2 // Height ảnh trong canvas
  );
  ctx.drawImage(fence, 0, 0);

  for (let i = 0; i < fenceFooter.cellsfenceFG.length; i++) {
    ctx.drawImage(
      fenceFg,
      fenceFooter.cellsfenceFG[i].x,
      fenceFooter.cellsfenceFG[i].y
    );
    fenceFooter.cellsfenceFG[i].x -= fps;
    if (
      hero.y <= fence.height - 20 ||
      (hero.x + dxHeroImg >= fenceFooter.cellsfenceFG[i].x + 20 &&
        hero.x <= fenceFooter.cellsfenceFG[i].x + fenceFg.width - 20 &&
        hero.y + heroImg.height / 2 >= fenceFooter.cellsfenceFG[i].y + 20)
    ) {
      // if (alert("You loses the game! OK to restart the game")) {
        location.reload();
        // fenceFooter.cellsfenceFG=[]
      
    }
    if (fenceFooter.cellsfenceFG[i].x === fenceFooter.cellsfenceFG[i].x * 3) {
      fenceFooter.cellsfenceFG.push({ x: canvas.width, y: fenceFooter.y });
      score++;

      if (fenceFooter.cellsfenceFG.length > 4) {
        fenceFooter.cellsfenceFG.shift();
      }
    }
  }
  if (++frameXImg >= 4) {
    frameXImg = 0;
  }

  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText("Score: " + score, 50, canvas.height - fg.height + 80);
};
loop();

document.onkeydown = function (e) {
  if (e.code === "Space") {
    hero.y -= hero.jump;
    heroImg.src = "./asset/jump.png";
  }
};
