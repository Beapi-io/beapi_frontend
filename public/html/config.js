var token = localStorage.getItem('token');
var appVersion = "1.0"

window.token = token;
window.url = "http://localhost:8080";
window.appVersion = appVersion;

$.getJSON("config.json", function(json) {
   window.url = json.URL;
});


