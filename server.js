
//modules

var express=require('express');
var app=express();
var sqlite3=require('sqlite3');
var db=new sqlite3.Database('db/orange.db');
var bodyParser=require('body-parser');
var path=require('path');


app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));


// routes
var port = process.env.port||3000;
app.listen(port,function(){
  console.log("Server (localhost) listening on port 8080..");
});


app.get('/',function(request,response){
  db.all('SELECT * FROM pantaloni',function(err,rows){
    if(err){
      console.log("ERROR" + err);
    }else{
      console.log(rows);
      response.render('index',{
        pantaloni: rows,
        categoria: 'Pantaloni' //per ora fisso pantaloni
      });
    }
  });
});




app.post('/pantaloni/aggiungi',function(request,response){
      var pantalone={
        marca:request.body.marca,
        taglia:request.body.taglia,
        prezzo:request.body.prezzo,
        descrizione:request.body.descrizione,
        tessuto:request.body.tessuto,
      }
      console.log(pantalone);


      db.run('INSERT INTO pantaloni VALUES (?,?,?,?,?,?)',[request.body.id,request.body.marca,
        request.body.taglia,request.body.prezzo,request.body.descrizione,request.body.tessuto], function(err){
          if(err){
            console.log(err);
          }else{
            response.redirect('/');
          }
        });
});


app.get('/pantaloni',function(request,response){
  db.all('SELECT * FROM pantaloni',function(err,rows){
    if(err){
      console.log("ERROR" + err);
    }else{
      console.log(rows);
      response.render('pantaloni',{
        pantaloni: rows,
        categoria: 'Pantaloni' //per ora fisso pantaloni
      });
    }
  });
});
