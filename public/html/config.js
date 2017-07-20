

var token = localStorage.getItem('orp_token');
window.token = JSON.parse(token);
window.url = null;

$.getJSON("config.json", function(json) {
   window.url = json.URL;
});


