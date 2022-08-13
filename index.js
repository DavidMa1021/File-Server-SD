const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
var quotes = [];
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))


function base64_decode(data) {
    return new Buffer(data, 'base64');
}


app.post('/receiveImage', (req, res) => {
    console.log("Receive image from middleware", req.body.name);
    let imgPath = 'public/' + req.body.name;
    fs.writeFileSync(imgPath, base64_decode(req.body.image64.split(",")[1]));
    console.log("Saved image");
    res.send(imgPath);

})

app.get('/',(req,res)=>{
    res.send('File Server Active!')
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
