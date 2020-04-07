var allLevels = [];
var labyrinth;
var cellPixelSize=32;

var mouseAlreadyPressed=false;
function editLevel(level) {
  //labyrinth = allLevels[level];
  if (!labyrinth) {
    fetchLevel(level);
    return;
  }
  if (mouseIsPressed && !mouseAlreadyPressed) {
    var x = mouseX;
    var y = mouseY;
    var cellX = Math.round(x*1.0/cellPixelSize);
    var cellY = Math.round(y*1.0/cellPixelSize);
    if (cellX<0 || cellX>=labyrinth[0].length || cellY<0 || cellY>=labyrinth.length) {
      return;
    }
    labyrinth[cellY][cellX] = 1 - labyrinth[cellY][cellX];
    mouseAlreadyPressed = true;
    pushToServer(level, labyrinth);
  } else if (!mouseIsPressed) {
    mouseAlreadyPressed = false;
  }
  //allLevels[level] = labyrinth;
  drawLabyrinth();
}
function fetchLevel(level) {
  let url = "/level?level="+level;
  loadJSON(url, setLevel);
}
function setLevel(table) {
  labyrinth = table;
  console.log("Fetched table from server: "+labyrinth.length+"x"+labyrinth[0].length+" "+labyrinth);
}
function pushToServer(level, table) {
  let url = "/level?level="+level;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  var postBody = "[";
  for (var y=0; y<table.length; y++) {
    postBody += "["
    for (var x=0; x<table[y].length; x++) {
      postBody += table[y][x];
      if (x<table[y].length-1)
        postBody += ","
    }
    postBody += "]";
    if (y<table.length-1)
      postBody += ",";
  }
  postBody += "]";
  console.log("Posting: "+postBody);
  xhr.send(JSON.stringify({
    levelTable: postBody
  }));
  /*httpPost(url, 'text', 'levelTable='+data, function(result) {
    console.log("successfully saved level "+level+": "+result.body);
  });*/
}

function setup() {
  createCanvas(1600,1200);
  //labyrinth = level0();
}
function drawLabyrinth() {
  console.log("Lab width="+labyrinth[0].length+" & height="+labyrinth.length);
  for (var y=0; y<labyrinth.length; y++) {
    for (var x=0; x<labyrinth[0].length; x++) {
      if (labyrinth[y] && labyrinth[y][x]==1) {
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
  editLevel(0);
  return;
}
