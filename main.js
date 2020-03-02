const fs = require('fs');
const path = require('path');
const express = require('express');
let PORT = 3000;
let app = express();
//let server = app.listen(3000, listening);

app.use(express.static('public'));

const content = fs.readFileSync(path.join(__dirname, "./band.json"));
const obj = JSON.parse(content);


//search band by name
app.get("/search/:name", (req, res) => {
    let bandName = req.params.name;
    for(let i = 0; i< obj.length; i++ ){
        if(bandName == obj[i].name){
            res.json(obj[i]);
        }
    }
})
//get all band
app.get("/all", (req, res) => {
    res.json(obj);
  });
//get random band
app.get("/random", (req, res) => {
    res.json(obj.bands[Math.floor(Math.random() * obj.length)]);
});
//add band
app.post("/add",(req, res) =>{
    let newData = {
        name: req.body.name,
        song: req.body.song
    }
    obj.push(newData);
    await writeFile(content, obj);
});
 
function writeFile(dataPath, data){
    return new Promise( (resolve, reject) => {
      fs.writeFile(dataPath, JSON.stringify(data), (err) => {
        if(err){
          return console.error(err)
        } 
        resolve(data);
      })
    })
  }

app.listen(PORT, () => {
    console.log('start...');
})