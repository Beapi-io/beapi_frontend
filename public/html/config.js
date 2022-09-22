var token = localStorage.getItem('token');
window.token = token
window.url = "http://localhost:8080";

$.getJSON("config.json", function(json) {
   window.url = json.URL;
});


