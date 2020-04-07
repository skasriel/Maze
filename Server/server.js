var express    =    require('express');
var app        =    express();
var fs = require('fs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser());
//app.use(session({ secret: '$#%!@#@we@#Awee2SDVV@@@@', key: 'sid'}));

app.use(express.static(__dirname + '/../Client'));

//require('./router/main')(app);
app.set('views',__dirname + '../Client');
console.log("Views = "+__dirname+'../Client');
//app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);

var server = app.listen(80,function(){
    console.log("We have started our server on port 80");
});
/*app.get('/',function(req,res){
  res.render('index.html')
});*/

app.get('/level', function(req, res) {
  var levelNum = req.query.level;
  var fileName="../Levels/Level"+levelNum+".json";
  var levelTable = fs.readFileSync(fileName, 'utf8');
  console.log("Level: "+levelNum+" = "+levelTable);
  //res.json(levelTable);
  res.send(levelTable);
  // req.body.table;
});


app.post('/level', function(req, res) {
  var levelNum = req.query.level;
  var levelTable = req.body.levelTable;
  console.log("Got body: "+req.body);
  var fileName="../Levels/Level"+levelNum+".json";
  if (!levelTable || levelTable=="undefined") {
    res.send("Error");
    // An error occurred
    console.error("No post body: "+levelTable);
    return;
  }
  try {
    console.log("Level body: "+levelTable);
    fs.writeFileSync(fileName, levelTable, { mode: 0o755 });
    console.log("Saving level "+levelNum);
    res.send("OK");
  } catch(err) {
    res.send("Error");
    // An error occurred
    console.error("Error savingfile: "+err);
  }
});
