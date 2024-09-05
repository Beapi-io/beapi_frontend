function initProperties(){
    var tmp = JSON.parse(window.token);

    var appVersion = "1.0"
    var url = window.url+'/v'+appVersion+'/properties/getAll';

    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if(this.readyState === this.DONE){
            switch(this.status) {
              case 200:
                outputProperties(this.responseText)
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

    xhr.open("GET", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer "+tmp.token);

    xhr.send(data);
}

function outputProperties(responseText) {


            var cookies = document.cookie.split(';');
            for(var i=0 ; i < cookies.length ; ++i) {
                var pair = cookies[i].trim().split('=');
                console.log("pair:"+pair);
                if(pair[0]=='JSESSIONID'){
                    console.log(pair[0]+"/"+pair[1]);
                }
            }





       var out = "";
        document.getElementById("apidocs").innerHTML = null

        var json = JSON.parse(responseText);
        var props = Object.keys(json);

        out += `
        <h2 id="props">Properties</h2>
        <div class="table-responsive"><table class="table">
        <thead>
        <tr>
        <th class='col-md-3'>Name</th>
        <th  class='col-md-9'>Value</th>
        </tr></thead><tbody>`;

        out += `
        <tr><td>Name</td><td><code>`+json['name']+`</code></td></tr>
        <tr><td>Server Type</td><td><code>`+json['serverType']+`</code></td></tr>
        <tr><td>Documentation</td><td><code>`+json['documentationUrl']+`</code></td></tr>
        <tr><td>IOState Directory</td><td><code>`+json['iostateDir']+`</code></td></tr>
        <tr><td>Encoding</td><td><code>`+json['encoding']+`</code></td></tr>
        <tr><td>Supported Formats</td><td><code>`+json['supportedFormats']+`</code></td></tr>
        <tr><td>Batching?</td><td><code>`+json['batchingEnabled']+`</code></td></tr>
        <tr><td>Chaining?</td><td><code>`+json['chainingEnabled']+`</code></td></tr>
        <tr><td>Chaining Limit</td><td><code>`+json['apichainLimit']+`</code></td></tr>
        <tr><td>Reserved Uris</td><td><code>`+json['reservedUris']+`</code></td></tr>
        <tr><td>Login Attempt Limit</td><td><code>`+json['attempts']+`</code></td></tr>
        <tr><td>Public Endpoints</td><td><code>`+json['publicEndpoint']+`</code></td></tr>`;

        out += `</tbody></table></div><br><br>`;


        out += `
        <h2 id="props">Security Properties</h2>
        <div class="table-responsive"><table class="table">
        <thead>
        <tr>
        <th class='col-md-3'>Name</th>
        <th  class='col-md-9'>Value</th>
        </tr></thead><tbody>`;

        out += `
        <tr><td>Super User Role</td><td><code>`+json['security']['superuserRole']+`</code></td></tr>
        <tr><td>User Role</td><td><code>`+json['security']['userRole']+`</code></td></tr>
        <tr><td>Test Role</td><td><code>`+json['security']['testRole']+`</code></td></tr>
        <tr><td>Network Groups</td><td><code>`+json['security']['networkGroups']+`</code></td></tr>
        <tr><td>Network Roles</td><td>`;

        var grps = Object.keys(json['security']['networkRoles']);

        out += `<div class="table-responsive"><table class="table" style='margin:0px;'>`;
        for (const grp of grps) {
            out += `<tr><td class='col-md-3'  style='border: none;'><code>`+grp+`</code></th><td  class='col-md-9' style='border: none;'>`+JSON.stringify(json['security']['networkRoles'][grp])+`</th></tr>`;
        }
        out += `</table></div>`;
        out += `</td></tr>`;
/*
        out += `<tr><td>CORS Network Groups</td><td>`;

        var grps = Object.keys(json['security']['corsNetworkGroups']);


        out += `<div class="table-responsive"><table class="table" style='margin:0px;'>`;
        for (const grp of grps) {
            out += `<tr><td class='col-md-3'  style='border: none;'><code>`+grp+`</code></th><td  class='col-md-9' style='border: none;'>`+JSON.stringify(json['security']['corsNetworkGroups'][grp])+`</th></tr>`;
        }
        out += `</table></div>`;
        out += `</td></tr>`;
*/

        out += `</tbody></table></div><br><br>`;

         document.getElementById("apidocs").innerHTML = out;
}


