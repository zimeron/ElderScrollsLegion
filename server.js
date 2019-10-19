//Install express server
const express = require('express');
const path = require('path');
const http = require('http');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/ElderScrollsLegion'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname,'/dist/ElderScrollsLegion/index.html'));
});

const server = http.createServer(app);

// Start the app by listening on the default Heroku port
server.listen(process.env.PORT || 8080);