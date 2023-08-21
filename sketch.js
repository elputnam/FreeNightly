//Failure to Load: Free trad music in Galway nightly

//photos
let base;
let kegsCU;
let stones;
let kegsMid;
let trad;


let alp1 = 0;
let alp2 = 100;

// Tiles configuration
let tiles = [];
let cols = 10;
let rows = 10;
let w, h;
let x1  = 0;
let y1 = 0;

// Order of tiles
let board = [];

function preload(){
  base = loadImage('assets/KegTrad_base.png');
  kegsCU = loadImage('assets/KegTrad_kegsCU.png');
  stones = loadImage('assets/KegTrad_stones.png');
  kegsMid = loadImage('assets/KegTrad_kegsMid.png');
  trad = loadImage('assets/KegTrad_trad.png');
  
}

function setup() {
  createCanvas(base.width, base.height);
  colorMode(HSB, 360, 100, 100, 100);
  background(0);
  frameRate(10);
  rectMode(CENTER);
   // pixel dimensions of each tiles
   w = width / cols;
   h = height / rows;
   for (let i = 0; i < cols; i++) {
     for (let j = 0; j < rows; j++) {
       let x = i * w;
       let y = j * h;
       let img = createImage(w, h);
       img.copy(kegsCU, x, y, w, h, 0, 0, w, h);
       let index = i + j * cols;
       board.push(index);
       let tile = new Tile(index, img);
       tiles.push(tile);
     }
   }
}

function draw() {
  background(0);

  //base
  push();
  tint(255, random(70, 100));
  image(base, 0, 0, width, height);
  pop();

  //kegCU
  push();
  tint(alp1);
  image(kegsCU, 0, 0, width, height);
  pop();
  
  // blend(kegsCU, 0, 0, kegsCU.width, kegsCU.height, 0, 0, width, height, DARKEST);

  //trad music
  blend(trad, 0, 0, trad.width, trad.height, 0, 0, width, height, LIGHTEST);

 

  //stones
  push();
  tint(255, random(alp1));
  stones.filter(INVERT);
  image(stones, 0, 0, width, height);
  pop();

  //mid kegs
  blend(kegsMid, 0, 0, kegsMid.width, kegsMid.height, 0, 0, width, height, LIGHTEST);



  //keg shuffle
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = int(random(16));
      let x = i * w;
      let y = j * h;
      let tileIndex = board[index];
      if (tileIndex > -1) {
        tint(random(255), alp2);
        let img = tiles
        [tileIndex].img;
        img.filter(INVERT);
        image(img, x, y, w, h);
      }
    }
  }

   //trad music
   blend(trad, 0, 0, trad.width, trad.height, random(-500), 0, width, height, LIGHTEST);

  if (frameCount%int(random(20))==0){
    base.filter(INVERT);
  }

  if (frameCount%int(random(10))==0){
  if (alp1 == 0){
    alp1 = 100;
    alp2 = 0
  } else {
      alp1 = 0;
      alp2 = 100;
    }
  }
  
}

class Tile {
  constructor(i, img) {
    this.index = i;
    this.img = img;    
  }
}
