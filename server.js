const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);
    console.log(page);
    if(page === '/'){
        fs.readFile('index.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end()
        })
    }

    else if(page === '/api'){
        if('coffee' in params){
            if(params['coffee'] === 'capuccino'){
                res.writeHead(200, {'Content-Type': 'application/json'});
                const objToJson = {
                    name: "Capuccino",
                    region: "Italy",
                    color: "Beige",
                    served: "Hot",
                    preparation: 'The espresso is poured into the bottom of the cup, followed by a similar amount of hot milk, which is prepared by heating and texturing the milk using the espresso machine steam wand. The top third of the drink consists of milk foam; this foam can be decorated with artistic drawings made with the same milk, called "latte art"',
                    image: "https://c.tenor.com/R_7tm7oFrZoAAAAC/coffee-latte.gif"
                };
                res.end(JSON.stringify(objToJson));
            } //coffee === capuccino
            else if(params['coffee'] !== 'capuccino'){
                res.writeHead(200, {'Content-Type': 'application/json'});
                const objToJson = {
                    name: "Come on...",
                    region: "You're kidding...",
                    color: "Nah, seriously!",
                    served: "Really?",
                    preparation: "Are you actually suggesting there's another coffee better than a capuccino? Type 'capuccino' and you'll see!",
                    image: "http://i.imgur.com/pnzJTq3.gif"
                };
                res.end(JSON.stringify(objToJson));
            } //coffee !== capuccino
        } //if coffee
    }//public files
    else if(page === '/css/style.css'){
        fs.readFile('css/style.css', (err, data) => {
            res.write(data);
            res.end();
        });
    }
    else if(page === '/js/main.js'){
        fs.readFile('js/main.js', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/javascript'});
            res.write(data);
            res.end();
        });
    }
    else{
        figlet('404!!', (err, data) => {
            if(err){
                console.log('Something went wrong...');
                console.dir(err);
                return;
            };
            res.write(data);
            res.end();
        });
    }
});

server.listen(8000);