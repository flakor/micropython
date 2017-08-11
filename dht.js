pin=NodeMCU.D2;
var dht = require("DHT11").connect(pin);
var duration = 50;         // blink the LED every 500 ms

setInterval(function() {
  dht.read(function (a) {console.log("Temp is "+a.temp.toString()+" and RH is "+a.rh.toString());});
}, duration);
