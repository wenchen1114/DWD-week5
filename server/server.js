const fs = require('fs');
const path = require('path');
const express = require('express');
let PORT = 3000;
let app = express();
//let server = app.listen(3000, listening);

app.use(express.static('public'));
app.use(express.json());

function getBand(){
const content = fs.readFileSync(path.join(__dirname, "./band.json"));
const obj = JSON.parse(content);
return obj;
}


//search band by name
app.get("/search/:name", (req, res) => {
    let bandName = req.params.name;
    let bandGet= getBand();
    for(let i = 0; i< obj.length; i++ ){
        if(bandName == bandGet.bands[i].name){
            res.json(bandGet.bands[i]);
        }else{
          console.log("Can't find this band");
        }
    }
})
//get all band
app.get("/all", (req, res) => {
    let bandGet= getBand();
    res.json(bandGet);
  });
//get random band
app.get("/random", (req, res) => {
    let bandGet= getBand();
    res.json(bandGet.bands[Math.floor(Math.random() * bandGet.length)]);
});
//add band
app.post("/add",(req, res) =>{
    let bandGet= getBand();
    let newData = {
        name: req.body.name,
        song: req.body.song
    }
    bandGet.push(newData);
    fs.writeFileSync(path.join(__dirname, "./band.json"), JSON.stringify(bandGet));
    res.json(bandGet);
});

app.listen(PORT, () => {
    console.log('start...');
})