/*
  A simple example to control the built-in LED
  over a HTML web page
  http://espruino.local:8080
*/

   var wifi = require("Wifi");
   var WIFI_SSID = "GATO";
   var WIFI_OPTIONS = {
     password : "santarita"
   };

   wifi.stopAP(); // disable Wi-Fi AP

   wifi.connect(WIFI_SSID, WIFI_OPTIONS, function(err) {
     if (err) {
       console.log("ERROR: Connection failed, error: " + err);
       console.log(err);
     } else {
       console.log("INFO: Successfully connected");
       console.log(wifi.getStatus());
       console.log(wifi.getIP());





       // set hostname and make the NodeMCU available
       // through espruino.local (ping or for using the
       // Espruino IDE over Wi-Fi
       wifi.setHostname("espruino");

       // save the Wi-Fi settings and they'll be used
       // automatically at power-up.
       wifi.save();
     }
   });



function sensor(){
  var pin = NodeMCU.D2;
  var dht = require("DHT11").connect(pin);
  var duration = 10000;         // blink the LED every 500 ms
  var temperature;
  dht.read(function (a) {
    a.temp.toString();
    console.log(a.temp.toString());
     http(a.temp.toString());
  });
  setInterval(function() {
    dht.read(function (a) {
      console.log("Temp is "+a.temp.toString()+" and RH is "+a.rh.toString());

      }

    );

  }, duration);

}

function http(msg){

var http = require('http');
var wifi = require("Wifi");
var led = NodeMCU.D4;
  /*
  A simple example to control the built-in LED
  over a HTML web page
  http://espruino.local:8080
*/
// connect to the Wi-Fi AP with the informations
// provided in example 03_wifi.js, saved with wifi.save()





wifi.restore();
wifi.setHostname('espruino');
  http.createServer(function(req, res) {

    switch(req.method) {
      case 'GET':
        switch(req.url) {
          case '':
          case '/':
            res.writeHead(200);
            res.write('<html>');
            res.write('  <head>');
            res.write('    <title>LED Control</title>');
            res.write('    <h1>'+msg+'</h1>');
            console.log(msg);
            res.write('  </head>');
            res.write('  <body>');
            res.write('    <h1>Control the built-in LED</h1>');
            //res.write('    <h1>'+temperature+'</h1>');
            res.write('    <form action="/led/on" method="POST">');
            res.write('      <button type="submit">Turn on</button>');
            res.write('    </form>');
            res.write('    <form action="/led/off" method="POST">');
            res.write('      <button type="submit">Turn off</button>');
            res.write('    </form>');
            res.write('    <form action="/temp" method="POST">');
            res.write('      <button type="submit">Turn off</button>');
            res.write('    </form>');
            res.write('  </body>');
            res.write('</html>');
            break;
          default:
            console.log('INFO: URL not handled, ' + req.url);
            res.writeHead(404);
            break;
        }
        break;
      case 'POST':
        switch(req.url) {
          case '/led/on':
            console.log('INFO: Turn on the LED');
            digitalWrite(led, LOW);
            res.writeHead(200);
            res.write('<html>');
            res.write('  <head>');
            res.write('    <title>LED Control</title>');
            res.write('  </head>');
            res.write('  <body>');
            res.write('    <a href="/">Back</a>');
            res.write('  </body>');
            res.write('</html>');
            break;
          case '/led/off':
            console.log('INFO: Turn off the LED');
            digitalWrite(led, HIGH);
            res.writeHead(200);
            res.write('<html>');
            res.write('  <head>');
            res.write('    <title>LED Control</title>');
            res.write('  </head>');
            res.write('  <body>');
            res.write('    <a href="/">Back</a>');
            res.write('  </body>');
            res.write('</html>');
            break;
            case '/temp':
              console.log('INFO: Turn off the LED');
              digitalWrite(led, HIGH);
              res.writeHead(200);
              res.write('<html>');
              res.write('  <head>');
              res.write('    <title>LED Control</title>');
              res.write('    <h1>'+msg+'</h1>');
              console.log(msg);
              res.write('  </head>');
              res.write('  <body>');
              res.write('    <a href="/">Back</a>');
              res.write('  </body>');
              res.write('</html>');
              break;
          default:
            console.log('INFO: URL not handled, ' + req.url);
            res.writeHead(404);
            break;
        }
        break;
      default:
        console.log('INFO: Method not handled, ' + req.method);
        res.writeHead(405);
        break;
    }
    res.end();
  }).listen(8080);
}

function servicios(){
    sensor();

}

function onInit() {

  setTimeout(function(){servicios();},20000); // 3000ms = 3s

}
save();
