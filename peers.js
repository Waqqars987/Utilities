var web3_extended = require('web3_ipc');
var app = require('express')();
var bodyparser = require('body-parser')
var jsonparser = bodyparser.json();
const PORT = 4000;
var options = {
  host: '/home/waqqar/Blockchain/DataDir/geth.ipc',
  ipc: true,
  personal: true,
  admin: true,
  debug: false
};
var web3 = web3_extended.create(options);

app.set("json spaces", 0);
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(PORT, function () {
  console.log(`peers.js is Listening on Port ${PORT}`);
});

app.get('/getPeers', jsonparser, function (req, res) {

  console.log("Get Peers API Called");
  res.setHeader('Content-type', 'application/json');

  web3.admin.peers(function (error, result) {
    if (!error) {
      res.send(result);
    }
  });
});