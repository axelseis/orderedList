const path = require('path');
const fetch = require('node-fetch');
const express = require('express');
const btoa = require('btoa');
const cors_proxy = require('cors-anywhere');

const app = express();
const env = app.get('env').replace(/\s/g, "");

let port = 8080;
const corsproxyPort = 3002;

app.set('json spaces', 40);

cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    setHeaders: {
        Authorization: 'Basic ' + btoa('VnklkBJ3BepTAADWQlq4%2f3ktKFWUSlWxsnpG4DlUVVGKomlxlrVUaQ%3d%3d:')
    }
}).listen(corsproxyPort, 'localhost', function() {
    console.log('Running CORS Anywhere on :' + port);
});

if(env === 'dev') {
    const livereload = require('livereload');

    app.use(express.static(__dirname));
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    var lrserver = livereload.createServer();
    lrserver.watch([
        __dirname,
        path.join(__dirname,'src')
    ])
    port = 3000;
}
else {
    app.use(express.static(
        path.join(__dirname,'dist')
    )); 
}

app.listen(port, () => console.log('aXplain server listening on port ' + port ));

app.get('/api/getUsers', async function(req, res) {
    const response = await fetch(`http://localhost:${corsproxyPort}/https://woffu-dev.azurewebsites.net/api/v1/users`);
    const json = await response.json();

    res.json(json);
})

app.get('*', function(req,res){
    res.sendFile(path.join(__dirname,'index.html'));
})    


