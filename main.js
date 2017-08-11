var wifi = require("Wifi");
var WIFI_SSID = "pablo";
var WIFI_OPTIONS = {
  password : "santarita"
};

wifi.stopAP(); // disable Wi-Fi AP

wifi.connect(WIFI_SSID, WIFI_OPTIONS, function(err) {
  if (err) {
    console.log("ERROR: Connection failed, error: " + err);
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

console.log("Helo, World!");

var led      = NodeMCU.D4;  // built-in LED
var state    = true;        // LED switched on by default
var duration = 50;         // blink the LED every 500 ms

setInterval(function() {
  digitalWrite(led, state);
  state = !state;           // toggle LED state
}, duration);