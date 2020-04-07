var allLevels = [];
var labyrinth;
var cellPixelSize=25;

function fetchLevel(level) {
  let url = "/level?level="+level;
  loadJSON(url, setLevel);
}
function setLevel(table) {
  labyrinth = table;
  console.log("Fetched table from server: "+labyrinth.length+"x"+labyrinth[0].length+" "+labyrinth);
}

function setup() {
  createCanvas(1600,1200);
  fetchLevel(0);
}

function drawLabyrinth() {
  //console.log("Lab width="+labWidth+" & height="+labHeight);
  for (var y=0; y<labyrinth.length; y++) {
    for (var x=0; x<labyrinth[0].length; x++) {
      if (labyrinth[y] && labyrinth[y][x]) {
        //console.log("Cell: "+x+","+y+" = "+labyrinth[y][x]);
        var posX = x*cellPixelSize;
        var posY = y*cellPixelSize;
        fill(50);
        rect(posX,posY,cellPixelSize,cellPixelSize);
      }
    }
  }
}

function draw() {
  background(255);
  if (!labyrinth) {
    fetchLevel(0);
    return;
  }
  drawLabyrinth();
  drawPlay();
  return;
}

var canMove=true;
function keyReleased() {
  canMove=true;
}

var myx = 2;
var myy = 2;

function drawPlay() {
  var walls = labyrinth[myy][myx].walls;
  if (keyIsPressed && canMove) {
    canMove=false;
    console.log("Key: "+key+" Cell: "+myx+","+myy);
    if (key == 'w' && myy>=1 && labyrinth[myy-1][myx]==0) { // up
      myy --;
    } else if (key == 's' && myy<labyrinth.length-1 && labyrinth[myy+1][myx]==0) { // down
      myy ++;
    } else if (key == 'a') { // left
      if (myx==0) { // wrap to other side of screen
        myx = labyrinth[myy].length-1;
      } else if (myx>=1 && labyrinth[myy][myx-1]==0) {
        myx --;
      }
    } else if (key == 'd') { // right
      if (myx == labyrinth[0].length-1) {
        myx = 0;
      } else if (myx<labyrinth[0].length-1 && labyrinth[myy][myx+1]==0) {
        myx ++;
      }
    }
  }
  /*if (myx == 2 && myy == 4) {
    alert('You won!')
    myx = 2;
    myy = 0;
  }*/
  fill('orange');
  ellipse(myx*cellPixelSize+cellPixelSize/2, myy*cellPixelSize+cellPixelSize/2, cellPixelSize-10, cellPixelSize-10)
}
