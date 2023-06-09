function initProperties(){
    console.log("### initCreateHooks ###")
    var tmp = JSON.parse(window.token);

    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if(this.readyState === this.DONE){
            switch(this.status) {
              case 200:
                var out = "";
                document.getElementById("apidocs").innerHTML = null
                var json = JSON.parse(this.responseText);
                var props = Object.keys(json);

                out += `
                <h2 id="props">Properties</h2>
                <div class="table-responsive"><table class="table">
                <thead>
                <tr>
                <th>Name</th>
                <th>Value</th>
                </tr>
                </thead>
                <tbody>`;

                for (const prop of props) {
                out += `<tr>
                <td>`+prop+`</td>
                <td><code>`+json[prop]+`</code></td>
                </tr>`;
                }
                out += `</tbody>
                </table></div>`;
                 document.getElementById("apidocs").innerHTML = out;
                break;
              case 401:
                  localStorage.removeItem('token');
                  header = "common/nologin_header.html";
                break;
              default:
                alert(this.responseText);
            }
        }
    });

    xhr.open("GET", "http://localhost:8080/v1.0/properties/getProperties");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer "+tmp.token);

    xhr.send(data);

};
