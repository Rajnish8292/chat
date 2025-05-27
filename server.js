const express = require('express');
const path = require('path');
const app = express();

const bodyparser = require('body-parser');
const mkdirp = require('mkdirp');
const WebSocket = require('ws');
const wss = new WebSocket.Server({server});
const chatclients = new Set();
var accounts;
var data;
var fs = require('fs');
app.use(express.json());
app.use(express.static('public'));
bodyparser.urlencoded({extended: false});
app.use(bodyparser.json());

app.listen('7000', () => {
    console.log(`Development server running at PORT ${7000}`)
});
app.get('/', (req, res) => {
    res.sendFile('index.htm', {root: path.join(__dirname, '/public/page')});
});
fs.readdir('public/account', (err, data) => {
    accounts = data;
});
app.get('/accountsList', (req, res) => {
    res.send(JSON.stringify(accounts));
});
app.post('/accounts', (req,res) => {
     data = req.body;
   if(accounts.indexOf(data.username) === -1) {
     app.get('/getaccountdata', (req, res) => {
         var g = {isAccount: false};
         res.send(JSON.stringify(g));
        
     });
   } else {
    app.get('/getaccountdata', (req, res) => {
        var g = {isAccount: true};
        res.send(JSON.stringify(g));
        // console.log('true');
    });
   }
});
app.post('/createaccount', (req, res) => {
    if(req.body) {
        mkdirp(`public/account/${data.username}`);
        setTimeout(function(){fs.appendFile(`public/account/${data.username}/password.txt`, data.password,(err) => {if(err) throw err;});}, 1000);
    }
});
var ownr;
wss.on('connection', (ws) => {
    chatclients.add(ws);
 
    ws.on('message', (data) => {
       for(client of chatclients) {
           client.send(data);
       }
    });
    ws.on('close', () => {
        chatclients.delete(ws);
        });
});
app.post('/saveChat', (req, res) => {
    var chatData = fs.readFileSync('public/storage/chat.json');
    
    var f = JSON.parse(chatData);
    f.push(req.body)
    fs.writeFile('public/storage/chat.json', JSON.stringify(f) , (err) =>{if(err) {console.log(err)}});
    res.send({status: 'success'})
})
app.get('/chatdata', (req, res) => {
var filedata = fs.readFileSync('public/storage/chat.json');
res.send(filedata);
})
app.post('/deletechat', (req, res) => {
    var data = req.body;
    var o = fs.readFileSync('public/storage/chat.json');
    var r = JSON.parse(o);
   
       // r.splice(t, 1);
    var i =0;
    while( i <data.index.length) {
        r.splice(data.index[i] - i, 1);
        console.log(i)
        i++;
        
    }
    fs.writeFile('public/storage/chat.json', JSON.stringify(r), (err) => {
        if(err) {
            throw err;
        }
    })
})
app.post('/editchat', (req, res) => {
    var data = req.body;
    var o = fs.readFileSync('public/storage/chat.json');
    var r = JSON.parse(o);
    r[data.index[0]].chat.text = data.text;
    fs.writeFile('public/storage/chat.json', JSON.stringify(r), (err) => {
        if(err) {
            throw err;
        }
    })
})