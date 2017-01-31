var http = require('http');
var ejs = require('ejs');
var express = require('express');
var fs = require('fs');
var session = require('cookie-session'); 
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();

app.use(express.static('picture'));

var money = 0 ; 

var Kreuz = "black";
var Pil = "black"; 
var Herz = "red" ;
var Karo = "red" ;



app.use(bodyParser.urlencoded({
    extended: true
}));

//we are not in a request handler so we may use readFileSync
var content_index = fs.readFileSync('index.html', 'utf-8');
var compiled = ejs.compile(content_index);

app.get('/', function(req, res) {
    
	res.writeHead(200, {'Content-Type': 'text/html'});
   	res.write(compiled({money: money}));
	res.end();

	
});

app.post('/play', urlencodedParser,function(req, res) {

	//console.log(req.body.user.money);
	var lost_money = req.body.user.money;
	money = +lost_money;
	
	var kingrand = Math.random() * 10;
	var Ksym;
	if (kingrand < 2.5)
		{
			var konig = Kreuz;
			Ksym = "KreuzK.jpg";
		}
	else if (kingrand > 2.5 && kingrand < 5)
		{
			var konig = Pil;
			Ksym = "PilK.jpg";
		}
	else if (kingrand > 5 && kingrand < 7.5)
		{
			var konig = Herz;
			Ksym = "HerzK.jpg";
		}
	else if (kingrand > 7.5 && kingrand < 10)
		{
			var konig = Karo;
			Ksym = "KaroK.jpg";
		}


	var damerand = Math.random() * 10;
	if (damerand < 2.5)
		{
			var dame = Kreuz;
			var Dsym = "KreuzD.jpg";
		}
	else if (damerand > 2.5 && damerand < 5)
		{
			var dame = Pil;
			var Dsym = "PilD.jpg";
		}
	else if (damerand > 5 && damerand < 7.5)
		{
			var dame = Herz;
			var Dsym = "HerzD.jpg";
		}
	else if (damerand > 7.5 && damerand < 10)
		{
			var dame = Karo;
			var Dsym = "KaroD.jpg";
		}

	var buderand = Math.random() * 10;
	if (buderand < 2.5)
		{
			var bude = Kreuz;
			var Bsym = "KreuzB.jpg";
		}
	else if (buderand > 2.5 && buderand < 5)
		{
			var bude = Pil;
			var Bsym = "PilB.jpg";
		}
	else if (buderand > 5 && buderand < 7.5)
		{
			var bude = Herz;
			var Bsym = "HerzB.jpg";
		}
	else if (buderand > 7.5 && buderand < 10)
		{
			var bude = Karo;
			var Bsym = "KaroB.jpg";
		}

	//same color
	if (konig == dame && dame == bude)
		{
			
			money = +money * 2;

		}

	//same sym
		if (Ksym == Bsym && Bsym == Dsym)
		{
			
			var content_index = fs.readFileSync('win.html', 'utf-8');
			var compiled = ejs.compile(content_index);
			res.writeHead(200, {'Content-Type': 'text/html'});
   			res.write(compiled({money: money}));
			res.end();
		}

	var content_index = fs.readFileSync('game.html', 'utf-8');
	var compiled = ejs.compile(content_index);
	res.writeHead(200, {'Content-Type': 'text/html'});
   	res.write(compiled({money: money , Ksym:Ksym, Dsym:Dsym, Bsym:Bsym}));
	res.end();

});

app.listen(8080);

console.log('death is the answer');

